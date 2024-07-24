import { axiosTCG } from "../../axiosInstance";
import { GetPokemonCards } from "./get-cards-by-name.interface";

interface ParamsCards {
  url: string;
  name?: string;
}

export const GetCards = async ({ url, name }: ParamsCards) => {
  const cards = await axiosTCG.get<GetPokemonCards>(url, {
    params: {
      q: `name:${name}`,
    },
  });

  return cards.data;
};
