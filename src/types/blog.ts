export type Category = 
  | 'All'
  | 'Beginner Fitness'
  | 'Home Workouts'
  | 'Habit & Mindset'
  | 'Active Living'
  | 'Daily Movement'
  | 'Lifestyle & Balance'
  | 'Recovery & Balance';

export interface Author {
  name: string;
  role: string;
  avatarText: string;
}

export interface ArticleSection {
  id: string;
  heading: string;
  content: string[];
  callout?: {
    type: 'insight' | 'action' | 'science' | 'caution';
    title: string;
    text: string;
  };
  listItems?: string[];
  table?: {
    headers: string[];
    rows: string[][];
  };
}

export interface Article {
  id: string; // url slug e.g. "beginners-guide-starting-fitness-routine"
  title: string;
  subtitle: string;
  slug: string;
  category: Category;
  readTime: string;
  publishedDate: string;
  author: Author;
  heroImage: string;
  imageCaption: string;
  excerpt: string;
  keyTakeaways: string[];
  sections: ArticleSection[];
  practicalChecklist: {
    title: string;
    items: string[];
  };
  relatedArticleSlugs: string[];
}
