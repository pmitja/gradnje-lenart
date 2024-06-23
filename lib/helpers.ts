// Slug generation function
export function generateSlug(name: string, city: string): string {
  const slugify = (str: string) =>
    str
      .toLowerCase()
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(/[^\w\-]+/g, '') // Remove all non-word characters
      .replace(/\-\-+/g, '-') // Replace multiple - with single -
      .replace(/^-+/, '') // Trim - from start of text
      .replace(/-+$/, ''); // Trim - from end of text

  return `${slugify(name)}-${slugify(city)}`;
}

export function generateSlugWithNumber(slug: string, number: string): string {
  const slugify = (str: string) =>
    str
      .toLowerCase()
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(/[^\w\-]+/g, '') // Remove all non-word characters
      .replace(/\-\-+/g, '-') // Replace multiple - with single -
      .replace(/^-+/, '') // Trim - from start of text
      .replace(/-+$/, ''); // Trim - from end of text

  return `${slug}/${slugify(number)}`;
}