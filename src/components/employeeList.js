import React from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { LoadingInfo } from './loadingInfo';
import { findAllEmployees } from '../actions/actionOfEmployee';
import '../styles/components.css';

export class EmployeeList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      employees: [],
      componentfetch: true,
    }
  }
  
  componentDidMount() {
    findAllEmployees().then(jsonData => this.setState({ employees: jsonData, componentfetch: false }));
  }
  
  render() {
    if (this.state.componentfetch) {
      return <LoadingInfo/>
    }

    return (
      <div>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell><b>NOMBRE EMPLEADO</b></TableCell>
                <TableCell align="right"><b>N° IDENTIDAD</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.employees.map(employee => (
                <TableRow hover role="checkbox" key={employee.nuip} tabIndex={-1} 
                          id={"employee"+this.state.employees.findIndex(e => e.nuip === employee.nuip)}
                          onClick={(e) => this.props.obtenerNuip(employee.nuip)} >
                  <TableCell component="th" scope="row">
                    {employee.employeeName} {employee.employeeLastName}
                  </TableCell>
                  <TableCell align="right">{employee.nuip}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div id="footer">Total empleados: {Object.keys(this.state.employees).length}</div>
      </div>
    )
  }
}