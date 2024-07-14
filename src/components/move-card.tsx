import { Mfe } from "@/app/api/services/get-pokemon/get-pokemon.interface";
import {
  TypographyH2,
  TypographyH3,
  TypographyMuted,
  TypographyP,
} from "./text-components/text-components";
import { Card, CardHeader, CardDescription, CardContent } from "./ui/card";
import { MoveStats } from "./move";

interface PropsMoveCard {
  moves: Mfe[];
}

export const MoveCard = ({ moves }: PropsMoveCard) => {
  return (
    <Card>
      <CardHeader>
        <TypographyH2>Moves</TypographyH2>
        <CardDescription>Attacks from the games</CardDescription>
      </CardHeader>
      <CardContent>
        {moves &&
          moves.map((move, index) => (
            <div key={index}>
              <MoveStats url={move.move.url} />
              <div className="flex flex-col">
                <p className="text-sm text-muted-foreground text-violet-400 mt-4">
                  Learned At Level{" "}
                  {move.version_group_details[0].level_learned_at}
                  <br />
                  Version: {move.version_group_details[0].version_group.name}
                </p>
              </div>
              <div className="mt-4 h-[1px] mb-8 rounded-full bg-neutral-700" />
            </div>
          ))}
      </CardContent>
    </Card>
  );
};
