import React from "react";
import DropDownButton from "./DropDownButton";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { fetchTasks, modSearchEndDate, modSearchStartDate, modSearchString } from "../redux/slices/todoSlice";

interface SearchTaskBarProps {
    options: Array<{value:number, label:string}>;
    optionValue: {value:number, label:string};
    onSelect: (option: {value:number, label:string}) => void;
    show:boolean
}

const SearchTaskBar: React.FC<SearchTaskBarProps> = ({ options, optionValue, onSelect, show } ) => {
    const dispatch = useAppDispatch()
    const tasks = useAppSelector((state) => state.todos)

    const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(fetchTasks({searchMode:tasks.searchData.searchMode, sortMode:tasks.sortData.sortMode, startDate:tasks.searchData.searchStartDate, endDate:tasks.searchData.searchEndDate, searchString:tasks.searchData.searchString}))
    }

    const handleSearchTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        console.log(event.target)
        if(name === 'startDate'){
            dispatch(modSearchStartDate(value))
        }
        else{
            dispatch(modSearchEndDate(value))
        }
    };

    const handleSearchStringChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(modSearchString(event.target.value))
    };

    return (
        <React.Fragment>
            <div className={"justify-center w-full mt-4 md:flex " + (show === true ? '':'hidden')}>
                <div className="relative md:flex place-items-center">
                    <div className="flex items-center justify-center gap-x-4">
                        <label className="md:hidden">search for:</label>
                        <DropDownButton options={options} optionValue={optionValue} onSelect={onSelect}/>
                    </div>
                    {optionValue.value === 1 ? (
                        <form onSubmit={handleSearchSubmit}>
                            <div className="md:flex place-items-center">
                                <input
                                    type="datetime-local"
                                    className="w-full h-10 px-4 py-1 mr-4 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder='Start time'
                                    key={'startDate'}
                                    name="startDate"
                                    onChange={handleSearchTimeChange}
                                />
                                <div className="flex justify-center">
                                to
                                </div>
                                <input
                                    type="datetime-local"
                                    className="w-full h-10 px-4 py-1 border border-gray-300 rounded md:ml-4 focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder='End time'
                                    key={'endDate'}
                                    name="endDate"
                                    onChange={handleSearchTimeChange}
                                />
                                <div className="flex justify-center">
                                    <button
                                        className="inline-block rounded-r h-10 bg-blue-400 px-6 my-6 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:z-[3] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
                                        type="submit"
                                    >
                                        Search
                                    </button>
                                </div>
                            </div>
                        </form>
                        
                    ) : (
                        <form onSubmit={handleSearchSubmit}>
                            <div className="flex place-items-center">
                                <input
                                    type="text"
                                    className="w-full px-4 py-1.5 my-4 h-10 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder='Search for creator'
                                    key={'creatorName'}
                                    defaultValue=""
                                    onChange={handleSearchStringChange}
                                />
                                <button
                                    className="inline-block rounded-r  h-10 bg-blue-400 px-6 my-6 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:z-[3] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
                                    type="submit"
                                    >
                                Search
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </React.Fragment>
    )
}

export default SearchTaskBar