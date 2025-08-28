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

export const VisualEditsMessenger = ({ 
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
  const [focusedElement, setFocusedElement] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [resizeHandle, setResizeHandle] = useState(null);
  const [initialMousePos, setInitialMousePos] = useState({ x: 0, y: 0 });
  const [initialElementRect, setInitialElementRect] = useState(null);
  
  const overlayRef = useRef(null);
  const resizeObserverRef = useRef(null);
  const mutationObserverRef = useRef(null);
  const pendingStylesRequest = useRef(null);

  // Create overlay element that follows the hovered/focused element
  const createOverlay = useCallback(() => {
    const overlay = document.createElement("div");
    overlay.id = "visual-edits-overlay";
    overlay.style.cssText = `
      position: absolute;
      pointer-events: none;
      border: 2px solid #3b82f6;
      background: rgba(59, 130, 246, 0.1);
      z-index: 9999;
      transition: all 0.2s ease;
      border-radius: 4px;
      box-shadow: 0 0 0 1px rgba(59, 130, 246, 0.2);
    `;
    document.body.appendChild(overlay);
    return overlay;
  }, []);

  // Position overlay over target element
  const positionOverlay = useCallback((element, overlay) => {
    if (!element || !overlay) return;

    const rect = element.getBoundingClientRect();
    const scrollX = window.pageXOffset || document.documentElement.scrollLeft;
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;

    overlay.style.left = `${rect.left + scrollX}px`;
    overlay.style.top = `${rect.top + scrollY}px`;
    overlay.style.width = `${rect.width}px`;
    overlay.style.height = `${rect.height}px`;
  }, []);

  // Create resize handles for focused element
  const createResizeHandles = useCallback((element) => {
    if (!element) return [];

    const handles = [];
    const positions = [
      { position: "nw", cursor: "nw-resize", x: 0, y: 0 },
      { position: "ne", cursor: "ne-resize", x: 1, y: 0 },
      { position: "sw", cursor: "sw-resize", x: 0, y: 1 },
      { position: "se", cursor: "se-resize", x: 1, y: 1 },
      { position: "n", cursor: "n-resize", x: 0.5, y: 0 },
      { position: "s", cursor: "s-resize", x: 0.5, y: 1 },
      { position: "w", cursor: "w-resize", x: 0, y: 0.5 },
      { position: "e", cursor: "e-resize", x: 1, y: 0.5 },
    ];

    positions.forEach(({ position, cursor, x, y }) => {
      const handle = document.createElement("div");
      handle.className = `resize-handle resize-handle-${position}`;
      handle.style.cssText = `
        position: absolute;
        width: 8px;
        height: 8px;
        background: #3b82f6;
        border: 1px solid white;
        border-radius: 2px;
        cursor: ${cursor};
        pointer-events: auto;
        z-index: 10000;
        transform: translate(-50%, -50%);
      `;

      const rect = element.getBoundingClientRect();
      const scrollX = window.pageXOffset || document.documentElement.scrollLeft;
      const scrollY = window.pageYOffset || document.documentElement.scrollTop;

      handle.style.left = `${rect.left + scrollX + rect.width * x}px`;
      handle.style.top = `${rect.top + scrollY + rect.height * y}px`;

      // Add resize functionality
      handle.addEventListener("mousedown", (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        setIsResizing(true);
        setResizeHandle(position);
        setInitialMousePos({ x: e.clientX, y: e.clientY });
        setInitialElementRect({
          left: rect.left + scrollX,
          top: rect.top + scrollY,
          width: rect.width,
          height: rect.height,
        });
      });

      document.body.appendChild(handle);
      handles.push(handle);
    });

    return handles;
  }, []);

  // Clean up overlay and handles
  const cleanup = useCallback(() => {
    const overlay = document.getElementById("visual-edits-overlay");
    if (overlay) overlay.remove();

    document.querySelectorAll(".resize-handle").forEach(handle => handle.remove());
  }, []);

  // Handle mouse move for hover detection
  const handleMouseMove = useCallback((e) => {
    if (isResizing || isEditing) return;

    const element = document.elementFromPoint(e.clientX, e.clientY);
    if (!element || element.id === "visual-edits-overlay" || element.classList.contains("resize-handle")) {
      return;
    }

    // Skip if element is already focused
    if (element === focusedElement) return;

    // Find the closest editable element
    const editableElement = element.closest("[data-editable], [contenteditable], img, h1, h2, h3, h4, h5, h6, p, span, div[class*='text'], div[class*='title'], div[class*='heading']");
    
    if (editableElement && editableElement !== focusedElement) {
      let overlay = document.getElementById("visual-edits-overlay");
      if (!overlay) {
        overlay = createOverlay();
        overlayRef.current = overlay;
      }

      overlay.style.borderColor = "#10b981";
      overlay.style.background = "rgba(16, 185, 129, 0.1)";
      positionOverlay(editableElement, overlay);

      // Generate unique selector for the element
      const selector = generateElementSelector(editableElement);
      
      if (onHover) {
        onHover({
          element: editableElement,
          selector,
          bounds: editableElement.getBoundingClientRect(),
          tagName: editableElement.tagName.toLowerCase(),
          textContent: editableElement.textContent,
          src: editableElement.src || null,
        });
      }

      // Send hover message to parent
      window.parent?.postMessage({
        type: MESSAGE_TYPES.HOVER_ELEMENT,
        data: {
          selector,
          bounds: editableElement.getBoundingClientRect(),
          tagName: editableElement.tagName.toLowerCase(),
          textContent: editableElement.textContent,
          src: editableElement.src || null,
        }
      }, targetOrigin);
    }
  }, [isResizing, isEditing, focusedElement, onHover, createOverlay, positionOverlay, targetOrigin]);

  // Handle element click for focus
  const handleClick = useCallback((e) => {
    if (isResizing) return;

    const element = e.target;
    if (element.id === "visual-edits-overlay" || element.classList.contains("resize-handle")) {
      return;
    }

    // Find the closest editable element
    const editableElement = element.closest("[data-editable], [contenteditable], img, h1, h2, h3, h4, h5, h6, p, span, div[class*='text'], div[class*='title'], div[class*='heading']");
    
    if (editableElement) {
      e.preventDefault();
      e.stopPropagation();

      setFocusedElement(editableElement);
      cleanup();

      let overlay = createOverlay();
      overlay.style.borderColor = "#3b82f6";
      overlay.style.background = "rgba(59, 130, 246, 0.1)";
      overlay.style.pointerEvents = "none";
      positionOverlay(editableElement, overlay);

      // Create resize handles
      const handles = createResizeHandles(editableElement);

      // Generate unique selector for the element
      const selector = generateElementSelector(editableElement);

      if (onFocus) {
        onFocus({
          element: editableElement,
          selector,
          bounds: editableElement.getBoundingClientRect(),
          tagName: editableElement.tagName.toLowerCase(),
          textContent: editableElement.textContent,
          src: editableElement.src || null,
        });
      }

      // Send focus message to parent
      window.parent?.postMessage({
        type: MESSAGE_TYPES.FOCUS_ELEMENT,
        data: {
          selector,
          bounds: editableElement.getBoundingClientRect(),
          tagName: editableElement.tagName.toLowerCase(),
          textContent: editableElement.textContent,
          src: editableElement.src || null,
        }
      }, targetOrigin);

      // Enable text editing for text elements
      if (editableElement.tagName.match(/^(H[1-6]|P|SPAN|DIV)$/)) {
        editableElement.contentEditable = "true";
        editableElement.focus();
        setIsEditing(true);

        // Handle text changes
        const handleInput = () => {
          const newText = editableElement.textContent;
          if (onTextUpdate) {
            onTextUpdate({
              selector,
              text: newText,
              element: editableElement,
            });
          }

          window.parent?.postMessage({
            type: MESSAGE_TYPES.UPDATE_TEXT,
            data: {
              selector,
              text: newText,
            }
          }, targetOrigin);
        };

        const handleBlur = () => {
          editableElement.contentEditable = "false";
          setIsEditing(false);
          editableElement.removeEventListener("input", handleInput);
          editableElement.removeEventListener("blur", handleBlur);
        };

        editableElement.addEventListener("input", handleInput);
        editableElement.addEventListener("blur", handleBlur);
      }
    }
  }, [isResizing, focusedElement, onFocus, onTextUpdate, cleanup, createOverlay, positionOverlay, createResizeHandles, targetOrigin]);

  // Handle resize mouse move
  const handleResizeMouseMove = useCallback((e) => {
    if (!isResizing || !focusedElement || !resizeHandle || !initialElementRect) return;

    const deltaX = e.clientX - initialMousePos.x;
    const deltaY = e.clientY - initialMousePos.y;

    let newRect = { ...initialElementRect };

    // Calculate new dimensions based on resize handle
    switch (resizeHandle) {
      case "se": // Southeast
        newRect.width = Math.max(20, initialElementRect.width + deltaX);
        newRect.height = Math.max(20, initialElementRect.height + deltaY);
        break;
      case "sw": // Southwest
        newRect.width = Math.max(20, initialElementRect.width - deltaX);
        newRect.height = Math.max(20, initialElementRect.height + deltaY);
        newRect.left = initialElementRect.left + deltaX;
        break;
      case "nw": // Northwest
        newRect.width = Math.max(20, initialElementRect.width - deltaX);
        newRect.height = Math.max(20, initialElementRect.height - deltaY);
        newRect.left = initialElementRect.left + deltaX;
        newRect.top = initialElementRect.top + deltaY;
        break;
      case "ne": // Northeast
        newRect.width = Math.max(20, initialElementRect.width + deltaX);
        newRect.height = Math.max(20, initialElementRect.height - deltaY);
        newRect.top = initialElementRect.top + deltaY;
        break;
      case "e": // East
        newRect.width = Math.max(20, initialElementRect.width + deltaX);
        break;
      case "w": // West
        newRect.width = Math.max(20, initialElementRect.width - deltaX);
        newRect.left = initialElementRect.left + deltaX;
        break;
      case "n": // North
        newRect.height = Math.max(20, initialElementRect.height - deltaY);
        newRect.top = initialElementRect.top + deltaY;
        break;
      case "s": // South
        newRect.height = Math.max(20, initialElementRect.height + deltaY);
        break;
    }

    // Apply new dimensions to element
    focusedElement.style.width = `${newRect.width}px`;
    focusedElement.style.height = `${newRect.height}px`;
    
    if (newRect.left !== initialElementRect.left) {
      focusedElement.style.position = "relative";
      focusedElement.style.left = `${newRect.left - initialElementRect.left}px`;
    }
    
    if (newRect.top !== initialElementRect.top) {
      focusedElement.style.position = "relative";
      focusedElement.style.top = `${newRect.top - initialElementRect.top}px`;
    }

    // Update overlay and handles
    const overlay = document.getElementById("visual-edits-overlay");
    if (overlay) {
      positionOverlay(focusedElement, overlay);
    }

    // Update resize handles positions
    document.querySelectorAll(".resize-handle").forEach((handle, index) => {
      const positions = [
        { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 },
        { x: 0.5, y: 0 }, { x: 0.5, y: 1 }, { x: 0, y: 0.5 }, { x: 1, y: 0.5 },
      ];
      
      const pos = positions[index];
      if (pos) {
        const rect = focusedElement.getBoundingClientRect();
        const scrollX = window.pageXOffset || document.documentElement.scrollLeft;
        const scrollY = window.pageYOffset || document.documentElement.scrollTop;
        
        handle.style.left = `${rect.left + scrollX + rect.width * pos.x}px`;
        handle.style.top = `${rect.top + scrollY + rect.height * pos.y}px`;
      }
    });

    // Notify about resize
    const selector = generateElementSelector(focusedElement);
    if (onResize) {
      onResize({
        selector,
        element: focusedElement,
        rect: newRect,
      });
    }

    window.parent?.postMessage({
      type: MESSAGE_TYPES.RESIZE_ELEMENT,
      data: {
        selector,
        rect: newRect,
      }
    }, targetOrigin);
  }, [isResizing, focusedElement, resizeHandle, initialMousePos, initialElementRect, onResize, positionOverlay, targetOrigin]);

  // Handle resize mouse up
  const handleResizeMouseUp = useCallback(() => {
    if (isResizing) {
      setIsResizing(false);
      setResizeHandle(null);
      setInitialMousePos({ x: 0, y: 0 });
      setInitialElementRect(null);
    }
  }, [isResizing]);

  // Generate unique selector for element
  const generateElementSelector = useCallback((element) => {
    if (element.id) {
      return `#${element.id}`;
    }

    const path = [];
    let current = element;

    while (current && current.nodeType === Node.ELEMENT_NODE && current !== document.body) {
      let selector = current.tagName.toLowerCase();
      
      if (current.className) {
        const classes = current.className.split(/\s+/).filter(cls => cls && !cls.startsWith('hover:') && !cls.startsWith('focus:'));
        if (classes.length > 0) {
          selector += '.' + classes.slice(0, 3).join('.');
        }
      }

      // Add nth-child if there are siblings with same tag
      const siblings = Array.from(current.parentNode?.children || []);
      const sameTagSiblings = siblings.filter(sibling => sibling.tagName === current.tagName);
      if (sameTagSiblings.length > 1) {
        const index = sameTagSiblings.indexOf(current) + 1;
        selector += `:nth-child(${index})`;
      }

      path.unshift(selector);
      current = current.parentElement;
    }

    return path.join(' > ');
  }, []);

  // Handle messages from parent window
  const handleMessage = useCallback((event) => {
    if (event.origin !== window.location.origin && targetOrigin !== "*") return;

    const { type, data } = event.data;

    switch (type) {
      case MESSAGE_TYPES.UPDATE_STYLE:
        if (data.selector && data.styles) {
          const element = document.querySelector(data.selector);
          if (element) {
            Object.assign(element.style, data.styles);
            
            if (onStyleUpdate) {
              onStyleUpdate({
                selector: data.selector,
                styles: data.styles,
                element,
              });
            }
          }
        }
        break;

      case MESSAGE_TYPES.UPDATE_IMAGE:
        if (data.selector && data.src) {
          const element = document.querySelector(data.selector);
          if (element && element.tagName === "IMG") {
            element.src = data.src;
            
            if (onImageUpdate) {
              onImageUpdate({
                selector: data.selector,
                src: data.src,
                element,
              });
            }
          }
        }
        break;

      case MESSAGE_TYPES.GET_STYLES:
        if (data.selector) {
          const element = document.querySelector(data.selector);
          if (element) {
            const computedStyles = window.getComputedStyle(element);
            const styles = {};
            
            // Get relevant style properties
            const properties = [
              'color', 'backgroundColor', 'fontSize', 'fontWeight', 'fontFamily',
              'textAlign', 'lineHeight', 'letterSpacing', 'textDecoration',
              'margin', 'marginTop', 'marginRight', 'marginBottom', 'marginLeft',
              'padding', 'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft',
              'border', 'borderRadius', 'width', 'height', 'display', 'position',
              'top', 'right', 'bottom', 'left', 'zIndex', 'opacity', 'transform'
            ];

            properties.forEach(prop => {
              styles[prop] = computedStyles.getPropertyValue(prop);
            });

            if (onGetStyles) {
              onGetStyles({
                selector: data.selector,
                styles,
                element,
              });
            }

            window.parent?.postMessage({
              type: MESSAGE_TYPES.STYLES_RESPONSE,
              data: {
                selector: data.selector,
                styles,
                requestId: data.requestId,
              }
            }, targetOrigin);
          }
        }
        break;

      case MESSAGE_TYPES.BLUR_ELEMENT:
        setFocusedElement(null);
        setIsEditing(false);
        cleanup();
        
        if (onBlur) {
          onBlur();
        }
        break;
    }
  }, [targetOrigin, onStyleUpdate, onImageUpdate, onGetStyles, onBlur, cleanup]);

  // Handle escape key to blur focused element
  const handleKeyDown = useCallback((e) => {
    if (e.key === "Escape" && focusedElement) {
      setFocusedElement(null);
      setIsEditing(false);
      cleanup();
      
      if (onBlur) {
        onBlur();
      }

      window.parent?.postMessage({
        type: MESSAGE_TYPES.BLUR_ELEMENT,
        data: {}
      }, targetOrigin);
    }
  }, [focusedElement, cleanup, onBlur, targetOrigin]);

  // Setup event listeners and observers
  useEffect(() => {
    // Add event listeners
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("click", handleClick, true);
    document.addEventListener("mousemove", handleResizeMouseMove);
    document.addEventListener("mouseup", handleResizeMouseUp);
    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("message", handleMessage);

    // Setup ResizeObserver to keep overlay positioned correctly
    if (window.ResizeObserver) {
      resizeObserverRef.current = new ResizeObserver(() => {
        if (focusedElement) {
          const overlay = document.getElementById("visual-edits-overlay");
          if (overlay) {
            positionOverlay(focusedElement, overlay);
          }
        }
      });

      resizeObserverRef.current.observe(document.body);
    }

    // Setup MutationObserver to handle DOM changes
    if (window.MutationObserver) {
      mutationObserverRef.current = new MutationObserver(() => {
        if (focusedElement && !document.contains(focusedElement)) {
          setFocusedElement(null);
          setIsEditing(false);
          cleanup();
        }
      });

      mutationObserverRef.current.observe(document.body, {
        childList: true,
        subtree: true,
      });
    }

    // Send ready message to parent
    window.parent?.postMessage({
      type: MESSAGE_TYPES.READY,
      data: { origin: window.location.origin }
    }, targetOrigin);

    // Cleanup function
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("click", handleClick, true);
      document.removeEventListener("mousemove", handleResizeMouseMove);
      document.removeEventListener("mouseup", handleResizeMouseUp);
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("message", handleMessage);

      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
      }

      if (mutationObserverRef.current) {
        mutationObserverRef.current.disconnect();
      }

      cleanup();
    };
  }, [
    handleMouseMove,
    handleClick,
    handleResizeMouseMove,
    handleResizeMouseUp,
    handleKeyDown,
    handleMessage,
    focusedElement,
    positionOverlay,
    cleanup,
    targetOrigin,
  ]);

  // Handle window scroll to keep overlay positioned
  useEffect(() => {
    const handleScroll = () => {
      if (focusedElement) {
        const overlay = document.getElementById("visual-edits-overlay");
        if (overlay) {
          positionOverlay(focusedElement, overlay);
        }

        // Update resize handles positions
        document.querySelectorAll(".resize-handle").forEach((handle, index) => {
          const positions = [
            { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 },
            { x: 0.5, y: 0 }, { x: 0.5, y: 1 }, { x: 0, y: 0.5 }, { x: 1, y: 0.5 },
          ];
          
          const pos = positions[index];
          if (pos) {
            const rect = focusedElement.getBoundingClientRect();
            const scrollX = window.pageXOffset || document.documentElement.scrollLeft;
            const scrollY = window.pageYOffset || document.documentElement.scrollTop;
            
            handle.style.left = `${rect.left + scrollX + rect.width * pos.x}px`;
            handle.style.top = `${rect.top + scrollY + rect.height * pos.y}px`;
          }
        });
      }
    };

    window.addEventListener("scroll", handleScroll, true);
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll, true);
      window.removeEventListener("resize", handleScroll);
    };
  }, [focusedElement, positionOverlay]);

  // Component doesn't render anything visible - it just provides the editing functionality
  return null;
};