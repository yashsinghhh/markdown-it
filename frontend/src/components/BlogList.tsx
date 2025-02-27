import React from "react";
import { Clock, ArrowRight } from "lucide-react";
import type { BlogPost } from "../types/blog";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card"; // ShadCN Card

interface BlogListProps {
  posts: BlogPost[];
}

export const BlogList: React.FC<BlogListProps> = ({ posts }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
      {posts.map((post) => (
        <Card
          key={post.id}
          className="p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group"
        >
          <div className="overflow-hidden rounded-lg mb-4">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-48 object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div className="flex items-center text-sm text-muted-foreground mb-3">
            <time dateTime={post.date}>{post.date}</time>
            <span className="mx-2">•</span>
            <span className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              {post.readTime} min read
            </span>
          </div>
          <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
          <p className="text-muted-foreground mb-4 line-clamp-3">
            {post.description}
          </p>
          <Link
            to={`/blog/${post.id}`}
            className="inline-flex items-center text-primary font-medium transition-colors hover:text-primary/80"
          >
            Read More
            <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
          </Link>
        </Card>
      ))}
    </div>
  );
};