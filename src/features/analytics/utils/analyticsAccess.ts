export const ANALYTICS_ALLOWED_ROLES = [
  "administrador",
  "operador de ventas",
] as const;

export const canAccessAnalytics = (
  roleName?: string | null,
): roleName is (typeof ANALYTICS_ALLOWED_ROLES)[number] =>
  (ANALYTICS_ALLOWED_ROLES as readonly string[]).includes(roleName ?? "");
