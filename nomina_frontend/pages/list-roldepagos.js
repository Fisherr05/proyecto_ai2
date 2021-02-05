//import logo from './logo.svg';
//import './App.css';
import axios from "axios";
import Container from "../components/container/container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { Form, Button, FormGroups } from "react-bootstrap";

import { Component } from "react";

const url = "http://localhost:8081/nomina/personal";

class App extends Component {
  state = {
    data: [],
    modalInsertar: false,
    form: {
      idPago: "",
      fechaPago: "",
      sueldo: 0,
      horasExtras50: 0,
      apellidoPersonal: "",
      horasExtras100: 0,
      fechaIngreso: "",
      direccion: "",
      telefono: "",
    },
  };

  modalInsertar = () => {
    this.setState({ modalInsertar: !this.state.modalInsertar });
  };

  peticionesGet = () => {
    axios
      .get(url)
      .then((response) => {
        this.setState({ data: response.data });
        //console.log(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  peticionPost = async () => {
    await axios
      .post(url, this.state.form)
      .then((response) => {
        this.modalInsertar();
        this.peticionGet();
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  componentDidMount() {
    this.peticionesGet();
  }

  handleChange = async (e) => {
    e.persist();
    await this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
    console.log(this.state.form);
  };

  render() {
    const { form } = this.state;
    return (
      <Container>
        <h1>Personal</h1>
        <div className="App">
          <button
            className="btn btn-success"
            onClick={() => this.modalInsertar()}
          >
            Agregar Empresa
          </button>
          <br />
          <br />
          <table className="table ">
            <thead>
              <tr>
                <th>Cedula</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Fecha de ingreso</th>
                <th>Direccion</th>
                <th>Telefono</th>
              </tr>
            </thead>
            <tbody>
              {this.state.data.map((personal) => {
                return (
                  <tr>
                    <td>{personal.cedulaPersonal}</td>
                    <td>{personal.nombrePersonal}</td>
                    <td>{personal.apellidoPersonal}</td>
                    <td>{personal.fechaIngreso}</td>
                    <td>{personal.direccion}</td>
                    <td>{personal.telefono}</td>

                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          this.seleccionarEmpresa(personal);
                          this.modalInsertar();
                        }}
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      {"   "}
                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          this.seleccionarEmpresa(personal);
                          this.setState({ modalEliminar: true });
                        }}
                      >
                        <FontAwesomeIcon icon={faTrashAlt} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <Modal isOpen={this.state.modalInsertar}>
            <ModalHeader style={{ display: "block" }}>
              <span
                style={{ float: "right" }}
                onClick={() => this.modalInsertar()}
              >
                x
              </span>
            </ModalHeader>
            <ModalBody>
              <div>
                <label htmlFor="id">INGRESO DE PERSONAL</label>

                <br />
                <label htmlFor="cedulaPersonal">Cedula</label>
                <input
                  className="form-control"
                  type="text"
                  name="cedulaPersonal"
                  id="cedulaPersonal"
                  onChange={this.handleChange}
                  value={form.cedulaPersonal}
                />
                <br />

                <label htmlFor="nombrePersonal">Nombres</label>
                <input
                  className="form-control"
                  type="text"
                  name="nombrePersonal"
                  id="nombrePersonal"
                  onChange={this.handleChange}
                  value={form.nombrePersonal}
                />
                <br />

                <label htmlFor="apellidoPersonal">Apellidos</label>
                <input
                  className="form-control"
                  type="text"
                  name="apellidoPersonal"
                  id="apellidoPersonal"
                  onChange={this.handleChange}
                  value={form.apellidoPersonal}
                />
                <br />

                <label htmlFor="fechaIngreso">Fecha de ingreso</label>
                <input
                  className="form-control"
                  type="text"
                  name="fechaIngreso"
                  id="fechaIngreso"
                  onChange={this.handleChange}
                  value={form.fechaIngreso}
                />
                <br />

                <label htmlFor="Direccion">Direccion</label>
                <input
                  className="form-control"
                  type="text"
                  name="direccion"
                  id="direccione"
                  onChange={this.handleChange}
                  value={form.direccion}
                />
                <br />
                <label htmlFor="Telefono">Telefono</label>
                <input
                  className="form-control"
                  type="text"
                  name="telefono"
                  id="telefono"
                  onChange={this.handleChange}
                  value={form.telefono}
                />
                <br />
              </div>
            </ModalBody>

            <ModalFooter>
              <button
                className="btn btn-success"
                onClick={() => this.peticionPost()}
              >
                Insertar{" "}
              </button>
              <button
                className="btn btn-danger"
                onClick={() => this.modalInsertar()}
              >
                Cancelar
              </button>
            </ModalFooter>
          </Modal>
        </div>
      </Container>
    );
  }
}

export default App;
