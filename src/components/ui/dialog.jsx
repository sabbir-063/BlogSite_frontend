import React, { useEffect } from "react";

export function Dialog({ open, onOpenChange, children }) {
    useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [open]);

    if (!open) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
            aria-modal="true"
            role="dialog"
            tabIndex={-1}
            onClick={() => onOpenChange(false)}
        >
            <div
                className="bg-white dark:bg-zinc-900 rounded-lg shadow-lg max-w-md w-full p-6 relative"
                onClick={e => e.stopPropagation()}
            >
                {children}
                <button
                    className="absolute top-2 right-2 text-zinc-400 hover:text-zinc-900 dark:hover:text-white text-xl"
                    onClick={() => onOpenChange(false)}
                    aria-label="Close dialog"
                >
                    &times;
                </button>
            </div>
        </div>
    );
}

export function DialogContent({ children, className = "" }) {
    return <div className={className}>{children}</div>;
}

export function DialogHeader({ children, className = "" }) {
    return <div className={"mb-4 " + className}>{children}</div>;
}

export function DialogTitle({ children, className = "" }) {
    return <h2 className={"text-lg font-semibold " + className}>{children}</h2>;
}

export function DialogFooter({ children, className = "" }) {
    return <div className={"mt-4 flex justify-end gap-2 " + className}>{children}</div>;
} 