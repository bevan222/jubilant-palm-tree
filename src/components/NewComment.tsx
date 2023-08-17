import React, { useEffect, useState } from "react";
import DropDownButton from "./DropDownButton";
import { useAppDispatch, useAppSelector } from '../redux/store';
import { fetchUsers } from '../redux/slices/userSlice'
import { fetchComments, createComment } from "../redux/slices/commentSlice";

interface NewCommentProps {
    taskId: number
}

const NewComment: React.FC<NewCommentProps> = ({ taskId }) => {

    const [commentMessage, setCommentMessage] = React.useState('')
    const [userOptions, setUserOptions] = useState<Array<{ value: number, label: string }>>([])
    const [creatorSelect, setCreatorSelect] = useState<{ value: number, label: string }>()
    const dispatch = useAppDispatch()
    const users = useAppSelector((state) => state.user)
    const comments = useAppSelector((state) => state.comment)

    useEffect(() => {
        dispatch(fetchUsers())
    }, [])

    const handleNewTaskSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (creatorSelect === undefined) {
            alert('select a creator')
            return
        }
        if (commentMessage === '') {
            alert('please enter a comment')
            return
        }
        dispatch(createComment({ creatorId: creatorSelect.value, message: commentMessage, belongTaskId: taskId }))
            .then((res) => {
                alert(res.payload.message)
                dispatch(fetchComments({ taskId: taskId }))
                setCommentMessage('')
            })
    }

    const handleCommentMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCommentMessage(event.target.value)
    };

    const handleCreatorSelect = (option: { value: number, label: string }) => {
        setCreatorSelect(option)
    };

    return (
        <div className="h-full rounded-xl">
            <form className="flex items-center pl-4" onSubmit={handleNewTaskSubmit}>
                <input className="w-full h-full px-2 py-2 rounded-l-lg" placeholder="Add a comment" onChange={handleCommentMessageChange} value={commentMessage}></input>
                <DropDownButton options={users.userOption} optionValue={creatorSelect} onSelect={handleCreatorSelect}></DropDownButton>
                <button className="text-white my-6 bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-r-lg text-sm w-auto px-5 py-2.5 text-center">submit</button>
            </form>
        </div>
    )
}

export default NewComment