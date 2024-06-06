import { Avatar, Box, IconButton, ListItem, ListItemAvatar, ListItemIcon, ListItemText, Menu, MenuItem, Tooltip } from "@mui/material";
import TaskIcon from '@mui/icons-material/Task';
import { ITask } from "../../Interfaces/ITask";
import { useState } from "react";
import { Check, Delete, Edit, MoreVert } from "@mui/icons-material";
import { EStatus } from "../enum/EStatus";
import TaskListStyles from './TaskList.module.scss';

interface IProps {
    data: ITask;
    onUpdate: (data: ITask) => void;
    onEdit: (data: ITask) => void;
    onDelete: (data: ITask) => void;
}

export default function TaskListItem({ data, onUpdate, onEdit, onDelete}: IProps) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const onCompleteClicked = () => {
        data.status = data.status === EStatus.COMPLETED ? EStatus.ACTIVE : EStatus.COMPLETED;
        onUpdate(data);
        handleClose();
    }

    const onEditClicked = () => {
        onEdit(data);
        handleClose();
    }

    const onDeleteClicked = () => {
        onDelete(data);
        handleClose();
    }

    return (
        <ListItem>
            <ListItemAvatar sx={{ styles: "align-self: flex-start" }}>
                <Tooltip title={data.status === EStatus.COMPLETED ? 'Completed' : 'Active'}>
                    <Avatar 
                        className={data.status === EStatus.COMPLETED ? TaskListStyles.complete : ''}>
                        <TaskIcon />
                    </Avatar>
                </Tooltip>
            </ListItemAvatar>
            <ListItemText primary={data.title} secondary={data.description} />

            <Box display='flex' gap={1}>
                <IconButton edge="end"
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}>
                    <MoreVert />
                </IconButton>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    <MenuItem data-testid='task-item-edit' onClick={onEditClicked}>
                        <ListItemIcon>
                            <Edit/>
                        </ListItemIcon>
                        <ListItemText>Edit</ListItemText>
                    </MenuItem>

                    <MenuItem data-testid='task-item-complete' onClick={onCompleteClicked}>
                        <ListItemIcon>
                            <Check fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>{data.status === EStatus.COMPLETED ? 'Re-open' : 'Complete'}</ListItemText>
                    </MenuItem>
                    <MenuItem data-testid='task-item-delete' onClick={onDeleteClicked}>
                        <ListItemIcon>
                            <Delete fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Delete</ListItemText>
                    </MenuItem>
                </Menu>
            </Box>
        </ListItem >
    )
}