import React from "react";
import { UserProvider } from "@auth0/nextjs-auth0";

const App = ({ Component, pageProps }) => {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
};

export default App;
