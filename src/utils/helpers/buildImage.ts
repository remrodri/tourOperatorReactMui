export const buildImageUrl = (path?: string) => {
  if (!path) return null;

  // Si ya es URL absoluta, úsala
  if (/^https?:\/\//i.test(path)) return path;

  const base = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "");
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
};
