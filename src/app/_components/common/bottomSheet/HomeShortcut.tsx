'use client';

import Checkbox from '@/app/_components/checkbox/Checkbox';
import PopUpButton from '@/app/_components/common/button/PopUpButton';
import { deleteCookies, getCookies, setCookies } from '@/app/_store/cookie/cookies';
import { useModalStore } from '@/app/_store/modalStore';
import Logo from '@/assets/icons/logo/logo_woory.svg';
import { openToast } from '@/utils/Toast';
import { useEffect, useState } from 'react';

// `beforeinstallprompt` 이벤트의 타입 정의
interface BeforeInstallPromptEvent extends Event {
  readonly prompt: () => Promise<void>;
  readonly userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function HomeShortcut() {
  const { setIsModalOpen } = useModalStore();
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isChecked, setIsChecked] = useState<boolean>(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      const promptEvent = e as BeforeInstallPromptEvent;
      setDeferredPrompt(promptEvent);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleCancelClick = () => {
    if (getCookies('add_home')) {
      deleteCookies('add_home');
    }
    if (isChecked) {
      setCookies('add_home', 'never', { path: '/' });
    } else {
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + 7);
      setCookies('add_home', 'no', { path: '/', expires: expiryDate });
    }
    setDeferredPrompt(null);
    setIsModalOpen(false);
  };

  const handleAddClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult.outcome === 'accepted') {
        setCookies('add_home', 'yes', { path: '/' });
        openToast('shortcut');
      } else if (choiceResult.outcome === 'dismissed') {
        if (isChecked) {
          setCookies('add_home', 'never', { path: '/' });
        }
      }
      setDeferredPrompt(null);
    }

    if (getCookies('add_home')) {
      deleteCookies('add_home');
    }

    setIsModalOpen(false);
  };

  const handleNeverShow = () => {
    setIsChecked((prev) => !prev);
  };

  return (
    <>
      <div className="absolute top-[5.9rem] left-[10.8rem] px-[0.8rem] py-[1.1rem]">
        <Logo width="14.4rem" height="5.8rem" />
      </div>
      <div className="absolute top-[14.7rem] left-[5.5rem] h-[6.4rem]">
        <h2 className="text-[2.2rem] font-700 text-black text-center">
          &apos;우리&apos; 바로가기를
          <br /> 홈 화면에 추가하시겠습니까?
        </h2>
        <div className="flex gap-8 justify-center items-center mt-12">
          <div className="pt-4">
            <Checkbox isChecked={isChecked} onClick={handleNeverShow} />
          </div>
          <span className="font-body text-midGrey ">다시 보지 않기</span>
        </div>
      </div>

      <div className="absolute bottom-[2.4rem] left-[2rem] flex gap-[1rem]">
        <PopUpButton text="취소" textColor="midGrey" colorType="lightGrey" size="large" onClick={handleCancelClick} />
        <PopUpButton text="추가" textColor="white" colorType="primary" size="large" onClick={handleAddClick} />
      </div>
    </>
  );
}
