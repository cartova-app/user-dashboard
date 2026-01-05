import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { InputWithIcon } from '@core/components/common/InputWithIcon';
import { SocialButton } from '@core/components/common/SocialButton';
import { Button } from '@core/components/ui/button';
import { MailIcon, UserIcon, PhoneIcon, StoreIcon, Facebook } from 'lucide-react';
import GoogleIcon from '@assets/icons/Google.svg?react';
import { signUpSchema } from '../schemas/signUpSchema';
import CompeleteProfileDialog from '@/feature/profile/components/CompeleteProfileDialog';
import { UserCog } from 'lucide-react';
import authClient from '@/core/config/auth-client';
import { useState } from 'react';
import { PasswordInputWithIcon } from '@/core/components/common/PasswordInputWithIcon';

export default function SignUpForm() {
    const [loading, setLoading] = useState(false);
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            name: '',
            email: '',
            phone: '',
            storeName: '',
        },
    });


    const onSubmit = async (data) => {
        try {
            setLoading(true)
            const res = await authClient.signUp.email(data)
            console.log(res)
        }
        catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    };
    return (
        <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full">
            <h1 className="text-2xl font-bold text-center mb-2">Create Your Account</h1>
            <p className="text-sm text-gray-500 text-center mb-6">
                Create your store in under 10 minutes
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                        <InputWithIcon
                            id="name"
                            type="text"
                            placeholder="Enter your full name"
                            icon={<UserCog />}
                            error={errors.name?.message}
                            onChange={field.onChange}
                            onBlur={field.onBlur}
                            value={field.value}
                        />
                    )}
                />
                <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                        <InputWithIcon
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            icon={<MailIcon />}
                            error={errors.email?.message}
                            onChange={field.onChange}
                            onBlur={field.onBlur}
                            value={field.value}
                        />
                    )}
                />

                <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                        <PasswordInputWithIcon
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Password"
                            error={errors.password?.message}
                            {...field}
                        />
                    )}
                />
                <div className="flex items-center my-6">
                    <div className="grow border-t border-gray-300"></div>
                    <span className="mx-4 text-sm text-gray-500">or</span>
                    <div className="grow border-t border-gray-300"></div>
                </div>

                <SocialButton icon={<GoogleIcon />}>
                    Continue with Google
                </SocialButton>

                <SocialButton icon={<Facebook />}>
                    Continue with Facebook
                </SocialButton>

                <Button
                    variant="primary"
                    className="w-full"
                    type="submit"
                    disabled={loading}
                >
                    {loading ? 'Creating Account...' : 'Create Account'}
                </Button>
            </form>

            <p className="text-center text-sm text-gray-600 mt-4">
                Already have an account?{' '}
                <a href="/login" className="text-blue-600 hover:underline font-medium">
                    log in
                </a>
            </p>
            <CompeleteProfileDialog isOpen={false} />
        </div>
    );
}