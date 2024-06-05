import { AppBar, Box, Button, Container, Toolbar, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import StatusSelect from './Components/StatusSelect/StatusSelect';
import TaskList from './Components/TaskList/TaskList';


export default function Home() {
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
          <Button variant='contained'>
            <AddIcon />
          </Button>
          <StatusSelect />
        </Box>

        <Box pt={4}>
          <TaskList />
        </Box>
      </Container>
    </main>
  );
}
