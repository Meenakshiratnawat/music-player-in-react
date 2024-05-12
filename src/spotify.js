import axios from "axios";
const authEndpoint = "https://accounts.spotify.com/authorize?";
const clientId = "cd4b49e4e7da4a1eaccc157eaeabc5ad"


const redirectUri = "http://localhost:3000";
const scopes = ["user-library-read", "playlist-read-private","user-read-playback-state","user-read-currently-playing","user-library-read"];

export const loginEndpoint = `${authEndpoint}client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
  "%20"
)}&response_type=token&show_dialog=true`;

const apiClient = axios.create({
  baseURL: "https://api.spotify.com/v1/",
});

export const setClientToken = (token) => {
  apiClient.interceptors.request.use(async function (config) {
    config.headers.Authorization = "Bearer " + token;
    return config;
  });
};

export default apiClient;