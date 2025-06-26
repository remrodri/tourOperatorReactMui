"use client";
import * as React from "react";
import { createPortal } from "react-dom";

/* -------------------------------------------------------------------------------------------------
 * This is a basic tooltip created for the chart demos. Customize as needed or bring your own solution.
 * -----------------------------------------------------------------------------------------------*/

type TooltipContextValue = {
  tooltip: { x: number; y: number } | undefined;
  setTooltip: (tooltip: { x: number; y: number } | undefined) => void;
};

const TooltipContext = React.createContext<TooltipContextValue | undefined>(undefined);

function useTooltipContext(componentName: string): TooltipContextValue {
  const context = React.useContext(TooltipContext);
  if (!context) {
    throw new Error("Tooltip must be used within a Tooltip Context");
  }
  return context;
}

/* -------------------------------------------------------------------------------------------------
 * Tooltip
 * -----------------------------------------------------------------------------------------------*/

const Tooltip: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tooltip, setTooltip] = React.useState<{ x: number; y: number }>();

  return (
    <TooltipContext.Provider value={{ tooltip, setTooltip }}>{children}</TooltipContext.Provider>
  );
};

/* -------------------------------------------------------------------------------------------------
 * TooltipTrigger
 * -----------------------------------------------------------------------------------------------*/

const TooltipTrigger = React.forwardRef<HTMLDivElement, { children: React.ReactNode }>(
  (props, forwardedRef) => {
    const { children } = props;
    const context = useTooltipContext("TooltipTrigger");
    const triggerRef = React.useRef<HTMLDivElement | null>(null);

    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent | TouchEvent) => {
        if (triggerRef.current && !triggerRef.current.contains(event.target as Node)) {
          context.setTooltip(undefined);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        document.removeEventListener("touchstart", handleClickOutside);
      };
    }, [context]);

    return (
      <div
        ref={(node) => {
          triggerRef.current = node;
          if (typeof forwardedRef === "function") {
            forwardedRef(node);
          } else if (forwardedRef) {
            forwardedRef.current = node;
          }
        }}
        onPointerMove={(event) => {
          if (event.pointerType === "mouse") {
            context.setTooltip({ x: event.clientX, y: event.clientY });
          }
        }}
        onPointerLeave={() => context.setTooltip(undefined)}
        onTouchStart={(event) => {
          context.setTooltip({ x: event.touches[0].clientX, y: event.touches[0].clientY });
          setTimeout(() => context.setTooltip(undefined), 2000);
        }}
        style={{ width: "fit-content", height: "fit-content" }}
      >
        {children}
      </div>
    );
  }
);


/* -------------------------------------------------------------------------------------------------
 * TooltipContent
 * -----------------------------------------------------------------------------------------------*/

const CONTENT_NAME = "TooltipContent";

const TooltipContent = React.forwardRef<HTMLDivElement, { children: React.ReactNode }>((props, forwardedRef) => {
  const { children } = props;
  const context = useTooltipContext(CONTENT_NAME);
  const runningOnClient = typeof document !== "undefined";
  const tooltipRef = React.useRef<HTMLDivElement>(null);

  // Calculate position based on viewport
  const getTooltipPosition = () => {
    if (!tooltipRef.current || !context.tooltip) return {};

    const tooltipWidth = tooltipRef.current.offsetWidth;
    const viewportWidth = window.innerWidth;
    const willOverflowRight = context.tooltip.x + tooltipWidth + 10 > viewportWidth;

    return {
      top: context.tooltip.y - 20,
      left: willOverflowRight ? context.tooltip.x - tooltipWidth - 10 : context.tooltip.x + 10,
    };
  };

  if (!context.tooltip || !runningOnClient) {
    return null;
  }

  const isMobile = window.innerWidth < 768;

  return createPortal(
    isMobile ? (
      <div
        className="fixed h-fit z-60 w-fit rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-3"
        style={{
          top: context.tooltip.y,
          left: context.tooltip.x + 20,
        }}
      >
        {children}
      </div>
    ) : (
      <div
        ref={tooltipRef}
        className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-3.5 py-2 rounded-sm fixed z-50"
        style={getTooltipPosition()}
      >
        {children}
      </div>
    ),
    document.body
  );
});

TooltipContent.displayName = CONTENT_NAME;

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/

export { Tooltip as ClientTooltip, TooltipTrigger, TooltipContent };
