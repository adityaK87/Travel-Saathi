import React from "react";
import "../../styles/tailwind.css";
import Card from "../card";

const dropDownCategories = [
	{ category: "Hotels" },
	{ category: "Coffee" },
	{ category: "Restaurants" },
	{ category: "Airports" },
];

const SideMenu = ({ setSelectedCategory, places }) => {
	return (
		<div className='right-side flex flex-col items-center w-96 h-screen  overflow-scroll'>
			<select
				name='location'
				id='location'
				className='w-full max-w-sm mt-5 border-2 border-black p-2'
				onChange={(e) => {
					console.log("e.target.value ", e.target.value);
					setSelectedCategory(e.target.value);
				}}>
				{dropDownCategories.map(({ category }) => (
					<option key={category} value={category}>
						{category}
					</option>
				))}
			</select>

			<div className='cards'>
				{places?.map((place) => {
					return <Card key={places.fsq_id} place={place} />;
				})}
			</div>
		</div>
	);
};

export default SideMenu;
