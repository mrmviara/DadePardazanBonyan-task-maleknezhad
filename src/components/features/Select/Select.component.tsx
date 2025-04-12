import { useRef, useState } from "react";

import useRemoteInfiniteSelect from "../../../hooks/useRemoteInfiniteSelect";

export type OptionType = {
	key: string;
	value: string;
};

type SelectPropsType = {
	fetchOptions: (text: string, page: number) => Promise<OptionType[]>;
	onSelect: (value: string) => void;
};

const Select = ({ fetchOptions, onSelect }: SelectPropsType) => {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedOption, setSelectedOption] = useState<OptionType | null>(null);
	const {
		options,
		setSearchText,
		loadMoreData,
		isLoading,
		reset,
	} = useRemoteInfiniteSelect({ fetchOptions });
	const listRef = useRef<HTMLUListElement | null>(null);
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);

	const handleScroll = () => {
		const el = listRef.current;
		if(el && el.scrollTop + el.clientHeight >= el.scrollHeight - 10)
			loadMoreData();
	};

	const handleSelect = (option: OptionType) => {
		setSelectedOption(option);
		onSelect(option.value);
		setIsOpen(false);
		reset();
	};
	
	const handleOnChange = (text: string) => {
		if(timeoutRef.current)
			clearTimeout(timeoutRef.current);
		timeoutRef.current = setTimeout(() => {
			setSearchText(text);
		}, 500);
	};
	
	return (
		<div className="relative w-72 max-w-full">
			<div className="p-2 border border-gray-300 rounded-md cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
				{selectedOption ? selectedOption.key : "انتخاب کنید"}
			</div>
			{isOpen && (
				<div className="absolute z-10 w-full mt-1 border border-gray-300 rounded-md bg-white shadow-lg">
					<div className="p-2 border-b">
						<input
							type="text"
							placeholder="جستجو ..."
							className="w-full p-1 border rounded"
							onChange={(e) => handleOnChange(e.target.value)}
						/>
					</div>
					<ul ref={listRef} className="max-h-60 overflow-y-auto" onScroll={handleScroll}>
						{options.map((option,index) =>
							<li
								className="p-2 hover:bg-gray-100 cursor-pointer"
								onClick={() => handleSelect(option)}
								key={option.value+index}
							>{option.key}</li>
						)}
						{isLoading && <li className="p-2 text-center text-gray-400">در حال بارگذاری ...</li>}
						{!options.length && !isLoading && <li className="p-2 text-center text-gray-400">نتیجه‌ای پیدا نشد</li>}
					</ul>
				</div>
			)}
		</div>
	);
};

export default Select;
