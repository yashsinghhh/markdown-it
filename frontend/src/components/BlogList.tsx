import React from 'react';
import { Clock, ArrowRight } from 'lucide-react';
import type { BlogPost } from '../types/blog';

interface BlogListProps {
  posts: BlogPost[];
}

export const BlogList: React.FC<BlogListProps> = ({ posts }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-8">
      {posts.map((post) => (
        <article
          key={post.id}
          className="bg-white rounded-lg shadow-sm overflow-hidden transition-transform duration-200 hover:-translate-y-1"
        >
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <div className="flex items-center text-sm text-gray-500 mb-2">
              <time dateTime={post.date}>{post.date}</time>
              <span className="mx-2">•</span>
              <span className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                {post.readTime} min read
              </span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
              {post.title}
            </h3>
            <p className="text-gray-600 mb-4 line-clamp-3">{post.description}</p>
            <a
              href={`/blog/${post.id}`}
              className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
            >
              Read More
              <ArrowRight className="h-4 w-4 ml-1" />
            </a>
          </div>
        </article>
      ))}
    </div>
  );
};