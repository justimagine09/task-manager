"use client";
import { AppBar, Box, Button, Container, Toolbar, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import StatusSelect from './Components/StatusSelect/StatusSelect';
import TaskList from './Components/TaskList/TaskList';
import { TaskState } from './State/TaskState';
import { Dispatch, useState } from 'react';
import AddTaskDialog from './Components/AddTaskDialog/AddTaskDialog';
import { ITask } from './Interfaces/ITask';
import { EStatus } from './Components/enum/EStatus';

export default function Home() {
  const taskState = TaskState();
  const [open, setOpen] = useState(false);
  const [form, setForm]: [ITask | null, Dispatch<any>] = useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: ITask) => {
    if (value) {
      taskState.edit(value);
    }

    setOpen(false);
    setForm(null);
  };

  const onEditTask = (task: ITask) => {
    setForm(task);
    setOpen(true);
  };

  const onSelectChanged = (data: EStatus) => {
    taskState.filter(data);
  }

  return (
    <main>
      <AppBar position="static">
        <Toolbar>
          <Container>
            <Typography variant="h6" color="inherit" component="div">
              Task Management
            </Typography>
          </Container>
        </Toolbar>
      </AppBar>

      <Container>
        <Box pt={4} gap={2} display="flex">
          <Button variant='contained' onClick={handleClickOpen}>
            <AddIcon />
          </Button>
          <StatusSelect onSelectChanged={onSelectChanged} />
        </Box>

        <Box pt={4}>
          <TaskList state={taskState} onEdit={onEditTask} />
        </Box>
      </Container>
      <AddTaskDialog
        open={open}
        task={form}
        onClose={handleClose}
      />
    </main>
  );
}
