import React, { useEffect, useState } from "react";
import DropDownButton from "./DropDownButton";
import { Task } from "../type";
import { useAppDispatch, useAppSelector } from '../redux/store';
import { fetchUsers } from '../redux/slices/userSlice'
import { createTask, fetchTasks } from '../redux/slices/todoSlice'

interface NewTaskModalProps {
    show: boolean;
    setShowModal: (show: boolean) => void;
}

const NewTaskModal: React.FC<NewTaskModalProps> = ({ show, setShowModal }) => {
    const [newTaskData, setNewTaskData] = useState<Pick<Task, 'taskName' | 'dueDate' | 'creatorId' | 'description'>>({
        taskName: '',
        dueDate: null,
        creatorId: -1,
        description: ''
    });
    const [userOptions, setUserOptions] = useState<Array<{ value: number, label: string }>>([])
    const [creatorSelect, setCreatorSelect] = useState<{ value: number, label: string }>()
    const dispatch = useAppDispatch()
    const users = useAppSelector((state) => state.user)
    const tasks = useAppSelector((state) => state.todos)

    useEffect(() => {
        dispatch(fetchUsers())
    }, [])

    useEffect(() => {
        if (creatorSelect !== undefined) {
            setNewTaskData((prevData) => ({ ...prevData, creatorId: creatorSelect.value }));
        }
    }, [creatorSelect])

    const handleNewTaskChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setNewTaskData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleCreatorSelect = (option: { value: number, label: string }) => {
        setCreatorSelect(option)
    };

    const handleNewTaskSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (newTaskData.creatorId === -1) {
            alert('please select a creator')
            return
        }
        dispatch(createTask(newTaskData))
            .then(() => {
                alert('Task add success')
                setShowModal(false)
                dispatch(fetchTasks({ searchMode: tasks.searchData.searchMode, sortMode: tasks.sortData.sortMode, startDate: tasks.searchData.searchStartDate, endDate: tasks.searchData.searchEndDate, searchString: tasks.searchData.searchString }))
            })
    }

    return (
        <React.Fragment>
            {show &&
                <>
                    <div className="fixed inset-0 z-50 flex justify-center mt-10 overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
                        <div className="relative w-5/6 max-w-3xl mx-auto my-6 md:w-1/2">
                            <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none h-2/3 focus:outline-none">
                                <div className="flex items-start justify-between px-4 py-4 border-b border-solid rounded-t border-slate-200">
                                    <h3 className="text-3xl font-semibold">
                                        create task
                                    </h3>
                                    <button
                                        className="float-right p-1 pr-3 ml-auto text-3xl font-semibold leading-none text-black bg-transparent border-0 outline-none focus:outline-none"
                                        onClick={() => setShowModal(!show)}
                                    >
                                        <span className="flex h-6 text-2xl text-black bg-transparent outline-none place-content-centerw-6 focus:outline-none">
                                            X
                                        </span>
                                    </button>
                                </div>
                                {/*body*/}
                                <div className="relative flex-auto px-6 py-4 overflow-auto text-lg h-96">
                                    <form onSubmit={handleNewTaskSubmit}>
                                        <div className="mb-6">
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Task name</label>
                                            <input type="text" name="taskName" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter task name" onChange={handleNewTaskChange} required></input>
                                        </div>
                                        <div className="mb-6">
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">DueDate</label>
                                            <input type="datetime-local" name="dueDate" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" defaultValue={new Date().toISOString().slice(0, 16)} onChange={handleNewTaskChange}></input>
                                        </div>
                                        <div className="mb-6">
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Creator</label>
                                            <DropDownButton options={users.userOption} optionValue={creatorSelect} onSelect={handleCreatorSelect} />
                                        </div>
                                        <div className="mb-6">
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                                            <input type="text" name="description" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter description" onChange={handleNewTaskChange} required></input>
                                        </div>
                                        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                                    </form>
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

export default NewTaskModal