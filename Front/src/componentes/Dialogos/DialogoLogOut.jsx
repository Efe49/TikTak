import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ExitToApp } from '@material-ui/icons'
export default function AlertDialog(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleExit = (e) => {
    setOpen(false);
    props.handleOnLogOut(e)
  };

  return (
    <div>
      <Button variant="outlined" color="secondary" onClick={handleClickOpen}>
        LogOut <ExitToApp/>
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Cerrar Sesion"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          Esta seguro de que desea cerrar sesion?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            No, seguir dentro
          </Button>
          <Button onClick={handleExit} color="secondary" autoFocus>
            Si, cerrar sesion
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}