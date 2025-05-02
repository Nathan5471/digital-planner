import React from 'react';
import { useOverlayContext } from '../contexts/OverlayContext.jsx'

export function Overlay() {
    const { isOverlayOpen, overlayContent } = useOverlayContext();

    if (!isOverlayOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="bg-white p-4 rounded shadow-lg max-w-md w-full">
                {overlayContent}
            </div>
        </div>
    );
}