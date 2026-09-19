import React from "react";

function Search({searchTerm , setSearchTerm}){
    return(
        <div>
            <input
            type="text"
            placeholder='Search for your favorite Movies...'
            name={searchTerm}
            className='h-full min-w-250 bg-transparent text-sm outline-none placeholder:text-dim'

            onChange={(e)=>setSearchTerm(e.target.value)}/>
        </div>
    )
}
export default Search