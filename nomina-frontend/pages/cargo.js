import { Component } from "react";
import { CargoService } from "../src/service/CargoService";
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

class Cargo extends Component {
  constructor() {
    super();
    this.state = {
      visible: false,
      cargo: {
        idCargo: null,
        descripcion: null,
      },
      selectedCargo: {},
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
    this.cargoService = new CargoService();
    this.save = this.save.bind(this);
    this.delete = this.delete.bind(this);
    this.footer = (
      <div>
        <Button label="Guardar" icon="pi pi-check" onClick={this.save}></Button>
      </div>
    );
  }

  componentDidMount() {
    this.cargoService.getAll().then(data => this.setState({cargos: data}))
  }

  save() {
    this.cargoService.save(this.state.cargo).then((data) => {
      this.setState({
        visible: false,
        cargo: {
          idCargo: null,
          descripcion: null,
        },
      });
      this.toast.show({
        severity: "success",
        summary: "Atención!",
        detail: "Se guardó el registro correctamente.",
      });
      this.cargoService
        .getAll()
        .then((data) => this.setState({ cargos: data }));
    });
  }

  delete() {
    if (window.confirm("¿Realmente desea eliminar el registro?")) {
      this.cargoService
        .delete(this.state.selectedCargo.idCargo)
        .then((data) => {
          this.toast.show({
            severity: "success",
            summary: "Atención!",
            detail: "Se eliminó el registro correctamente.",
          });
          this.cargoService
            .getAll()
            .then((data) => this.setState({ cargos: data }));
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
        <Panel header="Listado de Anticipos">
          <DataTable
            value={this.state.cargos}
            paginator={true} 
            rows="4"
            selectionMode="single"
            selection={this.state.selectedCargo}
            onSelectionChange={(e) =>
              this.setState({ selectedCargo: e.value })
            }
          >
            <Column field="idCargo" header="ID" sortable></Column>
            <Column field="descripcion" header="Descripcion" sortable></Column>
          </DataTable>
        </Panel>
        <Dialog
          header="Agregar Cargo"
          visible={this.state.visible}
          style={{ width: "400px" }}
          modal={true}
          footer={this.footer}
          onHide={() => this.setState({ visible: false })}
        >
          <form id="cargo-form">
            <br />
            <span className="p-float-label">
              <InputText 
                value={this.state.cargo.idCargo}
                style={{ width: "100%" }}
                id="idCargo"
                onChange={(e) => {
                  let val = e.target.value;
                  this.setState((prevState) => {
                    let cargo = Object.assign({}, prevState.cargo);
                    cargo.idCargo = val;

                    return { cargo };
                  })}
                }
              />
              <label htmlFor="idCargo">ID</label>
            </span>
            <br />
            <span className="p-float-label">
              <InputText
                value={this.state.cargo.descripcion}
                style={{ width: "100%" }}
                id="descripcion"
                onChange={(e) => {
                  let val = e.target.value;
                  this.setState((prevState) => {
                    let cargo = Object.assign({}, prevState.cargo);
                    cargo.descripcion = val;

                    return { cargo };
                  })}
                }
              />
              <label htmlFor="descripcion">Descripcion</label>
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
      cargo: {
        idCargo: null,
        descripcion: null
      }
    });
    //document.getElementById('personal-form').reset();
  }

  showEditDialog() {
    this.setState({
      visible: true,
      cargo: {
        idCargo: this.state.selectedCargo.idCargo,
        descripcion: this.state.selectedCargo.descripcion
      }
    })
  }
}

export default Cargo;
