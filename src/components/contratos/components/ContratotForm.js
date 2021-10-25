import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {
  usuario,
  consultarDatabaseTipoIdentificacion,
  consultarDatabaseServiciosUsuario,
  guardarContrato
} from "./../../../config/firebase";
import React, { useState, useEffect } from "react";

import { Container, Row, Col, Alert } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { MultiSelect } from "react-multi-select-component";

const ContratotForm = ({
  handleChange,
  handleClick,
  categorias,
  formValue,
}) => {
  const history = useHistory();
  const [tipoIdentificacion, setTipoIdentificacion] = useState([]);
  const [error, setError] = useState();
  const [success, setSuccess] = useState();
  const [serviciosUsuario, setServiciosUsuario] = useState([]);
  const [serviciosUsuarioSelected, setServiciosUsuarioSelected] = useState([]);


  useEffect(() => {
    formValue.id_desarrollador = usuario.uid;
    formValue.nombre_desarrollador = usuario.displayName;
    formValue.email_desarrollador = usuario.email;
    consultaTipoIdentificacion();
    cargarServiciosUsuario();
  }, []);

  const consultaTipoIdentificacion = async () => {
    const listaTemporal = await consultarDatabaseTipoIdentificacion(
      "tipo-identificacion"
    );
    setTipoIdentificacion(listaTemporal);
  };

  const cargarServiciosUsuario = async () => {
    console.log("Servicios usuario ");

    const listaTemporal = await consultarDatabaseServiciosUsuario(
      "servicios-usuarios",
      usuario.email
    );
    console.log(listaTemporal);
    listaTemporal.map((servicio) => (
      servicio.label=servicio.nombreServicio,
      servicio.value=servicio.id
    ))

    if (!!listaTemporal) {
      setServiciosUsuario(listaTemporal);
    } else {
      setServiciosUsuario([]);
    }
  };
  const enviarContrato = async (event) => {
    event.preventDefault();
    const data = {
      id_desarrollador: formValue.id_desarrollador,
      nombre_desarrollador: formValue.nombre_desarrollador,
      email_desarrollador: formValue.email_desarrollador,
      tipo_identificacion_cliente: formValue.tipo_identificacion_cliente,
      numero_identificacion_cliente:formValue.numero_identificacion_cliente,
      nombre_cliente:formValue.nombre_cliente,
      nombre_proyecto:formValue.nombre_proyecto,
      descripcion_proyecto:formValue.descripcion_proyecto,
      fecha_inicio_proyecto:formValue.fecha_inicio_proyecto,
      precio:formValue.precio,
      servicios:serviciosUsuarioSelected
    }
    await guardarContrato('contratos',  data)

    alert("Su contrato se ha guardado exitosamente!")
    restaurarFormulario();

};

const restaurarFormulario = function(){
  formValue.id_desarrollador = "";
  formValue.nombre_desarrollador= "";
  formValue.email_desarrollador= "";
  formValue.tipo_identificacion_cliente= "";
  formValue.numero_identificacion_cliente= "";
  formValue.nombre_cliente= "";
  formValue.nombre_proyecto= "";
  formValue.descripcion_proyecto= "";
  formValue.fecha_inicio_proyecto= "";
  formValue.precio= "";
  setServiciosUsuarioSelected("");
}

  return (
    <Form>
      <Form.Group className="mb-3">
        <h3> Datos desarrollador</h3>
        <Form.Label>ID Desarrollador</Form.Label>
        <Form.Control
          type="text"
          name="id_desarrollador"
          onChange={handleChange}
          value={formValue.id_desarrollador}
          disabled={!!formValue.id_desarrollador ? true : false}
        />

        <Form.Label>Nombre Desarrollador</Form.Label>
        <Form.Control
          type="text"
          name="nombre_desarrollador"
          onChange={handleChange}
          value={formValue.nombre_desarrollador}
          disabled={!!formValue.nombre_desarrollador ? true : false}
        />

        <Form.Label>Correo Desarrollador</Form.Label>
        <Form.Control
          type="text"
          name="email_desarrollador"
          onChange={handleChange}
          value={formValue.email_desarrollador}
          disabled={!!formValue.email_desarrollador ? true : false}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <h3> Datos cliente</h3>
        <Form.Label>Tipo identificación cliente </Form.Label>
        <Form.Select
          aria-label="Default select example"
          name="tipo_identificacion_cliente"
          onChange={handleChange}
          value={formValue.tipo_identificacion_cliente}
        >
          <option>Seleccione el tipo de identificación</option>
          {tipoIdentificacion.map((identificacion) => (
            <option key={identificacion._id} value={identificacion._id}>
              {identificacion.nombre}
            </option>
          ))}
        </Form.Select>
        <Form.Label>número identificación cliente </Form.Label>
        <Form.Control
          type="text"
          name="numero_identificacion_cliente"
          onChange={handleChange}
          value={formValue.numero_identificacion_cliente}
        />
        <Form.Label>Nombre Cliente</Form.Label>
        <Form.Control
          type="text"
          name="nombre_cliente"
          onChange={handleChange}
          value={formValue.nombre_cliente}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <h3> Datos contrato</h3>
        <Form.Label>Nombre proyecto</Form.Label>
        <Form.Control
          type="text"
          name="nombre_proyecto"
          style={{ height: "50px" }}
          onChange={handleChange}
          value={formValue.nombre_proyecto}
        />
        <Form.Label>Descripción proyecto</Form.Label>
        <Form.Control
          as="textarea"
          name="descripcion_proyecto"
          style={{ height: "50px" }}
          onChange={handleChange}
          value={formValue.descripcion_proyecto}
        />
     {/* <Form.Label>Servicios contratados</Form.Label>
        <Form.Control
          as="select"
          name="servicios_contratados"
          onChange={handleChange}
          value={}
          multiple
        >
          {serviciosUsuario.map((servicio) => (
            <option key={servicio._id} value={servicio._id}>
              {servicio.nombreServicio}
            </option>
          ))} 
        </Form.Control>*/}
        <Form.Label>Fecha inicio</Form.Label>
        <Form.Control
          type="date"
          name="fecha_inicio_proyecto"
          style={{ height: "50px" }}
          onChange={handleChange}
          value={formValue.fecha_inicio_proyecto}
        />
        <Form.Label>Precio acordado</Form.Label>
        <Form.Control
          type="text"
          name="precio"
          style={{ height: "50px" }}
          onChange={handleChange}
          value={formValue.precio}
        />

        <Form.Label>Servicios contratados</Form.Label>
          <MultiSelect
            options={serviciosUsuario}
            value={serviciosUsuarioSelected}
            onChange={setServiciosUsuarioSelected}
            labelledBy="Select"
          />
      </Form.Group>

      <Button type="button" variant="outline-secondary">
        Cancelar
      </Button>
      <Button
        onClick={enviarContrato}
        type="button"
        variant="primary"
        className="float-end"
      >
        Guardar
      </Button>
    </Form>
  );
};

export default ContratotForm;
