// File: frontend/src/components/MarkdownEditor.tsx
import React, { useCallback, useEffect, useRef } from 'react';
import { Eye, Save } from 'lucide-react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

interface MarkdownEditorProps {
  content: string;
  isPreviewVisible: boolean;
  onContentChange: (content: string) => void;
  onPreviewToggle: () => void;
  onSave: () => void;
}

export const MarkdownEditor: React.FC<MarkdownEditorProps> = ({
  content,
  isPreviewVisible,
  onContentChange,
  onPreviewToggle,
  onSave,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleResize = useCallback(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, []);

  useEffect(() => {
    handleResize();
  }, [content, handleResize]);

  const parsedContent = DOMPurify.sanitize(marked(content));

  return (
    <div className="grid gap-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">New Post</h2>
        <div className="flex gap-3">
          <button
            onClick={onSave}
            className="btn-primary"
          >
            <Save className="h-5 w-5" />
            Save
          </button>
          <button
            onClick={onPreviewToggle}
            className="btn-outline"
          >
            <Eye className="h-5 w-5" />
            Preview
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <textarea
          ref={textareaRef}
          value={content}
          onChange={(e) => onContentChange(e.target.value)}
          className="w-full p-6 font-mono text-sm bg-white border rounded-xl focus:ring-2 focus:ring-accent/50"
          placeholder="# Start writing your post..."
          style={{ minHeight: '400px' }}
        />

        {isPreviewVisible && (
          <div className="prose prose-sm md:prose-base bg-white p-6 rounded-xl">
            <div dangerouslySetInnerHTML={{ __html: parsedContent }} />
          </div>
        )}
      </div>
    </div>
  );
};