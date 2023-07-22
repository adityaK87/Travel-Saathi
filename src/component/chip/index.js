import React from "react";

const Chip = ({ category, setSelectedCategory, image }) => {
	const handleOnCategory = () => {
		localStorage.setItem("chip", category);
		let getCategory = localStorage.getItem("chip");
		console.log("I am coming through the chip component");
		setSelectedCategory(getCategory);
	};
	return (
		<button
			onClick={handleOnCategory}
			className='inline-block flex items-center bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 hover:shadow hover:scale-105'>
			<span>
				<img src={image} alt={category} className='w-4 ' />
			</span>
			<span>{category}</span>
		</button>
	);
};

export default Chip;
