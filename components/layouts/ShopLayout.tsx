import { FC } from "react";
import Head from "next/head";

import { Footer, Navbar, SideMenu } from "../ui";

interface Props {
  imageFullUrl?: string;
  metaDescription?: string;
  metaKeywords?: string;
  title: string;
}

export const ShopLayout: FC<Props> = ({
  children,
  imageFullUrl,
  metaDescription,
  metaKeywords,
  title,
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={metaDescription} />
        <meta name="og:description" content={metaDescription} />
        <meta name="title" content={`${title} - Audiorealm`} />
        <meta name="og:title" content={`${title} - Audiorealm`} />
        <meta name="keywords" content={metaKeywords} />

        {imageFullUrl && <meta name="og:image" content={imageFullUrl} />}
      </Head>
      <nav>
        <Navbar />
      </nav>
      <SideMenu />
      <main
        style={{
          marginTop: "70px",
        }}
      >
        {children}
      </main>

      <Footer />
    </>
  );
};
