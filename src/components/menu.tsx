import Image from "next/image";
import Link from "next/link";
import { TypographyH4 } from "./text-components/text-components";

export const Menu = () => {
  return (
    <div className="z-20 flex justify-center items-center py-4 border border-neutral-800 rounded-b-lg px-12 w-max-[1366px]  sticky top-0 bg-neutral-950">
      <Link href={"/"} className="flex items-center justify-center">
        <Image src={"/logo.png"} width={64} height={64} alt="logo pokemon" />
        <div className="-space-y-2">
          <TypographyH4>Poke</TypographyH4>
          <TypographyH4>Happy</TypographyH4>
        </div>
      </Link>
    </div>
  );
};
