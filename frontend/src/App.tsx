import { useState, useEffect } from 'react';
import axios from 'axios'; 
import { Header } from './components/Header';
import { MarkdownEditor } from './components/MarkdownEditor';
import { BlogList } from './components/BlogList';
import { Footer } from './components/Footer';
import type { BlogPost, EditorState } from './types/blog';
import { useAuth, RedirectToSignIn } from '@clerk/clerk-react';

const RANDOM_IMAGES = [
  'https://images.unsplash.com/photo-1517694712202-14dd9538aa97',
  'https://images.unsplash.com/photo-1516116216624-53e697fedbea',
  'https://images.unsplash.com/photo-1516321318423-f06f85e504b3',
  'https://images.unsplash.com/photo-1506452819137-0422416856b8',
  'https://images.unsplash.com/photo-1519681393784-d120267933ba'
];

function App() {
  const { getToken, isSignedIn } = useAuth();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [editorState, setEditorState] = useState<EditorState>({
    content: '# Welcome to MarkdownBlog\n\nStart writing your blog post here...',
    isPreviewVisible: false
  });

  if (!isSignedIn) {
    return <RedirectToSignIn />;
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const token = await getToken();
      if (!token) {
        console.error('User is not authenticated');
        return;
      }
  
      const response = await axios.get('/api/posts', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
      if (error.response && error.response.status === 401) {
        console.error('Unauthorized access. Please log in.');
      }
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
      const response = await axios.post('/api/posts', newPost);
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
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="container mx-auto px-4 pt-20 pb-8 flex-1">
        <div className="max-w-4xl mx-auto">
          <MarkdownEditor
            content={editorState.content}
            isPreviewVisible={editorState.isPreviewVisible}
            onContentChange={handleContentChange}
            onPreviewToggle={togglePreview}
            onSave={handleSave}
          />
          <h2 className="text-2xl font-semibold mb-8">Latest Posts</h2>
          <BlogList posts={posts} />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;