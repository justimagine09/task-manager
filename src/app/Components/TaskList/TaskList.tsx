import * as React from 'react';
import List from '@mui/material/List';
import TaskListItem from './TaskListItem';
import { ITask, ITaskState } from '@src/app/Interfaces/ITask';

export default function TaskList({state}: {state: ITaskState}) {
    let [data, setData]: [data: ITask[], React.Dispatch<any>] = React.useState([]);

    React.useEffect(() => {
        setData(state.data ?? []);
    }, [state]);
    
    return (
        <List>
            {
                data.map((item) => {
                    return <TaskListItem key={item.id} data={item} />;
                })
            }
        </List>
    );
}