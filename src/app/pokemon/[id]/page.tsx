"use client";

import {
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyMuted,
} from "@/components/text-components/text-components";
import { useState, useEffect } from "react";
import { useMutation } from "react-query";
import { GetPokemon } from "../../api/services/get-pokemon/get-pokemon";
import { Pokemon } from "../../api/services/get-pokemon/get-pokemon.interface";
import { redirect, useParams } from "next/navigation";
import { ImagePokemon } from "@/components/images-pokemon";
import { Skeleton } from "@/components/ui/skeleton";
import { AbilityCard } from "@/components/ability-card";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TypesBadge } from "@/components/types-pokemon";
import { useToast } from "@/components/ui/use-toast";
import { MoveCard } from "@/components/move-card";
import { EvolutionSolo } from "@/components/evolutions";
import { BreadCrumbComp, BreadProps } from "@/components/breadcrum";
import { CardStat } from "@/components/card-stat";
import { GetSpecie } from "@/app/api/services/get-specie/get-specie";
import { Specie } from "@/app/api/services/get-specie/get-specie.interface";
import { CarouselCardsSoloPokemon } from "@/components/carrosel-cards-solo-pokemon";

export default function PokemonPage() {
  const breads: BreadProps = {
    breads: [
      {
        href: "/",
        name: "Pokemons",
      },
    ],
    namePage: "Solo Pokemon",
  };

  const { toast } = useToast();
  const router = useParams();

  const [pokemon, setPokemon] = useState<Pokemon>();
  const [specie, setSpecie] = useState<Specie>();

  const mutatePokemon = useMutation(GetPokemon, {
    onSettled: (data) => {
      setPokemon(data);
      mutateSpecie.mutate({
        url: `pokemon-species/${data?.species.url.split("/")[6]}/`,
      });
    },
    onError: () => {
      toast({
        title: "Algum problema ocorreu, tente novamente.",
        description: "😥 Lembre-se, o número máximo de pokemons é 1025",
      });
      redirect("/");
    },
  });

  const mutateSpecie = useMutation(GetSpecie, {
    onSettled: (data) => {
      setSpecie(data);
    },
  });

  function formatNumberWithZeros(num: number, width: number): string {
    const numStr = num.toString();
    const zeroPadding = width - numStr.length;
    const zeroPaddedNum = "0".repeat(Math.max(0, zeroPadding)) + numStr;
    return `Nº ${zeroPaddedNum}`;
  }

  useEffect(() => {
    if (router.id && Number(router.id) <= 1025)
      mutatePokemon.mutate({
        url: "/pokemon/" + router.id,
      });
    else {
      toast({
        title: "Pokemon inválido, tente novamente.",
        description:
          "Parece que aconteceu um erro 😥. Lembre-se, o número máximo de pokemons é 1025",
      });
      redirect("/");
    }
  }, []);

  return (
    <main className="flex flex-col min-h-screen w-[1366px] gap-4  py-8">
      <BreadCrumbComp breads={breads.breads} namePage={breads.namePage} />

      <div className="w-full space-y-4">
        <div className="space-y-2">
          {pokemon ? (
            <TypographyH1>
              {pokemon?.name.charAt(0).toUpperCase()}
              {pokemon?.name.substring(1)}
            </TypographyH1>
          ) : (
            <TypographyH1>name</TypographyH1>
          )}
          {pokemon ? (
            <TypographyMuted>
              {formatNumberWithZeros(pokemon.id, 4)}
            </TypographyMuted>
          ) : (
            <TypographyMuted>N 00XX</TypographyMuted>
          )}
        </div>

        <div className="grid grid-cols-[288px_2fr_1fr] gap-4">
          {pokemon ? (
            pokemon.sprites.versions["generation-v"]["black-white"].animated
              .front_default ? (
              <ImagePokemon
                sprites={
                  pokemon.sprites.versions["generation-v"]["black-white"]
                    .animated
                }
              />
            ) : (
              pokemon && <ImagePokemon sprites={pokemon.sprites} />
            )
          ) : (
            <div className="space-y-4">
              <Skeleton className="size-[288px] rounded-md" />
              <div className="flex gap-2 items-center">
                <Skeleton className="size-[48px] rounded-full" />
                <Skeleton className="size-[90px]" />
                <Skeleton className="size-[90px]" />
                <Skeleton className="size-[48px] rounded-full" />
              </div>
            </div>
          )}

          <div className="h-full flex flex-col gap-4">
            {specie && (
              <Card>
                <CardHeader>
                  <CardTitle>Specie</CardTitle>
                </CardHeader>
                <CardContent>
                  {
                    specie.flavor_text_entries.filter(
                      (entrie) => entrie.language.name == "en"
                    )[0].flavor_text
                  }
                </CardContent>
              </Card>
            )}
            {pokemon ? (
              <CardStat stats={pokemon.stats} />
            ) : (
              <Card className="flex flex-col gap-2 p-4">
                <Skeleton className="w-20 h-8 mt-2" />
                <Skeleton className="w-20 h-4 mt-2" />
                <div className="grid grid-col-3 gap-2">
                  <Skeleton className="h-16 mt-2" />
                  <Skeleton className="h-16 mt-2" />
                </div>
              </Card>
            )}
            {specie?.evolution_chain && (
              <EvolutionSolo
                url={`evolution-chain/${
                  specie.evolution_chain.url.split("/")[6]
                }`}
              />
            )}

            {pokemon && <CarouselCardsSoloPokemon name={pokemon.name} />}
            {pokemon && <AbilityCard abilities={pokemon.abilities} />}
            {pokemon && <MoveCard moves={pokemon.moves} />}
          </div>
          <div>
            <Card className="flex p-4">
              <CardHeader>
                <TypographyH2>Informations</TypographyH2>
                <CardDescription>
                  Enssencials aspects of this pokemon
                </CardDescription>
                <CardContent className="p-0 gap-4 flex flex-col">
                  <div className="space-y-4 h-full">
                    <TypographyH3>Types</TypographyH3>
                    <TypesBadge types={pokemon?.types} />
                  </div>
                  <div className="space-y-4">
                    <TypographyH3>Base experience</TypographyH3>
                    <div className="flex gap-2 items-center">
                      <div className="w-10 h-4 bg-neutral-800 rounded-md overflow-hidden">
                        <div className="w-5 h-4 animate-pulse bg-emerald-300/10"></div>
                      </div>
                      <TypographyMuted>
                        0/{pokemon?.base_experience}
                      </TypographyMuted>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <TypographyH3>Songs</TypographyH3>
                    {pokemon && (
                      <div className="space-y-2">
                        <TypographyMuted>Latest</TypographyMuted>
                        <audio controls>
                          <source
                            src={pokemon?.cries.latest}
                            type="audio/ogg"
                          />
                        </audio>
                        <TypographyMuted>Legacy</TypographyMuted>
                        <audio controls>
                          <source
                            src={pokemon?.cries.legacy}
                            type="audio/ogg"
                          />
                        </audio>
                      </div>
                    )}
                  </div>
                </CardContent>
              </CardHeader>
            </Card>
          </div>
        </div>
        <div className="grid justify-center gap-4"></div>
      </div>
    </main>
  );
}
