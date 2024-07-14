import {
  RedBlue,
  Sprites,
} from "@/app/api/services/get-pokemon/get-pokemon.interface";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { useEffect, useState } from "react";

interface PropsImagePokemon {
  sprites: Sprites;
}

export const ImagePokemon = ({ sprites }: PropsImagePokemon) => {
  const [img, setImg] = useState<string>(sprites.front_default);

  useEffect(() => {}, [img]);
  return (
    <div className="space-y-4">
      <Image
        className="p-16 w-[288px] h-[288px] bg-neutral-900 rounded-lg"
        src={img}
        alt={""}
        width={288}
        height={288}
      />
      <Carousel
        className="w-[190px] ml-12"
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent className="-ml-4">
          {sprites.front_default && (
            <CarouselItem key={1} className="basis-1/2">
              <Image
                onClick={() => setImg(sprites.front_default)}
                className="p-4 hover:bg-neutral-700 border  w-[90px] h-[90px] bg-neutral-900 rounded-lg"
                src={sprites.front_default}
                alt={""}
                width={90}
                height={90}
              />
            </CarouselItem>
          )}
          {sprites.back_default && (
            <CarouselItem key={2} className="basis-1/2">
              <Image
                onClick={() => setImg(sprites.back_default)}
                className="p-4 hover:bg-neutral-700 border  w-[90px] h-[90px] bg-neutral-900 rounded-lg"
                src={sprites.back_default}
                alt={""}
                width={90}
                height={90}
              />
            </CarouselItem>
          )}
          {sprites.front_female && (
            <CarouselItem key={3} className="basis-1/2">
              <Image
                onClick={() => setImg(sprites.front_female)}
                className="p-4 hover:bg-neutral-700 border  w-[90px] h-[90px] bg-neutral-900 rounded-lg"
                src={sprites.front_female}
                alt={""}
                width={90}
                height={90}
              />
            </CarouselItem>
          )}
          {sprites.back_female && (
            <CarouselItem key={4} className="basis-1/2">
              <Image
                onClick={() => setImg(sprites.back_female)}
                className="p-4 hover:bg-neutral-700 border  w-[90px] h-[90px] bg-neutral-900 rounded-lg"
                src={sprites.back_female}
                alt={""}
                width={90}
                height={90}
              />
            </CarouselItem>
          )}
          {sprites.front_shiny && (
            <CarouselItem key={5} className="basis-1/2">
              <Image
                onClick={() => setImg(sprites.front_shiny)}
                className="p-4 hover:bg-neutral-700 border  w-[90px] h-[90px] bg-neutral-900 rounded-lg"
                src={sprites.front_shiny}
                alt={""}
                width={90}
                height={90}
              />
            </CarouselItem>
          )}
          {sprites.back_shiny && (
            <CarouselItem key={6} className="basis-1/2">
              <Image
                onClick={() => setImg(sprites.back_shiny)}
                className="p-4 hover:bg-neutral-700 border  w-[90px] h-[90px] bg-neutral-900 rounded-lg"
                src={sprites.back_shiny}
                alt={""}
                width={90}
                height={90}
              />
            </CarouselItem>
          )}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};
