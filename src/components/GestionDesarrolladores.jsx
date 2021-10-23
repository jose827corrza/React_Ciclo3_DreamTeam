import { Container, Table } from "react-bootstrap";
import { consultarDatabaseServicios, eliminarUnDeveloper, editarUnServicio, datosUsuario, listaAdmins } from '../config/firebase';
import React, { useEffect, useState } from 'react'
import ListGroup from 'react-bootstrap/ListGroup';
import "./Gestion.css";
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';


export const GestionDesarrolladores = () => {

    


    const [listaDesarrolladores, setListaDesarrolladores] = useState([])
    // const producto = {
    //     estado: true,
    //     nombreServicio: nServicio,
    //     user: usuarioActual.email,
    //     descripcion: descrip
    // }
    const history = useHistory();
    useEffect(() => {
        const credencialesUsuario = datosUsuario()
        if (credencialesUsuario) {
          console.log('Existe un usuario');
          if(listaAdmins.includes(credencialesUsuario.email)){
            cargarDesarrolladores()
          }
          
        } else {
          console.log('No Existe un usuario');
          history.push('/')
        }
        
    }, [history])

    const cargarDesarrolladores = async () => {
        const listaTemporal = await consultarDatabaseServicios('lista-desarrolladores')
        setListaDesarrolladores(listaTemporal)
    }


    return (
        <React.Fragment>
            <h1 className="text-center mt-5 mb-5">Gestion de Desarrolladores</h1>

            <Container>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            {/* <th>Descripción</th> */}
                            <th>Imagen</th>
                            <th>GitHub</th>
                            <th>E-mail</th>
                            <th>Teléfono</th>
                            <th>Servicios</th>
                            <th>Activo</th>
                            <th>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listaDesarrolladores.map((desarrollador) => {
                            
                            return (
                                <tr key={desarrollador.id}>
                                    <td>{desarrollador.nombre}</td>
                                    {/* <td>{desarrollador.descripcion}</td> */}
                                    <td><img
                                        className="t-img"
                                        src={desarrollador.imagen}
                                        alt={desarrollador.nombre}
                                    /></td>
                                    <td>{desarrollador.github}</td>
                                    <td>{desarrollador.email}</td>
                                    <td>{desarrollador.telefono}</td>
                                    <td><ListGroup>{desarrollador.servicios.map((servicio) => { return (<ListGroup.Item>{servicio}</ListGroup.Item>) })}</ListGroup></td>
                                    <td>{desarrollador.Activo = true ? 'Activo' : 'Inactivo'}</td>
                                    <td>
                                        <Link

                                            to={'/GestionDesarrolladores'}
                                            onClick={async () => {
                                                console.log('Has eliminado : ' + desarrollador.nombre);
                                                //await eliminarUnDeveloper('lista-desarrolladores', desarrollador.id)
                                            }}
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
                                        </Link>

                                        {/* <Link

                                            to={'/GestionDesarrolladores'}
                                            id={desarrollador.id}
                                            className="ms-3"
                                            onClick={async () => {
                                                console.log('Se actualizo estado');
                                                const dato = {
                                                    imagen: desarrollador.imagen,
                                                    nombre: desarrollador.nombre,
                                                    github: desarrollador.github,
                                                    telefono: desarrollador.telefono,
                                                    servicios: desarrollador.servicios,
                                                    Activo: !desarrollador.Activo,

                                                }
                                                
                                                console.log(!!desarrollador.Activo);
                                                //await editarUnServicio('lista-desarrolladores', desarrollador.id, dato)
                                            }}
                                        >
                                            {
                                                desarrollador.Active = true ? 
                                                <DesktopWindowsIcon/> : <DesktopAccessDisabledIcon/>
                                            }
                                            
                                        </Link> */}

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