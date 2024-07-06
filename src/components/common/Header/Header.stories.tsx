import BasicHeader from '@/components/common/header/BasicHeader';
import ControlHeader from '@/components/common/header/ControlHeader';
import NotificationHeader from '@/components/common/header/NotificationHeader';
import { Meta, StoryObj } from '@storybook/react';

function Header() {
  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col gap-8">
        <h1 className="text-16 bg-white w-fit p-4">BasicHeader</h1>
        <BasicHeader title="title" hasRightButton buttonType="완료" />
        <BasicHeader title="title" hasRightButton buttonType="저장" />
        <BasicHeader title="title" hasRightButton={false} />
      </div>
      <div className="flex flex-col gap-8">
        <h1 className="text-16 bg-white w-fit p-4">NoticeHeader </h1>
        <NotificationHeader title="title" isActive />
        <NotificationHeader title="title" isActive={false} />
      </div>
      <div className="flex flex-col gap-8">
        <h1 className="text-16 bg-white w-fit p-4">ControlHeader</h1>
        <ControlHeader />
      </div>
    </div>
  );
}

const meta: Meta<typeof Header> = {
  title: 'Header',
  component: Header,
};

export default meta;

type Story = StoryObj<typeof Header>;

export const Default: Story = {
  args: {},
};
