const OAuthProviderType = {
  GOOGLE: 'google',
  FACEBOOK: 'facebook',
} as const;
const AvailableOAuthProviders = Object.values(OAuthProviderType);

const QUERY_KEYS = {
  users: ['users', 'profile'],
};

export { OAuthProviderType, AvailableOAuthProviders, QUERY_KEYS };
