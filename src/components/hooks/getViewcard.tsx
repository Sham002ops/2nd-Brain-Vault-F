import { useEffect, useState } from 'react'
import { CardProps } from '../UI/Card';
import axios from 'axios';
import { BACKEND_URL } from '../../Config';

// interface GetViewcardResult {
//     cardContent: CardProps | null;
// }

export const GetViewcard = ({_id}: {_id: string}) => {
    const [cardContent, setCardContent] = useState<CardProps | null>(null);
    const getCard = async () => {
        try {
            const response = await axios.get(`${BACKEND_URL}/api/v1/content/displayContent/${_id}`, {
                headers: {
                    "Authorization": localStorage.getItem("token"),
                },
            });
            setCardContent(response.data.content);
                
        } catch (error) {
            console.error("Error fetching content:", error);
        }
    }

    useEffect(() => {
       if (_id){
        getCard();
       }
       // eslint-disable-next-line
    }, [_id]);

  return {cardContent};
}

