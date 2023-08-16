import React, { useState } from "react";
import NewTaskModal from "./NewTaskModal";

const NewTask = () => {
    const [showModal, setShowModal] = useState<boolean>(false)

    return (
        <div>
            <button className="inline-block rounded-xl bg-green-300 my-6 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-black shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:z-[3] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]" onClick={()=> setShowModal(!showModal)}>new task</button>
            <NewTaskModal show={showModal} setShowModal={setShowModal}/>
        </div>
    )
}

export default NewTask