import { onAuthStateChanged } from '@firebase/auth';
import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { loginConGoogle, logOutUsuario } from '../config/firebase';


export const Cabecera = ({ usuario }) => {
  

  const funon = async () => {
    loginConGoogle()
  }
  const getOut = async () => {
    logOutUsuario()
  }
const [superUser, setsuperUser] = useState(false)
//   useEffect(() => {
//     const credencialesUsuario = datosUsuario()
//     if (credencialesUsuario.email == 'jose96corrza@gmail.com') {
      
//       setsuperUser(true)
//       console.log(superUser);
//     } else {
//       //console.log('No Existe un usuario');
//       //history.push('/')
//     }
    
// }, [])
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
              {!usuario &&<Link className="nav-link" to="" onClick={funon}>Ingresar</Link>}
            </li>
            <li className="nav-item">
              {!usuario &&<Link className="nav-link" to="">Registrarse</Link>}
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/ListaServiciosDeUsuario">Ver Servicios</Link>
            </li>
            {!!usuario &&<li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Usuario
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><Link className="dropdown-item" to={'/ajusteUsuario'}>Ajustes</Link></li>
                <li><hr className="dropdown-divider" /></li>
                <li><Link className="dropdown-item" to="" onClick={getOut}>Salir</Link></li>
              </ul>
            </li>}

            {!!usuario &&<li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Contratos
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><Link className="dropdown-item" to={'/GestionContratos'}>Ver contratos</Link></li>
                <li><hr className="dropdown-divider" /></li>
                <li><Link className="dropdown-item" to={'/CrearContrato'}>Crear contrato</Link></li>
              </ul>
            </li>}

          </ul>
          {/* <form className="d-flex">
                      <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                      <button className="btn btn-outline-success" type="submit">Search</button>
                    </form> */}
        </div>
      </div>
    </nav>
  )
}

export default Cabecera
