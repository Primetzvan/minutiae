import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import NewUserProfile from './NewUserProfile';
import AddIcon from '@material-ui/icons/Add';
import { useForm, SubmitHandler } from "react-hook-form";
import Download from './Download';


type Inputs = {
    doorName: string,
    IPAddress: string,
  
  };


export default function FormDialog() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = door => console.log(door);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
    
      <Button variant="contained" style={{float:'right', marginRight:'20%', marginBottom:'1%'}} color="inherit" onClick={handleClickOpen} data-cy="addNewDoorbtn">
      <AddIcon />
      </Button>
      <form onSubmit={handleSubmit(onSubmit)}>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add new Door</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter a unique doorname please:
          </DialogContentText>
          <TextField {...register("doorName", { required: true })}
           margin="dense"
           label="Doorname"
           variant="filled"
           fullWidth
        
          />
        {errors.doorName  && <span style={{color:'red'}}>Please enter a unique doorname! <br></br></span>}

        <DialogContentText>
            Enter a valid IP-address please:
          </DialogContentText>
          <TextField {...register("IPAddress", { required: true })}
            margin="dense"
            label="IP-Address"
            variant="filled"
            fullWidth
        
          />
          <br></br>{errors.IPAddress  && <span style={{color:'red'}}>Please enter a valid IP-Address! <br></br></span>}

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="inherit" data-cy="addNewDoorCancel">
            Cancel
          </Button>
                 
          <Button type="submit" variant='contained' onClick={handleClose}><a href="" download>Download</a></Button>
        </DialogActions>
      </Dialog>
      </form>
    </div>
  );
}