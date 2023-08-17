import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Task } from '../../type';

interface TodoState {
    taskList: Task[];
    searchData: {
        searchMode: number,
        searchStartDate: string,
        searchEndDate: string,
        searchString: string,
    },
    sortData: {
        sortMode: number,
    },
    loading: boolean;
    error: string;
}

const initialState: TodoState = {
    taskList: [],
    searchData: {
        searchMode: 1,
        searchStartDate: '',
        searchEndDate: '',
        searchString: '',
    },
    sortData: {
        sortMode: 1,
    },
    loading: false,
    error: ''
}

export const fetchTasks = createAsyncThunk(
    'todos/fetchTasks',
    async ({ searchMode, sortMode, startDate, endDate, searchString }: { searchMode: number, sortMode: number, startDate: string, endDate: string, searchString: string }, thunkAPI) => {
        const response = await fetch('http://' + process.env.REACT_APP_API_HOST + '/task/getFilterTask', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ searchMode: searchMode, sortMode: sortMode, startDate: startDate, endDate: endDate, searchString: searchString })
        })
        const data = response.json();
        return data;
    }
);

export const createTask = createAsyncThunk(
    'todos/createTask',
    async ({ taskName, dueDate, creatorId, description }: { taskName: string, dueDate: Date | null, creatorId: number, description: string }, thunkAPI) => {
        const response = await fetch('http://' + process.env.REACT_APP_API_HOST + '/task/createTask', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ taskName: taskName, dueDate: dueDate, creatorId: creatorId, description: description })
        })
        const data = response.json();
        return data;
    }
);

export const modTaskComplete = createAsyncThunk(
    'todos/modTaskComplete',
    async ({ taskId, complete }: { taskId: number, complete: boolean }, thunkAPI) => {
        const response = await fetch('http://' + process.env.REACT_APP_API_HOST + '/task/modTaskComplete', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: taskId, complete: complete })
        })
        const data = response.json();
        return data;
    }
);

export const modTask = createAsyncThunk(
    'todos/modTask',
    async ({ taskId, taskName, dueDate, description, complete }: { taskId: number, taskName: string, dueDate: Date | null, description: string, complete: boolean }, thunkAPI) => {
        const response = await fetch('http://' + process.env.REACT_APP_API_HOST + '/task/modTask', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: taskId, taskName: taskName, dueDate: dueDate, description: description, complete: complete })
        })
        const data = response.json();
        return data;
    }
);

export const deleteTask = createAsyncThunk(
    'todos/deleteTask',
    async ({ taskId }: { taskId: number }, thunkAPI) => {
        const response = await fetch('http://' + process.env.REACT_APP_API_HOST + '/task/deleteTask', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: taskId })
        })
        const data = response.json();
        return data;
    }
);

export const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        modSortMode: (state, action) => {
            state.sortData.sortMode = action.payload;
        },
        modSearchMode: (state, action) => {
            state.searchData.searchMode = action.payload;
        },
        modSearchStartDate: (state, action) => {
            state.searchData.searchStartDate = action.payload;
        },
        modSearchEndDate: (state, action) => {
            state.searchData.searchEndDate = action.payload;
        },
        modSearchString: (state, action) => {
            state.searchData.searchString = action.payload;
        },
    },
    extraReducers: builder => {
        builder.addCase(fetchTasks.pending, state => {
            state.loading = true;
            return state;
        })
        builder.addCase(fetchTasks.fulfilled, (state, action) => {
            state.loading = false;
            state.taskList = action.payload.task;
            state.error = ''
            return state;
        })
        builder.addCase(createTask.pending, state => {
            state.loading = true;
            return state;
        })
        builder.addCase(createTask.fulfilled, (state, action) => {
            state.loading = false;
            state.error = ''
            return state;
        })
        builder.addCase(modTaskComplete.pending, state => {
            state.loading = true;
            return state;
        })
        builder.addCase(modTaskComplete.fulfilled, (state, action) => {
            state.loading = false;
            state.error = ''
            return state;
        })
        builder.addCase(modTask.pending, state => {
            state.loading = true;
            return state;
        })
        builder.addCase(modTask.fulfilled, (state, action) => {
            state.loading = false;
            state.error = ''
            return state;
        })
        builder.addCase(deleteTask.pending, (state, action) => {
            state.loading = true;
            return state;
        })
        builder.addCase(deleteTask.fulfilled, (state, action) => {
            state.loading = false;
            state.error = ''
            return state;
        })
    },
});

export const { modSortMode, modSearchMode, modSearchStartDate, modSearchEndDate, modSearchString } = todoSlice.actions
export default todoSlice.reducer;