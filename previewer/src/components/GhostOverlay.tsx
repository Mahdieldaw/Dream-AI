import React, { useEffect } from 'react';

interface GhostOverlayProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const overlayStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  background: 'rgba(30,42,60,0.32)',
  zIndex: 9999,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

const panelStyle: React.CSSProperties = {
  background: "#fff",
  borderRadius: 16,
  boxShadow: "0 8px 48px rgba(24,144,255,0.18)",
  width: 440,
  minHeight: 420,
  padding: 0,
  display: "flex",
  flexDirection: "column",
  position: "relative"
};

const GhostOverlay: React.FC<GhostOverlayProps> = ({ open, onClose, children }) => {
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose?.();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div style={overlayStyle}>
      <div style={panelStyle}>
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            background: "#f5f5f5",
            border: "none",
            borderRadius: 4,
            padding: 4,
            cursor: "pointer",
            fontSize: 18
          }}
          aria-label="Close Ghost Overlay"
        >✕</button>
        {children}
      </div>
    </div>
  );
};

export default GhostOverlay;