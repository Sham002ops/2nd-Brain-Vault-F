import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../../Config";
import SessionExpired from "../pages/SessionExpired";
import { useNavigate } from "react-router-dom";

export function useContent() {
    const [contents, setContents] = useState([]);
    const navigate = useNavigate();
    
    const [isSessionExpired, setIsSessionExpired] = useState(false);
    

   async function refresh() {
        try {
            const response = await axios.get(`${BACKEND_URL}/api/v1/content`, {
                    headers: {
                        "Authorization": localStorage.getItem("token"),
                    },
                })
                setContents(response.data.content);
                
        } catch (error) {
            if (axios.isAxiosError(error) && error.response && error.response.data.message === "Token Expired") {
                setIsSessionExpired(true);
                window.localStorage.clear();
                navigate("/timeout");
            } 
            if (isSessionExpired) {
                return <SessionExpired />;
            }else {
                console.error("Error fetching content:", error);
            }
        }
    }

    

//      const refresh = async () => {
//     //     const token = localStorage.getItem("token");
//     //     if (token) {
//     //         const decodedToken = JSON.parse(atob(token.split('.')[1]));
//     //         const isExpired = decodedToken.exp * 1000 < Date.now();
//     //         if (isExpired) {  
//     //             setIsSessionExpired(true);
//     //             clearInterval(restart);
                
//     //         } else {
//     //             try {
//     //                 const response = await axios.get(`${BACKEND_URL}/api/v1/content`, {
//     //                     headers: {
//     //                         "Authorization": token,
//     //                     },
//     //                 });
//     //                 setContents(response.data.content);
//     //             } catch (error) {
//     //                 console.error("Error fetching content:", error);
//     //             }
//     //         }
//     //     } else {
//     //         setIsSessionExpired(true);
//     //     }
//     // };
    
    
    

        
useEffect(() => {
    refresh()
    const interval = setInterval(() => {
        refresh()
    }, 10 * 1000)

    return () => {
        clearInterval(interval);
    }
// eslint-disable-next-line react-hooks/exhaustive-deps
}, []);



    return { contents, refresh };
}

    
    
 