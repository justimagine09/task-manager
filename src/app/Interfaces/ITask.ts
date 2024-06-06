export interface ITask {
    id?: number;
    title: string,
    description: string;
}

export interface ITaskState {
    data: ITask[];
    addTask: Function;
}