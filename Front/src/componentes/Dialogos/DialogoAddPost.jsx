import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { AddAPhoto } from '@material-ui/icons'
export default function FormDialog(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleAddPost = () => {

    setOpen(false);
    props.handleOnAddPublicacion()
  };
  return (
    <div>
      <Button className="btn border-dark rounded-circle ml-5" variant="outlined" color="primary" onClick={handleClickOpen}>
        <AddAPhoto/>               
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add Post</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Cuentaselo al mundo con un TikTak!
          </DialogContentText>
          <TextField
            onChange ={props.changeTitle}
            autoFocus
            margin="dense"
            id="userName"
            label="Title"
            type="text"
            fullWidth
            
          />
          <TextField
            onChange ={props.changeDescription}
            autoFocus
            margin="dense"
            id="name"
            label="Description"
            type="text"
            fullWidth
            
          />
         <Button variant="contained" component="label">
            Upload your Vid
            <input onChange ={props.changeContent} id="profilePic" type="file" hidden  />
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancelar
          </Button>
          <Button onClick={handleAddPost} color="primary">
            Publicar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}