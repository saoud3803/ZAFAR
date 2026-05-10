/**
 * Maps URL collection slugs → DB category values.
 * Add entries here whenever a new category is added in the admin.
 */
export const CATEGORY_MAP: Record<string, string[]> = {
  men:       ['T-shirt Men'],
  women:     ['T-shirt Women'],
  tableau:   ['Tableau'],
};

/** All valid URL slugs for generateStaticParams */
export const COLLECTION_SLUGS = Object.keys(CATEGORY_MAP);

/** Human-readable title for each slug */
export const COLLECTION_TITLES: Record<string, string> = {
  men:     'MEN',
  women:   'WOMEN',
  tableau: 'TABLEAU',
};
