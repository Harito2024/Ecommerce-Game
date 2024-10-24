import styles from "./Panel.module.scss";
import { Button, Container, Icon, Image } from "semantic-ui-react";
import { useCart } from "@/hooks";
import { useState } from "react";

import { fn } from "@/utils";
import { WishlistIcon } from "@/components/Shared";

export function Panel(props) {
  const [loading, setLoading] = useState(false);
  const { addCart } = useCart();
  const { gameId, game } = props;

  const addCartWrapper = () => {
    setLoading(true);
    addCart(gameId);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  const urlStrapi = "http://localhost:1337";
  const cover = `${urlStrapi}${game.cover.data.attributes.url}`;
  const icon = `${urlStrapi}${game.platform.data.attributes.icon.data.attributes.url}`;
  const platform = game.platform.data;
  const buyPrice = fn.calcDiscountedPrice(game.price, game.discount);

  return (
    <Container className={styles.panel}>
      <div className={styles.imgContainer}>
        <Image src={cover} />
      </div>

      <div className={styles.actionsContainer}>
        <div>
          <h2>{game.title}</h2>
          <div className={styles.moreInfo}>
            <span>
              {<Image src={icon} />}
              {platform.attributes.title}
            </span>
            <span>
              <Icon name="check" />
              En Stock
            </span>
          </div>
          <div className={styles.price}>
            {game.discount > 0 && (
              <>
                <span className={styles.originalPrice}>
                  <Icon name="tag" />
                  {game.price}
                </span>
                <span className={styles.discount}>-{game.discount}%</span>
              </>
            )}
            <span className={styles.price}>{buyPrice}</span>
          </div>
          <Button primary fluid onClick={addCartWrapper} loading={loading}>
            Comprar Ahora
          </Button>
          <WishlistIcon gameId={gameId} className={styles.heart} />
        </div>
      </div>
    </Container>
  );
}
