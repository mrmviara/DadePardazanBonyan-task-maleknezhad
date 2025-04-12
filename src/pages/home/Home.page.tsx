import { useState } from "react";

import { getProductsApi } from "../../services/products";

import { Select } from "../../components/features";

const Home = () => {
	const [selectedOption, setSelectedOption] = useState<string>('');

	return (
		<div className="flex flex-col items-center p-8">
			<p className="mb-4">مقدار انتخاب شده: "{selectedOption || "هیچکدام"}"</p>
			<Select fetchOptions={getProductsApi} onSelect={(value) => setSelectedOption(value)} />
		</div>
	);
};

export default Home;
