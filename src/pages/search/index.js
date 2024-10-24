export { default } from "./search";
import { Game } from "@/api";
export async function getServerSideProps(context) {
  const {
    query: { s, page = 1 },
  } = context;

  const gameCtrl = new Game();
  const response = await gameCtrl.searchGame(s, page);
  return {
    props: {
      games: response.data,
      pagination: response.meta.pagination,
      searchText: s,
    },
  };
}
