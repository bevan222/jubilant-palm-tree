import React, { useEffect, useState } from "react";
import { Task } from "../type";
import CommentList from "./CommentList";
import { deleteTask, fetchTasks, modTask, modTaskComplete } from "../redux/slices/todoSlice";
import { fetchComments } from "../redux/slices/commentSlice";
import { useAppDispatch, useAppSelector } from "../redux/store";

interface TaskDetailProps {
    show: boolean;
    setShowModal: (show: boolean) => void;
    task: Task,
}

const TaskDetailModal: React.FC<TaskDetailProps> = ({ show, setShowModal, task }) => {
    const [modTaskData, setModTaskData] = useState<Pick<Task, 'id'|'taskName'|'dueDate'|'description'|'complete'>>({
        id: task.id,
        taskName: task.taskName,
        dueDate: task.dueDate,
        description: task.description,
        complete: task.complete
    });

    const dispatch = useAppDispatch()
    const tasks = useAppSelector((state) => state.todos)
    const comments = useAppSelector((state) => state.comment)

    useEffect(() => {
        dispatch(fetchComments({taskId: task.id}))
    },[])

    const handleTaskCompleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        dispatch(modTaskComplete({taskId:task.id, complete: !task.complete}))
        .then((res)=>{
            alert(res.payload.message)
            dispatch(fetchTasks({searchMode:tasks.searchData.searchMode, sortMode:tasks.sortData.sortMode, startDate:tasks.searchData.searchStartDate, endDate:tasks.searchData.searchEndDate, searchString:tasks.searchData.searchString}))
            setShowModal(false)
        })
    }


    const handleModTaskSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(modTaskData)
        dispatch(modTask({taskId: modTaskData.id, taskName:modTaskData.taskName, dueDate:modTaskData.dueDate, description:modTaskData.description, complete: modTaskData.complete}))
        .then((res)=>{
            alert(res.payload.message)
            dispatch(fetchTasks({searchMode:tasks.searchData.searchMode, sortMode:tasks.sortData.sortMode, startDate:tasks.searchData.searchStartDate, endDate:tasks.searchData.searchEndDate, searchString:tasks.searchData.searchString}))
            setShowModal(false)
        })
        .catch((err)=>{
            alert('err')
        })
    }

    const handleTaskDeleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        dispatch(deleteTask({taskId: modTaskData.id}))
        .then((res)=>{
            alert(res.payload.message)
            dispatch(fetchTasks({searchMode:tasks.searchData.searchMode, sortMode:tasks.sortData.sortMode, startDate:tasks.searchData.searchStartDate, endDate:tasks.searchData.searchEndDate, searchString:tasks.searchData.searchString}))
            setShowModal(false)
        })
        .catch((err)=>{
            alert('err')
        })
    }

    const handleModTaskChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setModTaskData((prevData) => ({ ...prevData, [name]: value }));
    };

    return (
        <React.Fragment>
            {show &&
                <>
                    <div className="fixed inset-0 z-50 flex justify-center mt-10 overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
                        <div className="relative w-5/6 max-w-3xl mx-auto my-6 md:w-1/2">
                            <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none h-2/3 focus:outline-none">
                                <div className="flex items-start justify-between px-4 py-4 border-b border-solid rounded-t border-slate-200">
                                <h3 className="text-3xl font-semibold">
                                    Task {task.id}
                                </h3>
                                    <button
                                        className="float-right p-1 pr-3 ml-auto text-3xl font-semibold leading-none text-black bg-transparent border-0 outline-none focus:outline-none"
                                        onClick={()=> setShowModal(!show)}
                                    >
                                        <span className="flex h-6 text-2xl text-black bg-transparent outline-none place-content-centerw-6 focus:outline-none">
                                            X
                                        </span>
                                    </button>
                                </div>
                                {/*body*/}
                                <div className="relative flex-auto px-4 py-4 overflow-auto text-lg h-96">
                                    <div className="flex">
                                        <h1 className="flex items-center px-4">Task Detail</h1>
                                        <button type="button" className="text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-auto px-5 py-2.5 text-center mx-4" onClick={handleTaskCompleteClick}>Complete</button>
                                    </div>
                                    <form className="p-4 m-4 bg-gray-100 shadow-inner" onSubmit={handleModTaskSubmit}>
                                        <div className="mb-6">
                                            <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Task name</label>
                                            <input type="text" name="taskName" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" onChange={handleModTaskChange} defaultValue={task.taskName} required></input>
                                        </div>
                                        <div className="mb-6">
                                            <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">DueDate</label>
                                            <input type="datetime-local" name="dueDate"  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleModTaskChange} defaultValue={task.dueDate === null ? '' : new Date(task.dueDate).toISOString().slice(0, 16)}></input>
                                        </div>
                                        <div className="mb-6">
                                            <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Creator</label>
                                            <div id="password" className=" text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" >{task.creator}</div>
                                        </div>
                                        <div className="mb-6">
                                            <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                                            <input type="text" name="description"  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" defaultValue={task.description} onChange={handleModTaskChange}></input>
                                        </div>
                                        
                                        <div className="">
                                            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-auto px-5 py-2.5 text-center mx-4 my-6">Save</button>
                                            <button type="button" className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-auto px-5 py-2.5 text-center mx-4 my-6" onClick={handleTaskDeleteClick}>Delete</button>
                                        </div>
                                        {task.modtime === null ? 
                                                    '' 
                                                    : 
                                                    <div className="flex items-center">
                                                        <label className="mx-2">{"last mod time:"}</label>
                                                        <div>{new Date(task.modtime)?.toISOString().slice(0, 16).replace("T", " ")}</div>
                                                    </div>
                                        }
                                    </form>
                                    <CommentList comments={comments.commentList} taskId={task.id}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
                </>
            }
        </React.Fragment>
    )
}

export default TaskDetailModal