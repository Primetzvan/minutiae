import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import NewUserProfile from './NewUserProfile';
import NewUserForm from './NewUserForm';
import { Link } from 'react-router-dom';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';


export default function FormDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };



  return (
    <div>
      <Button variant="contained" color="inherit" onClick={handleClickOpen} data-cy="addNewUserbtn">
        +
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Create new User</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter a unique username please:
          </DialogContentText>
          <TextField 
            autoFocus
            margin="dense"
            id="username"
            label="Username"
            name="username"
            type="username"
            variant="filled"
            fullWidth
            required={true}
            
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="inherit" data-cy="addNewUserCancel">
            Cancel
          </Button>
                 
         <Link to='/userform'><Button><ArrowForwardIosIcon /></Button></Link>
        </DialogActions>
      </Dialog>
    </div>
  );
}