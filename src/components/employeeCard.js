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
import DoneIcon from '@material-ui/icons/Done';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import DeleteIcon from '@material-ui/icons/Delete';
import { red, green, yellow } from '@material-ui/core/colors';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

import imgAvatar from '../images/imgAvatar.png';
import { MessageInfo } from './messageInfo';
import { updateCoinsEmployee, editEmployee , createEmployee, findEmployee} from '../actions/actionOfEmployee';
import '../styles/components.css';

export class EmployeeInfo extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      newEmployee: true,
      employeeData: {
        nuip: '',
        employeeName: '',
        employeeLastName: '',
        birthday: new Date(),
        entry: new Date(),
        ceibaCoins: 0,
        state: true,
      },
      open: false,
      editable: false,
      verification: false,
      mensaje: '',
      show: false
    }
  }
  
  addNewEmployee = () => {
    this.setState({
      employeeData: {
        nuip: '',
        employeeName: '',
        employeeLastName: '',
        birthday: new Date(),
        entry: new Date(),
        ceibaCoins: 0,
        state: true,
      },
      newEmployee: true,
      editable: false,
    })
  };

  componentDidMount() {
    setTimeout(() => {
      updateCoinsEmployee().then(response => {alert(response);this.setState({mensaje: response,show: true})});
    }, 1000000)
  }

  componentWillReceiveProps(nextProps){
    findEmployee(nextProps.nuip).then(employeeData => this.setState({ employeeData,
      newEmployee: false,
      editable: true
    })).catch(error => {this.setState({mensaje: 'No se puede consultar empleados los fines de semana', show: true})});
  }

  validateChange(value, field){
    this.setState(prevState => { 
      let employeeData = prevState.employeeData;
      employeeData[field] = value;
      return { employeeData };
    })
  }

  createEmployee = e => {
    e.preventDefault();
    createEmployee(this.state.employeeData).then(res => { alert(res); });
    
  }

  deleteEmployee = e => {
    editEmployee(this.state.employeeData, true).then(res => alert("usuario eliminado exitosamente"));
    this.setState({verification: false});
  }

  editDataEmployee = e => {
    editEmployee(this.state.employeeData, false).then(res => alert(res));
  }

  render() {
    return (
      <div>
        <form onSubmit={this.createEmployee} >
          <Avatar alt="Remy Sharp" src={imgAvatar} style={{ margin: 'auto', width: '20vh', height: '20vh' }} />
          <div id="employee-data">
            <div className="space-column" >
              <TextField required disabled={!this.state.newEmployee} fullWidth id="nuip"
                label="Numero de identificación" value={this.state.employeeData.nuip}
                onInput={(e) => { this.validateChange(e.target.value.replace(/\D/g, ''), 'nuip') }}
              />
            </div>
            <div className="space-column">
              <TextField required disabled={this.state.editable} fullWidth id="name"
                label="Nombres" value={this.state.employeeData.employeeName} 
                onInput={(e) => { this.validateChange(e.target.value.toUpperCase(), 'employeeName') }}
              />
            </div>
            <div className="space-column">
              <TextField required disabled={this.state.editable} fullWidth id="lastName"
                label="Apellidos" value={this.state.employeeData.employeeLastName}
                onInput={(e) => { this.validateChange(e.target.value.toUpperCase(), 'employeeLastName') }}
              />
              
            </div>
            {!this.state.newEmployee && (<div className="space-column">
                <Input value={this.state.employeeData.ceibaCoins} fullWidth disabled id="ceibaCoins"
                       startAdornment={<InputAdornment position="start">Ceibacoins $</InputAdornment>}
                />
            </div>)}
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <div className="space-column">
              <KeyboardDatePicker disableToolbar variant="inline" format="dd/MM/yyyy" id="bornDate"
                label="Fecha de nacimiento" fullWidth disabled={this.state.editable}
                value={this.state.employeeData.birthday} onChange={(e) => { this.validateChange(e, 'birthday') }}
                KeyboardButtonProps={{ 'aria-label': 'change date', }}
              />
            </div>
            <div className="space-column">
              <KeyboardDatePicker disableToolbar variant="inline" format="dd/MM/yyyy" id="entryDate"
                label="Fecha de ingreso a la compañia" fullWidth disabled={this.state.editable}
                value={this.state.employeeData.entry} onChange={(e) => { this.validateChange(e, 'entry') }}
                KeyboardButtonProps={{ 'aria-label': 'change date', }}
              />
            </div>
            </MuiPickersUtilsProvider>
            <div className="space-column">
            {!this.state.newEmployee ? (
              <div style={{float: 'right'}} >
                <IconButton aria-label="delete" onClick={e => this.setState({verification: true})}>
                  <DeleteIcon style={{ color: red[500] }}/>
                </IconButton>
                <IconButton aria-label="PersonAddRoundedIcon" color="primary" onClick={this.addNewEmployee}>
                  <PersonAddRoundedIcon />
                </IconButton>
                {this.state.editable ? 
                  <IconButton aria-label="EditRoundedIcon" onClick={e => {this.setState({editable: false})}}>
                    <EditRoundedIcon style={{ color: yellow[500] }}/>
                  </IconButton>
                : 
                  <IconButton aria-label="EditRoundedIcon" onClick={this.editDataEmployee}>
                    <DoneIcon style={{ color: green[500] }}/>
                  </IconButton>
                }
              </div>
            ) : (
              <Button type="submit" variant="outlined" size="medium" color="primary" id="createEmploye"> Crear Empleado </Button>
            )}
          </div>
        </div>

      <Dialog
        open={this.state.verification}
        onClose={e => this.setState({verification: false})}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">¿Esta seguro que desea eliminar el usuario?</DialogTitle>
        <DialogActions>
          <Button onClick={this.deleteEmployee} color="primary" autoFocus>
            Si
          </Button>
          <Button onClick={e => this.setState({verification: false})} color="primary">
            No
          </Button>
        </DialogActions>
      </Dialog>
        </form>
        <MessageInfo open={this.state.show} message={this.state.mensaje} severity="warning" />
      </div>
    )
  }
}