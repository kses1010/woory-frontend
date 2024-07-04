import ActivationMyPage from '@/../../public/bottomBar/activeMypage.svg';
import DeActivationMyPage from '@/../../public/bottomBar/mypage.svg';

interface Props {
  isActive: boolean;
}

export default function MyPageIcon({ isActive }: Props) {
  return isActive ? (
    <ActivationMyPage width="2.4rem" height="2.4rem" />
  ) : (
    <DeActivationMyPage width="2.4rem" height="2.4rem" />
  );
}
