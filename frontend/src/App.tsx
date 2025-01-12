import { useState, useEffect } from 'react';
import axios from 'axios'; 
import { Header } from './components/Header';
import { MarkdownEditor } from './components/MarkdownEditor';
import { BlogList } from './components/BlogList';
import { Footer } from './components/Footer';
import type { BlogPost, EditorState } from './types/blog';

// Create an axios instance with the base URL
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost/api'
});

const RANDOM_IMAGES = [
  'https://images.unsplash.com/photo-1517694712202-14dd9538aa97',
  'https://images.unsplash.com/photo-1516116216624-53e697fedbea',
  'https://images.unsplash.com/photo-1516321318423-f06f85e504b3',
  'https://images.unsplash.com/photo-1506452819137-0422416856b8',
  'https://images.unsplash.com/photo-1519681393784-d120267933ba'
];

function App() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [editorState, setEditorState] = useState<EditorState>({
    content: '# Welcome to MarkdownBlog\n\nStart writing your blog post here...',
    isPreviewVisible: false
  });

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      // Updated to use the api instance
      const response = await api.get('/posts');
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleContentChange = (content: string) => {
    setEditorState(prev => ({ ...prev, content }));
  };

  const togglePreview = () => {
    setEditorState(prev => ({ ...prev, isPreviewVisible: !prev.isPreviewVisible }));
  };

  const getRandomImage = () => {
    return RANDOM_IMAGES[Math.floor(Math.random() * RANDOM_IMAGES.length)];
  };

  const calculateReadTime = (content: string): number => {
    const words = content.trim().split(/\s+/).length;
    return Math.max(1, Math.ceil(words / 200));
  };

  const parseMarkdownContent = (content: string) => {
    const lines = content.split('\n');
    let title = 'Untitled Post';
    let description = '';

    const titleMatch = content.match(/^#\s+(.+)$/m);
    if (titleMatch) {
      title = titleMatch[1];
    }

    const descriptionMatch = content.match(/^(?!#)[^\n]+/m);
    if (descriptionMatch) {
      description = descriptionMatch[0].slice(0, 150) + '...';
    }

    return { title, description };
  };

  const handleSave = async () => {
    const { title, description } = parseMarkdownContent(editorState.content);
    
    const newPost = {
      title,
      description,
      content: editorState.content,
      image: getRandomImage(),
      date: new Date().toLocaleDateString('en-US', { 
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }),
      readTime: calculateReadTime(editorState.content)
    };

    try {
      // Updated to use the api instance
      const response = await api.post('/posts', newPost);
      setPosts(prevPosts => [response.data, ...prevPosts]);
      
      setEditorState({
        content: '# New Post\n\nStart writing your blog post here...',
        isPreviewVisible: false
      });
    } catch (error) {
      console.error('Error saving post:', error);
    }
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
        <BlogList posts={posts} />
      </main>
      <Footer />
    </div>
  );
}

export default App;