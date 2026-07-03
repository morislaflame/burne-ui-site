"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type ControlValues = Record<string, unknown>;

type ShowcaseControlsContextValue = {
  getValues: (pageId: string) => ControlValues;
  setValues: (
    pageId: string,
    patch: ControlValues | ((prev: ControlValues) => ControlValues),
  ) => void;
};

const ShowcaseControlsContext = createContext<ShowcaseControlsContextValue | null>(null);

const EMPTY_CONTROLS: ControlValues = {};

export function ShowcaseControlsProvider({ children }: { children: ReactNode }) {
  const [store, setStore] = useState<Record<string, ControlValues>>({});

  const getValues = useCallback(
    (pageId: string) => store[pageId] ?? EMPTY_CONTROLS,
    [store],
  );

  const setValues = useCallback(
    (pageId: string, patch: ControlValues | ((prev: ControlValues) => ControlValues)) => {
      setStore((prevStore) => {
        const prev = prevStore[pageId] ?? {};
        const next = typeof patch === "function" ? patch(prev) : { ...prev, ...patch };
        return { ...prevStore, [pageId]: next };
      });
    },
    [],
  );

  const value = useMemo(
    () => ({ getValues, setValues }),
    [getValues, setValues],
  );

  return (
    <ShowcaseControlsContext.Provider value={value}>
      {children}
    </ShowcaseControlsContext.Provider>
  );
}

export function useShowcaseControls<T extends ControlValues>(
  pageId: string,
  defaults: T,
): [T, (patch: Partial<T> | ((prev: T) => Partial<T>)) => void] {
  const ctx = useContext(ShowcaseControlsContext);
  if (!ctx) {
    throw new Error("useShowcaseControls must be used inside ShowcaseControlsProvider.");
  }

  const stored = ctx.getValues(pageId);
  const values = useMemo(
    () => ({ ...defaults, ...stored }) as T,
    [defaults, stored],
  );

  const setValues = useCallback(
    (patch: Partial<T> | ((prev: T) => Partial<T>)) => {
      ctx.setValues(pageId, (prev) => {
        const merged = { ...defaults, ...prev } as T;
        const nextPatch = typeof patch === "function" ? patch(merged) : patch;
        return { ...prev, ...nextPatch };
      });
    },
    [ctx, defaults, pageId],
  );

  return [values, setValues];
}
