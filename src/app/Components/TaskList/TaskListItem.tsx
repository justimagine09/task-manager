import { Avatar, Box, IconButton, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import TaskIcon from '@mui/icons-material/Task';
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';

export default function TaskListItem({data}: any) {
    return (
        <ListItem>
            <ListItemAvatar sx={{ styles: "align-self: flex-start" }}>
                <Avatar>
                    <TaskIcon />
                </Avatar>
            </ListItemAvatar>
            <ListItemText primary={data.title} secondary={data.description} />

            <Box display='flex' gap={1}>
                <IconButton edge="end">
                    <CheckIcon />
                </IconButton>

                <IconButton edge="end">
                    <DeleteIcon />
                </IconButton>
            </Box>
        </ListItem>
    )
}