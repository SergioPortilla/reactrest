import React from 'react';

import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import DateFnsUtils from '@date-io/date-fns';
import Button from '@material-ui/core/Button';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';

import IconButton from '@material-ui/core/IconButton';
import PersonAddRoundedIcon from '@material-ui/icons/PersonAddRounded';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import DeleteIcon from '@material-ui/icons/Delete';

import imgAvatar from '../images/imgAvatar.png'
import '../style/components.css';

export class EmployeeInfo extends React.Component {

  
  constructor() {
    super();
    this.state = {
      newEmployee: true,
      nuip: '',
      name: '',
      lastName: '',
      born: new Date(),
      entry: new Date(),
      editable: false
    }
  }

  render() {
    return (
      <div>
        <form>
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
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <div className="algo">
              <KeyboardDatePicker disableToolbar variant="inline" format="dd/MM/yyyy"
                label="Fecha de nacimiento" fullWidth
                value={this.state.born} onChange={(e) => { this.setState({ born: e }) }}
                KeyboardButtonProps={{ 'aria-label': 'change date', }}
              />
            </div>
            <div className="algo">
              <KeyboardDatePicker disableToolbar variant="inline" format="dd/MM/yyyy"
                label="Fecha de ingreso a la compañia" fullWidth
                value={this.state.bentryrn} onChange={(e) => { this.setState({ entry: e }) }}
                KeyboardButtonProps={{ 'aria-label': 'change date', }}
              />
            </div>
            </MuiPickersUtilsProvider>
            <div className="algo">
            {this.state.newEmployee ? (
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
              <Button variant="outlined" size="medium" color="primary" > Crear Empleado </Button>
            )}
            
          </div>
          </div>
          
        </form>
      </div>
    )
  }
}