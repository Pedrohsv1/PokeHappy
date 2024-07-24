import React, { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { TypographyH2 } from "./text-components/text-components";
import { useMutation } from "react-query";
import { GetCards } from "@/app/api/services/get-cards-by-name/get-cards";
import { Daum } from "@/app/api/services/get-cards-by-name/get-cards-by-name.interface";
import Image from "next/image";
import Link from "next/link";

interface PropsCardsSolo {
  name: string;
}

export const CarouselCardsSoloPokemon = ({ name }: PropsCardsSolo) => {
  const [cards, setCards] = useState<Daum[]>([]);
  const cardsMutate = useMutation(GetCards, {
    onSettled: (data) => {
      if (data?.data) setCards(data?.data);
    },
  });

  useEffect(() => {
    cardsMutate.mutate({
      url: "cards",
      name,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Card className="">
      <CardHeader>
        <CardTitle>
          Cards {name.charAt(0).toUpperCase() + name.substring(1)}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-center">
        <Carousel
          className="w-[550px]"
          opts={{
            align: "start",
            loop: false,
          }}
        >
          <CarouselNext />

          <CarouselContent className="flex w-full -ml-4">
            {cardsMutate.isSuccess &&
              cards &&
              cards.map((card) => (
                <CarouselItem key={card.id} className="basis-1/3">
                  <Link
                    href={"#"}
                    className="overflow-hidden rounded-sm cursor-pointer hover:opacity-80 transition-all"
                  >
                    <Image
                      src={card.images.large}
                      height={480}
                      width={660}
                      alt={`Pokemon card: ${card.name}`}
                      className="h-auto w-auto"
                    />
                    <div className="flex items-center justify-center mt-2 py-1 bg-gray-800 rounded-full text-xs">
                      <h3 className="">{card.name}</h3>
                    </div>
                  </Link>
                </CarouselItem>
              ))}
          </CarouselContent>
          <CarouselPrevious />
        </Carousel>
      </CardContent>
    </Card>
  );
};
