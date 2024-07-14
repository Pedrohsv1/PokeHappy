import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { GetAbility } from "@/app/api/services/get-ability/get-pokemon";
import { Ability } from "@/app/api/services/get-ability/get-ability.interface";
import {
  TypographyH3,
  TypographyMuted,
  TypographyP,
} from "./text-components/text-components";

interface PropsAbility {
  url: string;
}

export const AbilitySolo = ({ url }: PropsAbility) => {
  const [ability, setAbility] = useState<Ability>();

  const mutateAbility = useMutation(GetAbility, {
    onSettled: (data) => {
      setAbility(data);
    },
  });

  useEffect(() => {
    mutateAbility.mutate({
      url,
    });
  }, []);

  return (
    <div>
      <TypographyH3>{ability?.name}</TypographyH3>
      <TypographyP>
        {
          ability?.effect_entries.find((entrie) => entrie.language.name == "en")
            ?.effect
        }
      </TypographyP>
      <TypographyMuted>
        {
          ability?.effect_entries.find((entrie) => entrie.language.name == "en")
            ?.short_effect
        }
      </TypographyMuted>
    </div>
  );
};
