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

  updateColor = (row,col,value,c) => {
    const {colorGrid,charGrid} = this.state;
    let newGrid = colorGrid;
    newGrid[row][col] = value;
    let newCharGrid = charGrid;
    charGrid[row][col] = c;
    this.setState({colorGrid:newGrid,charGrid:newCharGrid});
  }

  mouseDownHandler = (e) =>{
    e.preventDefault();
    const {mouseDown} = this.state;
    console.log("MOUSE DOWN");
    if(!mouseDown){
      this.setState({mouseDown:true});
    }
  }

  mouseUpHandler = () =>{
    const {mouseDown} = this.state;
    if(mouseDown){
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

  render(){
    
    console.log(this.charGridString());
    const {colorGrid,charGrid,color,mouseDown,char} = this.state;
    let csvContent = "data:text/csv;charset=utf-8," 
    + charGrid.map(e => e.join(",")).join("\n");
    let data=encodeURI(csvContent);
    return (
    <div className="App" style={{display:'flex'}}>
      <div className="left" onMouseDown={this.mouseDownHandler} onMouseUp={this.mouseUpHandler}>
      <Grid mouseDown={mouseDown} colorGrid={colorGrid} updateColor={this.updateColor} charGrid={charGrid} color={color} char={char}></Grid>
      </div>
      <div className="right">
      <Form update={this.update}></Form>
      <a href={data} download="grid.csv">Download Grid</a>
      </div>
    </div>
  );
  }
}

export default App;
