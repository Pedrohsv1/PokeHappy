import { GetPokemon } from "@/app/api/services/get-pokemon/get-pokemon";
import { Pokemon } from "@/app/api/services/get-pokemon/get-pokemon.interface";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import Image from "next/image";
import { TypographyMuted } from "./text-components/text-components";
import { Skeleton } from "./ui/skeleton";
import { TypesBadge } from "./types-pokemon";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import Link from "next/link";

interface PokemonHomeInterface {
  url: string;
}

export const PokemonHome = ({ url }: PokemonHomeInterface) => {
  const [pokemon, setPokemon] = useState<Pokemon>();
  const [img, setImg] = useState<string>();
  const mutatePokemon = useMutation(GetPokemon, {
    onSettled: (data) => {
      setPokemon(data);
      setImg(data?.sprites.front_default);
    },
  });

  function formatNumberWithZeros(num: number, width: number): string {
    const numStr = num.toString();
    const zeroPadding = width - numStr.length;
    const zeroPaddedNum = "0".repeat(Math.max(0, zeroPadding)) + numStr;
    return `Nº ${zeroPaddedNum}`;
  }

  useEffect(() => {
    mutatePokemon.mutate({
      url,
    });
  }, []);

  return (
    <Link href={`/pokemon/${pokemon?.id}`} className="sm:max-w-[200px]">
      <Card
        key={pokemon?.name}
        onMouseOver={() =>
          setImg(
            pokemon?.sprites.versions["generation-v"]["black-white"].animated
              .front_default || pokemon?.sprites.front_default
          )
        }
        onMouseLeave={() => setImg(pokemon?.sprites.front_default)}
        className="hover:bg-neutral-900/30 transition-all duration-300 sm:max-w-[200px] h-full"
      >
        <CardHeader className="w-full">
          <CardTitle className="h-12">
            {pokemon?.name.charAt(0).toUpperCase()}
            {pokemon?.name.substring(1)}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2 ">
            {pokemon ? (
              <Image
                src={img || ""}
                alt={""}
                className={`bg-neutral-900 rounded h-[110px] w-[110px] sm:h-[144px] sm:w-[144px] transition-all duration-500  ${
                  pokemon.sprites.versions["generation-v"]["black-white"]
                    .animated.front_default &&
                  pokemon.sprites.versions["generation-v"]["black-white"]
                    .animated.front_default == img &&
                  "p-8"
                }`}
                width={144}
                height={144}
              />
            ) : (
              <Skeleton className="h-[110px] w-[110px] sm:h-[144px] sm:w-[144px]" />
            )}
            {pokemon ? (
              <TypographyMuted>
                {formatNumberWithZeros(pokemon.id, 4)}
              </TypographyMuted>
            ) : (
              <TypographyMuted>N 00XX</TypographyMuted>
            )}

            <TypesBadge types={pokemon?.types} />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
