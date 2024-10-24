import { useState, useEffect } from "react";
import { Game } from "@/api";
import { GridGames } from "@/components/Shared";

const gameCtrl = new Game();

export function LastestGames(props) {
  const { title, limit = 9, platformId = null } = props;
  const [games, setGames] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await gameCtrl.getLastestPublished({
        limit,
        platformId,
      });
      setGames(response.data);
    })();
  }, []);

  if (!games) return null;

  return (
    <div>
      <h2>{title}</h2>
      <GridGames games={games} />
    </div>
  );
}
