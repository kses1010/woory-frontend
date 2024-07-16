'use client';

import HeartIcon from '@/app/_components/icon/bottomBar/HeartIcon';
import HomeIcon from '@/app/_components/icon/bottomBar/HomeIcon';
import MemberIcon from '@/app/_components/icon/bottomBar/MemberIcon';
import MyPageIcon from '@/app/_components/icon/bottomBar/MyPageIcon';
import { getCalendarTime } from '@/utils/getTime';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function BottomMenuBar() {
  const pathName = usePathname();
  const date = getCalendarTime(new Date());

  return (
    <nav className="sticky bottom-0">
      <div className="flex justify-evenly items-start pt-[1.3rem] bg-white w-[37.5rem] h-[4.8rem] border-bgGrey border-t">
        <Link href={`/daily/${date}`}>
          <HomeIcon isActive={pathName.includes('daily')} />
        </Link>
        <Link href="/favorites">
          <HeartIcon isActive={pathName.includes('favorites')} />
        </Link>
        <Link href="/members">
          <MemberIcon isActive={pathName.includes('members')} />
        </Link>
        <Link href="/myPage">
          <MyPageIcon isActive={pathName.includes('myPage')} />
        </Link>
      </div>
    </nav>
  );
}
