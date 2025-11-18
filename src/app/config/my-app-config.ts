export default {
  auth: {
    domain: "dev-piyoc35wfgvug4sf.us.auth0.com", //Ex: dev-xxxxxxxxxxx.us.auth0.com
    clientId: "fTT2dXc0BecPhVJ41mRC5ubqdZiscYpD",
    authorizationParams: {
      redirect_uri: "http://localhost:4200/login/callback",
      audience: "http://localhost:8080",
    },
  },
  httpInterceptor: {
    allowedList: [
      "http://localhost:8080/api/orders/**",
      "http://localhost:8080/api/checkout/purchase",
    ],
  },
};
