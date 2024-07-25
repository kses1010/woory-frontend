'use client';

import FavoritePost from '@/app/(afterLogin)/(main)/favorites/_components/FavoritePost';
import LocalStorage from '@/app/_store/localstorage/LocalStorage';
import { FavoritePostType } from '@/type';
import { useEffect, useState } from 'react';

export default function FavoritePostView() {
  const [favoritePosts, setFavoritePosts] = useState<FavoritePostType[]>([]);

  useEffect(() => {
    const data: FavoritePostType[] = LocalStorage.getItemJson('favorites') || [];
    if (data.length !== 0) {
      data.sort((a, b) => new Date(b.topicDate).getTime() - new Date(a.topicDate).getTime());
    }
    setFavoritePosts(data);
  }, []);

  if (favoritePosts.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center text-center w-full flex-grow font-body text-textDisabled">
        마음을 누른 글이 없어요. <br />
        우리에 올라온 글을 확인하고 <br />
        마음을 눌러보세요!
      </div>
    );
  }

  return favoritePosts.map(({ topicId, topicTitle, topicImage, topicDate }) => (
    <FavoritePost key={topicId} topicTitle={topicTitle} topicImage={topicImage} topicDate={topicDate} />
  ));
}
