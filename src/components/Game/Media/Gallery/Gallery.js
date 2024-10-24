import styles from "./Gallery.module.scss";
import { Image } from "semantic-ui-react";
import { map } from "lodash";
import Slider from "react-slick";
import { FullModal } from "@/components/Shared";
import { useState } from "react";

export function Gallery(props) {
  const { screenshots } = props;
  const [show, setShow] = useState(false);
  const urlStrapi = "http://localhost:1337";

  const screenshotsClone = [...screenshots];

  const principalImage = screenshotsClone.shift();
  const principalImageUrl = `${urlStrapi}${principalImage.attributes.url}`;

  const onOpenClose = () => setShow((prevState) => !prevState);

  const settings = {
    dots: true,
    dotsClass: styles.dots,
    infinite: true,
    slidersToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    customPaging: function (index) {
      return <Image src={`${urlStrapi}${screenshots[index].attributes.url}`} />;
    },
  };

  return (
    <>
      <div className={styles.gallery}>
        <div className={styles.principal}>
          <Image src={principalImageUrl} onClick={onOpenClose} />
        </div>

        <div className={styles.grid}>
          {map(screenshotsClone, (screenshots) => (
            <div key={screenshots.id}>
              <Image
                src={`${urlStrapi}${screenshots.attributes.url}`}
                onClick={onOpenClose}
              />
            </div>
          ))}
        </div>
      </div>
      <FullModal show={show} onClose={onOpenClose}>
        <div className={styles.carouselContainer}>
          <Slider {...settings}>
            {map(screenshots, (screenshots) => (
              <div key={screenshots.id}>
                <Image src={`${urlStrapi}${screenshots.attributes.url}`} />
              </div>
            ))}
          </Slider>
        </div>
      </FullModal>
    </>
  );
}
