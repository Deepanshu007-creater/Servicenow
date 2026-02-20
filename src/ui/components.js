const { ROLES, SUBSCRIPTIONS, hasRequiredTier } = require('../config/accessControl');

function canAccessRoleRoute(user, allowedRoles) {
  return allowedRoles.includes(user.role);
}

function canAccessTierRoute(user, minimumTier) {
  return hasRequiredTier(user.subscription, minimumTier);
}

function renderNavigation(user) {
  const links = [
    '<a href="/dashboard">Dashboard</a>'
  ];

  if (canAccessRoleRoute(user, [ROLES.ADMIN])) {
    links.push('<a href="/admin">Admin</a>');
  }

  if (canAccessRoleRoute(user, [ROLES.ADMIN, ROLES.RESOLVER])) {
    links.push('<a href="/resolver">Resolver</a>');
  }

  if (canAccessTierRoute(user, SUBSCRIPTIONS.MODERATE)) {
    links.push('<a href="/doubt-session">Doubt Session</a>');
  }

  if (canAccessTierRoute(user, SUBSCRIPTIONS.PROFESSIONAL)) {
    links.push('<a href="/interview-module">Interview Module</a>');
  }

  return `<nav>${links.join(' | ')}</nav>`;
}

function renderPage({ title, user, body }) {
  return `<!doctype html>
<html>
  <head>
    <title>${title}</title>
    <style>
      body { font-family: Arial, sans-serif; margin: 2rem; }
      .card { border: 1px solid #ddd; border-radius: 8px; padding: 1rem; margin-top: 1rem; }
      .meta { color: #666; }
      nav a { margin-right: 0.5rem; }
    </style>
  </head>
  <body>
    <h1>${title}</h1>
    <p class="meta">User: ${user.id} | Role: ${user.role} | Subscription: ${user.subscription}</p>
    ${renderNavigation(user)}
    <div class="card">${body}</div>
  </body>
</html>`;
}

module.exports = {
  renderPage,
  canAccessRoleRoute,
  canAccessTierRoute
};
