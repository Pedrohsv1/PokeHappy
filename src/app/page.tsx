"use client";

import { useMutation } from "react-query";
import { useEffect, useState } from "react";
import { PokemonHome } from "@/components/pokemon-home";
import {
  TypographyH1,
  TypographyH4,
  TypographyMuted,
  TypographyP,
} from "@/components/text-components/text-components";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationEllipsis,
  PaginationNext,
} from "@/components/ui/pagination";
import React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  GetPokemons,
  ResultPokemonsGetAll,
} from "./api/services/get-pokemons/get-pokemons";
import { useToast } from "@/components/ui/use-toast";
import { Filters } from "@/components/filters";
import { PaginationComp } from "@/components/pagenation";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  const { toast } = useToast();

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [inputUser, setInputUser] = useState<string>("");

  const offset = 0;
  const limit = Number(searchParams.get("limit")) || 20;
  const numberPages = Math.ceil(1026 / limit);
  const [page, setPage] = useState<number>(
    Number(searchParams.get("page")) > numberPages
      ? () => {
          toast({
            title: `Ops! Parece que chegou muito longe! A página ${Number(
              searchParams.get("page")
            )} não existe.`,
          });
          replace(`${pathname}?page=1&limit=${limit}`);

          return 1;
        }
      : Number(searchParams.get("page")) || 1
  );

  const [pokemons, setPokemons] = useState<ResultPokemonsGetAll>();
  const getPokemons = useMutation(GetPokemons, {
    onSuccess: (data) => {
      setPokemons(data);
    },
  });

  useEffect(() => {
    if (inputUser != "" && inputUser.length > 0) {
      getPokemons.mutate({
        limit: 1026,
        offset: 0,
      });
    } else {
      getPokemons.mutate({
        limit: limit,
        offset: offset + (page - 1) * limit,
      });
    }
  }, [inputUser, page]);

  function handlePagenation(pageNew: number) {
    replace(`${pathname}?page=${pageNew}&limit=${limit}`);
    setPage(pageNew);
  }

  return (
    <main className="flex flex-col min-h-screen max-w-[1366px] gap-4 py-8 ">
      <TypographyP>1026 Cadastrados</TypographyP>
      <div className="flex items-center gap-4">
        <Search className="size-6" />
        <Input
          value={inputUser}
          onChange={(e) => setInputUser(e.currentTarget.value)}
        />
      </div>
      <TypographyMuted>
        De {offset + (page - 1) * limit} Até {offset + page * limit}
      </TypographyMuted>
      <div className="h-[1px] w-full bg-neutral-800"></div>
      <div className="grid  gap-4  xl:grid-cols-[200px_1fr]">
        <div>
          <Filters />
        </div>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 md:grid-cols-3 xl:grid-cols-5 ">
          {!pokemons || getPokemons.isLoading
            ? Array(20)
                .fill(undefined)
                .map((_, index) => (
                  <div
                    key={index}
                    style={{ height: "18.5em" }}
                    className="bg-neutral-800 animate-pulse flex rounded-md  sm:min-w-48 min-w-36 "
                  />
                ))
            : pokemons.results.map((pokemon, index) => {
                if (inputUser != "" && inputUser.length > 0) {
                  if (pokemon.name.indexOf(inputUser.toLowerCase()) !== -1) {
                    return <PokemonHome url={pokemon.url} />;
                  }
                } else {
                  return <PokemonHome url={pokemon.url} />;
                }
              })}
          {inputUser.length > 0 &&
            pokemons?.results.filter((pokemon) =>
              pokemon.name.toLowerCase().includes(inputUser.toLowerCase())
            ).length === 0 && (
              <Card className="col-span-5 lg:cols-span-4 md:cols-span-3 xl:cols-span-5">
                <CardHeader>
                  <CardTitle>Error in the search</CardTitle>
                </CardHeader>
                <CardContent>
                  <TypographyMuted>
                    Nenhum Pokémon com o nome '{inputUser}' encontrado. Por
                    favor, verifique se o nome está correto e tente novamente.
                    Um abraço da equipe Tech. 😶😑
                  </TypographyMuted>
                </CardContent>
              </Card>
            )}
        </div>
      </div>

      {pokemons && inputUser.length == 0 && (
        <PaginationComp
          page={page}
          numberPages={numberPages}
          handlePagenation={handlePagenation}
        />
      )}
    </main>
  );
}
