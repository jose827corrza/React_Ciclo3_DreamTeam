import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import imgProfile from './resources/avatarDefecto.png'
import ServiceCardMostrar from './ServiceCardMostrar';
import { devDatos, guardarNuevoServicio, consultarDatabaseServiciosUsuario, consultarServicioParticularUsuario, consultarDataBaseUsuario } from '../config/firebase'
import { Link } from 'react-router-dom';

export const VistaPerfilUsuario = () => {
    const { id } = useParams();
    //console.log(useParams());
    const history = useHistory()
    console.log(id);

    const [productoVistazo, setProductoVistazo] = useState([])
    const [listaProductos, setListaProductos] = useState([])
    const [dasarrollador, setDasarrollador] = useState([])
    const [mostrarInfo, setmostrarInfo] = useState(false)
    const [numCotizante, setnumCotizante] = useState('')

    const cargarServicioPublicado = async (idServicio) => {
        const listaTemporal = await consultarServicioParticularUsuario('servicios-usuarios', idServicio)
        setProductoVistazo(listaTemporal);


    }

    const devActual = async (dev) => {
        const listaTemp = await consultarDataBaseUsuario('datos-usuarios', dev)
        setDasarrollador(listaTemp)
        console.log("Nombre dev: " + dasarrollador);
    }

    useEffect(() => {
        cargarServicioPublicado(id)
        setnumCotizante('')
        console.log(listaProductos);
        //devActual(productoVistazo.user)
        console.log(productoVistazo.user);
        cargarServiciosUsuarios(productoVistazo.user)//listaProductos.user


    }, [id, productoVistazo.user])

    //-----------------------------------------------------


    // const producto = {
    //     estado: true,
    //     nombreServicio: nServicio,
    //     user: usuarioActual.email,
    //     descripcion: descrip
    // }

    //"jose96corrza@gmail.com"
    //"corredor.jose@fuac.edu.co"
    const cargarServiciosUsuarios = async (user) => {
        const listaTemporal = await consultarDatabaseServiciosUsuario('servicios-usuarios', user)
        setListaProductos(listaTemporal)
    }

    //Enviar a cotizacion
    const handleCotizacion = async (event) => {
        event.preventDefault();
        setmostrarInfo(true)
        const crearServicio = {
            numero: numCotizante,
            servicioCotizado: productoVistazo.nombreServicio,
            user: productoVistazo.user
        }
        await guardarNuevoServicio('cotizaciones', crearServicio)
        console.log('Se ha guardado...');
        console.log(crearServicio);
        console.log('Se envio!');
        alert('Se envio tu num')
        history.push('/ListaServiciosDeUsuario')


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
                            <form>
                                <div class="mb-3 col-md-8 mt-3">
                                    <label for="exampleInputEmail1" className="form-label">Numero de contacto</label>
                                    <input
                                        type="tel"
                                        className="form-control"
                                        id="exampleInputEmail1"
                                        aria-describedby="emailHelp"
                                        value={numCotizante}
                                        onChange={(event) => setnumCotizante(event.target.value)}
                                    />
                                    <div id="emailHelp" className="form-text">Deja tu numero de telefono,  el desarrollador s pondra en contacto contigo</div>
                                </div>
                            </form>
                            {mostrarInfo ? productoVistazo.user : ""}
                        </figcaption>
                    </figure>


                    <Link className="btn btn-primary" onClick={handleCotizacion}
                    >Contactar!!
                    </Link>
                </div>
                {/* <ServiceCardMostrar key={productoVistazo.id} tituloServicio={productoVistazo.nombreServicio} descrip={productoVistazo.descripcion} id={productoVistazo.id} /> */}
                <div className="col-md-4 my-3">
                    <div className="card ">

                        <div className="card-header">{productoVistazo.nombreServicio}</div>
                        <div className="card-body">
                            {
                                productoVistazo.descripcion
                            }
                            <hr />

                            {/* <Card.Link><Button variant="warning" className="mb-1" size="sm">Modificar</Button></Card.Link>
                  <Card.Link><Button variant="danger" className="mb-1" size="sm">Borrar</Button></Card.Link> */}
                        </div >
                        {/* <div className="col-3 mb-1 ms-1">
                            <Link className="btn btn-primary" to={`/Servicio/${id}`}>Contactar</Link>
                        </div> */}
                    </div>
                </div>
                <div className="col-md-4">
                    <label for="lista">Otros productos de nuestros Desarrolladores</label>
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
                                                to={`/Servicio/${producto.id}`} onClick={cargarServiciosUsuarios} >
                                                Ver Detalle!
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