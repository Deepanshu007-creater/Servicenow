const {
  ROLES,
  SUBSCRIPTIONS,
  isValidRole,
  isValidSubscription
} = require('../config/accessControl');

function authenticate(headers) {
  const role = headers['x-user-role'];
  const subscription = headers['x-user-subscription'];
  const userId = headers['x-user-id'];

  if (!role || !subscription || !userId) {
    return {
      error: {
        status: 401,
        body: { error: 'Unauthenticated. Provide x-user-id, x-user-role and x-user-subscription headers.' }
      }
    };
  }

  if (!isValidRole(role) || !isValidSubscription(subscription)) {
    return {
      error: {
        status: 400,
        body: { error: 'Invalid role or subscription tier provided.' }
      }
    };
  }

  return {
    user: {
      id: userId,
      role,
      subscription
    }
  };
}

module.exports = {
  authenticate,
  ROLES,
  SUBSCRIPTIONS
};
