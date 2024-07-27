import Breadcrumb from '@/components/layout/breadcrumb';
import Header from '@/components/layout/header';
import Sidebar from '@/components/layout/sidebar';
import { type ReactNode } from 'react';

export default function Layout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <main className="relative h-full w-full pt-16">
      <Header />
      <div className="flex flex-col lg:flex-row">
        <div className="relative basis-0 lg:block lg:basis-1/6">
          <Sidebar />
        </div>
        <div className="relative flex-1">
          <Breadcrumb />
          {children}
        </div>
      </div>
    </main>
  );
}
