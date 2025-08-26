import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github.css';
import './markdown-preview.css';

const MarkdownPreview = ({ content }) => {
    if (!content || content.trim() === '') {
        return <div className="markdown-empty">Nothing to preview</div>;
    }

    return (
        <div className="markdown-preview">
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw, rehypeHighlight]}
                components={{
                    // Custom rendering for certain elements if needed
                    h1: (props) => <h1 className="text-2xl font-bold mt-6 mb-4" {...props} />,
                    h2: (props) => <h2 className="text-xl font-bold mt-5 mb-3" {...props} />,
                    h3: (props) => <h3 className="text-lg font-bold mt-4 mb-2" {...props} />,
                    a: (props) => <a className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer" {...props} />,
                    img: (props) => (
                        <img
                            className="my-4 max-w-full h-auto rounded-lg"
                            alt={props.alt || ""}
                            {...props}
                        />
                    ),
                    code: ({ inline, className, children, ...props }) => {
                        return inline ? (
                            <code className="bg-gray-100 text-gray-800 px-1 py-0.5 rounded text-sm" {...props}>
                                {children}
                            </code>
                        ) : (
                            <code className={`${className || ''}`} {...props}>
                                {children}
                            </code>
                        );
                    },
                    pre: (props) => (
                        <pre className="bg-gray-800 text-gray-100 p-4 rounded-md overflow-x-auto my-4 text-sm" {...props} />
                    ),
                    blockquote: (props) => (
                        <blockquote
                            className="border-l-4 border-gray-300 pl-4 italic text-gray-700 my-4"
                            {...props}
                        />
                    ),
                    table: (props) => (
                        <div className="overflow-x-auto my-4">
                            <table className="min-w-full border-collapse border border-gray-300" {...props} />
                        </div>
                    ),
                    th: (props) => (
                        <th className="border border-gray-300 px-4 py-2 bg-gray-100 font-semibold text-left" {...props} />
                    ),
                    td: (props) => (
                        <td className="border border-gray-300 px-4 py-2" {...props} />
                    ),
                    hr: (props) => <hr className="my-6 border-t border-gray-300" {...props} />
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
};

export default MarkdownPreview;
