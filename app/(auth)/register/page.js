import Register from "@/components/Register";

export const metadata = {
  title: "Register | MyHome2U",
  description: "Create an account on MyHome2U to rent or buy properties easily.",
  keywords: "register, MyHome2U, rent, buy, properties, account",
  openGraph: {
    title: "Register | MyHome2U",
    description: "Create an account on MyHome2U to rent or buy properties easily.",
    url: `${process.env.DOMAIN}/register`,
    siteName: "MyHome2U",
    images: [
      {
        url: `${process.env.DOMAIN}/static/register-page.png`,
        width: 1200,
        height: 630,
        alt: "Register on MyHome2U",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Register | MyHome2U",
    description: "Create an account on MyHome2U to rent or buy properties easily.",
    images: [`${process.env.DOMAIN}/static/register-page.png`],
  },
};

export default function Page() {
  return <Register />;
}
