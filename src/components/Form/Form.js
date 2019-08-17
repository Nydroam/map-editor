import React from 'react';
import './Form.css';
class Form extends React.Component{
    handleChange = (e)=>{
        const {update} = this.props;
        if(!isNaN(e.target.value) && parseInt(e.target.value,10)>0 && parseInt(e.target.value,10)<=50)
            update(e.target.id,e.target.value);
        console.log(e.target.value);
    }
    handleOtherChange = (e)=>{
        const{update} = this.props;
        update(e.target.id,e.target.value);
    }
    render(){
        return(
        <React.Fragment>
            <h1>Map Editor</h1>
            <p className='desc'>Type in the number of rows and columns of the grid you want. (1-50)</p>
            <div className='flex'>
            <label>Rows:</label> <input defaultValue='4' type="text" id="rows" onChange={this.handleChange}></input>
            <label>Cols:</label> <input defaultValue='4' type="text" id="cols" onChange={this.handleChange}></input>
            </div>
            <p className='desc'>Choose the color and character you want associated with the tile that color represents</p>
            <div className='flex'>
            <label>Color:</label> <input type="color"defaultValue='#ffffff' id="color" onChange={this.handleOtherChange}></input>
            <label>Label:</label> <input type="text" defaultValue='0' id="char" onChange={this.handleOtherChange}></input>
            </div>
        </React.Fragment>
        )
    }
}
export default Form;