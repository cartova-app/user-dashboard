import { cn } from '@/core/lib/utils';

type SettingsSwitchProps = {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  label: string;
};

const SettingsSwitch = ({ checked, onCheckedChange, label }: SettingsSwitchProps) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    aria-label={label}
    onClick={() => onCheckedChange(!checked)}
    className={cn(
      'mt-1 flex h-8 w-14 shrink-0 items-center rounded-full p-1 transition-colors',
      checked ? 'bg-sky-600' : 'bg-muted-foreground/30',
    )}
  >
    <span className={cn('size-6 rounded-full bg-background shadow transition-transform', checked && 'translate-x-6')} />
  </button>
);

export default SettingsSwitch;
