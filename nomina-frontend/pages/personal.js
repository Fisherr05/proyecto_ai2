import ReactDOM from 'react-dom';
import React, { Component } from "react";
import { PersonalService } from "../src/service/PersonalService";
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

class Personal extends Component {
  emptyPersonal = {
    cedulaPersonal: null,
    nombrePersonal: null,
    apellidoPersonal: null,
    fechaIngreso: null,
    direccion: null,
    telefono: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      personals: null,
      personalDialog: false,
      deletePersonalDialog: false,
      deletePersonalsDialog: false,
      personal: this.emptyPersonal,
      selectedPersonals: null,
      submitted: false,
      globalFilter: null
    };

    this.personalService = new PersonalService();
    this.leftToolbarTemplate = this.leftToolbarTemplate.bind(this);
    this.rightToolbarTemplate = this.rightToolbarTemplate.bind(this);
    this.imageBodyTemplate = this.imageBodyTemplate.bind(this);
    this.priceBodyTemplate = this.priceBodyTemplate.bind(this);
    this.ratingBodyTemplate = this.ratingBodyTemplate.bind(this);
    this.statusBodyTemplate = this.statusBodyTemplate.bind(this);
    this.actionBodyTemplate = this.actionBodyTemplate.bind(this);

    this.openNew = this.openNew.bind(this);
    this.hideDialog = this.hideDialog.bind(this);
    //this.savePersonal = this.savePersonal.bind(this);
    this.editPersonal = this.editPersonal.bind(this);
    this.confirmDeletePersonal = this.confirmDeletePersonal.bind(this);
    this.deletePersonal = this.deletePersonal.bind(this);
    this.exportCSV = this.exportCSV.bind(this);
    this.confirmDeleteSelected = this.confirmDeleteSelected.bind(this);
    this.deleteSelectedPersonals = this.deleteSelectedPersonals.bind(this);
    this.onCategoryChange = this.onCategoryChange.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onInputNumberChange = this.onInputNumberChange.bind(this);
    this.hideDeletePersonalDialog = this.hideDeletePersonalDialog.bind(this);
    this.hideDeletePersonalsDialog = this.hideDeletePersonalsDialog.bind(this);

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
    this.personalService = new PersonalService();
    this.save = this.save.bind(this);
    this.delete = this.delete.bind(this);
    this.footer = (
      <div>
        <Button label="Guardar" icon="pi pi-check" onClick={this.save}></Button>
      </div>
    );

  }

  componentDidMount() {
    this.personalService.getAll().then(data => this.setState({ personals: data }))
  }

  openNew() {
    this.setState({
      visible: true,
      personal: this.emptyPersonal,
      submitted: false,
      personalDialog: true
    });
  }

  hideDialog() {
    this.setState({
      visible:false,
      submitted: false,
      personalDialog: false
    });
  }

  hideDeletePersonalDialog() {
    this.setState({ deletePersonalDialog: false });
  }

  hideDeletePersonalsDialog() {
    this.setState({ deletePersonalsDialog: false });
  }


  editPersonal(personal) {
    this.setState({
      visible: true,
      personal: { ...personal },
      personalDialog: true
    });
  }

  confirmDeletePersonal(personal) {
    this.setState({
      personal,
      deletePersonalDialog: true
    });
  }

  deletePersonal() {
    let personals = this.state.personals.filter(val => val.id !== this.state.personal.cedulaPersonal);

    this.personalService
      .delete(this.state.personal.cedulaPersonal)
      .then((data) => {
        this.toast.show({
          severity: "success",
          summary: "Atención!",
          detail: "Se eliminó el registro correctamente.",
          life: 3000
        });
        this.personalService
          .getAll()
          .then((data) => this.setState({
            personals: data,
            deletePersonalDialog: false,
            personal: this.emptyPersonal
          }));
      });

  }

  findIndexById(id) {
    let index = -1;
    for (let i = 0; i < this.state.personals.length; i++) {
      if (this.state.personals[i].id === id) {
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
    this.setState({ deletePersonalsDialog: true });
  }

  deleteSelectedPersonals() {
    let Personals = this.state.Personals.filter(val => !this.state.selectedPersonals.includes(val));
    this.setState({
      personals,
      deletePersonalsDialog: false,
      selectedPersonals: null
    });
    this.toast.show({ severity: 'success', summary: 'Successful', detail: 'Personals Deleted', life: 3000 });
  }

  onCategoryChange(e) {
    let personal = { ...this.state.personal };
    personal['category'] = e.value;
    this.setState({ personal });
  }

  onInputChange(e, name) {
    const val = (e.target && e.target.value) || '';
    let personal = { ...this.state.personal };
    personal[`${name}`] = val;

    this.setState({ personal });
  }

  onInputNumberChange(e, name) {
    const val = e.value || 0;
    let personal = { ...this.state.personal };
    personal[`${name}`] = val;

    this.setState({ personal });
  }

  leftToolbarTemplate() {
    return (
      <React.Fragment>
        <Button label="New" icon="pi pi-plus" className="p-button-success p-mr-2" onClick={this.openNew} />
        <Button label="Delete" icon="pi pi-trash" className="p-button-danger" onClick={this.confirmDeleteSelected} disabled={!this.state.selectedPersonals || !this.state.selectedPersonals.length} />
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
        <Button icon="pi pi-pencil" className="p-button-rounded p-button-success p-mr-2" onClick={() => this.editPersonal(rowData)} />
        <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => this.confirmDeletePersonal(rowData)} />
      </React.Fragment>
    );
  }


  save() {
    this.personalService.save(this.state.personal).then((data) => {
      this.setState({
        visible: false,
        personal: this.emptyPersonal,
        personalDialog: true
      });
      this.toast.show({
        severity: "success",
        summary: "Atención!",
        detail: "Se guardó el registro correctamente.",
      });
      this.personalService
        .getAll()
        .then((data) => this.setState({ personals: data }));
    });
  }

  delete() {
    if (window.confirm("¿Realmente desea eliminar el registro?")) {
      this.personalService
        .delete(this.state.selectedPersonal.cedulaPersonal)
        .then((data) => {
          this.toast.show({
            severity: "success",
            summary: "Atención!",
            detail: "Se eliminó el registro correctamente.",
          });
          this.personalService
            .getAll()
            .then((data) => this.setState({ personals: data }));
        });
    }
  }
  render() {
    const header = (
      <div className="table-header">
        <h5 className="p-m-0">Listado de Personal</h5>
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText type="search" onInput={(e) => this.setState({ globalFilter: e.value })} placeholder="Buscar..." />
        </span>
      </div>
    );
    const personalDialogFooter = (
      <React.Fragment>
        <Button label="Guardar" icon="pi pi-check" className="p-button-text" onClick={this.save} />
        <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={this.hideDialog} />
      </React.Fragment>
    );
    const deletePersonalDialogFooter = (
      <React.Fragment>
        <Button label="Si" icon="pi pi-check" className="p-button-text" onClick={this.deletePersonal} />
        <Button label="No" icon="pi pi-times" className="p-button-text" onClick={this.hideDeletePersonalDialog} />
      </React.Fragment>
    );
    const deletePersonalsDialogFooter = (
      <React.Fragment>
        <Button label="Si" icon="pi pi-check" className="p-button-text" onClick={this.deleteSelectedPersonals} />
        <Button label="No" icon="pi pi-times" className="p-button-text" onClick={this.hideDeletePersonalsDialog} />
      </React.Fragment>
    );

    return (
      <Container >
        <Toolbar
          className="p-mb-4"
          left={this.leftToolbarTemplate}
          right={this.rightToolbarTemplate}
        ></Toolbar>
          <DataTable ref={(el) => this.dt = el} value={this.state.personals} selection={this.state.selectedPersonals} onSelectionChange={(e) => this.setState({ selectedPersonals: e.value })}
            //value={this.state.personals}
            //paginator={true}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} personals"
            globalFilter={this.state.globalFilter}
            //rows="4"
            header={header}
          //selectionMode="single"
          //selection={this.state.selectedPersonal}
          //onSelectionChange={(e) =>
          //this.setState({ selectedPersonal: e.value })
          //}
          >
            <Column field="cedulaPersonal" header="Cédula" sortable></Column>
            <Column field="nombrePersonal" header="Nombre" sortable></Column>
            <Column field="apellidoPersonal" header="Apellido" sortable></Column>
            <Column field="fechaIngreso" header="Fecha de Ingreso" sortable></Column>
            <Column field="direccion" header="Direccion" sortable></Column>
            <Column field="telefono" header="Telefono" sortable></Column>
            <Column body={this.actionBodyTemplate}></Column>
          </DataTable>
        <Dialog
          header="Agregar Personal"
          paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} personals"
          visible={this.state.visible}
          style={{ width: '450px' }}
          modal className="p-fluid"
          footer={this, personalDialogFooter}
          onHide={() => this.setState({ visible: false })}
          onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'}
        >
          <form id="personal-form">
            <br />
            <span className="p-float-label">
              <InputText
                value={this.state.personal.cedulaPersonal}
                style={{ width: "100%" }}
                id="cedulaPersonal"
                onChange={(e) => {
                  let val = e.target.value;
                  this.setState((prevState) => {
                    let personal = Object.assign({}, prevState.personal);
                    personal.cedulaPersonal = val;

                    return { personal };
                  })
                }
                }
              />
              <label htmlFor="cedulaPersonal">Cedula</label>
            </span>
            <br />
            <span className="p-float-label">
              <InputText
                value={this.state.personal.nombrePersonal}
                style={{ width: "100%" }}
                id="nombrePersonal"
                onChange={(e) => {
                  let val = e.target.value;
                  this.setState((prevState) => {
                    let personal = Object.assign({}, prevState.personal);
                    personal.nombrePersonal = val;

                    return { personal };
                  })
                }
                }
              />
              <label htmlFor="nombrePersonal">Nombre</label>
            </span>
            <br />
            <span className="p-float-label">
              <InputText
                value={this.state.personal.apellidoPersonal}
                style={{ width: "100%" }}
                id="apellidoPersonal"
                onChange={(e) => {
                  let val = e.target.value;
                  this.setState((prevState) => {
                    let personal = Object.assign({}, prevState.personal);
                    personal.apellidoPersonal = val;

                    return { personal };
                  })
                }
                }
              />
              <label htmlFor="apellidoPersonal">Apellido</label>
            </span>
            <br />
            <span className="p-float-label">
              <InputText
                value={this.state.personal.fechaIngreso}
                style={{ width: "100%" }}
                id="fechaIngreso"
                onChange={(e) => {
                  let val = e.target.value;
                  this.setState((prevState) => {
                    let personal = Object.assign({}, prevState.personal);
                    personal.fechaIngreso = val;

                    return { personal };
                  })
                }
                }
              />
              <label htmlFor="fechaIngreso">Fecha de Ingreso</label>
            </span>
            <br />
            <span className="p-float-label">
              <InputText
                value={this.state.personal.direccion}
                style={{ width: "100%" }}
                id="direccion"
                onChange={(e) => {
                  let val = e.target.value;
                  this.setState((prevState) => {
                    let personal = Object.assign({}, prevState.personal);
                    personal.direccion = val;

                    return { personal };
                  })
                }
                }
              />
              <label htmlFor="direccion">Direccion</label>
            </span>
            <br />
            <span className="p-float-label">
              <InputText
                value={this.state.personal.telefono}
                style={{ width: "100%" }}
                id="telefono"
                onChange={(e) => {
                  let val = e.target.value;
                  this.setState((prevState) => {
                    let personal = Object.assign({}, prevState.personal);
                    personal.telefono = val;
                    return { personal };
                  })
                }
                }
              />
              <label htmlFor="telefono">Teléfono</label>
            </span>
            <br />
          </form>
        </Dialog>

        <Toast ref={(el) => (this.toast = el)} />

        <Dialog visible={this.state.deletePersonalDialog} style={{ width: '450px' }} header="Confirm" modal footer={deletePersonalDialogFooter} onHide={this.hideDeletePersonalDialog}>
          <div className="confirmation-content">
            <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem' }} />
            {this.state.personal && <span>¿Realmente desea eliminar el registro? <b>{this.state.personal.name}</b>?</span>}
          </div>
        </Dialog>

        <Dialog visible={this.state.deletePersonalsDialog} style={{ width: '450px' }} header="Confirm" modal footer={deletePersonalsDialogFooter} onHide={this.hideDeletePersonalsDialog}>
          <div className="confirmation-content">
            <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem' }} />
            {this.state.personal && <span>¿Realmente desea eliminar los registros?</span>}
          </div>
        </Dialog>

      </Container>
    );
  }

  showSaveDialog() {
    this.setState({
      visible: true,
      personal: this.emptyPersonal,
    });
    document.getElementById('personal-form').reset();
  }

  showEditDialog() {
    this.setState({
      visible: true,
      personal: {
        cedulaPersonal: this.state.selectedPersonal.cedulaPersonal,
        nombrePersonal: this.state.selectedPersonal.nombrePersonal,
        apellidoPersonal: this.state.selectedPersonal.apellidoPersonal,
        fechaIngreso: this.state.selectedPersonal.fechaIngreso,
        direccion: this.state.selectedPersonal.direccion,
        telefono: this.state.selectedPersonal.telefono
      }
    })
  }
}

export default Personal;
