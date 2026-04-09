"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface ShortlistItem {
  title: string;
  imageUrl: string;
  price?: string;
}

interface ShortlistContextType {
  items: ShortlistItem[];
  addToShortlist: (item: ShortlistItem) => void;
  removeFromShortlist: (title: string) => void;
  clearShortlist: () => void;
  isInShortlist: (title: string) => boolean;
}

const ShortlistContext = createContext<ShortlistContextType | undefined>(undefined);

export function ShortlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ShortlistItem[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    setIsMounted(true);
    const stored = localStorage.getItem("pacmyproduct_shortlist");
    if (stored) {
      try {
        setItems(JSON.parse(stored));
      } catch (err) {
        console.error("Could not parse shortlist cache", err);
      }
    }
  }, []);

  // Save to localStorage whenever items change
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("pacmyproduct_shortlist", JSON.stringify(items));
    }
  }, [items, isMounted]);

  const addToShortlist = (item: ShortlistItem) => {
    setItems((prev) => {
      // Prevent duplicates
      if (prev.find((p) => p.title === item.title)) return prev;
      return [...prev, item];
    });
  };

  const removeFromShortlist = (title: string) => {
    setItems((prev) => prev.filter((p) => p.title !== title));
  };

  const clearShortlist = () => {
    setItems([]);
  };

  const isInShortlist = (title: string) => {
    return items.some((p) => p.title === title);
  };

  return (
    <ShortlistContext.Provider
      value={{ items, addToShortlist, removeFromShortlist, clearShortlist, isInShortlist }}
    >
      {children}
    </ShortlistContext.Provider>
  );
}

export function useShortlist() {
  const context = useContext(ShortlistContext);
  if (context === undefined) {
    throw new Error("useShortlist must be used within a ShortlistProvider");
  }
  return context;
}
