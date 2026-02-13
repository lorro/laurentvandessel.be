export const routes = {
  home:    { path: '/',        nav: { show: true, order: 1, label: 'Home' } },
  about:   { path: '/about',   nav: { show: true, order: 2, label: 'About' } },
  blog:    { path: '/blog',    nav: { show: true, order: 3, label: 'Blog' } },
  contact: { path: '/contact', nav: { show: true, order: 4, label: 'Contact' } },
};

export function getRoutePath(routeId) {
  return routes[routeId].path;
}

export function getNavRoutes() {
  return Object.entries(routes)
    .filter(([, route]) => route.nav?.show === true)
    .map(([routeId, route]) => ({
      routeId,
      path: route.path,
      label: route.nav.label,
      order: route.nav.order,
    }))
    .sort((a, b) => a.order - b.order);
}
