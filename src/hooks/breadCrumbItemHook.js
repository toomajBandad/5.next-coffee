'use client';

import { usePathname } from 'next/navigation';

const useBreadcrumbItems = () => {
  const pathname = usePathname();
  const pathSegments = pathname.split('/').filter(Boolean);

  const breadcrumbItems = pathSegments.map((segment, index) => {
    const href = '/' + pathSegments.slice(0, index + 1).join('/');
    const label = decodeURIComponent(segment.replace(/-/g, ' '));

    return { label, href };
  });

  return [{ label: 'Home', href: '/' }, ...breadcrumbItems];
};

export default useBreadcrumbItems;