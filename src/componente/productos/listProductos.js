import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import axios from 'axios';
import { Link } from 'react-router-dom';

class listProductoComponent extends React.Component{
    constructor(props){
        super(props);
        this.state = {
          txtNombre:"",
          txtPrecio:0,
          txtCantidad:0,
          txtCategoria:0,
          listProducto:[],
          listaCategoria:[]
          
        }
      }

      componentDidMount(){

        const url ="http://localhost:4000/categoria/datatest";

        axios.get(url).then(response => {


            const data = response.data.data;
            console.log(response)

            this.setState({ listaCategoria: data })

            console.log(this.state.listaCategoria)

        }).catch(error => {
            alert("error 325")
        });

      this.cargarLista();
     
      }

    render()
  {
    return (
      <div>
        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
  Agregar Producto
</button>
<br></br>
<br></br>

  <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Agrega un producto</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
         </button>
      </div>

      <div class="modal-body">
      <div>
            <div class="form-group col-md-12">
            <label for="txtNombre">Nombre producto</label>
            <input type="text" id="txtNombre" class="form-control" placeholder="Nombre de producto"
            value={this.state.txtNombre} onChange={(value) => this.setState({ txtNombre: value.target.value })}   />
        </div>

        <div class="form-group col-md-12">
            <label for="txtPrecio">Precio producto</label>
            <input type="number"  class="form-control" placeholder="Precio producto"
            id="txtPrecio"
            value={this.state.txtPrecio} onChange={(value) => this.setState({ txtPrecio: value.target.value })}    />
        </div>
        <div class="form-group col-md-12">
            <label for="txtCantidadProducto">Cantidad de producto</label>
            <input type="number" class="form-control" placeholder="Cantidad producto" id="txtCantidadProducto"
             value={this.state.txtCantidad} onChange={(value) => this.setState({ txtCantidad: value.target.value })}   />
        </div>
        <div class="form-group col-md-12">
            <label for="txtCategoria">Categoria</label>
            
                <select id="txtCategoria" class="form-control" onChange={(value) => this.setState({ txtCategoria: value.target.value })}>
                  <option value="">Selecione opcion...</option>
                    {this.tipoCategoria()}
                </select>

        </div>


        
        </div>
      </div>
      <div class="modal-footer">
      <button type="submit" class="btn btn-success" onClick={() => this.guardar()}>Agregar</button>
      <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
        
      </div>
    </div>
  </div>
</div>



<table  class="table table-hover table-striped table table-sm" >
        <thead class="thead-dark">
          <tr>
            <th scope="col">IDProducto</th>
            <th scope="col">Nombre</th>
            <th scope="col">Precio</th>
            <th scope="col">Cantidad</th>
            <th  colspan="2">Acciones</th>
            
          </tr>
        </thead>
        <tbody>
         
          {this.cargarProducto()}
        </tbody>
      </table>

      </div>
      
    );
  }

  cargarProducto(){
    return this.state.listProducto.map((data)=>{
      return(

        <tr>
          <th>{data.idproducto}</th>
          <td>{data.nombrePro}</td>
          <td>{data.precioPro}</td>
          <td>{data.cantidadPro}</td>
          
          <td>
            <Link class="btn btn-outline-info "to={"/edit-producto/"+data.idproducto}> Editar </Link>
          </td>
          <td>
            <button class="btn btn-outline-danger " type="submit" onClick={() => this.eliminar(data.idproducto)}> Eliminar </button>
          </td>
        </tr>


      )
    })
}



  guardar(){

    const url = "http://localhost:4000/producto/crearProducto";
  
    //PARAMETROS PARA ENVIAR DATOS
    const datapost = {
        nombrePro:this.state.txtNombre, 
        precioPro:this.state.txtPrecio,
        cantidadPro:this.state.txtCantidad,
        idcategoria:this.state.txtCategoria
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
eliminar(id){

    const url ="http://localhost:4000/producto/eliminar";
  //PARAMETROS PARA eliminar DATOS
  

  const datapost = {idproducto: id}

axios.post(url, {
    id : id
})
    .then(response => {

        alert("eliminado");
        console.log(response);
        this.cargarLista();
        
    })
    .catch(error => {
        alert("Error 325 ")
    })
}
tipoCategoria() {
  return this.state.listaCategoria.map((data) => {
      return (<option value={data.idcategoria}>{data.nombre}</option>


      );
  })
}

cargarLista(){

  const url = "http://localhost:4000/producto/listar-producto";

  axios.get(url)
    .then(res => {
      const data = res.data.data;
      this.setState({ listProducto:data });
    
    })
    .catch(error => {
      alert(error)
    });

}

}




export default listProductoComponent;