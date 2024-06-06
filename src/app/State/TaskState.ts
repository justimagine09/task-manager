"use client";
import { Dispatch, useEffect, useState } from "react"
import { ITask, ITaskState } from "../Interfaces/ITask";

const TASK_STATE_KEY: string = 'task-list';
const TRACK_ID: string = 'task-list-id';

function add(task: ITask, tasks: ITask[], setTask: Dispatch<any>) {
    const id = localStorage.getItem(TRACK_ID) ?? 0;
    task.id = +id + 1;
    tasks.push(task);
    localStorage.setItem(TRACK_ID, task.id.toString());
    setTask(tasks);
}

export function TaskState (): ITaskState {
    let state: any = null;
    if (typeof window !== "undefined") {
        const data = localStorage.getItem(TASK_STATE_KEY);
        state = useState(data ? JSON.parse(data) : []);
    } else {
        state = useState([]);
    }

    const [tasks, setTask] = state;
    
    useEffect(() => {
        if(tasks) {
            localStorage.setItem(TASK_STATE_KEY, JSON.stringify(tasks));
        }
    },[tasks])
    return {data: tasks, addTask: (task: ITask) => add(task, tasks, setTask)};
}