export const dragStyles = `
  /* Hardware-accelerated transforms for maximum performance */
  .ojp-event {
    will-change: transform, opacity;
    backface-visibility: hidden;
    transform: translateZ(0);
    transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  /* Dragging state - immediate DOM response */
  .ojp-event[data-dragging="true"] {
    opacity: 0.1;
    pointer-events: none;
    transform: translateZ(0) scale(0.95);
    z-index: -1;
  }
  
  /* Optimized drop zones */
  .ojp-drop-zone {
    transition: background-color 0.1s ease-out;
  }
  
  .ojp-drop-zone[data-drop-valid="true"] {
    background: linear-gradient(45deg, rgba(34, 197, 94, 0.1), rgba(34, 197, 94, 0.25));
    animation: pulse-valid 0.8s ease-in-out infinite alternate;
  }
  
  .ojp-drop-zone[data-drop-invalid="true"] {
    background: linear-gradient(45deg, rgba(239, 68, 68, 0.1), rgba(239, 68, 68, 0.25));
    animation: pulse-invalid 0.8s ease-in-out infinite alternate;
  }
  
  @keyframes pulse-valid {
    from { box-shadow: 0 0 0 rgba(34, 197, 94, 0.4); }
    to { box-shadow: 0 0 8px rgba(34, 197, 94, 0.6); }
  }
  
  @keyframes pulse-invalid {
    from { box-shadow: 0 0 0 rgba(239, 68, 68, 0.4); }
    to { box-shadow: 0 0 8px rgba(239, 68, 68, 0.6); }
  }
  
  /* Ghost element optimization */
  .ojp-drag-ghost {
    position: absolute;
    top: -1000px;
    left: -1000px;
    opacity: 0.8;
    transform: rotate(3deg) translateZ(0);
    pointer-events: none;
    z-index: 9999;
    padding: 8px 12px;
    background: rgba(59, 130, 246, 0.9);
    color: white;
    border-radius: 6px;
    font-size: 12px;
    font-weight: 600;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    backface-visibility: hidden;
  }
`;
