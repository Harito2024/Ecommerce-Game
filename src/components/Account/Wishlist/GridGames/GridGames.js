import styles from "./GridGames.module.scss";
import Link from "next/link";
import { map } from "lodash";
import { Label, WishlistIcon } from "@/components/Shared";
import { fn } from "@/utils";

export function GridGames(props) {
  const { wishlist, onReload } = props;
  const urlStrapi = "http://localhost:1337";
  return (
    <div className={styles.gridGames}>
      {map(wishlist, (item) => {
        const game = item.attributes.game.data;
        const cover =
          item.attributes.game.data.attributes.cover.data.attributes.url;

        const gameUrl = game.attributes.slug;
        const coverUrl = `${urlStrapi}${cover}`;

        return (
          <div key={item.id} className={styles.game}>
            <Link href={gameUrl}>
              <div>
                <img src={coverUrl}></img>
                {game.attributes.discount > 0 && (
                  <Label.Discount className={styles.discount}>
                    {`-${game.attributes.discount}%`}
                  </Label.Discount>
                )}
              </div>
              <div>
                <span>{game.attributes.title}</span>
                <span className={styles.price}>
                  $
                  {fn.calcDiscountedPrice(
                    game.attributes.price,
                    game.attributes.discount
                  )}
                </span>
              </div>
            </Link>
            <WishlistIcon
              gameId={game.id}
              className={styles.wishlistIcon}
              removeCallback={onReload}
            ></WishlistIcon>
          </div>
        );
      })}
    </div>
  );
}
