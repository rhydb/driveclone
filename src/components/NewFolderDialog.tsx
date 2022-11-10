import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function NewFolderDialog({ isOpen, setIsOpen, onCreate }: { isOpen: boolean, setIsOpen: React.Dispatch<React.SetStateAction<boolean>>, onCreate: CallableFunction }) {
  const handleClose = () => setIsOpen(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const createButtonRef = React.useRef<HTMLButtonElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if ((inputRef.current?.value.length ?? 0) > 0) { onCreate(inputRef.current?.value) }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {

    if (e.key === "Enter") {
      createButtonRef.current?.click();
      return;
    }

    const blackList = '/$*"\':;[],|<>\\?!`~'
    if (blackList.includes(e.key)) {
      e.preventDefault();
      e.stopPropagation();
    }
  }

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>Create New Folder</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Folder Name"
          type="email"
          fullWidth
          variant="standard"
          inputRef={inputRef}
          onKeyDown={handleKeyDown}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button ref={createButtonRef} onClick={handleClick}>Create</Button>
      </DialogActions>
    </Dialog>
  );
}
