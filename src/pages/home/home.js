import { BasicLayout } from "@/layouts";
import { Home } from "@/components/Home";
import { Separator, BarTrust, BannerAd } from "@/components/Shared";
import { Container } from "semantic-ui-react";

const platfomrId = {
  playstation: 1,
  xbox: 3,
  nintendo: 3,
  pc: 4,
};
export default function HomePage() {
  return (
    <>
      <BasicLayout>
        <Home.BannerLastGamePublished />
        <Separator height={100} />
        <Container>
          <Home.LastestGames title="Ultimos Lanzamientos" />
        </Container>
        <Separator height={100} />
        <BarTrust />
        <Separator height={100} />
        <Container>
          <Home.LastestGames
            title="PlayStation"
            limit={3}
            platformId={platfomrId.playstation}
          />
        </Container>
        <Separator height={100} />

        <BannerAd
          title="Registrate p los Mejores Premios"
          subtitle="Compara juegos"
          btnTitle="Entra a ahora..."
          btnLink="/account"
          image="/images/img01.png"
        />

        <Separator height={50} />

        <Container>
          <Home.LastestGames
            title="Xbox"
            limit={3}
            platformId={platfomrId.xbox}
          />
        </Container>

        <Separator height={50} />
      </BasicLayout>
    </>
  );
}
