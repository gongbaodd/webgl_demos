module.exports = {
  env: {
    SENTRY_DSN: "https://3830bdfd1f184bfea4b601a91400e675@sentry.io/5170787",
  },
  webpack: (config, { isServer, buildId }) => {
    config.plugins.push(
      new webpack.DefinePlugin({
        "process.env.SENTRY_RELEASE": JSON.stringify(buildId),
      })
    );

    if (!isServer) {
      config.resolve.alias["@sentry/node"] = "@sentry/browser";
    }

    return config;
  },
};
