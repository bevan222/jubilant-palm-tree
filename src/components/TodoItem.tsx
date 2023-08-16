import React, { useState } from "react";
import { Task } from "../type";
import TaskDetailModal from "./TaskDetailModal";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { fetchTasks, modTaskComplete } from "../redux/slices/todoSlice";

interface TodoItemProps {
    task: Task
}

const TodoItem: React.FC<TodoItemProps> = ({task}) => {
    const [showDetail, setShowDetail] = useState(false)
    const [complete, setComplete] = useState(task.complete)
    const dispatch = useAppDispatch()
    const tasks = useAppSelector((state) => state.todos)

    const handleTaskCompleteClick = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        dispatch(modTaskComplete({taskId:task.id, complete: !task.complete}))
        .then(()=>{
            alert('Task mod success')
            dispatch(fetchTasks({searchMode:tasks.searchData.searchMode, sortMode:tasks.sortData.sortMode, startDate:tasks.searchData.searchStartDate, endDate:tasks.searchData.searchEndDate, searchString:tasks.searchData.searchString}))
        })
    }

    return (
        <React.Fragment>
            <li key={task.id} className={"flex items-center py-2 overflow-auto text-center border border-black h-36 md:h-26 " + (complete ? 'bg-blue-200':'')}>
                <div className="w-1/5 sm:w-1/6 place-items-center">
                    <input type="checkbox" className="" checked={complete} onChange={handleTaskCompleteClick}></input>
                </div>
                <div className="w-1/5 sm:w-1/6 place-items-center">{task.taskName}</div>
                <div className="hidden w-1/5 sm:block sm:w-1/6 place-items-center">{task.createTime === null ? '' : new Date(task.createTime).toISOString().slice(0, 16).replace('T',' ')}</div>
                <div className="w-1/5 sm:w-1/6 place-items-center">{task.dueDate === null ? '' : new Date(task.dueDate).toISOString().slice(0, 16).replace('T',' ')}</div>
                <div className="w-1/5 sm:w-1/6 place-items-center">{task.creator}</div>
                <div className="w-1/5 mx-1 sm:w-1/6 place-items-center">
                    <button onClick={()=> setShowDetail(!showDetail)} className="w-9/12 md:w-1/2 inline-block bg-yellow-400 py-2 text-xs rounded-xl font-medium uppercase leading-normal text-black shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:z-[3] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]">detail</button>
                </div>
            </li>
            {showDetail && <TaskDetailModal show={showDetail} setShowModal={setShowDetail} task={task} />}
        </React.Fragment>
    )
}

export default TodoItem