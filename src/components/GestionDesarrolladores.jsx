import { Container, Table, Button } from "react-bootstrap";
import { usuario, consultarDatabaseServiciosUsuario } from './../config/firebase';
import React from "react";
import "./Gestion.css";

const desarrolladores = [
    {
        uid: 1,
        nombre: "Buzz Lightyear",
        descripcion: "To infinity, and beyond!",
        github: 1000,
        imagen: "https://images.unsplash.com/photo-1581557991964-125469da3b8a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=833&q=80",
        telefono: "Toy Story",
        email: "aass@gmail.com",
        servicios: true,
    },
    {
        uid: 2,
        nombre: "Sheriff Woody",
        descripcion: "There's a snake in my boot!",
        github: 2000,
        imagen: "https://images.unsplash.com/flagged/photo-1581557991965-4cdc00aa57e3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=892&q=80",
        telefono: "Toy Story",
        email: "aass@gmail.com",
        servicios: true,
    },
    {
        uid: 3,
        nombre: "Sonic the Hedgehog",
        descripcion: "Gotta go fast!",
        github: 500,
        imagen: "https://images.unsplash.com/photo-1576416308177-d3443d662fd4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=793&q=80",
        telefono: "Videogames",
        email: "aass@gmail.com",
        servicios: true,
    },
];

export const GestionDesarrolladores = () => {
    return (
        <React.Fragment>
            <h1 className="text-center mt-5 mb-5">Gestion de Desarrolladores</h1>

            <Container>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Descripción</th>
                            <th>Imagen</th>
                            <th>GitHub</th>
                            <th>E-mail</th>
                            <th>Teléfono</th>
                            <th>Servicios</th>
                            <th>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {desarrolladores.map((desarrollador) => {
                            return (
                                <tr key={desarrollador.uid}>
                                    <td>{desarrollador.nombre}</td>
                                    <td>{desarrollador.descripcion}</td>
                                    <td><img
                                        className="t-img"
                                        src={desarrollador.imagen}
                                        alt={desarrollador.nombre}
                                    /></td>
                                    <td>{desarrollador.github}</td>
                                    <td>{desarrollador.email}</td>
                                    <td>{desarrollador.telefono}</td>
                                    <td>{desarrollador.servicios}</td>
                                    <td>
                                        <Button
                                            variant="danger"
                                            //onClick={popProduct}
                                            id={desarrollador.uid}
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

                                        <Button
                                            variant="warning"
                                            //onClick={popProduct}
                                            id={desarrollador.uid}
                                            className="ms-2"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="16"
                                                fill="currentColor"
                                                className="bi bi-pencil-fill"
                                                viewBox="0 0 16 16"
                                            >
                                                <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                                            </svg>
                                        </Button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </Container>
        </React.Fragment>
    );
};