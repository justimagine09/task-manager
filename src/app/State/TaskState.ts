import { useState } from "react"

export const TaskState = () => {
    const [task, setTask] = useState([]);

    return {data: task, setData: setTask};
}