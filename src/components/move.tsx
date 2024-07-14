import { GetMove } from "@/app/api/services/get-move/get-move";
import { MoveFull } from "@/app/api/services/get-move/get-move.interface";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import {
  TypographyH3,
  TypographyMuted,
  TypographyP,
} from "./text-components/text-components";
import { Skeleton } from "./ui/skeleton";
import { Percent, Sword, Timer } from "lucide-react";
import { TypesPokemonColor } from "@/data/types";

interface PropsMoveCard {
  url: string;
}

export const MoveStats = ({ url }: PropsMoveCard) => {
  const [move, setMove] = useState<MoveFull>();
  const mutateMove = useMutation(GetMove, {
    onSettled: (data) => {
      setMove(data);
      setColor(
        TypesPokemonColor.find((t) => t.name == data?.type.name)
          ? TypesPokemonColor.find((t) => t.name == data?.type.name)?.color
          : `#fff`
      );
    },
  });

  const [color, setColor] = useState<string>();

  useEffect(() => {
    mutateMove.mutate({
      url,
    });
  }, []);
  if (move) {
    return (
      <div>
        <TypographyH3>{move.name}</TypographyH3>
        <div className="flex">
          {move.type && (
            <div
              style={{ border: `solid 1px ${color}` }}
              className={` bg-transparent text-white pointer-events-none rounded-full mt-2 px-2.5 py-0.5 text-xs font-semibold transition-colors`}
            >
              <p className="h-[1.5em]">{move.type.name}</p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-3 mt-6">
          {move.accuracy && (
            <div className="flex items-center gap-4">
              <Percent className="size-4" />
              <p>{move.accuracy}</p>
            </div>
          )}
          {move.power && (
            <div className="flex items-center gap-4">
              <Sword className="size-4" />
              <p>{move.power}</p>
            </div>
          )}

          <div className="flex items-center gap-4">
            <Timer className="size-4" />
            <p>
              {move.pp}/{move.pp}
            </p>
          </div>
        </div>
        <TypographyP>
          {
            move.effect_entries.find((entrie) => entrie.language.name == "en")
              ?.effect
          }
        </TypographyP>
        <TypographyMuted>
          {
            move.effect_entries.find((entrie) => entrie.language.name == "en")
              ?.short_effect
          }
        </TypographyMuted>
      </div>
    );
  } else {
    return <Skeleton />;
  }
};
