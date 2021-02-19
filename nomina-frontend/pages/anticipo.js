import ReactDOM from 'react-dom';
import React, { Component } from "react";
import { AnticipoService} from "../src/service/AnticipoService";
import Container from "../src/components/container/container";
import classNames from "classnames";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { FileUpload } from "primereact/fileupload";
import { Rating } from "primereact/rating";
import { Toolbar } from "primereact/toolbar";
import { InputTextarea } from "primereact/inputtextarea";
import { RadioButton } from "primereact/radiobutton";
import { InputNumber } from "primereact/inputnumber";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Panel } from "primereact/panel";
import { Menubar } from "primereact/menubar";
import { locale, addLocale, updateLocaleOption, updateLocaleOptions, localeOption, localeOptions } from 'primereact/api';

import "primereact/resources/themes/bootstrap4-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
class Anticipo extends Component {

  emptyAnticipo = {
    idAnticipo: null,
    fechaAnticipo: null,
    valorAnticipo: null,
    total: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      anticipo: null,
      anticipoDialog: false,
      deleteAnticipoDialog: false,
      deleteAnticiposDialog: false,
      anticipo: this.emptyAnticipo,
      selectedAnticipo: null,
      submitted: false,
      globalFilter: null
    };

    this.anticipoService = new AnticipoService();
    this.leftToolbarTemplate = this.leftToolbarTemplate.bind(this);
    this.rightToolbarTemplate = this.rightToolbarTemplate.bind(this);
    this.imageBodyTemplate = this.imageBodyTemplate.bind(this);
    this.priceBodyTemplate = this.priceBodyTemplate.bind(this);
    this.ratingBodyTemplate = this.ratingBodyTemplate.bind(this);
    this.statusBodyTemplate = this.statusBodyTemplate.bind(this);
    this.actionBodyTemplate = this.actionBodyTemplate.bind(this);

    this.openNew = this.openNew.bind(this);
    this.hideDialog = this.hideDialog.bind(this);
    //this.sav anticipo = this.sav anticipo.bind(this);
    this.editAnticipo = this.editAnticipo.bind(this);
    this.confirmDeleteAnticipo = this.confirmDeleteAnticipo.bind(this);
    this.deleteAnticipo= this.deleteAnticipo.bind(this);
    this.exportCSV = this.exportCSV.bind(this);
    this.confirmDeleteSelected = this.confirmDeleteSelected.bind(this);
    this.deleteSelecteAnticipos = this.deleteSelectedAnticipos.bind(this);
    this.onCategoryChange = this.onCategoryChange.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onInputNumberChange = this.onInputNumberChange.bind(this);
    this.hideDeleteAnticipoDialog = this.hideDeleteAnticipoDialog.bind(this);
    this.hideDeleteAnticiposDialog = this.hideDeleteAnticiposDialog.bind(this);

    this.items = [
      {
        label: "Nuevo",
        icon: "pi pi-fw pi-plus",
        command: () => {
          this.showSaveDialog();
        },
      },
      {
        label: "Editar",
        icon: "pi pi-fw pi-pencil",
        command: () => {
          this.showEditDialog();
        },
      },
      {
        label: "Eliminar",
        icon: "pi pi-fw pi-trash",
        command: () => {
          this.delete();
        },
      },
    ];
    this.anticipoService = new AnticipoService();
    this.save = this.save.bind(this);
    this.delete = this.delete.bind(this);
    this.footer = (
      <div>
        <Button label="Guardar" icon="pi pi-check" onClick={this.save}></Button>
      </div>
    );
  }



  componentDidMount() {
    this.anticipoService.getAll().then(data => this.setState({anticipos: data}))
  }

  openNew() {
    this.setState({
      visible: true,
      anticipo: this.emptyAnticipo,
      submitted: false,
      anticipoDialog: true
    });
  }

  hideDialog() {
    this.setState({
      visible:false,
      submitted: false,
      anticipoDialog: false
    });
  }

  hideDeleteAnticipoDialog() {
    this.setState({ deleteAnticipoDialog: false });
  }

  hideDeleteAnticiposDialog() {
    this.setState({ deleteAnticiposDialog: false });
  }

  editAnticipo(anticipo) {
    this.setState({
      visible: true,
      anticipo: { ...anticipo },
      anticipoDialog: true
    });
  }

  confirmDeleteAnticipo(anticipo) {
    this.setState({
      anticipo,
      deleteAnticipoDialog: true
    });
  }


  deleteAnticipo() {
    let anticipos = this.state.anticipo.filter(val => val.id !== this.state.anticipo.idPago);

    this.anticipoService
      .delete(this.state.anticipo.idPago)
      .then((data) => {
        this.toast.show({
          severity: "success",
          summary: "Atención!",
          detail: "Se eliminó el registro correctamente.",
          life: 3000
        });
        this.anticipoService
          .getAll()
          .then((data) => this.setState({
            anticipo: data,
            deleteAnticipoDialog: false,
            anticipo: this.emptyAnticipo
          }));
      });

  }

  findIndexById(id) {
    let index = -1;
    for (let i = 0; i < this.state.anticipo.length; i++) {
      if (this.state.anticipos[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  exportCSV() {
    this.dt.exportCSV();
  }

  confirmDeleteSelected() {
    this.setState({ deleteAnticiposDialog: true });
  }

  deleteSelectedAnticipos() {
    let anticipos = this.state.anticipos.filter(val => !this.state.selectedAnticipo.includes(val));
    this.anticipoService
      .delete(this.state.anticipos.idPago)
      .then((data) => {
        this.toast.show({
          severity: "success",
          summary: "Atención!",
          detail: "Registros eliminados.",
          life: 3000
        });
        this.anticipoService
          .getAll()
          .then((data) => this.setState({
            anticipos,
            deleteAnticiposDialog: false,
            selectedAnticipo: null
          }));
      });
  }


  onCategoryChange(e) {
    let anticipo = { ...this.state.anticipo };
   anticipo['category'] = e.value;
    this.setState({ anticipo });
  }

  onInputChange(e, name) {
    const val = (e.target && e.target.value) || '';
    let anticipo = { ...this.state.anticipo };
   anticipo[`${name}`] = val;

    this.setState({ anticipo });
  }

  onInputNumberChange(e, name) {
    const val = e.value || 0;
    let anticipo = { ...this.state.anticipo };
   anticipo[`${name}`] = val;

    this.setState({ anticipo });
  }

  leftToolbarTemplate() {
    return (
      <React.Fragment>
        <Button label="New" icon="pi pi-plus" className="p-button-success p-mr-2" onClick={this.openNew} />
      </React.Fragment>
    )
  }


  rightToolbarTemplate() {
    return (
      <React.Fragment>
        <FileUpload mode="basic" accept="image/*" maxFileSize={1000000} label="Importar" chooseLabel="Importar" className="p-mr-2 p-d-inline-block" />
        <Button label="Exportar" icon="pi pi-upload" className="p-button-help" onClick={this.exportCSV} />
      </React.Fragment>
    )
  }

  imageBodyTemplate(rowData) {
    return <img src={`showcase/demo/images/product/${rowData.image}`} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={rowData.image} className="product-image" />
  }

  priceBodyTemplate(rowData) {
    return this.formatCurrency(rowData.price);
  }

  ratingBodyTemplate(rowData) {
    return <Rating value={rowData.rating} readOnly cancel={false} />;
  }

  statusBodyTemplate(rowData) {
    return <span className={`product-badge status-${rowData.inventoryStatus.toLowerCase()}`}>{rowData.inventoryStatus}</span>;
  }

  actionBodyTemplate(rowData) {
    return (
      <React.Fragment>
        <Button icon="pi pi-pencil" className="p-button-rounded p-button-success p-mr-2" onClick={() => this.editAnticipo(rowData)} />
        <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => this.confirmDeleteAnticipo(rowData)} />
      </React.Fragment>
    );
  }



  save() {
    this.anticipoService.save(this.state.anticipo).then((data) => {
      this.setState({
        visible: false,
        anticipo: {
          idAnticipo: null,
          fechaAnticipo: null,
          valorAnticipo: null,
          total: null,
        },
      });
      this.toast.show({
        severity: "success",
        summary: "Atención!",
        detail: "Se guardó el registro correctamente.",
      });
      this.anticipoService
        .getAll()
        .then((data) => this.setState({ anticipos: data }));
    });
  }

  delete() {
    if (window.confirm("¿Realmente desea eliminar el registro?")) {
      this.anticipoService
        .delete(this.state.selectedAnticipo.idAnticipo)
        .then((data) => {
          this.toast.show({
            severity: "success",
            summary: "Atención!",
            detail: "Se eliminó el registro correctamente.",
          });
          this.anticipoService
            .getAll()
            .then((data) => this.setState({ anticipos: data }));
        });
    }
  }

  render() {

    const paginatorLeft = <Button type="button" icon="pi pi-refresh" className="p-button-text" />;
    const paginatorRight = <Button type="button" icon="pi pi-cloud" className="p-button-text" />;
    const header = (
      <div className="table-header">
        <h5 className="p-m-0">Listado de Anticipos</h5>
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText type="search" onInput={(e) => this.setState({ globalFilter: e.value })} placeholder="Buscar..." />
        </span>
      </div>
    );
    const anticipoDialogFooter = (
      <React.Fragment>
        <Button label="Guardar" icon="pi pi-check" className="p-button-text" onClick={this.save} />
        <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={this.hideDialog} />
      </React.Fragment>
    );
    const deleteAnticipoDialogFooter = (
      <React.Fragment>
        <Button label="Si" icon="pi pi-check" className="p-button-text" onClick={this.deleteAnticipo} />
        <Button label="No" icon="pi pi-times" className="p-button-text" onClick={this.hideDeleteAnticipoDialog} />
      </React.Fragment>
    );
    const deleteAnticiposDialogFooter = (
      <React.Fragment>
        <Button label="Si" icon="pi pi-check" className="p-button-text" onClick={this.deleteSelectedAnticipos} />
        <Button label="No" icon="pi pi-times" className="p-button-text" onClick={this.hideDeleteAnticipoDialog} />
      </React.Fragment>
    );




    return (
      <Container style={{ width: "80%", margin: "0 auto", marginTop: "20px" }}>
        <Menubar model={this.items} />
        <Toolbar
          className="p-mb-4"
          left={this.leftToolbarTemplate}
          right={this.rightToolbarTemplate}
        ></Toolbar>
        
          <DataTable
           ref={(el) => this.dt = el} 
           value={this.state.anticipo} selection={this.state.selectedAnticipo} onSelectionChange={(e) => this.setState({ selectedAnticipo: e.value })}
           paginator
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" rows={5} rowsPerPageOptions={[5, 10, 25]}
            globalFilter={this.state.globalFilter}
            header={header}
          >
            <Column field="idAnticipo" header="ID" sortable></Column>
            <Column field="fechaAnticipo" header="Fecha" sortable></Column>
            <Column field="valorAnticipo" header="Valor" sortable></Column>
            <Column field="total" header="Total"></Column>
          </DataTable>
       
        <Dialog
          header="Agregar Anticipo"
          visible={this.state.visible}
          style={{ width: "400px" }}
          modal className="p-fluid"
          footer={this.anticipoDialogFooter}
          onHide={() => this.setState({ visible: false })}
          onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'}
        > 
          <form id="personal-form">
            <br/>
            <span className="p-float-label">
              <InputText 
                value={this.state.anticipo.idAnticipo}
                style={{ width: "100%" }}
                id="idAnticipo"
                onChange={(e) => {
                  let val = e.target.value;
                  this.setState((prevState) => {
                    let anticipo = Object.assign({}, prevState.anticipo);
                    anticipo.idAnticipo = val;
                    return { anticipo };
                  })}
                }
              />
              <label htmlFor="idAnticipo">ID</label>
            </span>
            <br />
            <span className="p-float-label">
              <InputText
                value={this.state.anticipo.fechaAnticipo}
                style={{ width: "100%" }}
                id="fechaAnticipo"
                onChange={(e) => {
                  let val = e.target.value;
                  this.setState((prevState) => {
                    let anticipo = Object.assign({}, prevState.anticipo);
                    anticipo.fechaAnticipo = val;

                    return { anticipo };
                  })}
                }
              />
              <label htmlFor="fechaAnticipo">Fecha</label>
            </span>
            <br />
            <span className="p-float-label">
              <InputText
                value={this.state.anticipo.valorAnticipo}
                style={{ width: "100%" }}
                id="valorAnticipo"
                onChange={(e) => {
                  let val = e.target.value;
                  this.setState((prevState) => {
                    let anticipo = Object.assign({}, prevState.anticipo);
                    anticipo.valorAnticipo = val;

                    return { anticipo };
                  })}
                }
              />
              <label htmlFor="valorAnticipo">Valor</label>
            </span>
            <br />
            <span className="p-float-label">
              <InputText
                value={this.state.anticipo.total}
                style={{ width: "100%" }}
                id="total"
                onChange={(e) => {
                  let val = e.target.value;
                  this.setState((prevState) => {
                    let anticipo = Object.assign({}, prevState.anticipo);
                    anticipo.total = val;

                    return { anticipo };
                  })}
                }
              />
              <label htmlFor="total">TOTAL</label>
            </span>
            <br />
          </form>
        </Dialog>
        <Toast ref={(el) => (this.toast = el)} />
        
        <Dialog visible={this.state.deleteAnticipoDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteAnticipoDialogFooter} onHide={this.hideDeleteAnticipoDialog}>
          <div className="confirmation-content">
            <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem' }} />
            {this.state.rolDePago && <span>¿Realmente desea eliminar el registro? <b>{this.state.rolDePago.name}</b>?</span>}
          </div>
        </Dialog>

        <Dialog visible={this.state.deleteAnticiposDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteAnticiposDialogFooter} onHide={this.hideDeleteAnticiposDialog}>
          <div className="confirmation-content">
            <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem' }} />
            {this.state.rolDePago && <span>¿Realmente desea eliminar los registros?</span>}
          </div>
        </Dialog>
      </Container>
    );
  }

  showSaveDialog() {
    this.setState({
      visible: true,
      anticipo: this.emptyAnticipo,
    });
    document.getElementById('personal-form').reset();
  }

  showEditDialog() {
    this.setState({
      visible: true,
      anticipo: {
        idAnticipo: this.state.selectedAnticipo.idAnticipo,
        fechaAnticipo: this.state.selectedAnticipo.fechaAnticipo,
        valorAnticipo: this.state.selectedAnticipo.valorAnticipo,
        total: this.state.selectedAnticipo.total
      }
    })
  }
}

export default Anticipo;
