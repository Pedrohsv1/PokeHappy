import { axiosInstance } from "../../axiosInstance";
import { Evolutions } from "./get-evolutions.interface";

interface ParamsEvolutions {
  url: string;
}

export const GetEvolutions = async ({ url }: ParamsEvolutions) => {
  const evolutions = await axiosInstance.get<Evolutions>(url);

  return evolutions.data;
};
