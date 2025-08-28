"use client";

import { useEffect, useRef, useState, useCallback } from "react";

// Message types for parent-child communication
const MESSAGE_TYPES = {
  HOVER_ELEMENT: "HOVER_ELEMENT",
  FOCUS_ELEMENT: "FOCUS_ELEMENT", 
  UPDATE_TEXT: "UPDATE_TEXT",
  UPDATE_STYLE: "UPDATE_STYLE",
  UPDATE_IMAGE: "UPDATE_IMAGE",
  RESIZE_ELEMENT: "RESIZE_ELEMENT",
  BLUR_ELEMENT: "BLUR_ELEMENT",
  GET_STYLES: "GET_STYLES",
  STYLES_RESPONSE: "STYLES_RESPONSE",
  READY: "READY",
};

const VisualEditsMessenger = ({ 
  onHover, 
  onFocus, 
  onBlur,
  onTextUpdate,
  onStyleUpdate,
  onImageUpdate,
  onResize,
  onGetStyles,
  targetOrigin = "*" 
}) => {
  // ... keep existing code ...

  // Component doesn't render anything visible - it just provides the editing functionality
  return null;
};

export default VisualEditsMessenger;