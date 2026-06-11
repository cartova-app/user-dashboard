import type React from 'react';

type SettingsPanelProps = {
  title: string;
  description: string;
  children: React.ReactNode;
};

const SettingsPanel = ({ title, description, children }: SettingsPanelProps) => (
  <div className="rounded-xl border-2 bg-card p-7 shadow-md md:p-8">
    <div className="space-y-2 border-b pb-7">
      <h2 className="text-3xl font-bold leading-tight text-foreground">{title}</h2>
      <p className="text-lg text-muted-foreground">{description}</p>
    </div>
    <div className="space-y-8 pt-8">{children}</div>
  </div>
);

export default SettingsPanel;
