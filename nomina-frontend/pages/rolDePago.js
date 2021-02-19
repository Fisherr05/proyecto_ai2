import ReactDOM from 'react-dom';
import React, { Component } from "react";
import { RolDePagoService } from "../src/service/RolDePagoService";
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

import "primereact/resources/themes/bootstrap4-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

class RolDePago extends Component {
  
  emptyRolDePago = {
    idPago: null,
    fechaRolDePago: null,
    sueldo: null,
    horasExtras50: null,
    diasLaborados: null,
    horasExtras100: null,
    bono: null,
    anticipo: null,
    descuento: null,
    multa: null,
    comision: null,
    totalAnual: null,
  };
  
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      rolDePagos: null,
      rolDialog: false,
      deleteRolDePagoDialog: false,
      deleteRolDePagosDialog: false,
      rolDePago: this.emptyRolDePago,
      selectedRolDePagos: null,
      submitted: false,
      globalFilter: null
    };

    this.rolDePagoService = new RolDePago();
    this.leftToolbarTemplate = this.leftToolbarTemplate.bind(this);
    this.rightToolbarTemplate = this.rightToolbarTemplate.bind(this);
    this.imageBodyTemplate = this.imageBodyTemplate.bind(this);
    this.priceBodyTemplate = this.priceBodyTemplate.bind(this);
    this.ratingBodyTemplate = this.ratingBodyTemplate.bind(this);
    this.statusBodyTemplate = this.statusBodyTemplate.bind(this);
    this.actionBodyTemplate = this.actionBodyTemplate.bind(this);

    this.openNew = this.openNew.bind(this);
    this.hideDialog = this.hideDialog.bind(this);
    //this.saveRolDePago = this.saveRolDePago.bind(this);
    this.editRolDePago = this.editRolDePago.bind(this);
    this.confirmDeleteRolDePago = this.confirmDeleteRolDePago.bind(this);
    this.deleteRolDePago = this.deleteRolDePago.bind(this);
    this.exportCSV = this.exportCSV.bind(this);
    this.confirmDeleteSelected = this.confirmDeleteSelected.bind(this);
    this.deleteSelectedRolDePagos = this.deleteSelectedRolDePagos.bind(this);
    this.onCategoryChange = this.onCategoryChange.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onInputNumberChange = this.onInputNumberChange.bind(this);
    this.hideDeleteRolDePagoDialog = this.hideDeleteRolDePagoDialog.bind(this);
    this.hideDeleteRolDePagosDialog = this.hideDeleteRolDePagosDialog.bind(this);

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
    this.rolDePagoService = new RolDePagoService();
    this.save = this.save.bind(this);
    this.delete = this.delete.bind(this);
    this.footer = (
      <div>
        <Button label="Guardar" icon="pi pi-check" onClick={this.save}></Button>
      </div>
    );
  }

  componentDidMount() {
    this.rolDePagoService.getAll().then(data => this.setState({rolDePagos: data}))
  }

  openNew() {
    this.setState({
      visible: true,
      rolDePago: this.emptyRolDePago,
      submitted: false,
      rolDePagoDialog: true
    });
  }

  hideDialog() {
    this.setState({
      visible:false,
      submitted: false,
      rolDePagoDialog: false
    });
  }

  hideDeleteRolDePagoDialog() {
    this.setState({ deleteRolDePagoDialog: false });
  }

  hideDeleteRolDePagosDialog() {
    this.setState({ deleteRolDePagosDialog: false });
  }


  editRolDePago(rolDePago) {
    this.setState({
      visible: true,
      rolDePago: { ...rolDePago },
      rolDePagoDialog: true
    });
  }

  confirmDeleteRolDePago(rolDePago) {
    this.setState({
      rolDePago,
      deleterolDePagoDialog: true
    });
  }

  deleteRolDePago() {
    let rolDePagos = this.state.rolDePagos.filter(val => val.id !== this.state.rolDePago.idPago);

    this.rolDePagosService
      .delete(this.state.rolDePagos.idPago)
      .then((data) => {
        this.toast.show({
          severity: "success",
          summary: "Atención!",
          detail: "Se eliminó el registro correctamente.",
          life: 3000
        });
        this.rolDePagosService
          .getAll()
          .then((data) => this.setState({
            rolDePagos: data,
            deleteRolDePagoDialog: false,
            rolDePagos: this.emptyRolDePago
          }));
      });

  }

  findIndexById(id) {
    let index = -1;
    for (let i = 0; i < this.state.rolDePagos.length; i++) {
      if (this.state.rolDePagos[i].id === id) {
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
    this.setState({ deleteRolDePagosDialog: true });
  }

  deleteSelectedRolDePagos() {
    let RolDePagos = this.state.RolDePagos.filter(val => !this.state.selectedRolDePagos.includes(val));
    this.setState({
      rolDePagos,
      deleteRolDePagosDialog: false,
      selectedRolDePagos: null
    });
    this.toast.show({ severity: 'success', summary: 'Successful', detail: 'RolDePagos Deleted', life: 3000 });
  }

  onCategoryChange(e) {
    let rolDePago = { ...this.state.rolDePago };
    rolDePago['category'] = e.value;
    this.setState({ rolDePago });
  }

  onInputChange(e, name) {
    const val = (e.target && e.target.value) || '';
    let rolDePago = { ...this.state.rolDePago };
    rolDePago[`${name}`] = val;

    this.setState({ rolDePago });
  }

  onInputNumberChange(e, name) {
    const val = e.value || 0;
    let rolDePago = { ...this.state.rolDePago };
    rolDePago[`${name}`] = val;

    this.setState({ rolDePago });
  }

  leftToolbarTemplate() {
    return (
      <React.Fragment>
        <Button label="New" icon="pi pi-plus" className="p-button-success p-mr-2" onClick={this.openNew} />
        <Button label="Delete" icon="pi pi-trash" className="p-button-danger" onClick={this.confirmDeleteSelected} disabled={!this.state.selectedRolDePagos || !this.state.selectedRolDePagos.length} />
      </React.Fragment>
    )
  }


  rightToolbarTemplate() {
    return (
      <React.Fragment>
        <FileUpload mode="basic" accept="image/*" maxFileSize={1000000} label="Import" chooseLabel="Import" className="p-mr-2 p-d-inline-block" />
        <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={this.exportCSV} />
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
        <Button icon="pi pi-pencil" className="p-button-rounded p-button-success p-mr-2" onClick={() => this.editRolDePago(rowData)} />
        <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => this.confirmDeleteRolDePago(rowData)} />
      </React.Fragment>
    );
  }


  save() {
    this.rolDePagoService.save(this.state.rolDePago).then((data) => {
      this.setState({
        visible: false,
        rolDePago: this.emptyRolDePago,
        rolDePagoDialog:true
      });
      this.toast.show({
        severity: "success",
        summary: "Atención!",
        detail: "Se guardó el registro correctamente.",
      });
      this.rolDePagoService
        .getAll()
        .then((data) => this.setState({ rolDePagos: data }));
    });
  }

  delete() {
    if (window.confirm("¿Realmente desea eliminar el registro?")) {
      this.rolDePagoService
        .delete(this.state.selectedRolDePago.idPago)
        .then((data) => {
          this.toast.show({
            severity: "success",
            summary: "Atención!",
            detail: "Se eliminó el registro correctamente.",
          });
          this.rolDePagoService
            .getAll()
            .then((data) => this.setState({ rolDePagos: data }));
        });
    }
  }

  render() {
    const header = (
      <div className="table-header">
        <h5 className="p-m-0">Listado de Roles de Pagos</h5>
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText type="search" onInput={(e) => this.setState({ globalFilter: e.value })} placeholder="Buscar..." />
        </span>
      </div>
    );
    const rolDePagoDialogFooter = (
      <React.Fragment>
        <Button label="Guardar" icon="pi pi-check" className="p-button-text" onClick={this.save} />
        <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={this.hideDialog} />
      </React.Fragment>
    );
    const deleteRolDePagoDialogFooter = (
      <React.Fragment>
        <Button label="Si" icon="pi pi-check" className="p-button-text" onClick={this.deleteRolDePago} />
        <Button label="No" icon="pi pi-times" className="p-button-text" onClick={this.hideDeleteRolDePagoDialog} />
      </React.Fragment>
    );
    const deleteRolDePagosDialogFooter = (
      <React.Fragment>
        <Button label="Si" icon="pi pi-check" className="p-button-text" onClick={this.deleteSelectedRolDePagos} />
        <Button label="No" icon="pi pi-times" className="p-button-text" onClick={this.hideDeleteRolDePagosDialog} />
      </React.Fragment>
    );



    return (
      <Container >
        <Toolbar
          className="p-mb-4"
          left={this.leftToolbarTemplate}
          right={this.rightToolbarTemplate}
        ></Toolbar>
          <DataTable
             paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
             currentPageReportTemplate="Showing {first} to {last} of {totalRecords} rolDePagos"
             globalFilter={this.state.globalFilter}
             header={header}
          >
            <Column field="idPago" header="ID" sortable></Column>
            <Column field="fechaRolDePago" header="Fecha" sortable></Column>
            <Column field="sueldo" header="Sueldo Base" sortable></Column>
            <Column field="horasExtras50" header="Horas extras al 50%" sortable></Column>
            <Column field="diasLaborados" header="Dias Laborados" sortable></Column>
            <Column field="horasExtras100" header="Horas extras al 100%" sortable></Column>
            <Column field="bono" header="Bono" sortable></Column>
            <Column field="anticipo" header="Anticipo" sortable></Column>
            <Column field="descuento" header="Descuento" sortable></Column>
            <Column field="multa" header="Multa" sortable></Column>
            <Column field="comision" header="Comision" sortable></Column>
            <Column field="totalAnual" header="Total" sortable></Column>
            <Column body={this.actionBodyTemplate}></Column>
          </DataTable>

        <Dialog
          header="Agregar Nuevo Registro"
          paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} rolDePagos"
          visible={this.state.visible}
          style={{ width: '450px' }}
          modal className="p-fluid"
          footer={this, rolDePagoDialogFooter}
          onHide={() => this.setState({ visible: false })}
          onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'}
        >
          <form id="rolDePago-form">
            <br /> 
            <span className="p-float-label">
              <InputText
                value={this.state.rolDePago.fechaRolDePago}
                style={{ width: "100%" }}
                id="fechaRolDePago"
                onChange={(e) => {
                  let val = e.target.value;
                  this.setState((prevState) => {
                    let rolDePago = Object.assign({}, prevState.rolDePago);
                    rolDePago.fechaRolDePago = val;

                    return { rolDePago };
                  })}
                }
              />
              <label htmlFor="fechaRolDePago">Fecha</label>
            </span>
            <br />
            <span className="p-float-label">
              <InputText
                value={this.state.rolDePago.sueldo}
                style={{ width: "100%" }}
                id="sueldo"
                onChange={(e) => {
                  let val = e.target.value;
                  this.setState((prevState) => {
                    let rolDePago = Object.assign({}, prevState.rolDePago);
                    rolDePago.sueldo = val;

                    return { rolDePago };
                  })}
                }
              />
              <label htmlFor="sueldo">Sueldo</label>
            </span>
            <br />
            <span className="p-float-label">
              <InputText
                value={this.state.rolDePago.horasExtras50}
                style={{ width: "100%" }}
                id="horasExtras50"
                onChange={(e) => {
                  let val = e.target.value;
                  this.setState((prevState) => {
                    let rolDePago = Object.assign({}, prevState.rolDePago);
                    rolDePago.horasExtras50 = val;

                    return { rolDePago };
                  })}
                }
              />
              <label htmlFor="horasExtras50">Horas extras al 50%</label>
            </span>
            <br />
            <span className="p-float-label">
              <InputText
                value={this.state.rolDePago.diasLaborados}
                style={{ width: "100%" }}
                id="diasLaborados"
                onChange={(e) => {
                  let val = e.target.value;
                  this.setState((prevState) => {
                    let rolDePago = Object.assign({}, prevState.rolDePago);
                    rolDePago.diasLaborados = val;

                    return { rolDePago };
                  })}
                }
              />
              <label htmlFor="diasLaborados">Dias Laborados</label>
            </span>
            <br />
            <span className="p-float-label">
              <InputText
                value={this.state.rolDePago.horasExtras100}
                style={{ width: "100%" }}
                id="horasExtras100"
                onChange={(e) => {
                  let val = e.target.value;
                  this.setState((prevState) => {
                    let rolDePago = Object.assign({}, prevState.rolDePago);
                    rolDePago.horasExtras100 = val;
                    return { rolDePago };
                  })}
                }
              />
              <label htmlFor="horasExtras100">Horas extras al 100%</label>
            </span>
            <br />
            <span className="p-float-label">
              <InputText
                value={this.state.rolDePago.bono}
                style={{ width: "100%" }}
                id="bono"
                onChange={(e) => {
                  let val = e.target.value;
                  this.setState((prevState) => {
                    let rolDePago = Object.assign({}, prevState.rolDePago);
                    rolDePago.bono = val;
                    return { rolDePago };
                  })}
                }
              />
              <label htmlFor="bono">Bono</label>
            </span>
            <br />
            <span className="p-float-label">
              <InputText
                value={this.state.rolDePago.anticipo}
                style={{ width: "100%" }}
                id="anticipo"
                onChange={(e) => {
                  let val = e.target.value;
                  this.setState((prevState) => {
                    let rolDePago = Object.assign({}, prevState.rolDePago);
                    rolDePago.anticipo = val;
                    return { rolDePago };
                  })}
                }
              />
              <label htmlFor="anticipo">Anticipo</label>
            </span>
            <br />
            <span className="p-float-label">
              <InputText
                value={this.state.rolDePago.descuento}
                style={{ width: "100%" }}
                id="descuento"
                onChange={(e) => {
                  let val = e.target.value;
                  this.setState((prevState) => {
                    let rolDePago = Object.assign({}, prevState.rolDePago);
                    rolDePago.descuento = val;
                    return { rolDePago };
                  })}
                }
              />
              <label htmlFor="descuento">Descuento</label>
            </span>
            <br />
            <span className="p-float-label">
              <InputText
                value={this.state.rolDePago.multa}
                style={{ width: "100%" }}
                id="multa"
                onChange={(e) => {
                  let val = e.target.value;
                  this.setState((prevState) => {
                    let rolDePago = Object.assign({}, prevState.rolDePago);
                    rolDePago.multa = val;
                    return { rolDePago };
                  })}
                }
              />
              <label htmlFor="multa">Multa</label>
            </span>
            <br />
            <span className="p-float-label">
              <InputText
                value={this.state.rolDePago.comision}
                style={{ width: "100%" }}
                id="comision"
                onChange={(e) => {
                  let val = e.target.value;
                  this.setState((prevState) => {
                    let rolDePago = Object.assign({}, prevState.rolDePago);
                    rolDePago.comision = val;
                    return { rolDePago };
                  })}
                }
              />
              <label htmlFor="comision">Comision</label>
            </span>
            <br />
            <span className="p-float-label">
              <InputText
                value={this.state.rolDePago.totalAnual}
                style={{ width: "100%" }}
                id="totalAnual"
                onChange={(e) => {
                  let val = e.target.value;
                  this.setState((prevState) => {
                    let rolDePago = Object.assign({}, prevState.rolDePago);
                    rolDePago.totalAnual = val;
                    return { rolDePago };
                  })}
                }
              />
              <label htmlFor="totalAnual">TOTAL</label>
            </span>
            <br />
          </form>
        </Dialog>
        <Toast ref={(el) => (this.toast = el)} />

        <Dialog visible={this.state.deleteRolDePagoDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteRolDePagoDialogFooter} onHide={this.hideDeleteRolDePagoDialog}>
          <div className="confirmation-content">
            <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem' }} />
            {this.state.rolDePago && <span>¿Realmente desea eliminar el registro? <b>{this.state.rolDePago.name}</b>?</span>}
          </div>
        </Dialog>

        <Dialog visible={this.state.deleteRolDePagosDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteRolDePagosDialogFooter} onHide={this.hideDeleteRolDePagosDialog}>
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
      rolDePago: this.emptyRolDePago,
    });
    document.getElementById('rolDePago-form').reset();
  }

  showEditDialog() {
    this.setState({
      visible: true,
      rolDePago: {
        idPago: this.state.selectedRolDePago.idPago,
        fechaRolDePago: this.state.selectedRolDePago.fechaRolDePago,
        sueldo: this.state.selectedRolDePago.sueldo,
        horasExtras50: this.state.selectedRolDePago.horasExtras50,
        diasLaborados: this.state.selectedRolDePago.diasLaborados,
        horasExtras100: this.state.selectedRolDePago.horasExtras100,
        bono: this.state.selectedRolDePago.bono,
        anticipo: this.state.selectedRolDePago.anticipo,
        descuento: this.state.selectedRolDePago.descuento,
        multa: this.state.selectedRolDePago.multa,
        comision: this.state.selectedRolDePago.comision,
        totalAnual: this.state.selectedRolDePago.totalAnual
      }
    })
  }
}

export default RolDePago;
