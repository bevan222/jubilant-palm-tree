import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User, UserOption } from '../../type';


interface UserState {
    loading: boolean;
    userList: User[];
    userOption: UserOption[];
    error: string;
}

const initialState = {
    userList: [],
    loading: false,
    userOption: [],
    error:''
}


export const fetchUsers = createAsyncThunk(
	'users/fetchUsers',
	async (thunkAPI) => {
		const response = await fetch('http://'+process.env.REACT_APP_API_HOST+'/user/getAllUser',{
            method: 'GET'
        })
        const data = response.json();
        return data;
	}
);


export const userSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {

	},
	extraReducers: builder => {
        builder.addCase(fetchUsers.pending, state=>{
            state.loading = true;
            return state;
        })
        builder.addCase(fetchUsers.fulfilled, (state, action)=>{
            state.loading = false;
            state.userList = action.payload.users
            state.userOption = action.payload.users.map((user: {id:number, username:string})=>{ return {value: user.id, label:user.username}});
            state.error = ''
            return state;
        })
	},
});

export const selectUser = (state: any) => state.users;
export default userSlice.reducer;