import { useEffect } from "react";
import axiosInstance from "../../config/axios";
import Logout from "../Auth/Logout";

function Home() {
    console.log("Home component mounted");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get('/home');
                console.log('Data received:', response.data);
            } catch (error) {
                if (error.response) {
                    // Le serveur a répondu avec un statut autre que 2xx
                    console.error('Error Response:', error.response.data);
                } else if (error.request) {
                    // La requête a été faite mais aucune réponse n'a été reçue
                    console.error('No Response:', error.request);
                } else {
                    // Une autre erreur est survenue lors de la configuration de la requête
                    console.error('Error:', error.message);
                }
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1>Hello in Page Dashboard for docker</h1>
            <Logout />
        </div>
    );
}

export default Home;



// import { useEffect } from "react";
// import axiosInstance from "../../config/axios";
// import Logout from "../Auth/Logout";
// function Home() {
// console.log("hello")
// useEffect(() => {

//     const fetchData = async () => {
//         try {
//             const response = await axiosInstance.get('/home')
//             console.log('Data sent:', response);
//         } catch (error) {
//             console.error('Error sending data:', error);
//         }
//     }
//     fetchData()
    
// }
// , [])
//     return (
//         <div>
//             hello in page dashboard
            

//             <Logout/>
//         </div>
//     );
// }

// export default Home;