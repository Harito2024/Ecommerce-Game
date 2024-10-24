import styles from "./WishlistIcon.module.scss";
import classNames from "classnames";
import { Icon } from "semantic-ui-react";
import { Wishlist } from "@/api";
import { useAuth } from "@/hooks";
import { useState, useEffect } from "react";

const wishlistCtrol = new Wishlist();
export function WishlistIcon(props) {
  const { gameId, className, removeCallback } = props;
  const [hasWishlist, setHasWishlist] = useState(null);
  const { user } = useAuth();
  useEffect(() => {
    (async () => {
      try {
        const response = await wishlistCtrol.check(user.id, gameId);
        setHasWishlist(response);
      } catch (error) {
        setHasWishlist(false);
        console.error(error);
      }
    })();
  }, [gameId]);

  const addWishlist = async () => {
    const response = await wishlistCtrol.add(user.id, gameId);
    setHasWishlist(response);
    console.log(response);
  };

  const deleteWishlist = async () => {
    try {
      await wishlistCtrol.delete(hasWishlist.id);
      setHasWishlist(false);

      if (removeCallback) {
        removeCallback();
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (hasWishlist === null) return null;

  return (
    <Icon
      name={hasWishlist ? "heart" : "heart outline"}
      onClick={hasWishlist ? deleteWishlist : addWishlist}
      className={classNames(styles.wishlistIcon, {
        [className]: className,
      })}
    />
  );
}
