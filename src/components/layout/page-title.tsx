'use client';

import { usePathname } from 'next/navigation';

interface PageTitle {
  children?: string;
}

export default function PageTitle({ children }: PageTitle) {
  const path = usePathname();
  const pathNames = path.split('/').filter((path) => path);

  return (
    <h3 className="relative text-2xl font-bold capitalize leading-none">
      {children ? children : pathNames.at(-1)?.replaceAll('-', ' ')}
    </h3>
  );
}
