export const dragStyles = `
  /* Hardware-accelerated transforms for maximum performance */
  .ojp-event {
    will-change: transform, opacity;
    backface-visibility: hidden;
    transform: translateZ(0);
    transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  /* Mouse dragging state - physical element movement */
  .ojp-event[data-being-dragged="true"] {
    transform: scale(1.05) translateZ(0) !important;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3) !important;
    z-index: 9999 !important;
    position: fixed !important;
    pointer-events: none !important;
    transition: none !important;
    border: 3px solid #22c55e !important; /* Zelený border pro default stav */
  }
  
  /* Collision state - červený border */
  .ojp-event[data-drop-invalid="true"] {
    border: 3px solid #ef4444 !important; /* Červený border pro kolizi */
  }
  
  /* Valid drop state - zelený border */
  .ojp-event[data-drop-invalid="false"] {
    border: 3px solid #22c55e !important; /* Zelený border pro validní drop */
  }
  
  /* Global cursor during drag */
  body:has([data-being-dragged="true"]) {
    cursor: grabbing !important;
  }
  
  body:has([data-being-dragged="true"]) * {
    cursor: grabbing !important;
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
`;
