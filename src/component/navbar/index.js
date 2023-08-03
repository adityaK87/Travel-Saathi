import React, { useState, useEffect, useContext } from "react";
import logo from "../../img/logo.png";
import MapContext from "../../context";

const Navbar = () => {
	const { selectedCategory, setSelectedCategory } = useContext(MapContext); //Destructuring the MapContext
	const [typedText, setTypedText] = useState(selectedCategory);
	const [searchedText, setSearchedText] = useState(typedText);

	useEffect(() => {
		setTypedText(selectedCategory);
	}, [selectedCategory]);

	const handleOnChange = (e) => {
		e.preventDefault();
		console.log("fsdgfdkljlfsgkldfhgio", e.target.value);
		setTypedText(e.target.value);
	};

	const handleClick = () => {
		setSearchedText(typedText);
		localStorage.setItem("chip", searchedText);
		setSelectedCategory(localStorage.getItem("chip"));
	};
	return (
		<nav className='flex items-center justify-center flex-wrap sm:justify-between bg-[#1f2937] p-2'>
			<div className='flex items-center flex-shrink-0 text-white mr-6'>
				<img src={logo} alt='Travel Saathi' height='54' width='54' />
				<span className='font-semibold text-xl tracking-tight'>
					Travel Saathi
				</span>
			</div>
			<div className='float-right '>
				<form className='form'>
					<div className='flex items-center border-b border-teal-500 py-2'>
						<input
							className='text-white appearance-none bg-transparent border-none w-full mr-3 py-1 px-2 leading-tight focus:outline-none'
							type='text'
							placeholder='Search Location'
							aria-label='Full name'
							value={typedText}
							onChange={handleOnChange}
						/>
						<button
							className='flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded'
							type='button'
							onClick={handleClick}>
							Search
						</button>
						<button
							className='flex-shrink-0 border-transparent border-4 text-teal-500 hover:text-teal-800 text-sm py-1 px-2 rounded'
							type='button'
							onClick={() => setTypedText("")}>
							Cancel
						</button>
					</div>
				</form>
			</div>
		</nav>
	);
};

export default Navbar;
