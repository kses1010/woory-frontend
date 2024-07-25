import LikeIcon from '@/app/_components/icon/like/LikeIcon';

interface Props {
  topic: string;
  hasLike?: boolean;
  isLiked: boolean;
}

export default function DailyTopic({ topic, hasLike, isLiked }: Props) {
  return (
    <div className="flex items-center justify-between w-[34.1rem] h-[3.2rem] bg-white">
      <div className="font-title">{topic}</div>
      {hasLike && <LikeIcon isLiked={isLiked} />}
    </div>
  );
}
