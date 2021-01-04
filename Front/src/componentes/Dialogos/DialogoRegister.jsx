import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { PersonAdd} from '@material-ui/icons'
export default function FormDialog(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleRegister = () => {

    setOpen(false);
    props.handleOnRegister()
  };
  return (
    <div>
      <Button className="mb-2" variant="outlined" color="primary" onClick={handleClickOpen}>
        Register <PersonAdd/>
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Registrarse</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bienvenido a la familia TikTak!
          </DialogContentText>
          <TextField
            onChange ={props.changeU}
            autoFocus
            margin="dense"
            id="userName"
            label="User Name"
            type="text"
            fullWidth
          />
          <TextField
            onChange ={props.changeN}
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
          />
          <TextField
            onChange ={props.changeE}
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
          />
          <TextField
            onChange ={props.changePw}
            autoFocus
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
          />
          
          <Button variant="contained" component="label">
            Upload Profile Pic
            <input onChange ={props.changePP} id="profilePic" type="file" hidden />
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancelar
          </Button>
          <Button onClick={handleRegister} color="primary">
            Registrarse
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}