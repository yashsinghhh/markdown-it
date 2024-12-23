export interface BlogPost {
  id: string;
  title: string;
  description: string;
  content: string;
  image: string;
  date: string;
  readTime: number;
}

export interface EditorState {
  content: string;
  isPreviewVisible: boolean;
}