import { OptionType } from "../../components/features/Select/Select.component";

export const getProductsApi: (text: string, page: number) => Promise<OptionType[]> = async (text, page) => {
	const limit = 15;
	const skip = (page - 1) * limit;
	const res = await fetch(`https://dummyjson.com/products/search?q=${text}&limit=15&skip=${skip}`);
	const data = await res.json();
	return data.products.map((item: any) => ({
		key: item.title,
		value: item.id.toString()
	}));
};