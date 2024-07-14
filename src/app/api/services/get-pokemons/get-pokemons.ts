import { axiosInstance } from "../../axiosInstance";

export interface ParamsPokemonsGetAll {
  limit: number;
  offset?: number;
}

export interface ResultPokemonsGetAll {
  count: number;
  next: string;
  previous: string;
  results: PokemonGetAll[];
}

export interface PokemonGetAll {
  name: string;
  url: string;
}

export const GetPokemons = async ({
  limit,
  offset,
}: ParamsPokemonsGetAll): Promise<ResultPokemonsGetAll> => {
  const Pokemons = await axiosInstance.get<ResultPokemonsGetAll>(`pokemon`, {
    params: {
      limit,
      offset,
    },
  });

  return Pokemons.data;
};
