import { useState } from 'react';
import { Header } from './components/Header';
import { MarkdownEditor } from './components/MarkdownEditor';
import { BlogList } from './components/BlogList';
import { Footer } from './components/Footer';
import type { BlogPost, EditorState } from './types/blog';

const SAMPLE_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'Getting Started with Markdown',
    description: 'Learn the basics of Markdown syntax and start writing beautiful documentation.',
    content: '',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97',
    date: 'Mar 1, 2024',
    readTime: 5
  },
  {
    id: '2',
    title: 'Advanced Markdown Techniques',
    description: 'Discover advanced features and tricks to enhance your Markdown documents.',
    content: '',
    image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea',
    date: 'Mar 2, 2024',
    readTime: 7
  },
  {
    id: '3',
    title: 'Writing Technical Documentation',
    description: 'Best practices for writing clear and effective technical documentation using Markdown.',
    content: '',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3',
    date: 'Mar 3, 2024',
    readTime: 6
  }
];

function App() {
  const [editorState, setEditorState] = useState<EditorState>({
    content: '# Welcome to MarkdownBlog\n\nStart writing your blog post here...',
    isPreviewVisible: false
  });

  const handleContentChange = (content: string) => {
    setEditorState(prev => ({ ...prev, content }));
  };

  const togglePreview = () => {
    setEditorState(prev => ({ ...prev, isPreviewVisible: !prev.isPreviewVisible }));
  };

  const handleSave = () => {
    // TODO: Implement save functionality
    console.log('Saving content:', editorState.content);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4">
        <MarkdownEditor
          content={editorState.content}
          isPreviewVisible={editorState.isPreviewVisible}
          onContentChange={handleContentChange}
          onPreviewToggle={togglePreview}
          onSave={handleSave}
        />
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Latest Posts</h2>
        <BlogList posts={SAMPLE_POSTS} />
      </main>
      <Footer />
    </div>
  );
}

export default App;