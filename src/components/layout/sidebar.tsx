'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icons } from '../icon';

const menuList = [
  {
    title: 'Dashboard',
    link: '/',
    icon: Icons.layoutDashboard,
  },
  {
    title: 'Statement',
    link: '/statement',
    icon: Icons.fileChart,
  },
  {
    title: 'Bank Account',
    link: '/bank-account',
    icon: Icons.newspaper,
  },
  {
    title: 'Bank',
    link: '/bank',
    icon: Icons.landmark,
  },
  {
    title: 'Webhook',
    link: '/webhook',
    icon: Icons.webhook,
  },
  {
    title: 'Settings',
    link: '/settings',
    icon: Icons.settings,
  },
];

export default function Sidebar() {
  const paths = usePathname();
  // const pathNames = path.split('/').filter((path) => path);

  const isRouteMatch = (menu: string): boolean => {
    const page = paths.split('/');
    if (page.length < 3 && menu === '/') return true;
    if (page[2] === menu.replace('/', '')) return true;
    return false;
  };

  return (
    <nav className="fixed left-[-120%] top-0 h-full w-1/6 border-r border-r-slate-200 lg:left-0">
      <div className="relative w-full px-8 py-4">
        {menuList.map((menu, idx) => (
          <Link
            href={`/dashboard${menu.link}`}
            key={idx}
            className={cn(
              'relative mb-2 flex w-full cursor-pointer select-none flex-row gap-4 rounded-md border border-transparent px-4 py-2 font-semibold hover:border-primary hover:bg-primary/10',
              isRouteMatch(menu.link)
                ? 'border-primary bg-primary/10 text-primary'
                : 'text-foreground/80',
            )}
          >
            <div className="basis-10">
              {
                <menu.icon
                  className={cn(
                    isRouteMatch(menu.link)
                      ? 'text-primary'
                      : 'text-foreground/75',
                  )}
                />
              }
            </div>
            <div className="flex-1">
              <span className="text-base">{menu.title}</span>
            </div>
          </Link>
        ))}
      </div>
    </nav>
  );
}
