import React from 'react';
import Tile from '../Tile/Tile';
import './Grid.css';
class Grid extends React.Component{

    renderTiles(){
        const {fill,colorGrid,charGrid,updateColor,mouseDown, color, char, fillGrid} = this.props;
        let list = [];
        for(let i = 0; i < colorGrid.length; i++){
            for(let j = 0; j < colorGrid[i].length; j++){
                list.push(<Tile fill={fill} fillGrid={fillGrid} currChar={charGrid[i][j]}char={char}mouseDown={mouseDown} updateColor={updateColor} color={colorGrid[i][j]} newColor={color} row={i} col={j} rows={colorGrid.length} cols={colorGrid[0].length}></Tile>);
            }
        }
        return list;
    }

    formatCols(){
        const {colorGrid} = this.props;
        let s = ""
        for(let i = 0; i < colorGrid[0].length; i++)
            s+="auto ";
        return s;
    }

    
    render(){
        return(
            <React.Fragment>
            <div className="grid-container" style={{gridTemplateColumns:this.formatCols()}}>
                {this.renderTiles()}
            </div>
            
            </React.Fragment>
        )
    }
}

export default Grid;