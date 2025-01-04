import axios from "axios";
import { BACKEND_URL } from "../Config";
import { Input } from "../components/UI/InputBox";
import { useRef } from "react";
import SearchIcon from "../icons/SearchIcon";

 function SearchBar({setSearchQuery}) {
 const TagRef = useRef<HTMLInputElement>(null)
    
   async function CallByTag(){
    const tag = TagRef.current?.value;

         await axios.get(`${BACKEND_URL}/api/v1/content/search`, {
            params: { tag },
        });
        // console.log(response.data);
    } 

    return <div className="flex items-center  p-4 h-20 w-36 bg-gray-300   ">
        <Input size="xs" onChange={(e) => setSearchQuery(e.target.value.toLowerCase())} reference={TagRef} placeholder={"Search By Tag"}/> 
        <div className="pl-2">
        <button onClick={CallByTag} className="bg-purple-700 rounded-md text-white py-2 px-3"><SearchIcon size="lg"/></button>
        </div>
    </div>
}
export default SearchBar