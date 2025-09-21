import { cache } from 'react';

// Define types for the menu items
interface MenuItem {
  id: number;
  title: string;
  url: string;
  order?: number;
  parent?: number;
  children?: MenuItem[];
  object?: string;
  object_slug?: string;
  type?: string;
  type_label?: string;
  [key: string]: any; // Allow other properties that may exist in the raw response
}

interface NormalizedMenuItem {
  id: number;
  title: string;
  href: string;
  order: number;
  parent: number;
  children: NormalizedMenuItem[];
}

const normalizeHref = (url: string): string => {
  try {
    // If the URL is just "#", return it as is
    if (url === '#') {
      return '#';
    }

    const u = new URL(url, 'https://work.psyberspaceconsult.com');
    let p = u.pathname;

    // Remove trailing slash if the path is not root
    if (p.length > 1 && p.endsWith('/')) p = p.slice(0, -1);
    return p || '/';
  } catch {
    // If URL is invalid, return it as is (fallback to original URL)
    return url || '/';
  }
};

const flatten = (items: MenuItem[] = []): MenuItem[] => {
  const out: MenuItem[] = [];
  const walk = (arr: MenuItem[]) => {
    arr.forEach((it) => {
      out.push(it);
      if (Array.isArray(it.children) && it.children.length) walk(it.children);
    });
  };
  walk(items);
  return out;
};

export function normalizeWpMenu(
  raw: { items: MenuItem[] } | MenuItem[] | null,
): NormalizedMenuItem[] {
  let items: MenuItem[] = [];

  // Check if raw is an object containing `items` or a direct array
  if (Array.isArray(raw)) {
    items = raw;
  } else if (raw && Array.isArray(raw.items)) {
    items = raw.items;
  }

  if (!items.length) return [];

  const flat = flatten(items);

  // de-dup by id
  const byId = new Map<number, MenuItem>();
  for (const it of flat) if (!byId.has(it.id)) byId.set(it.id, it);

  // build node map
  const nodes = new Map<number, NormalizedMenuItem>();
  for (const it of byId.values()) {
    nodes.set(it.id, {
      id: it.id,
      title: (it.title || '').trim(),
      href: normalizeHref(it.url || '#'),
      order: it.order ?? 0,
      parent: it.parent ?? 0,
      children: [],
    });
  }

  // link children -> parents, collect roots
  const roots: NormalizedMenuItem[] = [];
  for (const it of byId.values()) {
    const node = nodes.get(it.id);
    const pid = it.parent ?? 0;

    // Ensure node is defined before trying to access its children
    if (node) {
      if (pid && nodes.has(pid)) {
        const parent = nodes.get(pid);
        if (parent) {
          parent.children.push(node);
        }
      } else {
        roots.push(node);
      }
    }
  }

  // sort by menu order
  const sortByOrder = (a: NormalizedMenuItem, b: NormalizedMenuItem): number =>
    (a.order || 0) - (b.order || 0);

  const sortTree = (arr: NormalizedMenuItem[]): void => {
    arr.sort(sortByOrder);
    arr.forEach((n) => n.children && sortTree(n.children));
  };
  sortTree(roots);

  // strip internals
  const strip = (n: NormalizedMenuItem): NormalizedMenuItem => ({
    id: n.id,
    title: n.title,
    href: n.href,
    order: n.order, // Include order
    parent: n.parent, // Include parent
    children: n.children.map(strip),
  });

  return roots.map(strip);
}

// Fetch + normalize
export const getMenu = cache(async (): Promise<NormalizedMenuItem[]> => {
  const baseUrl = process.env.NEXT_PUBLIC_BLOG_API_URL;

  if (!baseUrl) {
    throw new Error('NEXT_PUBLIC_BLOG_API_URL is missing');
  }

  const res = await fetch(`${baseUrl}/wp-json/wp-api-menus/v2/menus/3`, {
    cache: 'force-cache',
  });

  const raw = res.ok ? await res.json() : null;
  return normalizeWpMenu(raw);
});
