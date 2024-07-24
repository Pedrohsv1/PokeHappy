import { Stat } from "@/app/api/services/get-pokemon/get-pokemon.interface";
import {
  HeartCrack,
  Sword,
  Shield,
  Swords,
  ShieldHalf,
  Wind,
} from "lucide-react";
import { TypographyH2 } from "./text-components/text-components";
import { Card, CardHeader, CardDescription, CardContent } from "./ui/card";

interface CardStatsProps {
  stats: Stat[];
}

export const CardStat = ({ stats }: CardStatsProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-col">
        <TypographyH2>Stats</TypographyH2>
        <CardDescription>Default stats</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-4">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col gap-2">
              <div className="flex gap-2">
                {stat.stat.name === "hp" ? (
                  <HeartCrack className="size-6" />
                ) : stat.stat.name === "attack" ? (
                  <Sword className="size-6" />
                ) : stat.stat.name === "defense" ? (
                  <Shield className="size-6" />
                ) : stat.stat.name === "special-attack" ? (
                  <Swords className="size-6" />
                ) : stat.stat.name === "special-defense" ? (
                  <ShieldHalf className="size-6" />
                ) : (
                  <Wind className="size-6" />
                )}
                <p>
                  {stat.stat.name === "hp"
                    ? "Health Point"
                    : stat.stat.name === "attack"
                    ? "Attack"
                    : stat.stat.name === "defense"
                    ? "Defense"
                    : stat.stat.name === "special-attack"
                    ? "Special Attack"
                    : stat.stat.name === "special-defense"
                    ? "Special Defense"
                    : "Speed"}
                </p>
              </div>

              <p
                className={`text-md  ${
                  stat.stat.name === "hp"
                    ? "text-emerald-400"
                    : stat.stat.name === "attack"
                    ? "text-red-300"
                    : stat.stat.name === "defense"
                    ? "text-blue-300"
                    : stat.stat.name === "special-attack"
                    ? "text-red-400"
                    : stat.stat.name === "special-defense"
                    ? "text-blue-400"
                    : "text-yellow-400"
                }`}
              >
                {stat.base_stat}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
