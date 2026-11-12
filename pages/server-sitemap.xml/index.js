import { getServerSideSitemap } from "next-sitemap";

export const getServerSideProps = async (ctx) => {
  const res = await fetch("https://api.boomlex.ir/api/active-posts");
  const posts = await res.json();

  const baseUrl = 'https://boomlex.ir';

  const newsSitemaps = posts.map((item) => {
    // Ensure updated_at is a valid Date object before calling toISOString()
    const updatedAt = item.updated_at ? new Date(item.updated_at) : new Date(); // Fallback to current date if missing

    return {
      loc: `${baseUrl}/worker/${item.id.toString()}`,
      // Standardize the date to ISO 8601 format
      lastmod: updatedAt.toISOString(),
      changefreq: 'weekly',
      priority: 0.6,
    };
  });

  const fields = [...newsSitemaps];

  return getServerSideSitemap(ctx, fields);
};

export default function Site() {}
