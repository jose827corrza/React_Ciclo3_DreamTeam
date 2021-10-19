import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { usuario, consultarDatabaseTipoIdentificacion } from './../../../config/firebase';
import React, { useState, useEffect } from "react";

import { Container, Row, Col, Alert } from "react-bootstrap";
import { useHistory } from "react-router-dom";


const ContratotForm = ({ handleChange, handleClick, categorias, formValue }) => {
  const history = useHistory();
  const [tipoIdentificacion, setTipoIdentificacion] = useState([]);
  const [error, setError] = useState();
  const [success, setSuccess] = useState();

  useEffect(() => {
    consultaTipoIdentificacion()
    console.log('Usuario')
    console.log(usuario)
    formValue.id_desarrollador= usuario.uid
    formValue.nombre_desarrollador = usuario.displayName
    formValue.email_desarrollador = usuario.email

}, [])

  const consultaTipoIdentificacion = async () => {
    const listaTemporal = await consultarDatabaseTipoIdentificacion('tipo-identificacion')
    setTipoIdentificacion(listaTemporal)
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
          name="description"
          style={{ height: "50px" }}
          onChange={handleChange}
          value={formValue.description}
        />
        <Form.Label>Servicios contratados</Form.Label>
        <Form.Control
          as="textarea"
          name="servicios"
          style={{ height: "50px" }}
          onChange={handleChange}
          value={formValue.servicios}
        />
        <Form.Label>Fecha inicio</Form.Label>
        <Form.Control
          type="date"
          name="fecha_inicio"
          style={{ height: "50px" }}
          onChange={handleChange}
          value={formValue.fecha_inicio}
        />
        <Form.Label>Precio acordado</Form.Label>
        <Form.Control
          as="textarea"
          name="precio"
          style={{ height: "50px" }}
          onChange={handleChange}
          value={formValue.precio}
        />
      </Form.Group>

      <Button type="button" variant="outline-secondary">
        Cancelar
      </Button>
      <Button
        onClick={handleClick}
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
