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

export class ActivityList extends React.Component {
  
  
  constructor(props) {
    super(props);
    this.state = {
      employees: [],
      componentfetch: true,
    }
  }
  componentDidMount() {
    fetch('http://localhost:8081/activities')
      .then(response => response.json())
      .then(jsonData => this.setState({ employees: jsonData, componentfetch: false }))
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
                <TableCell><b>ACTIVIDAD</b></TableCell>
                <TableCell align="right"><b>CEIBACOINS</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.employees.map(employee => (
                <TableRow hover role="checkbox" key={employee.idActivity} tabIndex={-1}>
                  <TableCell component="th"> {employee.name}</TableCell>
                  <TableCell align="right">{employee.price}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div id="footer">Total Actividades: {Object.keys(this.state.employees).length}</div>
      </div>
    )
  }
  }