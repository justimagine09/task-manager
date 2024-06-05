import * as React from 'react';
import List from '@mui/material/List';
import TaskListItem from './TaskListItem';

export default function TaskList() {
    const awtsu = [
        {
            title: 'Short Title',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        },
        {
            title: 'Short Title Two',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        }
    ];
    return (
        <List>
            {
                awtsu.map((item) => {
                    return <TaskListItem data={item} />;
                })
            }
        </List>
    );
}