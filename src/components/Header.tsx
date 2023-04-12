import Head from "next/head";

const Header = ({ title }: { title: string }) => {
  return (
    <Head>
      <title>{title} | K5</title>
      <link rel="shortcut icon" href="logo_k5.jpeg" type="image/jpeg" />
    </Head>
  );
};

export default Header;
