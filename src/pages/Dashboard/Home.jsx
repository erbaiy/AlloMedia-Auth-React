
import { useEffect } from "react";
import axiosInstance from "../../config/axios";
function Home() {
console.log("hello")
useEffect(() => {

    const fetchData = async () => {
        try {
            const response = await axiosInstance.get('/home')
            console.log('Data sent:', response);
        } catch (error) {
            console.error('Error sending data:', error);
        }
    }
    fetchData()
    
}
, [])
    return (
        <div>
            hello in page dashboard
        </div>
    );
}

export default Home;