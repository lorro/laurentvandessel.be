export function formatDate(date, locale = 'en-US') {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

export function getReadingTime(content) {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

export function generateId(prefix = 'id') {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
}

export function isExternalUrl(url) {
  return url.startsWith('http://') || url.startsWith('https://');
}
