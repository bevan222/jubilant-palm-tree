import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../../type';

interface CommentState {
    commentList: Comment[];
    loading: boolean;
    error: string;
}

const initialState: CommentState = {
    commentList: [],
    loading: false,
    error: ''
}

export const fetchComments = createAsyncThunk(
	'comments/fetchComments',
	async ({taskId}:{taskId:number}, thunkAPI) => {
		const response = await fetch('http://'+process.env.REACT_APP_API_HOST+'/comment/getTaskComment',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({taskId:taskId})
        })
        const data = response.json();
        return data;
	}
);

export const createComment = createAsyncThunk(
	'comments/createComment',
	async ({creatorId, message, belongTaskId}:{creatorId:number, message:string, belongTaskId:number}, thunkAPI) => {
		const response = await fetch('http://'+process.env.REACT_APP_API_HOST+'/comment/createComment',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({message:message, creatorId:creatorId, belongTaskId:belongTaskId})
        })
        const data = response.json();
        return data;
	}
);

export const modComment = createAsyncThunk(
	'comments/modComment',
	async ({commentId, message}:{commentId:number, message: string}, thunkAPI) => {
		const response = await fetch('http://'+process.env.REACT_APP_API_HOST+'/comment/modComment',{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({commentId:commentId, message:message})
        })
        const data = response.json();
        return data;
	}
);

export const deleteComment = createAsyncThunk(
	'comments/deleteComment',
	async ({commentId}:{commentId:number}, thunkAPI) => {
		const response = await fetch('http://'+process.env.REACT_APP_API_HOST+'/comment/deleteComment',{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({commentId:commentId})
        })
        const data = response.json();
        return data;
	}
);


export const commentSlice = createSlice({
	name: 'comments',
	initialState,
	reducers: {

	},
    extraReducers: builder => {
        builder.addCase(fetchComments.pending, state=>{
            state.loading = true;
            return state;
        })
        builder.addCase(fetchComments.fulfilled, (state, action)=>{
            state.loading = false;
            state.commentList = action.payload.comments;
            state.error = ''
            return state;
        })
        builder.addCase(createComment.pending, state=>{
            state.loading = true;
            return state;
        })
        builder.addCase(createComment.fulfilled, (state, action)=>{
            state.loading = false;
            state.error = ''
            return state;
        })
        builder.addCase(modComment.pending, state=>{
            state.loading = true;
            return state;
        })
        builder.addCase(modComment.fulfilled, (state, action)=>{
            state.loading = false;
            state.error = ''
            return state;
        })
        builder.addCase(deleteComment.pending, state=>{
            state.loading = true;
            return state;
        })
        builder.addCase(deleteComment.fulfilled, (state, action)=>{
            state.loading = false;
            state.error = ''
            return state;
        })
	},
});

export const { } = commentSlice.actions
export default commentSlice.reducer;