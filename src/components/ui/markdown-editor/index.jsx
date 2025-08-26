import React, { useState } from 'react';
import './markdown-editor.css';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { Textarea } from '../../ui/textarea';
import MarkdownPreview from '../markdown-preview';

const TOOLBAR_ITEMS = [
    { name: 'heading', label: 'H1', prefix: '# ', suffix: '' },
    { name: 'heading-2', label: 'H2', prefix: '## ', suffix: '' },
    { name: 'heading-3', label: 'H3', prefix: '### ', suffix: '' },
    { name: 'bold', label: 'B', prefix: '**', suffix: '**' },
    { name: 'italic', label: 'I', prefix: '_', suffix: '_' },
    { name: 'quote', label: '>', prefix: '> ', suffix: '' },
    { name: 'code', label: 'Code', prefix: '```\n', suffix: '\n```' },
    { name: 'link', label: 'Link', prefix: '[', suffix: '](url)' },
    { name: 'image', label: 'Image', prefix: '![alt text](', suffix: ')' },
    { name: 'unordered-list', label: '• List', prefix: '- ', suffix: '' },
    { name: 'ordered-list', label: '1. List', prefix: '1. ', suffix: '' },
    { name: 'horizontal-rule', label: 'HR', prefix: '\n---\n', suffix: '' },
];

const MarkdownEditor = ({ value, onChange, placeholder, rows = 15, id = "markdown-editor", error }) => {
    const [activeTab, setActiveTab] = useState('edit');
    const textareaRef = React.useRef(null);

    const handleToolbarAction = (prefix, suffix) => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        // Save the current selection positions
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;

        // Get the selected text
        const selectedText = value.substring(start, end);

        // Create the new text with the markdown formatting
        const newText =
            value.substring(0, start) +
            prefix +
            selectedText +
            suffix +
            value.substring(end);

        // Update the content
        onChange(newText);

        // Set focus back to the textarea and restore selection with proper offset
        setTimeout(() => {
            textarea.focus();
            const newPosition = start + prefix.length + selectedText.length;
            textarea.setSelectionRange(
                start + prefix.length,
                selectedText.length ? newPosition : start + prefix.length
            );
        }, 0);
    };

    const handleSelectionChange = () => {
        // Nothing needed here, but keeping the function for event handling
    };

    return (
        <div className="markdown-editor-container">
            <div className="markdown-toolbar" role="toolbar" aria-label="Markdown formatting toolbar">
                {TOOLBAR_ITEMS.map((item) => (
                    <button
                        key={item.name}
                        type="button"
                        className="toolbar-button"
                        title={item.label}
                        onClick={() => handleToolbarAction(item.prefix, item.suffix)}
                    >
                        {item.label}
                    </button>
                ))}
            </div>

            <Tabs defaultValue="edit" value={activeTab} onValueChange={setActiveTab} className="markdown-tabs">
                <TabsList>
                    <TabsTrigger value="edit">Edit</TabsTrigger>
                    <TabsTrigger value="preview">Preview</TabsTrigger>
                </TabsList>
                <TabsContent value="edit">
                    <Textarea
                        id={id}
                        ref={textareaRef}
                        className="markdown-textarea"
                        placeholder={placeholder || "Write your content here using Markdown..."}
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        onSelect={handleSelectionChange}
                        onClick={handleSelectionChange}
                        onKeyUp={handleSelectionChange}
                        rows={rows}
                        aria-invalid={!!error}
                    />
                </TabsContent>
                <TabsContent value="preview" className="markdown-preview-container">
                    <div className="p-4 border rounded-md bg-white min-h-[250px]">
                        <MarkdownPreview content={value} />
                    </div>
                </TabsContent>
            </Tabs>

            {error && <div className="text-destructive text-xs mt-1">{error}</div>}
        </div>
    );
};

export default MarkdownEditor;
