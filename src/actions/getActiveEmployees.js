import React from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { LoadingInfo } from './loadingInfo';
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
    fetch('http://localhost:8081/ceibacoins')
      .then(response => response.json())
      .then(jsonData => this.setState({ employees: jsonData, componentfetch: false }))
  }

  handleClick(idUser) {
    alert('this is:' + idUser, this);
  }

  render() {
    if (this.state.componentfetch) {
      return <LoadingInfo/>
    }

    return (
      <div>
        <TableContainer component={Paper}>
          <Table className="efwe" aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Nombre empleado</TableCell>
                <TableCell align="right">N° Identificacion</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.employees.map(employee => (
                <TableRow hover role="checkbox" key={employee.nuip} tabIndex={-1} onClick={(e) => this.handleClick(employee.nuip, e)} >
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