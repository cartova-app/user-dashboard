import type React from 'react';
import { TabsList, TabsTrigger } from '@/core/components/ui/tabs';
import { Separator } from '@radix-ui/react-separator';

export type GlobalTabItem = {
  value: string;
  label: React.ReactNode;
  disabled?: boolean;
};

type GlobalTabsListProps = {
  items?: GlobalTabItem[];
  children?: React.ReactNode;
};

export const GlobalTabsList = ({ items, children }: GlobalTabsListProps) => (
  <TabsList className="h-auto justify-start gap-1 rounded-none border-b bg-transparent p-0 text-muted-foreground relative">
    {items?.map((item) => (
      <GlobalTabsTrigger key={item.value} value={item.value} disabled={item.disabled}>
        {item.label}
      </GlobalTabsTrigger>
    ))}

    {children}
  </TabsList>
);

type GlobalTabsTriggerProps = {
  value: string;
  disabled?: boolean;
  children: React.ReactNode;
};

export const GlobalTabsTrigger = ({ value, disabled, children }: GlobalTabsTriggerProps) => (
  <TabsTrigger
    value={value}
    disabled={disabled}
    className="
  h-14
  rounded-t-xl
  rounded-b-none
  border
  border-transparent
  px-6
  text-lg
  font-bold
  text-muted-foreground
  shadow-none
  data-[state=active]:border-border
  data-[state=active]:border-b-background
  data-[state=active]:bg-background
  data-[state=active]:text-lime-950
  data-[state=active]:shadow-none
  dark:data-[state=active]:text-lime-200
"
  >
    {children}
  </TabsTrigger>
);
