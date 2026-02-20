const { hasRequiredTier } = require('../config/accessControl');

function enforceRole(user, allowedRoles) {
  if (!user || !allowedRoles.includes(user.role)) {
    return {
      status: 403,
      body: { error: 'Forbidden: insufficient role permissions.' }
    };
  }

  return null;
}

function enforceSubscription(user, minimumTier) {
  if (!user || !hasRequiredTier(user.subscription, minimumTier)) {
    return {
      status: 403,
      body: { error: `Forbidden: ${minimumTier} subscription required.` }
    };
  }

  return null;
}

module.exports = {
  enforceRole,
  enforceSubscription
};
