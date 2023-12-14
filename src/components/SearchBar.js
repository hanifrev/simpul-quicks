import React from "react";
import SearchIcon from "../assets/search.svg";
import Image from "next/image";

const SearchBar = () => {
  return (
    <div className="h-[58px] w-full bg-[#4f4f4f] flex flex-row pl-[25.5px]">
      <Image src={SearchIcon} className="" alt="img" />
      <input className="w-full h-[58px] bg-transparent" />
    </div>
  );
};

export default SearchBar;
