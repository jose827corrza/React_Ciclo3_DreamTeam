import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import imgProfile from './resources/avatarDefecto.png'
import ServiceCardMostrar from './ServiceCardMostrar';
import { usuario, consultarDatabaseServiciosUsuario, consultarServicioParticularUsuario } from '../config/firebase'
import { Link } from 'react-router-dom';

export const VistaPerfilUsuario = () => {
    const { id } = useParams();
    console.log(useParams());
    console.log(id);

    const [productoVistazo, setProductoVistazo] = useState([])

    const cargarServicioPublicado = async (id) => {
        const listaTemporal = await consultarServicioParticularUsuario('servicios-usuarios', id)
        setProductoVistazo(listaTemporal)
        console.log(productoVistazo);
        
    }

    useEffect(() => {
        cargarServicioPublicado(id)
        
    }, [id])

    //-----------------------------------------------------

    const [listaProductos, setListaProductos] = useState([])
    // const producto = {
    //     estado: true,
    //     nombreServicio: nServicio,
    //     user: usuarioActual.email,
    //     descripcion: descrip
    // }
    useEffect(() => {
        cargarServiciosUsuarios(listaProductos.user)
    }, [])
    //"jose96corrza@gmail.com"
    //"corredor.jose@fuac.edu.co"
    const cargarServiciosUsuarios = async () => {
        const listaTemporal = await consultarDatabaseServiciosUsuario('servicios-usuarios', "jose96corrza@gmail.com")
        setListaProductos(listaTemporal)
    }




    return (
        <div className="container container-fluid">
            <div className="row">
                <div className="col-md-4">
                    <figure>
                        <img
                            width={150}
                            height={150}
                            alt="imagenUsuario"
                            src={imgProfile}//<--Aca se puede realizar el ternario para poner la img de usuario
                        />
                        <figcaption>
                            qwetqrrga
                        </figcaption>
                    </figure>
                    <button className="btn btn-primary">Contactar!!</button>
                </div>
                <ServiceCardMostrar key={productoVistazo.id} tituloServicio={productoVistazo.nombreServicio} descrip={productoVistazo.descripcion} id={productoVistazo.id} />

                <div className="col-md-4">
                    <table className="table table-bordered border-primary">
                        <thead>
                            <tr>
                                <th scope="col">Servicio</th>
                                <th scope="col">Accion</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                listaProductos.map((producto, index) =>
                                (
                                    <tr key={producto.id}>
                                        <td>{producto.nombreServicio}</td>
                                        <td>
                                            <Link className="btn btn-primary btn-sm"
                                                to={`/perfilUsuario/${producto.id}`} onClick={cargarServicioPublicado}>
                                                Contactar
                                            </Link>
                                        </td>
                                    </tr>
                                )
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>


        </div>
    )
}
export default VistaPerfilUsuario;