import React from 'react'
import { Link } from 'react-router-dom'


export const ServiceCardMostrar = ({ tituloServicio, descrip, id, usuario }) => {
    return (
        <div className="col-md-4 my-3">
            <div className="card ">
                <div className="card-header">{tituloServicio}</div>
                <div className="card-body">
                    {
                        descrip
                    }
                    <hr/>
                    {
                        usuario
                    }
                    {/* <Card.Link><Button variant="warning" className="mb-1" size="sm">Modificar</Button></Card.Link>
                  <Card.Link><Button variant="danger" className="mb-1" size="sm">Borrar</Button></Card.Link> */}
                </div >
                <div className="col-3 mb-1 ms-1">
                    <Link className="btn btn-primary" to={`/Servicio/${id}`}>Contratar</Link>
                </div>
            </div>
        </div>
    )
}

export default ServiceCardMostrar
