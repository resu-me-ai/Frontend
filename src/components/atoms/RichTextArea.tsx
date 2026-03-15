import React, { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';

export interface RichTextAreaProps {
  value?: string;
  onChange?: (html: string) => void;
  placeholder?: string;
  label?: string;
  hint?: string;
  error?: string;
  className?: string;
  disabled?: boolean;
}

export const RichTextArea: React.FC<RichTextAreaProps> = ({
  value = '',
  onChange,
  placeholder,
  label,
  hint,
  error,
  className = '',
  disabled = false,
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        // Only allow formatting that the analysis engine uses
        bold: {},
        italic: {},
        bulletList: {},
        orderedList: {},
        listItem: {},
        paragraph: {},
        hardBreak: {},
        // Disable features we don't need
        heading: false,
        code: false,
        codeBlock: false,
        blockquote: false,
        horizontalRule: false,
        strike: false,
      }),
      Placeholder.configure({
        placeholder,
      }),
    ],
    content: value,
    editable: !disabled,
    onUpdate: ({ editor: ed }) => {
      const html = ed.getHTML();
      // If editor is empty, pass empty string instead of <p></p>
      const isEmpty = ed.isEmpty;
      onChange?.(isEmpty ? '' : html);
    },
  });

  // Sync external value changes (e.g., form reset)
  useEffect(() => {
    if (!editor) return;
    const currentHtml = editor.getHTML();
    const editorEmpty = editor.isEmpty;

    // Only update if the external value differs from editor content
    if (value === '' && !editorEmpty) {
      editor.commands.clearContent();
    } else if (value && value !== currentHtml) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  useEffect(() => {
    if (editor) {
      editor.setEditable(!disabled);
    }
  }, [disabled, editor]);

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-text-subtle mb-1">
          {label}
        </label>
      )}
      <div
        className={`
          w-full
          bg-white border border-border-input rounded-lg
          focus-within:ring-2 focus-within:ring-primary focus-within:border-transparent
          ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}
          ${error ? 'border-red-500 focus-within:ring-red-500' : ''}
          ${className}
        `}
      >
        <EditorContent
          editor={editor}
          className="rich-text-area"
        />
      </div>
      {error && (
        <p className="mt-1.5 text-sm text-red-600">{error}</p>
      )}
      {hint && !error && (
        <p className="mt-1.5 text-xs text-text-placeholder">{hint}</p>
      )}
    </div>
  );
};
