"use client";
import * as React from "react";
import { createPortal } from "react-dom";

/* -------------------------------------------------------------------------------------------------
 * Context
 * -----------------------------------------------------------------------------------------------*/

type TooltipPoint = { x: number; y: number };

type TooltipContextValue = {
  tooltip: TooltipPoint | undefined;
  setTooltip: (tooltip: TooltipPoint | undefined) => void;
};

const TooltipContext = React.createContext<TooltipContextValue | undefined>(
  undefined,
);

function useTooltipContext(): TooltipContextValue {
  const context = React.useContext(TooltipContext);
  if (!context) {
    throw new Error("Tooltip must be used within a Tooltip Context");
  }
  return context;
}

/* -------------------------------------------------------------------------------------------------
 * Tooltip Provider
 * -----------------------------------------------------------------------------------------------*/

const Tooltip: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tooltip, setTooltip] = React.useState<TooltipPoint | undefined>(
    undefined,
  );

  // Evita recrear el objeto value en cada render
  const value = React.useMemo(() => ({ tooltip, setTooltip }), [tooltip]);

  return (
    <TooltipContext.Provider value={value}>{children}</TooltipContext.Provider>
  );
};

/* -------------------------------------------------------------------------------------------------
 * TooltipTrigger
 * -----------------------------------------------------------------------------------------------*/

const TooltipTrigger = React.forwardRef<
  HTMLDivElement,
  { children: React.ReactNode }
>((props, forwardedRef) => {
  const { children } = props;
  const context = useTooltipContext();
  const triggerRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
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
        if (typeof forwardedRef === "function") forwardedRef(node);
        else if (forwardedRef) forwardedRef.current = node;
      }}
      onPointerMove={(event) => {
        if (event.pointerType === "mouse") {
          context.setTooltip({ x: event.clientX, y: event.clientY });
        }
      }}
      onPointerLeave={(event) => {
        // solo limpia si venía de mouse
        if (event.pointerType === "mouse") context.setTooltip(undefined);
      }}
      onTouchStart={(event) => {
        context.setTooltip({
          x: event.touches[0].clientX,
          y: event.touches[0].clientY,
        });
        setTimeout(() => context.setTooltip(undefined), 2000);
      }}
      style={{ width: "fit-content", height: "fit-content" }}
    >
      {children}
    </div>
  );
});

TooltipTrigger.displayName = "TooltipTrigger";

/* -------------------------------------------------------------------------------------------------
 * TooltipContent (FIX: NO leer ref.current durante render)
 * -----------------------------------------------------------------------------------------------*/

const TooltipContent = React.forwardRef<
  HTMLDivElement,
  { children: React.ReactNode }
>((props) => {
  const { children } = props;
  const context = useTooltipContext();

  const runningOnClient = typeof document !== "undefined";
  const tooltipRef = React.useRef<HTMLDivElement>(null);

  const [isMobile, setIsMobile] = React.useState(false);
  const [pos, setPos] = React.useState<{ top: number; left: number } | null>(
    null,
  );

  // ✅ Detecta mobile sin leer window en render
  React.useEffect(() => {
    if (!runningOnClient) return;

    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);

    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [runningOnClient]);

  // ✅ Calcula posición fuera del render (aquí sí puedes leer tooltipRef.current) [1](https://react.dev/reference/eslint-plugin-react-hooks/lints/refs)
  React.useLayoutEffect(() => {
    if (!runningOnClient) return;

    if (!context.tooltip) {
      setPos(null);
      return;
    }

    const { x, y } = context.tooltip;

    // Mobile: no medimos ancho, solo colocamos
    if (isMobile) {
      setPos({ top: y, left: x + 20 });
      return;
    }

    const el = tooltipRef.current;
    if (!el) return;

    const tooltipWidth = el.offsetWidth;
    const viewportWidth = window.innerWidth;
    const willOverflowRight = x + tooltipWidth + 10 > viewportWidth;

    setPos({
      top: y - 20,
      left: willOverflowRight ? x - tooltipWidth - 10 : x + 10,
    });
  }, [context.tooltip?.x, context.tooltip?.y, isMobile, runningOnClient]);

  if (!context.tooltip || !runningOnClient) return null;

  return createPortal(
    isMobile ? (
      <div
        className="fixed h-fit z-60 w-fit rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-3"
        style={pos ?? { top: context.tooltip.y, left: context.tooltip.x + 20 }}
      >
        {children}
      </div>
    ) : (
      <div
        ref={tooltipRef}
        className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-3.5 py-2 rounded-sm fixed z-50"
        style={
          pos ?? { top: context.tooltip.y - 20, left: context.tooltip.x + 10 }
        }
      >
        {children}
      </div>
    ),
    document.body,
  );
});

TooltipContent.displayName = "TooltipContent";

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/

export { Tooltip as ClientTooltip, TooltipTrigger, TooltipContent };
