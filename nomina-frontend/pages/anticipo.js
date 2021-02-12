import { Component } from "react";
import { AnticipoService } from "../src/service/AnticipoService";
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

class Anticipo extends Component {
  constructor() {
    super();
    this.state = {
      visible: false,
      anticipo: {
        idAnticipo: null,
        fechaAnticipo: null,
        valorAnticipo: null,
        total: null,
      },
      selectedAnticipo: {},
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
            value={this.state.anticipos}
            paginator={true} 
            rows="4"
            selectionMode="single"
            selection={this.state.selectedAnticipo}
            onSelectionChange={(e) =>
              this.setState({ selectedAnticipo: e.value })
            }
          >
            <Column field="idAnticipo" header="ID"></Column>
            <Column field="fechaAnticipo" header="Fecha"></Column>
            <Column field="valorAnticipo" header="Valor"></Column>
            <Column field="total" header="Total"></Column>
          </DataTable>
        </Panel>
        <Dialog
          header="Agregar Anticipo"
          visible={this.state.visible}
          style={{ width: "400px" }}
          modal={true}
          footer={this.footer}
          onHide={() => this.setState({ visible: false })}
        >
          <form id="anticipo-form">
            <br />
            <span className="p-float-label">
              <InputText 
                value={this.state.anticipo.idAnticipo}
                style={{ width: "100%" }}
                id="idAnticipo"
                onChange={(e) => {
                  let val = e.target.value;
                  this.setState((prevState) => {
                    let personal = Object.assign({}, prevState.anticipo);
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
      </Container>
    );
  }

  showSaveDialog() {
    this.setState({
      visible: true,
      anticipo: {
        idAnticipo: null,
        fechaAnticipo: null,
        valorAnticipo: null,
        total: null
      }
    });
    //document.getElementById('personal-form').reset();
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
