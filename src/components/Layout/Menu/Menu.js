import { useEffect, useState } from "react";
import styles from "./Menu.module.scss";
import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import { Image, Icon, Input } from "semantic-ui-react";
import { map } from "lodash";
import { Platform } from "@/api";

const platformsCtrl = new Platform();

export function Menu(props) {
  const { isOpenSearch } = props;
  const [platforms, setPlatforms] = useState(null);
  const [showSearch, setShowSearch] = useState(isOpenSearch);
  const [searchText, setSearchText] = useState("");
  const router = useRouter();

  const openCloseSearch = () => setShowSearch((prevState) => !prevState);

  useEffect(() => {
    (async () => {
      try {
        const response = await platformsCtrl.getAll();
        setPlatforms(response.data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  useEffect(() => {
    setSearchText(router.query.s || "");
  }, []);

  const onSearch = (text) => {
    setSearchText(text);
    router.replace(`/search?s=${text}`);
  };

  return (
    <div className={styles.platforms}>
      {map(platforms, (i) => (
        <Link key={i.id} href={`/games/${i.attributes.slug}`}>
          {<Image src={i.attributes.icon.data.attributes.url} />}
          {i.attributes.title}
        </Link>
      ))}

      <button className={styles.search} onClick={openCloseSearch}>
        <Icon name="search" />
      </button>

      <div
        className={classNames(styles.inputContainer, {
          [styles.active]: showSearch,
        })}
      >
        <Input
          id="search-games"
          placeholder="Buscador"
          className={styles.input}
          focus={true}
          value={searchText}
          onChange={(_, data) => onSearch(data.value)}
        />
        <Icon
          name="close"
          className={styles.closeInput}
          onClick={openCloseSearch}
        ></Icon>
      </div>
    </div>
  );
}
