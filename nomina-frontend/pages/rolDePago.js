import { Component } from "react";
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
  constructor() {
    super();
    this.state = {
      visible: false,
      rolDePago: {
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
      },
      selectedRolDePago: {},
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

  save() {
    this.rolDePagoService.save(this.state.rolDePago).then((data) => {
      this.setState({
        visible: false,
        rolDePago: {
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
        },
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
    return (
      <Container style={{ width: "80%", margin: "0 auto", marginTop: "20px" }}>
        <Menubar model={this.items} />
        <Toolbar
          className="p-mb-4"
          left={this.leftToolbarTemplate}
          right={this.rightToolbarTemplate}
        ></Toolbar>
        <Panel header="Listado de Rol de Pagos">
          <DataTable
            value={this.state.rolDePagos}
            paginator={true} 
            rows="4"
            selectionMode="single"
            selection={this.state.selectedRolDePago}
            onSelectionChange={(e) =>
              this.setState({ selectedRolDePago: e.value })
            }
          >
            <Column field="idPago" header="ID"></Column>
            <Column field="fechaRolDePago" header="Fecha"></Column>
            <Column field="sueldo" header="Sueldo Base"></Column>
            <Column field="horasExtras50" header="Horas extras al 50%"></Column>
            <Column field="diasLaborados" header="Dias Laborados"></Column>
            <Column field="horasExtras100" header="Horas extras al 100%"></Column>
            <Column field="bono" header="Bono"></Column>
            <Column field="anticipo" header="Anticipo"></Column>
            <Column field="descuento" header="Descuento"></Column>
            <Column field="multa" header="Multa"></Column>
            <Column field="comision" header="Comision"></Column>
            <Column field="totalAnual" header="Total"></Column>
          </DataTable>
        </Panel>
        <Dialog
          header="Agregar Nuevo Registro"
          visible={this.state.visible}
          style={{ width: "400px" }}
          modal={true}
          footer={this.footer}
          onHide={() => this.setState({ visible: false })}
        >
          <form id="rolDePago-form">
            <br />
            <span className="p-float-label">
              <InputText 
                value={this.state.rolDePago.idPago}
                style={{ width: "100%" }}
                id="idPago"
                onChange={(e) => {
                  let val = e.target.value;
                  this.setState((prevState) => {
                    let rolDePago = Object.assign({}, prevState.rolDePago);
                    rolDePago.idPago = val;

                    return { rolDePago };
                  })}
                }
              />
              <label htmlFor="idPago">ID</label>
            </span>
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
      </Container>
    );
  }

  showSaveDialog() {
    this.setState({
      visible: true,
      rolDePago: {
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
      }
    });
    //document.getElementById('personal-form').reset();
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
