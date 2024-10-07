
import axios from 'axios';

export const  sendData = async (url, data) => {
    try {
        const response = await axios.post(url, data);
        return response;
    } catch (error) {
        console.error('Error sending data:', error);
        throw error;
    }
};

