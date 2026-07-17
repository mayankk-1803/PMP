"use client";

import React, { createContext, useContext, useRef, useCallback } from "react";

interface NavigationCacheContextType {
  setPageState: (key: string, state: any) => void;
  getPageState: <T = any>(key: string) => T | null;
  setScrollPosition: (key: string, scrollY: number) => void;
  getScrollPosition: (key: string) => number;
  clearRouteCache: (key: string) => void;
}

const NavigationCacheContext = createContext<NavigationCacheContextType | null>(null);

export function NavigationCacheProvider({ children }: { children: React.ReactNode }) {
  // Use refs to store cache to prevent re-renders of children when scroll positions/states update.
  const pageStatesRef = useRef<Map<string, any>>(new Map());
  const scrollPositionsRef = useRef<Map<string, number>>(new Map());

  const setPageState = useCallback((key: string, state: any) => {
    if (!key) return;
    pageStatesRef.current.set(key, state);
  }, []);

  const getPageState = useCallback(<T = any,>(key: string): T | null => {
    if (!key) return null;
    return (pageStatesRef.current.get(key) as T) || null;
  }, []);

  const setScrollPosition = useCallback((key: string, scrollY: number) => {
    if (!key) return;
    scrollPositionsRef.current.set(key, scrollY);
  }, []);

  const getScrollPosition = useCallback((key: string): number => {
    if (!key) return 0;
    return scrollPositionsRef.current.get(key) || 0;
  }, []);

  const clearRouteCache = useCallback((key: string) => {
    if (!key) return;
    pageStatesRef.current.delete(key);
    scrollPositionsRef.current.delete(key);
  }, []);

  const value = {
    setPageState,
    getPageState,
    setScrollPosition,
    getScrollPosition,
    clearRouteCache,
  };

  return (
    <NavigationCacheContext.Provider value={value}>
      {children}
    </NavigationCacheContext.Provider>
  );
}

export function useNavigationCache() {
  const context = useContext(NavigationCacheContext);
  if (!context) {
    throw new Error("useNavigationCache must be used within a NavigationCacheProvider");
  }
  return context;
}
