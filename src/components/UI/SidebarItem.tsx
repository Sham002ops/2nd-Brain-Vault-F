import { ReactElement } from "react";

export function SidebarItems({text, icon}:{
    text: string;
    icon: ReactElement;
}) {
    return <div className="flex items-center  text-white text-xl py-2 cursor-pointer
     hover:bg-white/6 rounded-sm max-w-48 pl-4">
       <div className="pr-2  ">
             {icon}
       </div> 
       <div className=" ">
             {text}
       </div> 
    </div>
}