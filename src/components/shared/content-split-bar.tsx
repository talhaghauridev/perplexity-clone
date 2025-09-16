import { cn } from '@/lib/utils';
import React, { memo } from 'react';

type BaseContentSplitBarProps = {
  lineColor?: string;
  containerClassName?: string;
};

type ChildrenContentSplitBarProps = BaseContentSplitBarProps & {
  children: React.ReactNode;
  text?: never;
};

type TextContentSplitBarProps = BaseContentSplitBarProps & {
  text: string;
  children?: never;
};

type ContentSplitBarProps = ChildrenContentSplitBarProps | TextContentSplitBarProps;

const ContentSplitBar: React.FC<ContentSplitBarProps> = ({
  children,
  lineColor = '#e5e5e5',
  containerClassName,
  text,
}) => {
  return (
    <div className={cn('my-6 flex w-full flex-row items-center', containerClassName)}>
      <div className="rounded-1 bg-border h-[1px] flex-1" />
      {text ? (
        <span className="text-muted-foreground mx-[8px] text-[12px]">{text}</span>
      ) : (
        <div className="px-[8px]">{children}</div>
      )}
      <div className="rounded-1 bg-border h-[1px] flex-1" />
    </div>
  );
};

export default memo(ContentSplitBar);
