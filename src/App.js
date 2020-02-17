import React from 'react';
import logoCeiba from './images/logoCeiba.png'
import './App.css';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

function Element(props) { 
  return(
    <div className="element">
      {props.children}
    </div>
  )
}
class TableEmployee extends React.Component {
  render() {
    return(
        <TableContainer component={Paper}>
          <Table className="efwe" aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Nombre empleado</TableCell>
                <TableCell align="right">N° Identificacion</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow key="dsds">
                <TableCell component="th" scope="row">
                  dsfds
                </TableCell>
                <TableCell align="right">121</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
    )
  }
}

class ReactRest extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      usuarios: [],
      componentfetch: true
    }
  }
  componentDidMount() {
    // fetch('https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json')
    //     .then(response => response.json())
    //     .then(jsonData => this.setState({usuarios: jsonData.members, componentfetch: false}))
    fetch('http://localhost:8081/ceibacoins',  {
      credentials: 'same-origin',
      'Access-Control-Allow-Origin': 'http://localhost:8081/ceibacoins',
      Origin:  'http://localhost:8081/ceibacoins',
      headers: {
        Origin:  'http://localhost:8081/ceibacoins',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin' : 'http://localhost:8081/ceibacoins',
      }
    })
        .then(response => console.log(response.json()));
        // .then(jsonData => this.setState({usuarios: jsonData, componentfetch: false}));
  }

  render() {
    if(this.state.componentfetch){
      return 'loading...'
    }

    return (
        this.state.usuarios.map((usuario) => <div>{usuario.employeeName}</div>)
    )


  }
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>CeibaCoins</h1>
        <img src={logoCeiba} className="ceiba-logo" alt="logo" />
      </header>
      <div className="App-content">
        <Element>
          <TableEmployee/>
        </Element>
        <Element>
          <ReactRest/>
        </Element>
      </div>
    </div>
  );
}

export default App;
