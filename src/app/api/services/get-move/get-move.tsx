import { axiosInstance } from "../../axiosInstance";
import { MoveFull } from "./get-move.interface";

interface ParamsMove {
  url: string;
}

export const GetMove = async ({ url }: ParamsMove) => {
  const move = await axiosInstance.get<MoveFull>(url);

  return move.data;
};
