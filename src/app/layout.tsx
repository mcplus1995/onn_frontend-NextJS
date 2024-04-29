import "./globals.scss";

import Layout from "@/components/Layout/Layout";
import LayoutWrapper from "@/components/LayoutWrapper";
import env from "@/env";
import { getGlobals } from "@/utils/directus";
import { linkifyAsset } from "@/utils/linkUtils";

export async function generateMetadata() {
  const global = await getGlobals();
  return {
    title: global.title,
    description: global.description,
  };
}

// Revalidate every 0 seconds to surface backend changes quickly but still cache at least a bit
export const revalidate = env.settings.revalidate;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { favicon } = await getGlobals();
  return (
    <html lang="en">
      <head>
        <link rel="icon" href={linkifyAsset(favicon)} />
      </head>
      <LayoutWrapper>
        <body>
          <Layout>{children}</Layout>
        </body>
      </LayoutWrapper>
    </html>
  );
}
