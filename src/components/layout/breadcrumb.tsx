'use client';

import { ChevronRightIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Fragment } from 'react';

export default function Breadcrumb() {
  const path = usePathname();
  const pathNames = path.split('/').filter((path) => path);

  const regex =
    /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;

  const isUuid = (value: string) => regex.test(value);

  return (
    <div className="container relative pb-2 pt-5">
      <ul className="m-0 flex select-none flex-row items-center gap-2 p-0">
        {pathNames.map((link, index) => {
          const href = `/${pathNames.slice(0, index + 1).join('/')}`;
          const itemLink = link[0]?.toUpperCase() + link.slice(1, link.length);
          return (
            <Fragment key={index}>
              <li className="m-0 p-0 leading-none text-primary">
                {!isUuid(itemLink) && (
                  <>
                    {pathNames.length === index + 1 && (
                      <span className="capitalize">
                        {itemLink.replaceAll('-', ' ')}
                      </span>
                    )}
                  </>
                )}
                {pathNames.length !== index + 1 && (
                  <Link
                    href={href}
                    className="font-semibold capitalize"
                  >
                    {itemLink.replaceAll('-', ' ')}
                  </Link>
                )}
              </li>
              {pathNames.length !== index + 1 && (
                <ChevronRightIcon
                  className="text-primary"
                  size={14}
                />
              )}
            </Fragment>
          );
        })}
      </ul>
    </div>
  );
}
