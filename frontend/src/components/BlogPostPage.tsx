// File: src/components/BlogPostPage.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import { useAuth } from '@clerk/clerk-react';
import { Clock, User } from 'lucide-react';
import { Header } from './Header'; 
import type { BlogPost } from '../types/blog';

const BlogPostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getToken } = useAuth();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const token = await getToken();
        if (!token) {
          setError('Unauthorized access. Please log in.');
          return;
        }

        const response = await axios.get(`/api/posts/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPost(response.data);
      } catch (err) {
        setError('Failed to fetch the blog post.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id, getToken]);

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  if (!post) {
    return <div className="text-center py-8">Post not found.</div>;
  }

  const parsedContent = DOMPurify.sanitize(marked(post.content));

  return (
    <div className="min-h-screen flex flex-col">
      {/* Add the Header (Navbar) */}
      <Header />

      {/* Blog Content */}
      <main className="flex-1 pt-20"> {/* Add pt-20 to account for the navbar height */}
        <div className="max-w-4xl mx-auto px-4 py-8">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-64 md:h-96 object-cover rounded-lg mb-6"
          />
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
          <div className="flex items-center text-sm text-primary/60 mb-6">
            <time dateTime={post.date}>{post.date}</time>
            <span className="mx-2">•</span>
            <span className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              {post.readTime} min read
            </span>
          </div>
          <div
            className="prose prose-sm md:prose-base max-w-none"
            dangerouslySetInnerHTML={{ __html: parsedContent }}
          />

          {/* About Author Section */}
          <div className="bg-surface p-6 rounded-lg border mt-12">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <User className="h-6 w-6 mr-2" />
              About the Author
            </h2>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <User className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="font-medium">John Doe</p>
                <p className="text-sm text-primary/60">
                  Software Engineer & Tech Enthusiast
                </p>
              </div>
            </div>
            <p className="mt-4 text-primary/80">
              John is a passionate software engineer with over 5 years of experience
              in building scalable web applications. He loves sharing his knowledge
              through blog posts and tutorials.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BlogPostPage;