import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { usuario, consultarServicioParticularUsuario, guardarNuevoServicio, editarUnServicio } from './../config/firebase';

const ECServicios = () => {
    const { id } = useParams()

    const history = useHistory()
    const [servicioNuevo, setServicioNuevo] = useState('')
    const [descripcionNuevo, setDescripcionNuevo] = useState('')

    useEffect(() => {
        if(id !== 'create'){
            consultarServicio(id)
        }
        
        setServicioNuevo('')
        setDescripcionNuevo('')
    }, [id])

    //Consultar info servicio si es editarUnServicio
    const consultarServicio = async (idServicio) => {
        const servTemporal = await consultarServicioParticularUsuario('servicios-usuarios', idServicio)
        setServicioNuevo(servTemporal.nombreServicio)
        setDescripcionNuevo(servTemporal.descripcion)

    }

    //Añadir nuevo servicio
    const handleCrearServicio = async (event) => {
        event.preventDefault();
        const crearServicio = {
            estado: true,
            descripcion: descripcionNuevo,
            nombreServicio: servicioNuevo,
            user: usuario.email
        }
        await guardarNuevoServicio('servicios-usuarios', crearServicio)
        console.log('Se ha guardado...');
        console.log(crearServicio);
        history.push('/ajusteUsuario/')


    }

    //Editar Servicio
    const handleEditarServicio = async (event) => {
        event.preventDefault();
        const EditServicio = {
            estado: true,
            descripcion: descripcionNuevo,
            nombreServicio: servicioNuevo,
            user: usuario.email
        }
        await editarUnServicio('servicios-usuarios', id, EditServicio)
        console.log('Se edito el servicio' + id);
        history.push('/ajusteUsuario/')
    }


    return (
        <div className="container">
            <h1>{id === 'create' ? 'Crea aqui tu nuevo Servicio' : `Edita aqui el Servicio de ID: ${id}`}</h1>
            <div className="mt-3">
                <div className="row">
                    <div className="offset-md-3 col-md-6">
                        <form>
                            <div className="mb-3" id="anadirSercicio">
                                <label htmlFor="nuevoSercicio" className="form-label">Nombre Servicio</label>
                                <input
                                    type="text"
                                    placeholder="Ingresa nuevo servicio"
                                    id="nuevoServicio" className="form-control"
                                    value={servicioNuevo}
                                    onChange={(event) => setServicioNuevo(event.target.value)}
                                ></input>
                                <div className="form-text">Es el servicio como desarrollador que quieres prestar</div>
                                <label htmlFor="descripcionServicio">Descripcion servicio</label>
                                <textarea
                                    className="form-control"
                                    type="text" placeholder="Ingresa una descripcion de tu nuevo servicio"
                                    style={{ height: '100px' }}
                                    id="descripcionServicio"
                                    value={descripcionNuevo}
                                    onChange={(event) => setDescripcionNuevo(event.target.value)}
                                ></textarea>
                                <div className="form-text">Esta es la descripcion del servicio que quieres prestar</div>
                            </div>
                            <button className="btn btn-outline-success" onClick={id === 'create' ? handleCrearServicio : handleEditarServicio}>{id === 'create' ? 'Crear Servicio' : 'Editar Servicio'}</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ECServicios
