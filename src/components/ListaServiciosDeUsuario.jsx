import React, { useEffect, useState } from 'react'
import { consultarDatabaseServicios } from '../config/firebase'
import ServiceCardMostrar from './ServiceCardMostrar'


export const ListaServiciosDeUsuario = () => {

    const [listaProductos, setListaProductos] = useState([])
    // const producto = {
    //     estado: true,
    //     nombreServicio: nServicio,
    //     user: usuarioActual.email,
    //     descripcion: descrip
    // }
    useEffect(() => {
        cargarServicios()
    }, [])

    const cargarServicios = async () => {
        const listaTemporal = await consultarDatabaseServicios('servicios-usuarios')
        setListaProductos(listaTemporal)
        //console.log(listaProductos);
    }
    return (
        <div>
            <h2>Lista Servicios de Nuestros Usuarios</h2>
            <div className="container">
            <div className="row">
                {
                    listaProductos.map((producto) => {
                        return (

                            
                                <ServiceCardMostrar key={producto.id} tituloServicio={producto.nombreServicio} descrip={producto.descripcion} id={producto.id}/>
                            

                        )

                    })

                }
                </div>
            </div>

        </div>
    )
}
