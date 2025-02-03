import { useState, useEffect } from 'react';
import axios from 'axios'; 
import { useAuth } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { Header } from './components/Header';
import { MarkdownEditor } from './components/MarkdownEditor';
import { BlogList } from './components/BlogList';
import { Footer } from './components/Footer';
import type { BlogPost, EditorState } from './types/blog';

const RANDOM_IMAGES = [
  'https://images.unsplash.com/photo-1517694712202-14dd9538aa97',
  'https://images.unsplash.com/photo-1516116216624-53e697fedbea',
  'https://images.unsplash.com/photo-1516321318423-f06f85e504b3',
  'https://images.unsplash.com/photo-1506452819137-0422416856b8',
  'https://images.unsplash.com/photo-1519681393784-d120267933ba'
];

function App() {
  const { user, isSignedIn, getToken } = useAuth();
  const navigate = useNavigate();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [editorState, setEditorState] = useState<EditorState>({
    content: '# Welcome to MarkdownBlog\n\nStart writing your blog post here...',
    isPreviewVisible: false
  });

  useEffect(() => {
    if (isSignedIn && user?.id) {
      console.log("User signed in, checking user details...");
      checkUser(user.id);
    }
  }, [isSignedIn, user]);

  const checkUser = async (clerkId: string) => {
    console.log("Checking user:", clerkId);
    try {
      const response = await axios.post('/api/users/check', { clerkId }, { headers: { 'Cache-Control': 'no-cache' } });
      console.log("User check response:", response.data);
      
      if (!response.data.exists) {
        console.log("Redirecting to /user-setup");
        navigate('/user-setup');
      } else {
        console.log(`Redirecting to ${response.data.role}-dashboard`);
        navigate(response.data.role === 'author' ? '/author-dashboard' : '/reader-dashboard');
      }
    } catch (error) {
      console.error('Error checking user:', error);
    }
  };

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

  const handleSave = async () => {
    const newPost = {
      title: 'New Post',
      description: 'A new blog post',
      content: editorState.content,
      date: new Date().toISOString(),
      readTime: Math.ceil(editorState.content.split(' ').length / 200)
    };

    try {
      await axios.post('/api/posts', newPost);
      fetchPosts();
    } catch (error) {
      console.error('Error saving post:', error);
    }
  };

  if (!isSignedIn) {
    return <div>Please sign in to continue...</div>;
  }

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
