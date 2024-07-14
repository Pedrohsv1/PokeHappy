import { GetEvolutions } from "@/app/api/services/get-evolutions/get-evolutions";
import { Evolutions } from "@/app/api/services/get-evolutions/get-evolutions.interface";
import { useState, useEffect } from "react";
import { useMutation } from "react-query";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { TypographyH4, TypographyP } from "./text-components/text-components";
import { PokemonHome } from "./pokemon-home";

interface PropsEvolution {
  url: string;
}

export const EvolutionSolo = ({ url }: PropsEvolution) => {
  const [evolutions, setEvolution] = useState<Evolutions>();

  const mutateEvolution = useMutation(GetEvolutions, {
    onSettled: (data) => {
      setEvolution(data);
    },
  });

  useEffect(() => {
    mutateEvolution.mutate({
      url,
    });
  }, []);

  return (
    <Card className="">
      <CardHeader>
        <CardTitle>Evolutions</CardTitle>
      </CardHeader>
      <CardContent>
        {evolutions?.chain.evolves_to.map((evolution) => (
          <div className="grid gap-4 grid-cols-3 ">
            <div className="flex flex-col space-y-4">
              {evolution.evolution_details.map((details) => (
                <div>
                  <TypographyP>Level evolution</TypographyP>
                  {details.min_level}
                </div>
              ))}

              {evolution.species && (
                <PokemonHome
                  url={`/pokemon/${
                    evolution.species.url[evolution.species.url.length - 2]
                  }`}
                />
              )}
            </div>

            {evolution.evolves_to.map((evolve) => (
              <div className="flex flex-col space-y-4">
                {evolve.evolution_details.map((details) => (
                  <div>
                    <TypographyP>Level evolution</TypographyP>
                    {details.min_level}
                  </div>
                ))}
                {evolve.species && (
                  <PokemonHome
                    url={`/pokemon/${
                      evolve.species.url[evolve.species.url.length - 2]
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
