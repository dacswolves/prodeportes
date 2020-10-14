import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import axios from 'axios';

class listCategoriaComponent extends React.Component  {

  constructor(props){
    super(props);
    this.state = {
      txtNombre:"",
      listCategorias:[]
    }
  }
  
  componentDidMount(){
    
    const url = "http://localhost:4000/categoria/datatest";

    axios.get(url)
      .then(res => {
        const data = res.data.data;
        this.setState({ listCategorias:data });
      })
      .catch(error => {
        alert(error)
      });

    }
      


  

    render()
  {
    return (
      <div>
        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
  Agregar Categoria
</button>


  <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Agrega una categoria</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
         </button>
      </div>

      <div class="modal-body">
      <div>
            <div class="form-group col-md-12">
            <label for="inputPassword4">Nombre de categoria</label>
            <input type="text" class="form-control" placeholder="Nombre de categoria"
              value={this.state.txtNombre} onChange={(value) => this.setState({ txtNombre: value.target.value })} />
        </div>


        
        </div>
      </div>
      <div class="modal-footer">
      <button type="submit" class="btn btn-success" onClick={() => this.guardar()}>Agregar</button>
        <button type="button" class="btn btn-secondary" data-dismiss="modal" >Cerrar</button>
        
      </div>
    </div>
  </div>
</div>
<br></br>
<br></br>
          
          <table class="table table-hover table-striped table table-sm" >
        <thead class="thead-dark">
          <tr>
            <th scope="col">IDCategoria</th>
            <th scope="col">Nombre</th>
            
          </tr>
        </thead>
        <tbody>
         
         {this.cargarCategoria()}
       
        </tbody>
      </table>
      </div>
      
    );
  }
  cargarCategoria(){
    return this.state.listCategorias.map((data)=>{
      return(

        <tr>
          <th>{data.idcategoria}</th>
          <td>{data.nombre}</td>
          
          
        </tr>


      )
    })
}

guardar(){

  const url = "http://localhost:4000/categoria/crearCategoria";

  //PARAMETROS PARA ENVIAR DATOS
  const datapost = {
      nombre: this.state.txtNombre
  }
  axios.post(url, datapost).then(response => {
      console.log(response);
      if (response.data.success) {
          alert("Agregado Correctamente");
          window.location.reload();
      } else {
          alert("error");
      }
  }).catch(error => {
      alert("error 325")
  })



}

}

export default listCategoriaComponent;