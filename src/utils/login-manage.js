// roles与exclude_roles只能存一，roles优先权大过exclude_roles
export function hasPermission(roles, route) {
  let includes, excludes
  if (route.meta) {
    includes = route.meta.roles
    excludes = route.meta.exclude_roles
  }
  if (includes) {
    return roles.some((role) => includes.includes('admin') || includes.includes(role))
  } else if (excludes) {
    return !roles.some((role) => excludes.includes(role))
  }
  return true
}