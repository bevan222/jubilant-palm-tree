import React from "react";
import CommentItem from "./CommentItem";
import NewComment from "./NewComment";
import { Comment } from "../type";

interface CommentListProps {
    comments: Array<Comment>,
    taskId: number,
}

const CommentList: React.FC<CommentListProps> = ({comments, taskId}) => {
    return (
        <React.Fragment>
            <div className="flex items-center pt-4">
                <h1 className="px-4">Comment</h1>
            </div>
            <div className="p-4 m-4 bg-gray-100 shadow-inner">
                {
                    comments.map((comment:Comment) => {
                        return (
                            <CommentItem key={comment.id} comment={comment}/>
                        )
                    })
                }
                <NewComment taskId={taskId}/>
            </div>
        </React.Fragment>
    )
}

export default CommentList