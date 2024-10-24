import { BasicLayout } from "@/layouts";
import { Game } from "@/components/Game";
import { Separator } from "@/components/Shared";

export default function GamePage(props) {
  const { game } = props;
  const games = game.data[0];

  const wallpaper = games.attributes.wallpaper;

  const urlStrapi = "http://localhost:1337";
  const wallpaperUrl = `${urlStrapi}${wallpaper.data.attributes.url}`;

  return (
    <>
      <BasicLayout>
        <Game.HeaderWallpaper image={wallpaperUrl} />
        <Game.Panel gameId={games.id} game={games.attributes} />
        <Separator height={50} />

        <Game.Info game={games.attributes} />
        <Separator height={30} />

        <Game.Media
          video={games.attributes.video}
          screenshots={games.attributes.screenshots.data}
        />
        <Separator height={50} />
      </BasicLayout>
    </>
  );
}
