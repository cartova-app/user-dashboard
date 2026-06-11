import type React from 'react';

type BillingCardProps = {
  title: string;
  children: React.ReactNode;
};

const BillingCard = ({ title, children }: BillingCardProps) => (
  <section className="rounded-xl border-2 bg-card p-5 shadow-md">
    <h3 className="font-['Anton'] text-3xl font-normal leading-none text-foreground">{title}</h3>
    <div className="mt-5 border-t pt-5">{children}</div>
  </section>
);

export default BillingCard;
