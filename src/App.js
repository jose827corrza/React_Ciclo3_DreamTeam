import Container from "react-bootstrap/Container";

//import imgagen from './resources/avatarDefecto.png'

import Cabecera from './components/Cabecera';
import AjustesUsuario from './components/AjustesUsuario';
import { Carousel } from './components/Carousel';
import { ListaServiciosDeUsuario } from './components/ListaServiciosDeUsuario'
import {

  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import { VistaPerfilUsuario } from './components/VistaPerfilUsuario';
import  CrearContrato  from './components/contratos/pages/CrearContrato';
import ECServicios from './components/ECServicios';






function App() {
  return (
    <div className="App">
      <Router>
        <Cabecera />

        <Container className="p-3 text-center mt-3">
          <h1>DreamTeam - Developer MarketPlace</h1>
        </Container>
        <hr />
        <Switch>
          <Route path="/Servicio/:id" component={VistaPerfilUsuario} />
          <Route path="/ajusteUsuario/:id" component={ECServicios} />
          <Route path="/ajusteUsuario/" component={AjustesUsuario} />
          <Route path="/ListaServiciosDeUsuario" component={ListaServiciosDeUsuario} />
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
