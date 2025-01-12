import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { BACKEND_URL } from "../../Config";

export function useContent() {
    const [contents, setContents] = useState([]);

    


    const refresh = useCallback( async () =>
        {
            try {
                const response = await axios.get(`${BACKEND_URL}/api/v1/content`, {
                        headers: {
                            "Authorization": localStorage.getItem("token"),
                        },
                    })
                    setContents(response.data.content);
                    
            } catch (error) {
                if (axios.isAxiosError(error) && error.response && error.response.data.message === "Token Expired") {
                    
                    window.localStorage.clear();
                    
                }else {
                    console.error("Error fetching content:", error);
                }
            }
        }, [])

   

    

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

}, [refresh]);

const memoizedContents = useMemo(() => contents, [contents]);



    return { contents: memoizedContents, refresh };
}

    
    
 