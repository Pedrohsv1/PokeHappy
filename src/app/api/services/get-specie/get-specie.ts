import { axiosInstance } from "../../axiosInstance";
import { Specie } from "./get-specie.interface";

interface ParamsSpecie {
  url: string;
}

export const GetSpecie = async ({ url }: ParamsSpecie) => {
  const specie = await axiosInstance.get<Specie>(url);

  return specie.data;
};
