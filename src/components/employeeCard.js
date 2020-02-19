import React from 'react';

import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import DateFnsUtils from '@date-io/date-fns';
import Button from '@material-ui/core/Button';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';

import IconButton from '@material-ui/core/IconButton';
import PersonAddRoundedIcon from '@material-ui/icons/PersonAddRounded';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import DeleteIcon from '@material-ui/icons/Delete';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import imgAvatar from '../images/imgAvatar.png';
import '../styles/components.css';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export class EmployeeInfo extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      newEmployee: true,
      employeeData: {
        birthday: new Date(),
        entry: new Date(),
        ceibaCoins: 0,
        state: true
      },
      open: false,
      editable: false
    }
  }

  componentWillReceiveProps(nextProps){
    fetch('http://localhost:8081/ceibacoins/'+nextProps.nuip)
      .then(response => response.json())
      .then(employeeData => this.setState({ employeeData,
        newEmployee: false,
        editable: true
      }));
    
  }

  handleClick = () => {
    this.setState({open : true});
  };

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({open : false});
  };

  createEmployee = e => {
    console.log(e);
    e.preventDefault();
    fetch('http://localhost:8081/ceibacoins/', {
        method: 'POST',
        body: this.state.employeeData,
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => {
        console.log(res);
    }).catch(err => {console.log(err)});
  }

  render() {
    return (
      <div>
        <form onSubmit={this.createEmployee}>
          <Avatar alt="Remy Sharp" src={imgAvatar} style={{ margin: 'auto', width: '20vh', height: '20vh' }} />
          <div id="employee-data">
            <div className="algo" >
              <TextField required disabled={this.state.editable} fullWidth
                label="Numero de identificación" value={this.state.employeeData.nuip}
                onInput={(e) => { this.setState({ employeeData:{nuip : e.target.value.replace(/\D/g, '')}}) }}
              />
            </div>
            <div className="algo">
              <TextField required disabled={this.state.editable} fullWidth
                label="Nombres" value={this.state.employeeData.employeeName}
                onInput={(e) => { this.setState({ employeeData:{employeeName: e.target.value.toUpperCase() }}) }}
              />
            </div>
            <div className="algo">
              <TextField required disabled={this.state.editable} fullWidth
                label="Apellidos" value={this.state.employeeData.employeeLastName}
                onInput={(e) => { this.setState({ employeeData:{employeeLastName: e.target.value.toUpperCase() }}) }}
              />
              
            </div>
            {!this.state.newEmployee && (<div className="algo">
                <Input
                  id="standard-adornment-amount"
                  value={this.state.employeeData.ceibaCoins} fullWidth disabled
                  startAdornment={<InputAdornment position="start">Ceibacoins $</InputAdornment>}
                />
            </div>)}
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <div className="algo">
              <KeyboardDatePicker disableToolbar variant="inline" format="dd/MM/yyyy"
                label="Fecha de nacimiento" fullWidth disabled={this.state.editable}
                value={this.state.employeeData.birthday} onChange={(e) => { this.setState({ employeeData:{birthday: e }}) }}
                KeyboardButtonProps={{ 'aria-label': 'change date', }}
              />
            </div>
            <div className="algo">
              <KeyboardDatePicker disableToolbar variant="inline" format="dd/MM/yyyy"
                label="Fecha de ingreso a la compañia" fullWidth disabled={this.state.editable}
                value={this.state.employeeData.entry} onChange={(e) => { this.setState({employeeData:{ entry: e }}) }}
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
            <Button variant="outlined" onClick={this.handleClick}>
              Open success snackbar
            </Button>
            <Snackbar open={this.state.open} autoHideDuration={6000} onClose={this.handleClose}>
              <Alert onClose={this.handleClose} severity="success">
                This is a success message!
              </Alert>
            </Snackbar>
            
          </div>
          </div>
          
        </form>
      </div>
    )
  }
}