import { GetEvolutions } from "@/app/api/services/get-evolutions/get-evolutions";
import { Evolutions } from "@/app/api/services/get-evolutions/get-evolutions.interface";
import { useState, useEffect } from "react";
import { useMutation } from "react-query";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { TypographyP } from "./text-components/text-components";
import { PokemonHome } from "./pokemon-home";
import React from "react";

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
        <div className="grid gap-4 grid-cols-3 ">
          {evolutions && (
            <div className="flex flex-col space-y-2">
              <div className="flex flex-col gap-1">
                <p className="text-base ">Firts Evolution</p>
                <p className="text-base text-purple-400">Lv 0</p>
              </div>
              {evolutions?.chain.species && (
                <PokemonHome
                  url={`/pokemon/${evolutions.chain.species.url.split("/")[6]}`}
                />
              )}
            </div>
          )}

          {evolutions?.chain?.evolves_to.map((evolution, index) => (
            <React.Fragment key={index}>
              <div className="flex flex-col space-y-2">
                {evolution.evolution_details.map((details) => (
                  <div className="flex flex-col gap-1">
                    {details.min_level ? (
                      <React.Fragment>
                        <p className="text-base ">Level evolution</p>
                        <p className="text-base text-purple-400">
                          {details.min_level}
                        </p>
                      </React.Fragment>
                    ) : details.min_happiness ? (
                      <React.Fragment>
                        <p className="text-base ">Min Happiness</p>
                        <p className="text-base text-purple-400">
                          {details.min_happiness} 😁
                        </p>
                      </React.Fragment>
                    ) : details.item ? (
                      <React.Fragment>
                        <p className="text-base ">Item evolution</p>
                        <p className="text-base text-purple-400">
                          {details.item.name}
                        </p>
                      </React.Fragment>
                    ) : details.held_item ? (
                      <React.Fragment>
                        <p className="text-base ">Item evolution</p>
                        <p className="text-base text-purple-400">
                          {details.held_item.name}
                        </p>
                      </React.Fragment>
                    ) : (
                      details.trade_species && (
                        <div>
                          <p className="text-base ">Trade</p>
                          <p className="text-base text-purple-400">
                            {details.trade_species}
                          </p>
                        </div>
                      )
                    )}
                  </div>
                ))}

                {evolution.species && (
                  <PokemonHome
                    url={`/pokemon/${evolution.species.url.split("/")[6]}`}
                  />
                )}
              </div>

              {evolution.evolves_to.map((evolve) => (
                <div className="flex flex-col space-y-2">
                  {evolve.evolution_details.map((details) => (
                    <div className="flex flex-col gap-1">
                      {details.min_level ? (
                        <React.Fragment>
                          <p className="text-base ">Level evolution</p>
                          <p className="text-base text-purple-400">
                            {details.min_level}
                          </p>
                        </React.Fragment>
                      ) : details.min_happiness ? (
                        <React.Fragment>
                          <p className="text-base ">Min Happiness</p>
                          <p className="text-base text-purple-400">
                            {details.min_happiness} 😁
                          </p>
                        </React.Fragment>
                      ) : details.item ? (
                        <React.Fragment>
                          <p className="text-base ">Item evolution</p>
                          <p className="text-base text-purple-400">
                            {details.item.name}
                          </p>
                        </React.Fragment>
                      ) : details.held_item ? (
                        <React.Fragment>
                          <p className="text-base ">Item evolution</p>
                          <p className="text-base text-purple-400">
                            {details.held_item.name}
                          </p>
                        </React.Fragment>
                      ) : (
                        details.trade_species && (
                          <div>
                            <p className="text-base ">Trade</p>
                            <p className="text-base text-purple-400">
                              {details.trade_species}
                            </p>
                          </div>
                        )
                      )}
                    </div>
                  ))}
                  {evolve.species && (
                    <PokemonHome
                      url={`/pokemon/${evolve.species.url.split("/")[6]}`}
                    />
                  )}
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
