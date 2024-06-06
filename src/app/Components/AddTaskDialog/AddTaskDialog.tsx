import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField } from '@mui/material';
import { ITask } from '@src/app/Interfaces/ITask';
import { useEffect, useState } from 'react';
import { EStatus } from '../enum/EStatus';

function defaultFormValue () {
  return {title: '', description: '', status: EStatus.ACTIVE};
}

export default function AddTaskDialog({task, open, onClose}: any) {
  const [form, setForm]: [ITask, React.Dispatch<any>] = useState(defaultFormValue());
  const [errors, setError] =  useState({title: false, description: false});

  useEffect(() => {
    if (task) {
      setForm(task);
    }
  }, [task])
  
  const handleClose = () => {
    open = false;
    setForm(defaultFormValue())
    onClose();
  }

  const onSubmit = () => {
    if (validateForm()) return;
    onClose(form);
    setForm(defaultFormValue());
  };

  const dataChanged = (key: 'title' | 'description', value: string) => {
    form[key] = value;
    setForm({...form});
    validateForm(key);
  }

  const validateForm = (key?: string) => {
    // Validate Title
    if(key && key === 'title' || !key) {
      if (!form.title?.length) {
        errors.title = true;
      } else {
        errors.title = false;
      }
    }

    if(key && key === 'description' || !key) {
      if (!form.description?.length) {
        errors.description = true;
      } else {
        errors.description = false;
      }
    }

    setError({...errors});
    return Object.values(errors).some(error => error);
  }

  return (
    <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>
         Add Task
        </DialogTitle>
        <DialogContent>
          <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="Title"
              label="Title"
              fullWidth
              value={form.title}
              error={errors.title}
              helperText={errors.title ? 'Required' : ''}
              onChange={(value) => dataChanged('title', value.target.value)}
              variant="standard"
            />

          
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="Description"
              label="Description"
              fullWidth
              variant="standard"
              value={form.description}
              error={errors.description}
              helperText={errors.description ? 'Required' : ''}
              onChange={(value) => dataChanged('description', value.target.value)}
              multiline
            />

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>CLose</Button>
          <Button onClick={onSubmit}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
  );
}