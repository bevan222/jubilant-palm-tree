import React, {useState} from "react";
import DropDownButton from "./DropDownButton";

interface SortButtonProps {
    options: Array<{value:number, label:string}>;
    optionValue: {value:number, label:string};
    onSelect: (option: {value:number, label:string}) => void;
}

const SortButton: React.FC<SortButtonProps> = ({ options, optionValue, onSelect } ) => {

    return (
        <div className="items-center justify-center md:gap-2 md:flex">
            <label>Sort by:</label>
            <DropDownButton options={options} optionValue={optionValue} onSelect={onSelect}/>
        </div>
    )
}

export default SortButton