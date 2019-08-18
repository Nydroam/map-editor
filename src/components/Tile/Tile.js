import React from 'react';
import './Tile.css';

//code from https://stackoverflow.com/questions/35969656/
function invertColor(hex) {
    if (hex.indexOf('#') === 0) {
        hex = hex.slice(1);
    }
    // convert 3-digit hex to 6-digits.
    if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    if (hex.length !== 6) {
        throw new Error('Invalid HEX color.');
    }
    let r = parseInt(hex.slice(0, 2), 16),
        g = parseInt(hex.slice(2, 4), 16),
        b = parseInt(hex.slice(4, 6), 16);
    // http://stackoverflow.com/a/3943023/112731
        return (r * 0.299 + g * 0.587 + b * 0.114) > 186
            ? '#000000'
            : '#FFFFFF';
}

function padZero(str, len) {
    len = len || 2;
    var zeros = new Array(len).join('0');
    return (zeros + str).slice(-len);
}

class Tile extends React.Component{
    handleMouseMove = ()=>{
        const {mouseDown,updateColor,row,col,newColor,char} = this.props;
        if(mouseDown){
            console.log(row,col,newColor);
            updateColor(row,col,newColor,char)
        }
    }
    handleMouse = (e)=>{
        const{updateColor,row,col,color,newColor,char,fill,fillGrid} = this.props
        if(e.button===0 && newColor !== color){
            console.log(fill);
            if(!fill)
                updateColor(row,col,newColor,char);
            else
                fillGrid(row,col,newColor,char,color);
        }
    }
    fontSize = ()=>{
        const {rows,cols} = this.props;
        if( (window.innerWidth - 200) / cols < window.innerHeight/rows)
            return 75 / cols + "vw";
        else
            return 75 / rows + "vh";
    }
    render(){
        return(
            <div onMouseOver={this.handleMouseMove} onMouseDown={this.handleMouse}className='tile' style={{backgroundColor:this.props.color}}>
                <div className='center' style={{color:invertColor(this.props.color),fontSize:this.fontSize()}}>{this.props.currChar}</div>
            </div>
        )
    }
}

export default Tile;