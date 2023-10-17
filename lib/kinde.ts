export const config = {
	clientId: process.env.KINDE_CLIENT_ID!,
	domain: process.env.KINDE_ISSUER_URL!,
	redirectUri: process.env.KINDE_POST_LOGIN_REDIRECT_URL!,
	logoutUri: process.env.KINDE_POST_LOGOUT_REDIRECT_URL!,
};
