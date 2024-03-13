import * as React from 'react';
import Alert from '@mui/material/Alert';

// Component alert thành phần riêng biệt
export function SuccessAlert({severity , text}) {
    return <Alert severity='success'>{text}</Alert>;
  }
  
  export function InfoAlert() {
    return <Alert severity="info">This is an info Alert.</Alert>;
  }
  
  export function WarningAlert() {
    return <Alert severity="warning">This is a warning Alert.</Alert>;
  }
  
  export function ErrorAlert({text }) {
    return <Alert severity="error">{text}</Alert>;
  }
  