import { EStatus } from "../enum/EStatus";

export interface ITask {
    id?: number;
    title: string,
    description: string;
    status: EStatus;
}

export interface ITaskState {
    data: ITask[];
    edit: (task: ITask) => void;
    delete: (task: ITask) => void;
    filter: (filter: EStatus) => void;
}