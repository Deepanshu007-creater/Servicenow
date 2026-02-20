const ROLES = Object.freeze({
  ADMIN: 'ADMIN',
  RESOLVER: 'RESOLVER',
  USER: 'USER'
});

const SUBSCRIPTIONS = Object.freeze({
  FREE: 'FREE',
  MODERATE: 'MODERATE',
  PROFESSIONAL: 'PROFESSIONAL'
});

const SUBSCRIPTION_LEVEL = Object.freeze({
  [SUBSCRIPTIONS.FREE]: 0,
  [SUBSCRIPTIONS.MODERATE]: 1,
  [SUBSCRIPTIONS.PROFESSIONAL]: 2
});

function hasRequiredTier(currentTier, minimumTier) {
  return SUBSCRIPTION_LEVEL[currentTier] >= SUBSCRIPTION_LEVEL[minimumTier];
}

function isValidRole(role) {
  return Object.values(ROLES).includes(role);
}

function isValidSubscription(subscription) {
  return Object.values(SUBSCRIPTIONS).includes(subscription);
}

module.exports = {
  ROLES,
  SUBSCRIPTIONS,
  hasRequiredTier,
  isValidRole,
  isValidSubscription
};
