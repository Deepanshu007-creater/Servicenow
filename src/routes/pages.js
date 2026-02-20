const { ROLES, SUBSCRIPTIONS } = require('../config/accessControl');
const { enforceRole, enforceSubscription } = require('../middleware/authorize');
const { renderPage } = require('../ui/components');

const pageRoutes = {
  '/dashboard': {
    guard: () => null,
    title: 'Dashboard',
    body: '<p>Accessible to all authenticated users.</p>'
  },
  '/admin': {
    guard: (user) => enforceRole(user, [ROLES.ADMIN]),
    title: 'Admin',
    body: '<p>Admin-only management section.</p>'
  },
  '/resolver': {
    guard: (user) => enforceRole(user, [ROLES.ADMIN, ROLES.RESOLVER]),
    title: 'Resolver',
    body: '<p>Resolver and admin operations area.</p>'
  },
  '/doubt-session': {
    guard: (user) => enforceSubscription(user, SUBSCRIPTIONS.MODERATE),
    title: 'Doubt Session',
    body: '<p>Available for MODERATE and PROFESSIONAL users.</p>'
  },
  '/interview-module': {
    guard: (user) => enforceSubscription(user, SUBSCRIPTIONS.PROFESSIONAL),
    title: 'Interview Module',
    body: '<p>Professional-only interview preparation content.</p>'
  }
};

function handlePageRoute(pathname, user) {
  const route = pageRoutes[pathname];
  if (!route) {
    return null;
  }

  const guardResult = route.guard(user);
  if (guardResult) {
    return guardResult;
  }

  return {
    status: 200,
    html: renderPage({
      title: route.title,
      user,
      body: route.body
    })
  };
}

module.exports = { handlePageRoute };
