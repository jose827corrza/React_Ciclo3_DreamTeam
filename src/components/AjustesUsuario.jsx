import React, { useEffect, useState } from 'react';
import imgProfile from './resources/avatarDefecto.png'
import ServiceCardEditable from './ServiceCardEditable'
import { usuario, consultarDatabaseServiciosUsuario } from './../config/firebase';








export const AjustesUsuario = () => {

    const [listaProductos, setListaProductos] = useState([])
    // const producto = {
    //     estado: true,
    //     nombreServicio: nServicio,
    //     user: usuarioActual.email,
    //     descripcion: descrip
    // }
    useEffect(() => {
        cargarServiciosUsuarios()
    }, [])
    //"jose96corrza@gmail.com"
    //"corredor.jose@fuac.edu.co"
    const cargarServiciosUsuarios = async () => {
        const listaTemporal = await consultarDatabaseServiciosUsuario('servicios-usuarios', usuario.email)
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
                            id="imgUsuario"
                            
                        />
                        <figcaption>
                            {usuario.displayName}
                        </figcaption>
                    </figure>
                    <button className="btn btn-primary">Editar mi perfil</button>{' '}
                    <form>
                        <div className="form " id="htmlmActualizacionDatos"> 
                            <label htmlFor="modificarTelefono" className="htmlm-label">Telefono</label>
                            <div className="col-sm-5"> 
                                <div className="input-group flex-nowrap">
                                    <span className="input-group-text" id="addon-wrapping">
                                        <i className="bi-telephone" role="img" aria-label="telephone"></i>
                                    </span>
                                    <input type="tel" className="htmlm-control " id="modificarTelefono"
                                        aria-describedby="addon-wrapping"/>
                                </div>
                            </div>
                            <label htmlFor="modificarGithub" className="htmlm-label">Github</label>
                            <div className="col-sm-6"> 
                                <div className="input-group flex-nowrap">
                                    <span className="input-group-text" id="addon-wrapping">
                                        <i className="bi-github" role="img" aria-label="GitHub"></i>
                                    </span>
                                    <input type="text" className="htmlm-control " id="modificarGithub"
                                        aria-describedby="addon-wrapping" />
                                </div>
                            </div>
                            <label htmlFor="modificarUbicacion" className="htmlm-label">Ubicacion</label>
                            <div className="col-sm-6 mb-3"> 
                                <div className="input-group flex-nowrap">
                                    <span className="input-group-text" id="addon-wrapping">
                                        <i className="bi-geo-alt-fill" role="img" aria-label="GitHub"></i>
                                    </span>
                                    <input type="text" className="htmlm-control " id="modificarUbicacion"
                                        aria-describedby="addon-wrapping"/>
                                </div>
                            </div>
                            <button className="btn btn-success me-1" id="guardarCambios">Guardar Cambios</button>
                            <button className="btn btn-secondary" id="cancelarCambios">Cancelar</button>
                        </div>
                    </form>

                </div>
                <div className="col-md-4">
                    <form>
                        <label>Servicio actuales</label>
                        
                    </form>
                    {
                        listaProductos.map((producto) => {
                            return(
                                <ServiceCardEditable key={producto.id} tituloServicio={producto.nombreServicio} descrip={producto.descripcion} />
                            )
                        })
                    }
                </div>
                <div className="col-md-4">
                    <form>
                        <div className="mb-3" id="anadirSercicio">
                            <label htmlFor="nuevoSercicio" className="form-label">Añadir servicio nuevo</label>
                            <input type="text" placeholder="Ingresa nuevo servicio" id="nuevoServicio" className="form-control"></input>
                            <div className="form-text">Es el servicio como desarrollador que quieres prestar</div>
                            <label htmlFor="descripcionServicio">Descripcion servicio nuevo</label>
                            <input className="form-control" type="text" placeholder="Ingresa una descripcion de tu nuevo servicio" style={{ height: '100px' }} id="descripcionServicio"></input>
                            <div className="form-text">Es el servicio como desarrollador que quieres prestar</div>
                        </div>
                        <button className="btn btn-outline-success">Añadir</button>
                    </form>

                </div>
            </div>
        </div>
    )
}
export default AjustesUsuario