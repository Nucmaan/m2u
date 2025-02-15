import Register from "@/components/Register";
import Head from "next/head";

export default function Page() {
  const domain = process.NEXT_PUBLIC_DOMAIN || "http://localhost:3000"; // Fallback for development

  return (
    <>
      <Head>
        <title>Register | MyHome2U</title>
        <meta
          name="description"
          content="Create an account on MyHome2U to rent or buy properties easily."
        />
        <meta name="keywords" content="register, MyHome2U, rent, buy, properties, account" />
        <meta property="og:title" content="Register | MyHome2U" />
        <meta
          property="og:description"
          content="Create an account on MyHome2U to rent or buy properties easily."
        />
        <meta property="og:url" content={`${domain}/register`} />
        <meta property="og:site_name" content="MyHome2U" />
        <meta
          property="og:image"
          content={`${domain}/static/register-page.png`}
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Register | MyHome2U" />
        <meta
          name="twitter:description"
          content="Create an account on MyHome2U to rent or buy properties easily."
        />
        <meta name="twitter:image" content={`${domain}/static/register-page.png`} />
        <link rel="canonical" href={`${domain}/register`} />
      </Head>
      <Register />
    </>
  );
}
