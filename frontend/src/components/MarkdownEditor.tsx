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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-20 mb-8">
      <div className={isPreviewVisible ? 'hidden md:block' : 'block'}>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Editor</h2>
            <div className="flex space-x-2">
              <button
                onClick={onSave}
                className="inline-flex items-center px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Save className="h-4 w-4 mr-1" />
                Save
              </button>
              <button
                onClick={onPreviewToggle}
                className="inline-flex items-center px-3 py-1.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                <Eye className="h-4 w-4 mr-1" />
                Preview
              </button>
            </div>
          </div>
          <textarea
            ref={textareaRef}
            value={content}
            onChange={(e) => onContentChange(e.target.value)}
            className="w-full min-h-[300px] p-4 font-mono text-sm bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Write your markdown here..."
          />
        </div>
      </div>

      {isPreviewVisible && (
        <div className="bg-white rounded-lg shadow-sm p-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Preview</h2>
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: parsedContent }}
          />
        </div>
      )}
    </div>
  );
};