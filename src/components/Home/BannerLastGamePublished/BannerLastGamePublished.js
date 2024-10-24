import styles from "./BannerLastGamePublished.module.scss";
import { ENV } from "@/utils";
import { Container, Image } from "semantic-ui-react";
import { DateTime } from "luxon";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Game } from "@/api";
import { fn } from "@/utils";
import { Label } from "@/components/Shared";
const gameCtrl = new Game();
export function BannerLastGamePublished() {
  const [game, setGame] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await gameCtrl.getLastPublished();
        setGame(response.data[0]);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  if (!game) return null;

  const wallpaper = game.attributes.wallpaper;
  const releaseDate = new Date(game.attributes.releaseDate).toISOString();
  const server = `${ENV.SERVER_HOST}`;
  const price = fn.calcDiscountedPrice(
    game.attributes.price,
    game.attributes.discount
  );

  return (
    <div className={styles.container}>
      <Image
        src={`${server}${wallpaper.data.attributes.url}`}
        className={styles.wallpaper}
      />
      <Link className={styles.infoContainer} href={game.attributes.slug}>
        <Container>
          <span className={styles.date}>
            {DateTime.fromISO(releaseDate).minus({ days: 1 }).toRelative()}
          </span>
          <h2>{game.attributes.title}</h2>

          <p className={styles.price}>
            <Label.Discount>-{game.attributes.discount}%</Label.Discount>
            <span className={styles.finalPrice}>${price}</span>
          </p>
        </Container>
      </Link>
    </div>
  );
}
