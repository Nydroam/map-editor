import React from 'react';
import './App.css';
import Grid from './components/Grid/Grid'
import Form from './components/Form/Form'

const defaultGrid = (rows,cols,val) => {
  let g = [];
  for(let i = 0; i < rows; i++){
    let r = [];
    for(let j = 0; j < cols; j++)
      r.push(val);
    g.push(r);
  }
  return g;
}
class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      rows:4,
      cols:4,
      color:'#ffffff',
      char:'0',
      colorGrid:defaultGrid(4,4,'#ffffff'),
      charGrid:defaultGrid(4,4,'0'),
      mouseDown:false,
      fill:false,
    };
  }

  update = (property,value) =>{
    const {rows,cols,charGrid,colorGrid,char,color} = this.state;
    if(value==='')
      return;
    this.setState({[property]:value});
    console.log(property,":",value);
    if(property==='rows')
      this.setState({colorGrid:defaultGrid(value,cols,'#ffffff'), charGrid:defaultGrid(value,cols,'0') })
    if(property==='cols')
      this.setState({colorGrid:defaultGrid(rows,value,'#ffffff'), charGrid:defaultGrid(rows,value,'0') })
    if(property==='char'){
      for(let i = 0; i < charGrid.length; i++){
        for(let j = 0; j < charGrid[i].length; j++){
          if(colorGrid[i][j]===color)
            charGrid[i][j]=value;
        }
      }
    }
  }

  fillGrid = (row,col,value,c,tempColorGrid,tempCharGrid,oldValue) =>{
    let maxRow = tempColorGrid.length;
    let maxCol = tempColorGrid[0].length;
    if(tempColorGrid[row][col]!==oldValue)
      return;
    tempColorGrid[row][col] = value;
    tempCharGrid[row][col] = c;
    if(row-1 >= 0)
      this.fillGrid(row-1,col,value,c,tempColorGrid,tempCharGrid,oldValue);
    if(row+1 < maxRow)
      this.fillGrid(row+1,col,value,c,tempColorGrid,tempCharGrid,oldValue);
    if(col-1 >= 0)
      this.fillGrid(row,col-1,value,c,tempColorGrid,tempCharGrid,oldValue);
    if(col+1 < maxCol)
      this.fillGrid(row,col+1,value,c,tempColorGrid,tempCharGrid,oldValue);
  }

  fillGridFinal = (row,col,value,c,oldValue) =>{
    const{colorGrid,charGrid} = this.state;
    let tempColorGrid = colorGrid;
    let tempCharGrid = charGrid;
    this.fillGrid(row,col,value,c,tempColorGrid,tempCharGrid,oldValue);
    this.setState({colorGrid:tempColorGrid,charGrid:tempCharGrid})
  }

  updateColor = (row,col,value,c) => {
    const {colorGrid,charGrid} = this.state;
    let newGrid = colorGrid;
    newGrid[row][col] = value;
    let newCharGrid = charGrid;
    charGrid[row][col] = c;
    this.setState({colorGrid:newGrid,charGrid:newCharGrid});
  }

  mouseDownHandler = (e) =>{
    console.log("MOUSE DOWN",e.button);
    e.preventDefault();
    const {mouseDown} = this.state;
    
    if(!mouseDown && e.button===0){
      this.setState({mouseDown:true});
    }
  }

  mouseUpHandler = (e) =>{
    const {mouseDown} = this.state;
    if(mouseDown && e.button===0){
      console.log("MOUSE UP");
      this.setState({mouseDown:false});
    }
  }

  charGridString(){
    const{charGrid} = this.state;
    let s = "";
    for(let i = 0; i < charGrid.length; i++){
        let r = "";
        for(let j = 0; j < charGrid[i].length; j++)
            r+= charGrid[i][j] + " ";
        r += "\n";
        s += r;
    }
    return s;
}
  elementArray(){
    const{charGrid} = this.state;
    let l = [];
    for(let i = 0; i < charGrid.length; i++){
      let r = "[";
      let p = [];
        for(let j = 0; j < charGrid[i].length; j++)
            p.push(charGrid[i][j]);

        r += p.join(", ") +"]";
        l.push(<p>{r}</p>);
    }
    return l;
  }
  toggleFill = ()=>{
    const {fill} = this.state;
    this.setState({fill:!fill})
  }
  render(){
    
    console.log(this.charGridString());
    console.log("FILL",this.state.fill);
    const {colorGrid,charGrid,color,mouseDown,char,fill} = this.state;
    let csvContent = "data:text/csv;charset=utf-8," 
    + charGrid.map(e => e.join(",")).join("\n");
    let data=encodeURI(csvContent);
    return (
    <div className="App" style={{display:'flex'}}>
      <div className="left" onMouseDown={this.mouseDownHandler} onMouseUp={this.mouseUpHandler}>
      <Grid fill={fill}mouseDown={mouseDown} colorGrid={colorGrid} fillGrid={this.fillGridFinal} updateColor={this.updateColor} charGrid={charGrid} color={color} char={char}></Grid>
      </div>
      <div className="right">
      <Form update={this.update}></Form>
      <input type="checkbox" name="fill" onClick={this.toggleFill}></input><label>Toggle Fill</label>
      <br></br>
      <br></br>
      <a href={data} download="grid.csv">Download Map (csv)</a>
      </div>
    </div>
  );
  }
}

export default App;
