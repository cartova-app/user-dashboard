import type React from 'react';
import { Label } from '@/core/components/ui/label';

type FormFieldProps = {
  label: string;
  htmlFor?: string;
  error?: string;
  children: React.ReactNode;
};

const FormField = ({ label, htmlFor, error, children }: FormFieldProps) => (
  <div className="space-y-3">
    <Label htmlFor={htmlFor} className="text-xl font-bold text-foreground">
      {label}
    </Label>
    {children}
    {error && <p className="text-sm text-destructive">{error}</p>}
  </div>
);

export default FormField;
