import { Ability } from "@/app/api/services/get-pokemon/get-pokemon.interface";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "./ui/card";
import { AbilitySolo } from "./ability";
import { TypographyH2 } from "./text-components/text-components";

interface PropsAbility {
  abilities: Ability[];
}

export const AbilityCard = ({ abilities }: PropsAbility) => {
  return (
    <Card className=" h-full">
      <CardHeader>
        <CardTitle>Abilities</CardTitle>
        <CardDescription>Abilities that this pokemon have.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {abilities.map((ablt) => (
          <AbilitySolo key={ablt.slot} url={ablt.ability.url} />
        ))}
      </CardContent>
    </Card>
  );
};
