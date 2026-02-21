// components/LoginForm.js
'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Facebook, MailIcon } from 'lucide-react';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import GoogleIcon from '@/assets/icons/Google.svg?react';
import { InputWithIcon } from '@/core/components/common/InputWithIcon';
import { PasswordInputWithIcon } from '@/core/components/common/PasswordInputWithIcon';
import { SocialButton } from '@/core/components/common/SocialButton';
import { Button } from '@/core/components/ui/button';
import authClient from '@/core/config/auth-client';
import { loginScehma } from '../schemas/loginScehma';

interface LoginFormData {
  email: string;
  password: string;
}

export default function LoginForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  const from = location.state?.from?.pathname || '/organizations';

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginScehma),
    mode: 'onTouched',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    const { error } = await authClient.signIn.email(
      {
        email: data.email,
        password: data.password,
      },
      {
        onSuccess: (ctx) => {
          localStorage.setItem('bearer_token', ctx?.data?.token);
          toast.success('Login successful');
          navigate(from, { replace: true });
        },
      },
    );

    if (error) {
      const message = error.message || 'Invalid email or password';
      toast.error(message);
      setError('root', { message });
    }
    setIsLoading(false);
  };

  return (
    <div className="bg-card p-8 rounded-xl shadow-lg max-w-md w-full">
      <h1 className="text-2xl font-bold text-center mb-2">Login</h1>
      <p className="text-sm text-muted-foreground text-center mb-6">Sign in to your account</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {errors.root?.message && (
          <p className="text-sm text-destructive bg-destructive/10 p-3 rounded-lg">{errors.root.message}</p>
        )}
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <InputWithIcon
              label="Email address"
              id="email"
              type="email"
              placeholder="you@example.com"
              icon={<MailIcon />}
              error={errors.email?.message}
              {...field}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <PasswordInputWithIcon
              label="Password"
              id="password"
              placeholder="Password"
              error={errors.password?.message}
              {...field}
            />
          )}
        />
        <div className="flex items-center my-6">
          <div className="grow border-t border-border"></div>
          <span className="mx-4 text-sm text-muted-foreground">or</span>
          <div className="grow border-t border-border"></div>
        </div>

        <SocialButton icon={<GoogleIcon />}>Continue with Google</SocialButton>

        <SocialButton icon={<Facebook />}>Continue with Facebook</SocialButton>

        <Button type="submit" disabled={isLoading} variant="primary" className="w-full mt-6">
          {isLoading ? 'Signing in...' : 'Sign In'}
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground mt-4">
        Do Not have an account?{' '}
        <Link to="/sign-up" className="text-primary hover:underline font-medium">
          Sign Up
        </Link>
      </p>
    </div>
  );
}
