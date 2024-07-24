import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://pokeapi.co/api/v2/",
  headers: {
    "Content-Type": "application/json",
  },
});

export const axiosTCG = axios.create({
  baseURL: "https://api.pokemontcg.io/v2/",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosTCG.interceptors.request.use((config) => {
  const token = process.env.TCG_KEY;
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});
