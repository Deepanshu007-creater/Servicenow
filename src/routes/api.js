const { ROLES, SUBSCRIPTIONS } = require('../config/accessControl');
const { enforceRole, enforceSubscription } = require('../middleware/authorize');

const apiRoutes = {
  '/api/dashboard/summary': {
    guard: () => null,
    body: (user) => ({ scope: 'authenticated', message: 'Dashboard data available', user })
  },
  '/api/admin/audit': {
    guard: (user) => enforceRole(user, [ROLES.ADMIN]),
    body: () => ({ scope: 'admin', message: 'Audit trail data' })
  },
  '/api/resolver/queue': {
    guard: (user) => enforceRole(user, [ROLES.ADMIN, ROLES.RESOLVER]),
    body: () => ({ scope: 'resolver', message: 'Resolver queue data' })
  },
  '/api/premium/doubt-session': {
    guard: (user) => enforceSubscription(user, SUBSCRIPTIONS.MODERATE),
    body: () => ({ scope: 'moderate+', message: 'Doubt session API data' })
  },
  '/api/premium/interview-module': {
    guard: (user) => enforceSubscription(user, SUBSCRIPTIONS.PROFESSIONAL),
    body: () => ({ scope: 'professional', message: 'Interview module API data' })
  }
};

function handleApiRoute(pathname, user) {
  const route = apiRoutes[pathname];
  if (!route) {
    return null;
  }

  const guardResult = route.guard(user);
  if (guardResult) {
    return guardResult;
  }

  return {
    status: 200,
    body: route.body(user)
  };
}

module.exports = { handleApiRoute };
