import { axiosInstance } from "../../axiosInstance";
import { Ability } from "./get-ability.interface";

interface ParamsAbility {
  url: string;
}

export const GetAbility = async ({ url }: ParamsAbility) => {
  const ability = await axiosInstance.get<Ability>(url);

  return ability.data;
};
