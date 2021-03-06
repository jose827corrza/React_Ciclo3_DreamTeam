import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { usuario } from './../config/firebase';

export const ServiceCardEditable = ({tituloServicio, id, descrip}) => {



    
    return (
        <div className="card ">
            <div className="card-header">{tituloServicio}</div>
            <div className="card-body">
                {
                    descrip
                }
                <hr/>
                {
                    id
                }

                {/* <Card.Link><Button variant="warning" className="mb-1" size="sm">Modificar</Button></Card.Link>
              <Card.Link><Button variant="danger" className="mb-1" size="sm">Borrar</Button></Card.Link> */}
              <div className="col-3 mb-1 ms-1">
                    <Link className="btn btn-danger" to={'/'}>Eliminar</Link>
                </div>
                <div className="col-3 mb-1 ms-1">
                    <Link className="btn btn-warning" to={'/'}>Editar</Link>
                </div>
            </div >
            
                
            
        </div>
    )
}
export default ServiceCardEditable