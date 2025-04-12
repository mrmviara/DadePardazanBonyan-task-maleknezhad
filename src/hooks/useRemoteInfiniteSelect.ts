import { useCallback, useLayoutEffect, useState } from "react";

import { OptionType } from "../components/features/Select/Select.component";

type UseRemoteInfiniteSelectPropsType = {
	fetchOptions: (text: string, page: number) => Promise<OptionType[]>;
};

const useRemoteInfiniteSelect = ({ fetchOptions }: UseRemoteInfiniteSelectPropsType) => {
	const [searchText, setSearchText] = useState("");
	const [page, setPage] = useState(1);
	const [hasMoreData, setHasMoreData] = useState(true);
	const [isLoading, setIsLoading] = useState(false);
	const [options, setOptions] = useState<OptionType[]>([]);

	const loadData = useCallback(async () => {
		setIsLoading(true);
		const newOptions = await fetchOptions(searchText, page);
		setOptions((prev) => [...prev, ...newOptions]);
		setHasMoreData(newOptions.length > 0);
		setIsLoading(false);
	}, [page, searchText, hasMoreData, isLoading, fetchOptions]);

	const loadMoreData = () => {
		if(hasMoreData && !isLoading) setPage((prev) => prev + 1);
	};
	
	const reset = () => {
		setSearchText("");
		setPage(1);
		setHasMoreData(true);
	};

	useLayoutEffect(() => {
		setOptions([]);
		setPage(1);
		setHasMoreData(true);
	}, [searchText]);

	useLayoutEffect(() => {
		loadData();
	}, [page, searchText]);

	return {
		options,
		searchText,
		setSearchText,
		loadMoreData,
		isLoading,
		reset,
	};
};

export default useRemoteInfiniteSelect;
