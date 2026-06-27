'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardOverviewRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/dashboard/settings');
  }, [router]);

  return (
    <div className="min-h-[50vh] flex items-center justify-center text-slate-500 font-medium">
      Redirecting to settings...
    </div>
  );
}
