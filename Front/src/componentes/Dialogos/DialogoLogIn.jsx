import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Input} from '@material-ui/icons'
export default function FormDialog(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleLogin = () => {

    setOpen(false);
    props.handleOnLogIn()
  };
  
  return (
    <div>
      <Button className="mb-2" variant="outlined" color="primary" onClick={handleClickOpen}>
        LogIn <Input/>
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Iniciar Sesion</DialogTitle>
        <DialogContent>
          <DialogContentText>
           Introduce tu nombre de usuario y password
          </DialogContentText>
          <TextField
            onChange ={props.changeU}
            autoFocus
            margin="dense"
            id="userName"
            label="Username"
            type="text"
            fullWidth
          />
          <TextField
            onChange ={props.changeP}
            autoFocus
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancelar
          </Button>
          <Button onClick={handleLogin} color="primary">
            Iniciar Sesion
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}