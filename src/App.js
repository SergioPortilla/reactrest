import React from 'react';
import logoCeiba from './images/logoCeiba.png';
import './App.css';

import { EmployeeInfo } from './components/employeeCard';
import { EmployeeList } from './components/employeeList';
import { ActivityList } from './components/activityList';
import { MessageInfo } from './components/messageInfo';

function Element(props) {
  return (
    <div className="element">
      <div>{props.name}</div>
      {props.children}
    </div>
  )
}

class App extends React.Component {
  state = {
    nuip: '',
  };

  VerInformacionUsuario = datos => {
    this.setState({nuip: datos});
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>CeibaCoins</h1>
          <img src={logoCeiba} className="ceiba-logo" alt="logo" />
        </header>
        <div className="App-content">
          <Element name="Empleados">
            <EmployeeList obtenerNuip={this.VerInformacionUsuario}/>
          </Element>
          <Element>
            <EmployeeInfo nuip={this.state.nuip}/>
          </Element>
          <div className="container">
            <Element name="Actividades">
            <ActivityList/>
            </Element>
            <Element name="Autor">
              <small>
                Sergio Geovany Portilla Casteñeda <br/>
                ADN Ceiba <br/>
              </small>
            </Element>
            <Element>
              <img src={logoCeiba} className="ceiba-logo" alt="logo" width="200"/>
            </Element>
           
          </div>
          
        </div>
      </div>
    );
  }
}
// <MessageInfo message="holii" open={true} severity="success" />
export default App;
