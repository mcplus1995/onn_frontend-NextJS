const env = {
  development: {
    settings: {
      revalidate: (parseInt(process.env.REVALIDATE_DEFAULT || "0") <= 0) ? false : parseInt(process.env.REVALIDATE_DEFAULT || "0") || false,
    },
    urls: {
      backend: process.env.PROD_BACKEND_URL || process.env.NEXT_PUBLIC_PROD_BACKEND_URL || 'http://localhost:8055',
      frontend: process.env.PROD_FRONTEND_URL || process.env.NEXT_PUBLIC_PROD_FRONTEND_URL || 'http://localhost:3003',
      onn: `http://api.onn.localhost:8000/`,
      cms: `http://localhost:3003/`,
      sanctions: `http://localhost:3003/sanctions/`,
    },
  },
  production: {
    settings: {
      revalidate: (parseInt(process.env.REVALIDATE_DEFAULT || "10") <= 0) ? false : parseInt(process.env.REVALIDATE_DEFAULT || "10"),
    },
    urls: {
      backend: process.env.PROD_BACKEND_URL || process.env.NEXT_PUBLIC_PROD_BACKEND_URL || 'https://default-PROD_BACKEND_URL_UNDEFINED',
      frontend: process.env.PROD_FRONTEND_URL || process.env.NEXT_PUBLIC_PROD_FRONTEND_URL || 'https://default-PROD_FRONTEND_URL_UNDEFINED',
      onn: `https://api.opennuclear.org/`,
      cms: `https://analysis.opennuclear.org/`, // Notes for #112:  https://analysis.opennuclear.org/
      sanctions: `https://analysis.opennuclear.org/sanctions/`, // Notes for #112:  https://analysis.opennuclear.org/sanctions/
    },
  },
};

console.log(`[env.ts]: Using this revalidate setting: ${env[process.env.NODE_ENV as "development" | "production"].settings.revalidate}`);

export default env[process.env.NODE_ENV as "development" | "production"];
