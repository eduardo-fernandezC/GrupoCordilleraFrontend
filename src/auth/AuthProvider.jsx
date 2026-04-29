import { Auth0Provider } from "@auth0/auth0-react";
import { auth0Config } from "./authConfig";

const AuthProvider = ({ children }) => (
  <Auth0Provider
    domain={auth0Config.domain}
    clientId={auth0Config.clientId}
    authorizationParams={{
      redirect_uri: window.location.origin,
      audience: auth0Config.audience,
      scope: auth0Config.scope,
    }}
    cacheLocation="localstorage"
    onRedirectCallback={(appState) => {
      window.history.replaceState(
        {},
        document.title,
        appState?.returnTo || window.location.pathname,
      );
    }}
  >
    {children}
  </Auth0Provider>
);

export default AuthProvider;
