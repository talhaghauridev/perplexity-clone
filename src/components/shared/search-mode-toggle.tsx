'use client';

import { cn } from '@/lib/utils';
import { getCookie, setCookie } from '@/utils/cookies';
import { Globe } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Toggle } from '../ui/toggle';

export function SearchModeToggle() {
  const [isSearchMode, setIsSearchMode] = useState(true);

  useEffect(() => {
    const savedMode = getCookie('search-mode');
    if (savedMode !== null) {
      setIsSearchMode(savedMode === 'true');
    } else {
      setCookie('search-mode', 'true');
    }
  }, []);

  const handleSearchModeChange = (pressed: boolean) => {
    setIsSearchMode(pressed);
    setCookie('search-mode', pressed.toString());
  };

  return (
    <Toggle
      aria-label="Toggle search mode"
      pressed={isSearchMode}
      onPressedChange={handleSearchModeChange}
      variant="outline"
      className={cn(
        'border-input text-muted-foreground bg-background gap-1 border px-3',
        'data-[state=on]:bg-accent-blue',
        'data-[state=on]:text-accent-blue-foreground',
        'data-[state=on]:border-accent-blue-border',
        'hover:bg-accent hover:text-accent-foreground rounded-full'
      )}>
      <Globe className="size-4" />
      <span className="text-xs">Search</span>
    </Toggle>
  );
}
