import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import axios from 'axios';

class editProductoComponent extends React.Component{

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
        let idproducto = this.props.match.params.idproducto;
        const url = "http://localhost:4000/producto/get-Producto/"+ idproducto;

        axios.get(url).then(response => {


            const data = response.data.data[0];
            console.log(data)

            this.setState({
                producto: data,
                txtNombre: data.nombrePro,
                txtPrecio: data.precioPro,
                txtCantidad: data.cantidadPro,
                txtCategoria:data.idcategoria
            
            })


        }).catch(error => {
            alert("error 325")
        })


        const url2 ="http://localhost:4000/categoria/datatest";

        axios.get(url2).then(response => {


            const data = response.data.data;
          

            this.setState({ listaCategoria: data })

            console.log(this.state.listaCategoria)

        }).catch(error => {
            alert("error 325")
        });


    }


    render(){
        return(

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
            value={this.state.txtPrecio} onChange={(value) => this.setState({ txtPrecio: value.target.value })}   />
        </div>
        <div class="form-group col-md-12">
            <label for="txtCantidadProducto">Cantidad de producto</label>
            <input type="number" class="form-control" placeholder="Cantidad producto" id="txtCantidadProducto"
              value={this.state.txtCantidad} onChange={(value) => this.setState({ txtCantidad: value.target.value })}    />
        </div>
        <div class="form-group col-md-12">
            <label for="txtCategoria">Categoria</label>
           
            <select id="txtCategoria" class="form-control" value={this.state.txtCategoria}  onChange={(value) => this.setState({ txtCategoria: value.target.value })}>
                  <option value="">Selecione opcion...</option>
                    {this.tipoCategoria()}
            </select>
            
        </div>

        <button type="submit" class="btn btn-success" onClick={() => this.actualizar()} >actualizar</button>
        </div>

        )
    }
    actualizar(){
        let idproducto = this.props.match.params.idproducto;
        const url = "http://localhost:4000/producto/actualizar/"+idproducto;
      
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

      tipoCategoria() {
        return this.state.listaCategoria.map((data) => {
            return (<option value={data.idcategoria}>{data.nombre}</option>
      
      
            );
        })
      }
    
}



export default editProductoComponent;