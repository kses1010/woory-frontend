import DailyView from '@/app/(afterLogin)/(main)/home/daily/[day]/_components/daily/DailyView';
import PostButton from '@/app/(afterLogin)/(main)/home/daily/[day]/_components/daily/PostButton';
import UpperTabBar from '@/app/_components/upperTabBar/UpperTabBar';

export default function DailyPage() {
  return (
    <>
      <div className="mt-8 mx-16">
        <UpperTabBar />
      </div>
      <div className="mt-24">
        <DailyView />
      </div>
      <PostButton />
    </>
  );
}
