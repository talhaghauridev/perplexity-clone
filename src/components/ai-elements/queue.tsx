'use client';

import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { ChevronDownIcon, PaperclipIcon } from 'lucide-react';
import type { ComponentProps } from 'react';

export type QueueMessagePart = {
  type: string;
  text?: string;
  url?: string;
  filename?: string;
  mediaType?: string;
};

export type QueueMessage = {
  id: string;
  parts: QueueMessagePart[];
};

export type QueueTodo = {
  id: string;
  title: string;
  description?: string;
  status?: 'pending' | 'completed';
};

export type QueueItemProps = ComponentProps<'li'>;

export const QueueItem = ({ className, ...props }: QueueItemProps) => (
  <li
    className={cn(
      'group hover:bg-muted flex flex-col gap-1 rounded-md px-3 py-1 text-sm transition-colors',
      className
    )}
    {...props}
  />
);

export type QueueItemIndicatorProps = ComponentProps<'span'> & {
  completed?: boolean;
};

export const QueueItemIndicator = ({
  completed = false,
  className,
  ...props
}: QueueItemIndicatorProps) => (
  <span
    className={cn(
      'mt-0.5 inline-block size-2.5 rounded-full border',
      completed
        ? 'border-muted-foreground/20 bg-muted-foreground/10'
        : 'border-muted-foreground/50',
      className
    )}
    {...props}
  />
);

export type QueueItemContentProps = ComponentProps<'span'> & {
  completed?: boolean;
};

export const QueueItemContent = ({
  completed = false,
  className,
  ...props
}: QueueItemContentProps) => (
  <span
    className={cn(
      'line-clamp-1 grow break-words',
      completed ? 'text-muted-foreground/50 line-through' : 'text-muted-foreground',
      className
    )}
    {...props}
  />
);

export type QueueItemDescriptionProps = ComponentProps<'div'> & {
  completed?: boolean;
};

export const QueueItemDescription = ({
  completed = false,
  className,
  ...props
}: QueueItemDescriptionProps) => (
  <div
    className={cn(
      'ml-6 text-xs',
      completed ? 'text-muted-foreground/40 line-through' : 'text-muted-foreground',
      className
    )}
    {...props}
  />
);

export type QueueItemActionsProps = ComponentProps<'div'>;

export const QueueItemActions = ({ className, ...props }: QueueItemActionsProps) => (
  <div
    className={cn('flex gap-1', className)}
    {...props}
  />
);

export type QueueItemActionProps = Omit<ComponentProps<typeof Button>, 'variant' | 'size'>;

export const QueueItemAction = ({ className, ...props }: QueueItemActionProps) => (
  <Button
    className={cn(
      'text-muted-foreground hover:bg-muted-foreground/10 hover:text-foreground size-auto rounded p-1 opacity-0 transition-opacity group-hover:opacity-100',
      className
    )}
    size="icon"
    type="button"
    variant="ghost"
    {...props}
  />
);

export type QueueItemAttachmentProps = ComponentProps<'div'>;

export const QueueItemAttachment = ({ className, ...props }: QueueItemAttachmentProps) => (
  <div
    className={cn('mt-1 flex flex-wrap gap-2', className)}
    {...props}
  />
);

export type QueueItemImageProps = ComponentProps<'img'>;

export const QueueItemImage = ({ className, ...props }: QueueItemImageProps) => (
  <img
    alt=""
    className={cn('h-8 w-8 rounded border object-cover', className)}
    height={32}
    width={32}
    {...props}
  />
);

export type QueueItemFileProps = ComponentProps<'span'>;

export const QueueItemFile = ({ children, className, ...props }: QueueItemFileProps) => (
  <span
    className={cn('bg-muted flex items-center gap-1 rounded border px-2 py-1 text-xs', className)}
    {...props}>
    <PaperclipIcon size={12} />
    <span className="max-w-[100px] truncate">{children}</span>
  </span>
);

export type QueueListProps = ComponentProps<typeof ScrollArea>;

export const QueueList = ({ children, className, ...props }: QueueListProps) => (
  <ScrollArea
    className={cn('mt-2 -mb-1', className)}
    {...props}>
    <div className="max-h-40 pr-4">
      <ul>{children}</ul>
    </div>
  </ScrollArea>
);

// QueueSection - collapsible section container
export type QueueSectionProps = ComponentProps<typeof Collapsible>;

export const QueueSection = ({ className, defaultOpen = true, ...props }: QueueSectionProps) => (
  <Collapsible
    className={cn(className)}
    defaultOpen={defaultOpen}
    {...props}
  />
);

// QueueSectionTrigger - section header/trigger
export type QueueSectionTriggerProps = ComponentProps<'button'>;

export const QueueSectionTrigger = ({
  children,
  className,
  ...props
}: QueueSectionTriggerProps) => (
  <CollapsibleTrigger asChild>
    <button
      className={cn(
        'group bg-muted/40 text-muted-foreground hover:bg-muted flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm font-medium transition-colors',
        className
      )}
      type="button"
      {...props}>
      {children}
    </button>
  </CollapsibleTrigger>
);

// QueueSectionLabel - label content with icon and count
export type QueueSectionLabelProps = ComponentProps<'span'> & {
  count?: number;
  label: string;
  icon?: React.ReactNode;
};

export const QueueSectionLabel = ({
  count,
  label,
  icon,
  className,
  ...props
}: QueueSectionLabelProps) => (
  <span
    className={cn('flex items-center gap-2', className)}
    {...props}>
    <ChevronDownIcon className="size-4 transition-transform group-data-[state=closed]:-rotate-90" />
    {icon}
    <span>
      {count} {label}
    </span>
  </span>
);

// QueueSectionContent - collapsible content area
export type QueueSectionContentProps = ComponentProps<typeof CollapsibleContent>;

export const QueueSectionContent = ({ className, ...props }: QueueSectionContentProps) => (
  <CollapsibleContent
    className={cn(className)}
    {...props}
  />
);

export type QueueProps = ComponentProps<'div'>;

export const Queue = ({ className, ...props }: QueueProps) => (
  <div
    className={cn(
      'border-border bg-background flex flex-col gap-2 rounded-xl border px-3 pt-2 pb-2 shadow-xs',
      className
    )}
    {...props}
  />
);
