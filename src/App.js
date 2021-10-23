import Container from "react-bootstrap/Container";

//import imgagen from './resources/avatarDefecto.png'

import Cabecera from './components/Cabecera';
import AjustesUsuario from './components/AjustesUsuario';
import { Carousel } from './components/Carousel';
import { ListaServiciosDeUsuario } from './components/ListaServiciosDeUsuario'
import { GestionDesarrolladores } from './components/GestionDesarrolladores'
import {

  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import { VistaPerfilUsuario } from './components/VistaPerfilUsuario';
import CrearContrato from './components/contratos/pages/CrearContrato';
import ECServicios from './components/ECServicios';
import { auth } from "./config/firebase";
import { onAuthStateChanged } from "@firebase/auth";
import { useEffect, useState } from "react";






function App() {

  const [firebaseUser, setfirebaseUser] = useState(false)
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {

      if (user) {
        const usuario = {
          id: user.uid,
          email: user.email
        }
        console.log(usuario);
        setfirebaseUser(usuario)
        console.log('El usuario logueado');
      } else {
        console.log('El usuario ya no esta logueado');
        setfirebaseUser(null)
      }

    })
  },[setfirebaseUser])


  return (
    <div className="App">
      <Router>
        <Cabecera usuario={firebaseUser}/>

        <Container className="p-3 text-center mt-3">
          <h1>DreamTeam - Developer MarketPlace</h1>
        </Container>
        <hr />
        <Switch>
          <Route path="/Servicio/:id" component={VistaPerfilUsuario} />
          <Route path="/ajusteUsuario/:id" component={ECServicios} />
          <Route path="/ajusteUsuario/" component={AjustesUsuario} />
          <Route path="/ListaServiciosDeUsuario" component={ListaServiciosDeUsuario} />
          <Route path="/GestionDesarrolladores" component={GestionDesarrolladores} />
          <Route path="/CrearContrato" exact>
            <CrearContrato />
          </Route>

          <Route exact path="/">
            <Carousel />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
