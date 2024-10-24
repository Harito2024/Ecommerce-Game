import Head from "next/head";

export function Seo(props) {
  const {
    title = "Gaming - Tus juegos Favoritos.",
    description = "Tus Juegos favoritos para Steam, PlayStation, Xbox, Swiych al mejor precio.",
  } = props;

  return (
    <Head>
      <title>{title}</title>
      <meta property="description" content={description}></meta>
    </Head>
  );
}
