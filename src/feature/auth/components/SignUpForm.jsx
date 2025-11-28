import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { InputWithIcon } from '@core/components/common/InputWithIcon';
import { SocialButton } from '@core/components/common/SocialButton';
import { Button } from '@core/components/ui/button';
import { MailIcon, UserIcon, PhoneIcon, StoreIcon, Facebook } from 'lucide-react';
import GoogleIcon from '@assets/icons/Google.svg?react';
import { signUpSchema } from '../schemas/signUpSchema';
import { useSignUpStore } from '../stores/useSignUpStore';
import CompeleteProfileDialog from '@/feature/profile/components/CompeleteProfileDialog';

export default function SignUpForm() {
    const { submitSignUp, isLoading } = useSignUpStore();

    const {
        register,
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
        const result = await submitSignUp(data);
        if (result.success) {
            console.log('Sign up successful, switching to OTP tab');
        }
    };

    return (
        <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full">
            <h1 className="text-2xl font-bold text-center mb-2">Create Your Account</h1>
            <p className="text-sm text-gray-500 text-center mb-6">
                Create your store in under 10 minutes
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <InputWithIcon
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    icon={<UserIcon />}
                    error={errors.name?.message}
                    {...register('name')}
                />

                <InputWithIcon
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    icon={<MailIcon />}
                    error={errors.email?.message}
                    {...register('email')}
                />

                <InputWithIcon
                    id="phone"
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    icon={<PhoneIcon />}
                    error={errors.phone?.message}
                    {...register('phone')}
                />

                <InputWithIcon
                    id="storeName"
                    type="text"
                    placeholder="My Awesome Store"
                    icon={<StoreIcon />}
                    error={errors.storeName?.message}
                    {...register('storeName')}
                />

                <div className="flex items-center my-6">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="mx-4 text-sm text-gray-500">or</span>
                    <div className="flex-grow border-t border-gray-300"></div>
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
                    disabled={isLoading}
                >
                    {isLoading ? 'Creating Account...' : 'Create Account'}
                </Button>
            </form>

            <p className="text-center text-sm text-gray-600 mt-4">
                Already have an account?{' '}
                <a href="/login" className="text-blue-600 hover:underline font-medium">
                    log in
                </a>
            </p>
            <CompeleteProfileDialog isOpen={true} />
        </div>
    );
}