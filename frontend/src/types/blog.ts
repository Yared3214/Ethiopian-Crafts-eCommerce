
// types.ts
export interface Blog {
  title: string;
  description: string;
  category: string;
  badge: string;
  image: File;
}

export interface BlogResponse {
  title: string;
  description: string;
  category: string;
  badge: string;
  image: string;
  slug: string;
}