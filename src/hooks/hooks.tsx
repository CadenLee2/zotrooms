'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export function useSelectedRoomId() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const selectedRoomId = params.get('roomId');

  const setSelectedRoomId = (id: string | null) => {
    const queryParams = id ? `?roomId=${encodeURIComponent(id)}` : '';
    router.push(`${pathname}/${queryParams}`);
  }

  return { selectedRoomId, setSelectedRoomId };
}
