/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: 'localhost',
                port: '8055'
            },
            { hostname: 'backend.opennuclear.org', port: '' },
            {
                hostname: 'backend.st.opennuclear.org', port: '',
            }
        ],
        dangerouslyAllowSVG: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },

};

export default nextConfig;
