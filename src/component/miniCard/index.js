import React from "react";
import ImageSlider from "../imageSlider";

const MiniCard = ({ cardName, fsq_id }) => {
	return (
		<div className='w-72 rounded overflow-hidden  bg-transparent '>
			<ImageSlider fsq_id={fsq_id} />
			<div className='px-6 py-4'>
				<div className='font-bold text-xl mb-2'>{cardName}</div>
			</div>
		</div>
	);
};

export default MiniCard;
