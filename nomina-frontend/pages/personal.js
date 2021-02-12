import { Component } from "react";
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
  constructor() {
    super();
    this.state = {
      visible: false,
      personal: {
        cedulaPersonal: null,
        nombrePersonal: null,
        apellidoPersonal: null,
        fechaIngreso: null,
        direccion: null,
        telefono: null,
      },
      selectedPersonal: {},
    };
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
    this.personalService.getAll().then(data => this.setState({personals: data}))
  }

  save() {
    this.personalService.save(this.state.personal).then((data) => {
      this.setState({
        visible: false,
        personal: {
          cedulaPersonal: null,
          nombrePersonal: null,
          apellidoPersonal: null,
          fechaIngreso: null,
          direccion: null,
          telefono: null,
        },
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
    return (
      <Container style={{ width: "80%", margin: "0 auto", marginTop: "20px" }}>
        <Menubar model={this.items} />
        <Toolbar
          className="p-mb-4"
          left={this.leftToolbarTemplate}
          right={this.rightToolbarTemplate}
        ></Toolbar>
        <Panel header="Listado de Personal">
          <DataTable
            value={this.state.personals}
            paginator={true} 
            rows="4"
            selectionMode="single"
            selection={this.state.selectedPersonal}
            onSelectionChange={(e) =>
              this.setState({ selectedPersonal: e.value })
            }
          >
            <Column field="cedulaPersonal" header="Cedula"></Column>
            <Column field="nombrePersonal" header="Nombre"></Column>
            <Column field="apellidoPersonal" header="Apellido"></Column>
            <Column field="fechaIngreso" header="Fecha de Ingreso"></Column>
            <Column field="direccion" header="Direccion"></Column>
            <Column field="telefono" header="Telefono"></Column>
          </DataTable>
        </Panel>
        <Dialog
          header="Agregar Personal"
          visible={this.state.visible}
          style={{ width: "400px" }}
          modal={true}
          footer={this.footer}
          onHide={() => this.setState({ visible: false })}
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
                  })}
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
                  })}
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
                  })}
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
                  })}
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
                  })}
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
                  })}
                }
              />
              <label htmlFor="telefono">Teléfono</label>
            </span>
            <br />
          </form>
        </Dialog>
        <Toast ref={(el) => (this.toast = el)} />
      </Container>
    );
  }

  showSaveDialog() {
    this.setState({
      visible: true,
      personal: {
        cedulaPersonal: null,
        nombrePersonal: null,
        apellidoPersonal: null,
        fechaIngreso: null,
        direccion: null,
        telefono: null
      }
    });
    //document.getElementById('personal-form').reset();
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
