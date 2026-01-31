/**
 * Returns an optimized image URL for display.
 * For Cloudinary: adds q_auto:good, f_auto, and width for crisp display.
 * For local URLs: returns as-is.
 */
export function getImageUrl(url, options = {}) {
  if (!url || typeof url !== "string") return null;
  const { width = 1200 } = options;

  if (url.includes("res.cloudinary.com") && url.includes("/upload/")) {
    const transforms = `q_auto:good,f_auto,w_${width}`;
    return url.replace("/upload/", `/upload/${transforms}/`);
  }
  return url;
}
