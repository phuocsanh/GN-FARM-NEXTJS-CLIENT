'use client';

import { usePathname } from 'next/navigation';

export function useIsActivePath(path: string): boolean {
  const pathname = usePathname();
  return pathname === path;
}
