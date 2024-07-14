import { Type } from "@/app/api/services/get-pokemon/get-pokemon.interface";
import { TypesPokemonColor } from "@/data/types";
import React from "react";
import { Skeleton } from "./ui/skeleton";

interface PropsTypes {
  types?: Type[];
}

export const TypesBadge = ({ types }: PropsTypes) => {
  return (
    <div className="flex gap-2">
      {types ? (
        types?.map((type) => {
          const colorType = TypesPokemonColor.find(
            (t) => t.name == type.type.name
          );
          if (colorType) {
            return (
              <div
                key={type.slot}
                style={{ border: `solid 1px ${colorType.color}` }}
                className={` bg-transparent text-white pointer-events-none rounded-full px-1.5 sm:px-2.5 sm:py-0.5 text-xs font-semibold transition-colors`}
              >
                <p className="h-[1.5em]">{colorType.name}</p>
              </div>
            );
          }
        })
      ) : (
        <Skeleton className="h-6 w-10" />
      )}
    </div>
  );
};
