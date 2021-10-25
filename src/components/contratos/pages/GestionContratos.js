import { Container, Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Gestion.css";
import React, { useState, useEffect } from "react";

import {
  usuario,
  consultarDatabaseAllContratos,
  consultarDatabaseContratosUsuario,
  eliminarContrato,
  listaAdmins,
  datosUsuario
} from "./../../../config/firebase";

const GestionContratos = ({ productos, setProductos }) => {
  const [contratos, setContratos] = useState([]);
  const [rol, setRol] = useState([]);


  useEffect(() => {
    const credencialesUsuario = datosUsuario()
    setRol("Admin");
    console.log(usuario)
    cargarContratos(credencialesUsuario);
  }, []);

  

  const cargarContratos = async (credencial) => {
    let listaTemporal=[];
    //usuario.rol
    if (listaAdmins.includes(credencial.email)){//<----Esta lista es la de admins
       listaTemporal = await consultarDatabaseAllContratos(
        "contratos"
      );
      
    }else{
       listaTemporal = await consultarDatabaseContratosUsuario(
        "contratos",
        usuario.email
      );

    }

    if (!!listaTemporal) {
      setContratos(listaTemporal);
    } else {
      setContratos([]);
    }
  };

  const deleteContrato = (event) => {
    const id = event.target.id;
    eliminarContrato("contratos",id);
    alert("Se ha eliminado correctamente el contrato")
    const newContratos = contratos.filter((product) => product.id !== id);
    setContratos([...newContratos]);
  };
  

  return (
    <div>
      <h1 className="text-center mt-5 mb-5">Gestión de productos</h1>
      <Container>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>id Contrato</th>
              <th>Nombre Proyecto</th>
              <th>Nombre Desarrollador</th>
              <th>Nombre Cliente</th>
              <th>Fecha inicio</th>
              <th>Precio</th>
              <th>Accion</th>
            </tr>
          </thead>
          <tbody>
            {contratos.map((producto) => {
              return (
                <tr key={producto.id}>
                  <td>{producto.id}</td>
                  <td>{producto.nombre_proyecto}</td>
                  <td>{producto.nombre_desarrollador}</td>
                  <td>{producto.nombre_cliente}</td>
                  <td>{producto.fecha_inicio_proyecto}</td>
                  <td>{producto.precio}</td>
                  <td>
                    {/* <Link to={`/Gestion/Edit/${producto._id}`}>
                      <Button variant="warning">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-pencil"
                          viewBox="0 0 16 16"
                        >
                          <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                        </svg>
                      </Button>
                    </Link> */}

                    <Button
                      variant="danger"
                      onClick={deleteContrato}
                      id={producto.id}
                      className="ms-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-trash"
                        viewBox="0 0 16 16"
                      >
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                        <path
                          fillRule="evenodd"
                          d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                        />
                      </svg>
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Container>
    </div>
  );
};

export default GestionContratos;
