import Container from "react-bootstrap/Container";

//import imgagen from './resources/avatarDefecto.png'

import Cabecera from "./components/Cabecera";
import AjustesUsuario from "./components/AjustesUsuario";
import { Carousel } from "./components/Carousel";
import { GestionDesarrolladores } from "./components/GestionDesarrolladores";
import { ListaServiciosDeUsuario } from "./components/ListaServiciosDeUsuario";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { VistaPerfilUsuario } from "./components/VistaPerfilUsuario";

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
          <Route path="/perfilUsuario/:id" component={VistaPerfilUsuario} />
          <Route path="/ajusteUsuario/" component={AjustesUsuario} />
          <Route
            path="/ListaServiciosDeUsuario"
            component={ListaServiciosDeUsuario}
          />
          <Route
            path="/GestionDesarrolladores"
            component={GestionDesarrolladores}
          />

          <Route exact path="/">
            <Carousel />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
