import React, { useEffect, useState } from 'react';
import imgProfile from './resources/avatarDefecto.png'
import ServiceCardEditable from './ServiceCardEditable'
import { Link } from 'react-router-dom';
import { usuario, consultarDatabaseServiciosUsuario, editarUnServicio, eliminarUnServicio } from './../config/firebase';








export const AjustesUsuario = () => {
    //Consulta los servicios del usuario actual
    const [listaProductos, setListaProductos] = useState([])
    const [listaDatosUsuario, setListaDatosUsuario] = useState([])


    const [telefono, setTelefono] = useState('')
    const [github, setGithub] = useState('')
    const [ubicacion, setUbicacion] = useState('')
    const [idDatosUsuario, setidDatosUsuario] = useState('')


    useEffect(() => {
        cargarDatosUsuario()
        cargarServiciosUsuarios()

    }, [idDatosUsuario])

    //Editar datos usuarios
    const guardarDatosUsuario = async (event) => {
        event.preventDefault();
        const data = {
            Github: github,
            Telefono: telefono,
            Ubicacion: ubicacion,
            user: usuario.email
        }
        await editarUnServicio('datos-usuarios', idDatosUsuario, data)
    }
    //"jose96corrza@gmail.com"
    //"corredor.jose@fuac.edu.co"
    const cargarServiciosUsuarios = async () => {
        const listaTemporal = await consultarDatabaseServiciosUsuario('servicios-usuarios', usuario.email)
        setListaProductos(listaTemporal)
    }
    const cargarDatosUsuario = async () => {
        const listaTemporal = await consultarDatabaseServiciosUsuario('datos-usuarios', usuario.email)
        setListaDatosUsuario(listaTemporal)
        listaDatosUsuario.map((info) => {
            return (
                setTelefono(info.Telefono), setGithub(info.Github), setUbicacion(info.Ubicacion), setidDatosUsuario(info.id)
            )
        })
        console.log(listaDatosUsuario);
    }

    //Borrar servicios
    // const borrar = async () => {
    //     //await eliminarUnServicio('servicios-usuarios', id)
    //     console.log('Borrado servicio con ID: '+item.id);
    // }


    return (
        <div className="container container-fluid">
            <div className="row">
                <div className="col-md-6">
                    <figure>
                        <img
                            width={150}
                            height={150}
                            alt="imagenUsuario"
                            src={usuario != '' ? usuario.photoURL : imgProfile}//<--Aca se puede realizar el ternario para poner la img de usuario
                            id="imgUsuario"

                        />
                        <figcaption>
                            {usuario.displayName}
                        </figcaption>
                    </figure>

                    <form>
                        <div className="form " id="htmlmActualizacionDatos">
                            <label htmlFor="modificarTelefono" className="htmlm-label">Telefono</label>
                            <div className="col-sm-5">
                                <div className="input-group flex-nowrap">
                                    <span className="input-group-text" id="addon-wrapping">
                                        <i className="bi-telephone" role="img" aria-label="telephone"></i>
                                    </span>
                                    <input type="tel" className="htmlm-control " onChange={(event) => setTelefono(event.target.value)}
                                        value={telefono}
                                    />
                                </div>
                            </div>
                            <label htmlFor="modificarGithub" className="htmlm-label">Github</label>
                            <div className="col-sm-6">
                                <div className="input-group flex-nowrap">
                                    <span className="input-group-text" id="addon-wrapping">
                                        <i className="bi-github" role="img" aria-label="GitHub"></i>
                                    </span>
                                    <input type="text" className="htmlm-control " onChange={(event) => setGithub(event.target.value)}
                                        value={github}
                                    />
                                </div>
                            </div>
                            <label htmlFor="modificarUbicacion" className="htmlm-label">Ubicacion</label>
                            <div className="col-sm-6 mb-3">
                                <div className="input-group flex-nowrap">
                                    <span className="input-group-text" id="addon-wrapping">
                                        <i className="bi-geo-alt-fill" role="img" aria-label="GitHub"></i>
                                    </span>
                                    <input type="text" className="htmlm-control " onChange={(event) => setUbicacion(event.target.value)}
                                        value={ubicacion}
                                    />
                                </div>
                            </div>
                            <button className="btn btn-success me-1" onClick={guardarDatosUsuario}>Guardar Cambios</button>
                            <Link className="btn btn-outline-success" to={'/ajusteUsuario/create'}>Añadir Servicio</Link>

                        </div>
                    </form>

                </div>
                <div className="col-md-6">
                    {/* <form>
                        <label>Servicio actuales</label>

                    </form>
                    {
                        listaProductos.map((producto) => {
                            return (
                                <ServiceCardEditable key={producto.id} tituloServicio={producto.nombreServicio} descrip={producto.descripcion} id={producto.id} />
                            )
                        })
                    } */}
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">ID</th>
                                <th scope="col">Servicio</th>
                                <th scope="col">Descripcion</th>
                                <th scope="col">Estado</th>
                                <th scope="col">Accion</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                listaProductos.map((item, index) => (
                                    <tr key={item.id}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{item.id}</td>
                                        <td>{item.nombreServicio}</td>
                                        <td>{item.descripcion}</td>
                                        <td>{item.estado}</td>
                                        <td>
                                        <Link className="btn btn-warning" to={`/ajusteUsuario/${item.id}`}>Editar</Link>
                                        <Link className="btn btn-danger btn-sm mt-1" to={'/ajusteusuario'} onClick={async()=> {
                                            await eliminarUnServicio('servicios-usuarios', item.id)
                                            console.log('Se borrara el servicio de id: '+item.id);
                                        }} >Eliminar</Link>
                                        </td>
                                    </tr>
                                ))
                            }

                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    )
}
export default AjustesUsuario