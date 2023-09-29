import axios from "axios";



const apiClient = axios.create({
    baseURL: 'https://730b-103-109-109-145.ngrok-free.app/',
    timeout: 50000,
    headers: {
      "Content-Type": "application/json",
      common: {
        Authorization: "",
      },
    },
  });

  export default apiClient;