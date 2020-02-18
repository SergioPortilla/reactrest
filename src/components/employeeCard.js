import React from 'react';

import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import DateFnsUtils from '@date-io/date-fns';
import Button from '@material-ui/core/Button';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';

import IconButton from '@material-ui/core/IconButton';
import PersonAddRoundedIcon from '@material-ui/icons/PersonAddRounded';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import DeleteIcon from '@material-ui/icons/Delete';

import imgAvatar from '../images/imgAvatar.png';
import '../styles/components.css';

export class EmployeeInfo extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      newEmployee: true,
      nuip: '',
      name: '',
      lastName: '',
      born: new Date(),
      entry: new Date(),
      ceibacoins: 0,
      editable: false
    }
  }
  componentWillReceiveProps(nextProps){
    fetch('http://localhost:8081/ceibacoins/'+this.props.nuip)
      .then(response => response.json())
      .then(jsonData => this.setState({ 
        newEmployee: false,
        nuip: jsonData.nuip,
        name: jsonData.employeeName,
        lastName: jsonData.employeeLastName,
        born: new Date(jsonData.birthday),
        entry: new Date(jsonData.entry),
        ceibacoins: jsonData.ceibaCoins,
        editable: true
      }));
    
  }

  createEmployee = e =>{
    console.log(e);
    e.preventDefault();
    return fetch('http://localhost:8081/ceibacoins/', {
        method: 'POST',
        mode: 'CORS',
        body: JSON.stringify(e),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => {
        return res;
    }).catch(err => err);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.createEmployee}>
          <Avatar alt="Remy Sharp" src={imgAvatar} style={{ margin: 'auto', width: '20vh', height: '20vh' }} />
          <div id="employee-data">
            <div className="algo" >
              <TextField required disabled={this.state.editable} fullWidth
                label="Numero de identificación" value={this.state.nuip}
                onInput={(e) => { this.setState({ nuip: e.target.value.replace(/\D/g, '') }) }}
              />
            </div>
            <div className="algo">
              <TextField required disabled={this.state.editable} fullWidth
                label="Nombres" value={this.state.name}
                onInput={(e) => { this.setState({ name: e.target.value.toUpperCase() }) }}
              />
            </div>
            <div className="algo">
              <TextField required disabled={this.state.editable} fullWidth
                label="Apellidos" value={this.state.lastName}
                onInput={(e) => { this.setState({ lastName: e.target.value.toUpperCase() }) }}
              />
              
            </div>
            {!this.state.newEmployee ? (<div className="algo">
                <Input
                  id="standard-adornment-amount"
                  value={this.state.ceibacoins} fullWidth disabled
                  startAdornment={<InputAdornment position="start">Ceibacoins $</InputAdornment>}
                />
            </div>): (<p></p>)}
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <div className="algo">
              <KeyboardDatePicker disableToolbar variant="inline" format="dd/MM/yyyy"
                label="Fecha de nacimiento" fullWidth disabled={this.state.editable}
                value={this.state.born} onChange={(e) => { this.setState({ born: e }) }}
                KeyboardButtonProps={{ 'aria-label': 'change date', }}
              />
            </div>
            <div className="algo">
              <KeyboardDatePicker disableToolbar variant="inline" format="dd/MM/yyyy"
                label="Fecha de ingreso a la compañia" fullWidth disabled={this.state.editable}
                value={this.state.entry} onChange={(e) => { this.setState({ entry: e }) }}
                KeyboardButtonProps={{ 'aria-label': 'change date', }}
              />
            </div>
            </MuiPickersUtilsProvider>
            <div className="algo">
            {!this.state.newEmployee ? (
              <div style={{float: 'right'}} >
                <IconButton aria-label="delete" color="primary">
                  <DeleteIcon />
                </IconButton>
                <IconButton aria-label="PersonAddRoundedIcon" color="primary">
                  <PersonAddRoundedIcon />
                </IconButton>
                <IconButton aria-label="EditRoundedIcon" color="primary" on>
                  <EditRoundedIcon />
                </IconButton>
              </div>
            ) : (
              <Button type="submit" variant="outlined" size="medium" color="primary" > Crear Empleado </Button>
            )}
            
          </div>
          </div>
          
        </form>
      </div>
    )
  }
}