import React from 'react';
import { Link } from 'react-router-dom';
import { loginConGoogle, logOutUsuario } from '../config/firebase';


export const Cabecera = () => {

  const funon = async () =>{
    loginConGoogle()
  }
  const getOut = async () => {
    logOutUsuario()
  }
    return (
        
                    
                <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="container-fluid">
                  <Link className="navbar-brand" to={"/"}>
                  DreamTeam</Link>
                  <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                  </button>
                  <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                      <li className="nav-item">
                        <Link className="nav-link active" aria-current="page" to={"/"}>Home</Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" to="" onClick={funon}>Ingresar</Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" to="">Registrarse</Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" to="/VerServiciosTodos">Ver Servicios</Link>
                      </li>
                      <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle"  id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                          Usuario
                        </a>
                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                          <li><Link className="dropdown-item" to={'/ajusteUsuario'}>Ajustes</Link></li>
                          <li><hr className="dropdown-divider"/></li>
                          <li><Link className="dropdown-item" to="" onClick={getOut}>Salir</Link></li>
                        </ul>
                      </li>
                      
                    </ul>
                    <form className="d-flex">
                      <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                      <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>
                  </div>
                </div>
              </nav>
    )
}

export default Cabecera
