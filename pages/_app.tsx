import "antd/dist/antd.css";
import "../node_modules/react-dat-gui/dist/index.css";
import "../style/fix.css";

import { AppProps } from "next/app";
import { FC, useEffect } from "react";
import Router from "next/router";
import { initGA, logPageView } from "../utils/ga";
import withSecureHeaders from "next-secure-headers";

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  useEffect(() => {
    initGA();
    logPageView();
    Router.events.on("routeChangeComplete", logPageView);
  }, []);

  return <Component {...pageProps} />;
};

export default withSecureHeaders({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: [
        "'self'",
        "utteranc.es",
        "*.utteranc.es",
        "fonts.gstatic.com",
      ],
      styleSrc: ["'self'", "'unsafe-inline'", "utteranc.es", "*.utteranc.es"],
      scriptSrc: [
        "'self'",
        "www.google-analytics.com",
        "*.sentry.io",
        "'unsafe-inline'",
        "utteranc.es",
        "*.utteranc.es",
        "*.cloudflareinsights.com",
      ],
      imgSrc: ["*", "data:", "*.cloudflareinsights.com"],
    },
  },
})(MyApp);
