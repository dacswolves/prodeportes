import React from 'react';
// import librerias para que funcione bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import List from './componente/categorias/listCategorias';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import listProductoComponent from "./componente/productos/listProductos";
import editProductoComponent from "./componente/productos/editProducto";

function App() {

  return (
    <Router>
      <div className="App">
        
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
         
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
              <li class="nav-item active">
                <Link class="nav-link" to="/"> Productos </Link>              
              </li>

              <li class="nav-item active">
              <Link class="nav-link" to="/list-categoria">Categoria</Link>
              </li>
            </ul>
           
          </div>
        </nav>
        
        <h1 class="card text-center font-italic " >Administracion de Productos</h1>
        
        <div class="container py-4">
          <div class="row">

          <Route path="/list-categoria"  component={List} />
          <Route path="/" exact component={listProductoComponent}/>
          <Route path="/edit-producto/:idproducto" component={editProductoComponent}/>

          </div>
        </div>

      </div>
      </Router>
  );
}

export default App;