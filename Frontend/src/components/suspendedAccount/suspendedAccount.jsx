import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import logout from '../../utils/logout';
import { useNavigate } from 'react-router-dom';

export default function SuspendedAccount({message}) {
  const [open, setOpen] = React.useState(true);
  const navigate=useNavigate()

  const handleClose = async() => {
    await logout()
    navigate("/")
  };

  return (
    <div>
      <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogTitle>Bienvenido</DialogTitle>
        <DialogContent>
          {message}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Ok</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}