'use client';

import CommentView from '@/app/(afterLogin)/posts/[postId]/_components/comment/CommentView';
import InputComment from '@/app/(afterLogin)/posts/[postId]/_components/input/InputComment';
import { getData } from '@/app/_api/api';
import { apiRoutes } from '@/app/_api/apiRoutes';
import { useCommentListStore } from '@/app/_store/commentListStore';
import { CommentListType } from '@/type';
import { useCallback, useEffect, useState } from 'react';

interface Props {
  postId: number;
}

export default function CommentMain({ postId }: Props) {
  const { comments, setComments, reset } = useCommentListStore();
  const [replyingCommentId, setReplyingCommentId] = useState<number | null>(null);

  const handleLoad = useCallback(async () => {
    reset();
    const { data }: { data: CommentListType[] } = await getData({ path: `${apiRoutes.getComments}/${postId}` });
    setComments(data);
  }, [postId]);

  useEffect(() => {
    handleLoad();
  }, [handleLoad]);

  const handleReplyClick = (commentId: number | null) => {
    setReplyingCommentId(commentId);
  };

  return (
    <>
      <div className="flex flex-col flex-grow">
        <CommentView comments={comments} replyingCommentId={replyingCommentId} onReplyClick={handleReplyClick} />
      </div>
      <InputComment postId={postId} replyingCommentId={replyingCommentId} onReplyClick={handleReplyClick} />
    </>
  );
}
