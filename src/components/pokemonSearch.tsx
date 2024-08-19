"use client"
import { FC, useState } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

const pokemonSearch: FC = () => {
    const [searchBtn, setSearchBtn] = useState<any>("")
    const [searchContent, setSearchContent] = useState<string>("")
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleSearch = (value: string) => {
        const params = new URLSearchParams(searchParams)
        if (value) {
            params.set("search", value);
        } else {
            params.delete("search");
        }
        setSearchBtn(params)
        setSearchContent(value)
        // replace(`${pathname}?${params.toString()}`);
    }

    const searchOnKeyup = (event: any) => {
        if(event.key === "Enter") {
            replace(`${pathname}?${searchBtn.toString()}`);
        }
    } 

    const searchOnClick = () => {
          replace(`${pathname}?${searchBtn.toString()}`);
    } 

    const clearSearch = () => {
      setSearchContent("")
      replace(`${pathname}`);
    }

  return (
    <div className="text-center my-4">
      <div className="bg-white py-4 rounded-lg shadow-md">
        <div className="px-4 flex justify-center items-center space-x-4">
        <h3 className="font-bold text-xl">Filter</h3>
        <div className="relative">
      <input
        className="xl:w-96 md:w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
        placeholder="Search your Pokémon"
        type="text"
        value={searchContent}
        onChange={(e) => handleSearch(e.target.value)}
        onKeyUp={(e) => searchOnKeyup(e)}
      />
        {searchContent && (
          <button
            type="button"
            onClick={clearSearch}
            className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
          <div onClick={searchOnClick} className="bg-red-500 p-2 rounded-lg shadow-md shadow-red-600 cursor-pointer">
            <div className="pokeball-btn">
              <div className="pokeball-line"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default pokemonSearch;
