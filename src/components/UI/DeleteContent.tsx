import axios from 'axios';
import { BACKEND_URL } from '../../Config';

const deleteContent = async (contentId: string): Promise<void> => {
  try {
    const response = await axios.delete(`${BACKEND_URL}/api/v1/content/${contentId}`,{
      headers:{
         "Authorization": localStorage.getItem("token")
      }
    });
    console.log(response.data.message);
    alert('Content deleted successfully!');
  } catch (error) {
    console.error('Error deleting content:', error);
    alert('Failed to delete content. Please try again.');
  }
};

export default deleteContent;
