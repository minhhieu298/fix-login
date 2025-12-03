/* eslint-disable @typescript-eslint/no-require-imports */
const NextFederationPlugin = require("@module-federation/nextjs-mf");
// const { rewritesConfig } = require("./routes.ts");

const isProduction = process.env.NODE_ENV === "production";

const remoteUrls = {
  development: {
    customer:
      "customer@http://localhost:8000/customer/_next/static/chunks/remoteEntry.js",
    securities:
      "securities@http://localhost:8006/securities/_next/static/chunks/remoteEntry.js",
    report:
      "report@http://localhost:8008/report/_next/static/chunks/remoteEntry.js",
    transfer:
      "transfer@http://localhost:8002/transfer/_next/static/chunks/remoteEntry.js",
  },
  production: {
    customer: `customer@${process.env.NEXT_PUBLIC_NEXT_DOMAIN_WEB}/customer/_next/static/chunks/remoteEntry.js`,
    securities: `securities@${process.env.NEXT_PUBLIC_NEXT_DOMAIN_WEB}/securities/_next/static/chunks/remoteEntry.js`,
    report: `report@${process.env.NEXT_PUBLIC_NEXT_DOMAIN_WEB}/report/_next/static/chunks/remoteEntry.js`,
    transfer: `transfer@${process.env.NEXT_PUBLIC_NEXT_DOMAIN_WEB}/transfer/_next/static/chunks/remoteEntry.js`,
  },
};

module.exports = {
  reactStrictMode: false,
  output: "standalone",
  productionBrowserSourceMaps: true,
  eslint: {
    ignoreDuringBuilds: false,
  },
  env: {},
  poweredByHeader: false,
  experimental: {
    optimizePackageImports: ["@mui/material", "antd"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/_next/static/chunks/remoteEntry.js", // đúng đường dẫn build ra
        headers: [
          {
            key: "Cache-Control",
            value: "no-cache, no-store, must-revalidate",
          },
          { key: "Pragma", value: "no-cache" },
          { key: "Expires", value: "0" },
        ],
      },
      {
        source: "/_next/data/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "no-cache, no-store, must-revalidate",
          },
          { key: "Pragma", value: "no-cache" },
          { key: "Expires", value: "0" },
        ],
      },
      // Chunk page
      {
        source: "/_next/static/chunks/pages/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "no-cache, no-store, must-revalidate",
          },
          { key: "Pragma", value: "no-cache" },
          { key: "Expires", value: "0" },
        ],
      },
      {
        source: "/assets/:path*.(svg|png|jpg|jpeg|gif|webp)", // tất cả file  trong thư mục public/assets
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=604800, immutable", // 604800 giây = 1 tuần
          },
        ],
      },
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
      {
        source: "/:path*",
        headers: [
          {
            key: "Document-Policy",
            value: "js-profiling",
          },
        ],
      },
    ];
  },
  webpack(config, { isServer }) {
    // Bỏ qua các file binary .node từ Sentry profiling
    config.externals = config.externals || [];
    config.externals.push({
      "@sentry-internal/node-cpu-profiler":
        "commonjs @sentry-internal/node-cpu-profiler",
    });

    if (!isServer) {
      // Tối ưu hóa client-side bundle
      config.optimization.minimize = true;
      config.cache = false;
      config.optimization.splitChunks = {
        chunks: "all",
        minSize: 20000,
        maxSize: 244000, // Chia nhỏ bundle lớn
        cacheGroups: {
          icons: {
            test: /[\\/]public[\\/]assets[\\/]icon[\\/]/, // Tách các file trong thư mục icon
            name: "icons",
            chunks: "all",
            enforce: true,
          },
          images: {
            test: /[\\/]public[\\/]assets[\\/]image[\\/]/,
            name: "images",
            chunks: "all",
            enforce: true,
          },
        },
      };
      config.module.rules.push({
        test: /\.svg$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192, // Nhúng SVG nhỏ hơn 8KB vào bundle
              name: "static/media/[name].[hash].[ext]",
              // Đảm bảo SVG được encode đúng cách cho Sentry
              encoding: "base64",
            },
          },
        ],
      });
    }
    config.plugins.push(
      new NextFederationPlugin({
        name: "root",
        remotes: remoteUrls[isProduction ? "production" : "development"],
        filename: "static/chunks/remoteEntry.js",
        exposes: {
          "./eventBus": "./utils/event/index.ts",
          "./i18n": "./i18n/i18n",
          "./PermissionNoti": "./components/PermissionNoti",
        },
        shared: {
          "react-dom": {
            singleton: true,
            requiredVersion: false,
          },
          "@emotion/react": {
            singleton: true,
            requiredVersion: false,
          },
          i18next: {
            singleton: true,
            requiredVersion: false,
          },
          "react-i18next": {
            singleton: true,
            requiredVersion: false,
          },
          antd: { singleton: true, eager: false },
          dayjs: { singleton: true, eager: false },
          "dayjs/locale/vi": { singleton: true, eager: false },
        },
        extraOptions: {
          exposePages: true,
          enableImageLoaderFix: true,
          enableUrlLoaderFix: true,
        },
        // runtimePlugins: [require.resolve("./path/to/myRuntimePlugin.js")],
      })
    );
    return config;
  },
  // compiler: {
  //   // Chỉ loại bỏ console.log trong production
  //   removeConsole:
  //     process.env.NODE_ENV === "production"
  //       ? {
  //           exclude: ["error", "warn", "log"],
  //         }
  //       : false,
  // },
};

// Injected content via Sentry wizard below

const { withSentryConfig } = require("@sentry/nextjs");

module.exports = withSentryConfig(module.exports, {
  // For all available options, see:
  // https://www.npmjs.com/package/@sentry/webpack-plugin#options

  org: process.env.NEXT_PUBLIC_SENTRY_ORG,
  project: process.env.NEXT_PUBLIC_SENTRY_PROJECT,
  sentryUrl: process.env.NEXT_PUBLIC_SENTRY_URL,

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your hosting bill.
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  tunnelRoute: "/api/sentry/tunnel",

  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,

  // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
  // See the following for more information:
  // https://docs.sentry.io/product/crons/
  // https://vercel.com/docs/cron-jobs
  automaticVercelMonitors: true,
});
