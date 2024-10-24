import { Platform, Game } from "@/api";
export { default } from "./platform";

export async function getServerSideProps(context) {
  const { query, params } = context;
  const { page = 1 } = query;
  const { platform } = params;

  const platformCtrl = new Platform();

  const responsePlatform = await platformCtrl.getBySlug(platform);

  const gameCtrol = new Game();
  const responseGame = await gameCtrol.getGamesByPlatformSlug(platform, page);

  return {
    props: {
      platform: responsePlatform,
      games: responseGame,
      pagination: responseGame.meta.pagination,
    },
  };
}
