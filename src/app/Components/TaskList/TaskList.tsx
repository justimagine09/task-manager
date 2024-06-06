import * as React from 'react';
import List from '@mui/material/List';
import TaskListItem from './TaskListItem';
import { ITask, ITaskState } from '@src/app/Interfaces/ITask';
import { ListItem } from '@mui/material';

export default function TaskList({state, onEdit}: {state: ITaskState, onEdit: (data: ITask) => void}) {
    let [data, setData]: [data: ITask[], React.Dispatch<any>] = React.useState([]);

    React.useEffect(() => {
        setData(state.data ?? []);
    }, [state]);

    return (
        <List>
            {
                !data?.length ? <ListItem>No Result Found.</ListItem> : null
            }
            {
                data?.map((item: ITask) => {
                    return <TaskListItem 
                        key={item.id} data={item}
                        onUpdate={(item: ITask) => state.edit(item)}
                        onEdit={onEdit}
                        onDelete={(task: ITask) => state.delete(task)} />;
                })
            }
        </List>
    );
}