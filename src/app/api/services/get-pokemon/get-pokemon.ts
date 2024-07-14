import { axiosInstance } from "../../axiosInstance";
import { Pokemon } from "./get-pokemon.interface";

interface ParamsPokemon {
  url: string;
}

export const GetPokemon = async ({ url }: ParamsPokemon) => {
  const pokemon = await axiosInstance.get<Pokemon>(url);

  return pokemon.data;
};
