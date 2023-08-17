import React, { useEffect, useState } from "react";

interface DropDownButtonProps {
    options: Array<{ value: number, label: string }> | undefined;
    optionValue: { value: number, label: string } | undefined;
    onSelect: (option: { value: number, label: string }) => void;
}

const DropDownButton: React.FC<DropDownButtonProps> = ({ options, optionValue, onSelect }) => {
    const [selectedOption, setSelectedOption] = useState<number>();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    useEffect(() => {
        if (options !== undefined && options.length > 0) {
            setSelectedOption(options[0].value);
        }
    }, [])


    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleOptionSelect = (option: { value: number, label: string }) => {
        setSelectedOption(option.value);
        onSelect(option);
        setIsDropdownOpen(false);
    };

    return (
        <div className="flex justify-center h-10 my-2 md:my-6">
            <div className="relative flex">
                <button
                    className="z-[2] flex items-center whitespace-nowrap rounded-l border-2 border-primary px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-primary transition duration-150 ease-in-out hover:border-primary-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-primary-600 focus:z-[3] focus:border-primary-600 focus:text-primary-600 focus:outline-none focus:ring-0 active:border-primary-700 active:text-primary-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                    type="button"
                    onClick={toggleDropdown}
                >
                    {optionValue !== undefined && optionValue.label}
                </button>
                {isDropdownOpen && (
                    <ul className="absolute z-10 w-full mt-10 bg-white border border-gray-300 rounded shadow min-w-fit">
                        {options?.map((option: { value: number, label: string }, index: number) => (
                            <li
                                key={index}
                                className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                                onClick={() => handleOptionSelect(option)}
                            >
                                {option.label}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>

    )
}

export default DropDownButton