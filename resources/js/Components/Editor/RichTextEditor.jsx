import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import { Bold, Italic, Strikethrough, Link as LinkIcon, Image as ImageIcon, List, ListOrdered, Heading1, Heading2, Quote, Code, Undo, Redo } from 'lucide-react';
import { useEffect } from 'react';

const MenuButton = ({ onClick, isActive = false, disabled = false, children, title }) => (
    <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        title={title}
        className={`p-2 rounded hover:bg-gray-100 transition-colors ${isActive ? 'bg-gray-200 text-envoklear-green' : 'text-gray-600'
            } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
        {children}
    </button>
);

export default function RichTextEditor({ value, onChange, placeholder = 'Start writing...' }) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: 'text-blue-600 hover:underline',
                },
            }),
            Image.configure({
                HTMLAttributes: {
                    class: 'max-w-full h-auto rounded-lg my-4',
                },
            }),
            Placeholder.configure({
                placeholder,
            }),
        ],
        editorProps: {
            attributes: {
                class: 'prose prose-sm sm:prose lg:prose-lg max-w-none focus:outline-none min-h-[300px] px-4 py-3',
            },
        },
        content: value,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
    });

    // Update editor content if value changes externally (and isn't the same to avoid cursor jumps)
    useEffect(() => {
        if (editor && value !== editor.getHTML()) {
            // Only update if the content is drastically different to prevent loops
            // For simple use cases, this check might need improvement, but works for form resets
            if (editor.isEmpty && value) {
                editor.commands.setContent(value);
            }
        }
    }, [value, editor]);

    if (!editor) {
        return null;
    }

    const setLink = () => {
        const previousUrl = editor.getAttributes('link').href;
        const url = window.prompt('URL', previousUrl);

        if (url === null) {
            return;
        }

        if (url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run();
            return;
        }

        editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    };

    const addImage = () => {
        const url = window.prompt('Image URL');
        if (url) {
            editor.chain().focus().setImage({ src: url }).run();
        }
    };

    return (
        <div className="border border-gray-300 rounded-lg overflow-hidden bg-white focus-within:ring-1 focus-within:ring-envoklear-green focus-within:border-envoklear-green transition-all">
            {/* Toolbar */}
            <div className="flex flex-wrap gap-1 p-2 border-b border-gray-200 bg-gray-50">
                <MenuButton
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    isActive={editor.isActive('bold')}
                    title="Bold"
                >
                    <Bold size={18} />
                </MenuButton>
                <MenuButton
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    isActive={editor.isActive('italic')}
                    title="Italic"
                >
                    <Italic size={18} />
                </MenuButton>
                <MenuButton
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    isActive={editor.isActive('strike')}
                    title="Strike"
                >
                    <Strikethrough size={18} />
                </MenuButton>

                <div className="w-px h-6 bg-gray-300 mx-1 self-center" />

                <MenuButton
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    isActive={editor.isActive('heading', { level: 2 })}
                    title="Heading 2"
                >
                    <Heading1 size={18} />
                </MenuButton>
                <MenuButton
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    isActive={editor.isActive('heading', { level: 3 })}
                    title="Heading 3"
                >
                    <Heading2 size={18} />
                </MenuButton>

                <div className="w-px h-6 bg-gray-300 mx-1 self-center" />

                <MenuButton
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    isActive={editor.isActive('bulletList')}
                    title="Bullet List"
                >
                    <List size={18} />
                </MenuButton>
                <MenuButton
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    isActive={editor.isActive('orderedList')}
                    title="Ordered List"
                >
                    <ListOrdered size={18} />
                </MenuButton>

                <div className="w-px h-6 bg-gray-300 mx-1 self-center" />

                <MenuButton
                    onClick={setLink}
                    isActive={editor.isActive('link')}
                    title="Link"
                >
                    <LinkIcon size={18} />
                </MenuButton>
                <MenuButton
                    onClick={addImage}
                    title="Image"
                >
                    <ImageIcon size={18} />
                </MenuButton>
                <MenuButton
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    isActive={editor.isActive('blockquote')}
                    title="Quote"
                >
                    <Quote size={18} />
                </MenuButton>
                <MenuButton
                    onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                    isActive={editor.isActive('codeBlock')}
                    title="Code Block"
                >
                    <Code size={18} />
                </MenuButton>

                <div className="flex-grow" />

                <MenuButton
                    onClick={() => editor.chain().focus().undo().run()}
                    disabled={!editor.can().undo()}
                    title="Undo"
                >
                    <Undo size={18} />
                </MenuButton>
                <MenuButton
                    onClick={() => editor.chain().focus().redo().run()}
                    disabled={!editor.can().redo()}
                    title="Redo"
                >
                    <Redo size={18} />
                </MenuButton>
            </div>

            {/* Editor Content */}
            <EditorContent editor={editor} />
        </div>
    );
}
