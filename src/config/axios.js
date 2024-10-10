import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_HOST, // Assurez-vous que ceci est bien défini, par exemple 'http://localhost:3500'
})

// Ajout d'un interceptor pour ajouter le token aux headers
axiosInstance.interceptors.request.use(
    (config) => {
        config.withCredentials = true // Activation de l'envoi des credentials
        const token = localStorage.getItem('token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

// Ajout d'un interceptor pour gérer l'expiration du token
axiosInstance.interceptors.response.use(
    (response) => {
        return response
    },
    async (error) => {
        const originalRequest = error.config
        if (error.response && error.response.status === 403 && !originalRequest._retry) {
            originalRequest._retry = true
            try {
                const response = await axiosInstance.get('/refresh')
                const data = response.data
                localStorage.setItem('token', data.accessToken)
                return axiosInstance(originalRequest)
            } catch (error) {
                return Promise.reject(error)
            }
        }
        return Promise.reject(error)
    }
)

export default axiosInstance
    














// import axios from 'axios'

// const axiosInstance = axios.create({
//     baseURL: import.meta.env.VITE_API_HOST,
// })

// // Add a request interceptor to add the token to the headers
// axiosInstance.interceptors.request.use(
//     (config) => {
//         // config.withCredentials = true
//         const token = localStorage.getItem('token')
//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`
//         }
//         return config
//     },
//     (error) => {
//         return Promise.reject(error)
//     }
// )

// // Add a response interceptor to handle the token expiration
// axiosInstance.interceptors.response.use(
//     (response) => {
//         return response
//     },
//     async (error) => {

//         const originalRequest = error.config
//         if (error.status === 403 && !originalRequest._retry) {
//             originalRequest._retry = true
//             try {
//                 const response = await axiosInstance.get('/refresh')
//                 const data = await response.data
//                 localStorage.setItem('token', data.accessToken)
//                 return axiosInstance(originalRequest)
//             } catch (error) {
//                 return Promise.reject(error)
//             }
//         }
//         return Promise.reject(error)
//     }
// )

// export default axiosInstance








