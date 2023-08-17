import React, { useState } from 'react';
import TodoList from './components/TodoList';
import SearchTaskBar from './components/SearchTaskBar';
import NewTask from './components/NewTask';
import SortButton from './components/SortButton';
import { useAppDispatch } from './redux/store';
import { modSearchMode, modSortMode } from './redux/slices/todoSlice';

function App() {
  const searchOptions = [{ value: 1, label: 'Time' }, { value: 2, label: 'Creator' }];
  const sortOptions = [{ value: 1, label: 'CreateTime' }, { value: 2, label: 'DueDate' }, { value: 3, label: 'Creator' }, { value: 4, label: 'ID' }, { value: 5, label: 'Todo' }, { value: 6, label: 'Complete' }];
  const [searchOptionSelect, setSearchOptionSelect] = useState(searchOptions[0])
  const [sortOptionSelect, setSortOptionSelect] = useState(sortOptions[0])
  const [showSearchBar, setShowSearchBar] = useState(false)
  const dispatch = useAppDispatch()

  const handleSearchOptionSelect = (option: { value: number, label: string }) => {
    dispatch(modSearchMode(option.value))
    setSearchOptionSelect(option)
  };

  const handleSortOptionSelect = (option: { value: number, label: string }) => {
    dispatch(modSortMode(option.value))
    setSortOptionSelect(option)
  };

  return (
    <div className='flex justify-center w-screen min-h-screen'>
      <div className='justify-center w-11/12 md:w-2/3'>
        <SearchTaskBar options={searchOptions} optionValue={searchOptionSelect} onSelect={handleSearchOptionSelect} show={showSearchBar} />
        <div className='flex justify-between px-1 my-4 md:px-6'>
          <NewTask />
          <div className="flex items-center justify-center md:hidden">
            <img src="/listIcon.png" className="w-10 h-10" onClick={() => { setShowSearchBar(!showSearchBar) }}></img>
          </div>
          <SortButton options={sortOptions} optionValue={sortOptionSelect} onSelect={handleSortOptionSelect} />
        </div>
        <TodoList sortOption={sortOptionSelect.value} />
      </div>
    </div>
  );
}

export default App;