import React, { useEffect, useState } from "react";
import { getPlaceTips } from "../../api";
import { BiSolidMessageSquareDetail } from "react-icons/bi";
import { AiOutlineFieldTime } from "react-icons/ai";
import { IoLocationSharp } from "react-icons/io5";
import ImageSlider from "../imageSlider";

const Card = ({ place }) => {
	const [tip, setTip] = useState("");

	//Destructuring the object place and location
	const { name, location, timezone, categories, fsq_id } = place;
	const { formatted_address } = location;

	useEffect(() => {
		//getPlaceTips is defined in the api folder
		getPlaceTips(fsq_id).then((tip) => {
			const newTip = tip?.slice(0, 80);
			setTip(newTip);
		});
	}, [fsq_id]);

	return (
		<div className='sm:w-30 sm:max-w-sm sm:rounded overflow-hidden shadow-lg m-4 my-8 hover:shadow-md hover:shadow-slate-600  hover:duration-300'>
			<div>
				<ImageSlider fsq_id={fsq_id} />
			</div>
			<div>
				<div className='font-bold text-xl px-6 py-1 font-medium'>
					{name}
				</div>
				<div className='px-6 py-2 '>
					<p className='text-gray-700 text-base flex justify-between flex items-center'>
						<span className='w-4 mr-14'>
							<IoLocationSharp />
						</span>
						<span className=''>{formatted_address}</span>
					</p>
				</div>

				<div className='px-6 py-2'>
					<p className='text-gray-700 text-base flex justify-between flex items-center '>
						<span className='w-4 mr-14'>
							<BiSolidMessageSquareDetail />
						</span>
						<span>{tip}...</span>
					</p>
				</div>
				<div className='px-6 py-2'>
					<p className='text-gray-700 text-base flex  items-center'>
						<span className='w-4 mr-14'>
							<AiOutlineFieldTime />
						</span>
						<span>{timezone}</span>
					</p>
				</div>

				<div className='px-6 py-2'>
					{categories?.map(({ name, id, icon }) => {
						//destructuring the category object
						return (
							<span
								key={id}
								className='inline-flex  items-center bg-gray-800 rounded-full px-3 py-1 text-sm font-semibold text-gray-200 mr-2 mb-2'>
								<img
									className='inline-block text-black'
									src={`${icon.prefix}32${icon.suffix}`}
									alt=''
									width={16}
								/>
								<span>{name}</span>
							</span>
						);
					})}
				</div>
				<a
					className='font-semibold px-6 py-2 mb-2 text-sky-400 mb-4  text-sky-500 text-sky-400'
					href={`https://foursquare.com/v/${name}/${fsq_id}`}
					target={"_blank"}
					rel='noreferrer'>
					WEBSITE
				</a>
			</div>
		</div>
	);
};

export default Card;
