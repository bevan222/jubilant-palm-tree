import React, { useEffect } from "react";
import TodoItem from './TodoItem'
import { useAppDispatch, useAppSelector } from "../redux/store";
import { fetchTasks } from "../redux/slices/todoSlice";

interface TodoListProps {
    sortOption: number,
}

const TodoList: React.FC<TodoListProps> = ({ sortOption}) => {

    const dispatch = useAppDispatch()
    const tasks = useAppSelector((state) => state.todos)
    
    useEffect(() => {
        dispatch(fetchTasks({searchMode:tasks.searchData.searchMode, sortMode:tasks.sortData.sortMode, startDate:tasks.searchData.searchStartDate, endDate:tasks.searchData.searchEndDate, searchString:tasks.searchData.searchString}))
    },[])

    return (
        <ul className="my-4 max-w-screen">
            <li className="flex items-center py-2 overflow-auto text-center bg-white border border-black h-36 md:h-16">
                <div className="w-1/5 sm:w-1/6 place-items-center">Complete</div>
                <div className="w-1/5 sm:w-1/6 place-items-center">Task Name</div>
                <div className="hidden w-1/5 sm:w-1/6 sm:block place-items-center">Create time</div>
                <div className="w-1/5 sm:w-1/6 place-items-center">Due Date</div>
                <div className="w-1/5 sm:w-1/6 place-items-center">Creator</div>
                <div className="w-1/5 sm:w-1/6">Detail</div>
            </li>
            {
                tasks.taskList?.map(( task )=>(
                    <TodoItem task={task} key={task.id} />
                ))
            }
        </ul>
    )
}

export default TodoList