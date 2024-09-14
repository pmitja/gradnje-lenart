/* eslint-disable no-useless-escape */
// Slug generation function
export function generateSlug(name: string): string {
  const slugify = (str: string) => str
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word characters
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, '') // Trim - from end of text

  return `${slugify(name)}`
}

export function generateSlugWithNumber(slug: string, number: string): string {
  const slugify = (str: string) => str
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word characters
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, '') // Trim - from end of text

  return `${slug}/${slugify(number)}`
}

export function formatNumber(num: number) {
  return new Intl.NumberFormat('de-DE', {
    minimumFractionDigits: 0,
  }).format(num)
}
