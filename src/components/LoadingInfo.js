import React from 'react';

import loading from '../images/loading.gif';
import '../styles/components.css';

export function LoadingInfo(props) {
  return(
    <div className="loading">
      <img src={loading} className="ceiba-logo" alt="logo" width="80px"/>
      <span>Espere un momento por favor</span>
    </div>
    );
}
