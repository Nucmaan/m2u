import Head from "next/head";
import Login from "@/components/Login";

export default function Page() {
  const domain = process.env.NEXT_PUBLIC_DOMAIN|| "http://localhost:3000";

  return (
    <>
      <Head>
        <title>Login - MyHome2U</title>
        <meta
          name="description"
          content="Login to MyHome2U and access your account to explore properties for rent and sale. Join now for a seamless property management experience."
        />
        <meta
          name="keywords"
          content="MyHome2U, login, property rental, property sale, account access"
        />
        <meta name="author" content="MyHome2U Team" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content="Login - MyHome2U" />
        <meta
          property="og:description"
          content="Login to MyHome2U and access your account to explore properties for rent and sale. Join now for a seamless property management experience."
        />
        <meta property="og:url" content={`${domain}/login`} />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content={`${domain}/assets/images/login-page-preview.jpg`}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Login - MyHome2U" />
        <meta
          name="twitter:description"
          content="Login to MyHome2U and access your account to explore properties for rent and sale."
        />
        <meta
          name="twitter:image"
          content={`${domain}/assets/images/login-page-preview.jpg`}
        />
        <link rel="canonical" href={`${domain}/login`} />
      </Head>
      <Login />
    </>
  );
}
