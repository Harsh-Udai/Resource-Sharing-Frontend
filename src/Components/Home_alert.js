import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Link} from 'react-router-dom';




export default function ResponsiveDialog() {
  const [open, setOpen] = React.useState(false);
  
  

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const wrapper = React.createRef();

  return (
    <div ref={wrapper}>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Get Started
      </Button>
      <Dialog
        ref={wrapper}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{"Do you already have account?"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            If not then click on Signup and create your account, otherwise click on Signin.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        <Link to='/Signup' style={{textDecoration:'none'}} ><Button onClick={handleClose} color="primary">
            Signup 
            
          </Button></Link>
          <Link to='/Login' style={{textDecoration:'none'}} ><Button onClick={handleClose} color="primary">
            Login
          </Button></Link>
        </DialogActions>
      </Dialog>
    </div>
  );
}
