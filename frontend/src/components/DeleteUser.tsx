import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import RemoveIcon from '@material-ui/icons/Remove';
import { Link } from 'react-router-dom';


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
      <Button onClick={handleClickOpen}><RemoveIcon style={{color: 'red'}}/></Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Delete User</DialogTitle>
        <DialogContent>
          <DeleteForeverIcon style={{float:'left', display:'inline-block', fontSize:'400%'}}/>
          <DialogContentText style={{float:'left', display:'inline-block'}}>
            Do you really want to delete the user?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="inherit" data-cy="deleteUserCancel">
            No
          </Button>
          <Button data-cy="deleteUserbtn" onClick={handleClose}>
              <Link to='/users'>Yes</Link>
        </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}