"use client";
import { Dispatch, useEffect, useState } from "react"
import { ITask, ITaskState } from "../Interfaces/ITask";
import { EStatus } from "../Components/enum/EStatus";

const TASK_STATE_KEY: string = 'task-list';
const TRACK_ID: string = 'task-list-id';

function onEdit(task: ITask, tasks: ITask[], setTask: Dispatch<any>) {
    if (!task.id) {
        const id = localStorage.getItem(TRACK_ID) ?? 0;
        task.id = +id + 1;
        tasks.push(task);
        localStorage.setItem(TRACK_ID, task.id.toString());
    } else {
        const index = tasks.findIndex((item) => item.id === task.id);
        tasks[index] = task;
    }

    setTask([...tasks]);
    localStorage.setItem(TASK_STATE_KEY, JSON.stringify(tasks));
}

function onDelete (task: ITask, tasks: ITask[], setTask: Dispatch<any>) {
    setTask(tasks.filter((item) => item.id !== task.id));
    localStorage.setItem(TASK_STATE_KEY, JSON.stringify(tasks));
}

function onFilter (filter: EStatus, setTask: Dispatch<any>) {
    let tasks: ITask[] = localStorage.getItem(TASK_STATE_KEY) as unknown as ITask[];
    tasks = tasks ? JSON.parse(tasks as any) : [];

    if (filter === EStatus.ALL) {
        setTask(tasks);
        return;
    }

    setTask(tasks.filter((item) => item.status === filter));
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

    return {
        data: tasks,
        edit: (task: ITask) => onEdit(task, tasks, setTask),
        delete: (task: ITask) => onDelete(task, tasks, setTask),
        filter: (filter: EStatus) =>  onFilter(filter, setTask)};
}