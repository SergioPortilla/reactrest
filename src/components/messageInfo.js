import React from 'react';

import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import '../styles/components.css';

import { updateCoinsEmployee } from '../actions/actionOfEmployee';

export class MessageInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: this.props.open,
      message: this.props.message,
      severity: this.props.severity
    }
  }

  componentDidMount() {
    updateCoinsEmployee().then(response => {this.componentWillReceiveProps(response,true,"success")});
  }

  componentWillReceiveProps(message, show, severity){
    this.setState({message: message, open:show, severity: severity});
  }

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({open : false});
  };

  render(){
    return(
      <Snackbar open={this.state.open} autoHideDuration={6000} onClose={this.handleClose}>
        <Alert onClose={this.handleClose} severity={this.state.severity} >
          {this.state.message}
        </Alert>
      </Snackbar>
      );
  }
  
}

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}