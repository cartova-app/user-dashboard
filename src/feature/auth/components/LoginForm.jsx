// components/SignUpForm.js
'use client';

import { useState } from 'react';
import { InputWithIcon } from './InputWithIcon';
import { SocialButton } from './SocialButton';
import { Button } from '@/components/ui/button';
import { FaGoogle, FaFacebookF } from 'react-icons/fa';
import { UserIcon, EmailIcon, PhoneIcon, StoreIcon } from './icons';

export default function SignUpForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        storeName: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        // TODO: submit to API
    };

    return (
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
            <h1 className="text-2xl font-bold text-center mb-2">Create Your Account</h1>
            <p className="text-sm text-gray-500 text-center mb-6">
                Create your store in under 10 minutes
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
                <InputWithIcon
                    label="Name"
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your full name"
                    icon={<UserIcon />}
                    required
                    onChange={handleChange}
                />

                <InputWithIcon
                    label="Email address"
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    icon={<EmailIcon />}
                    required
                    onChange={handleChange}
                />

                <InputWithIcon
                    label="Phone number"
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    icon={<PhoneIcon />}
                    onChange={handleChange}
                />

                <InputWithIcon
                    label="Store Name (optional)"
                    id="storeName"
                    name="storeName"
                    type="text"
                    placeholder="My Awesome Store"
                    icon={<StoreIcon />}
                    onChange={handleChange}
                />

                <div className="flex items-center my-6">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="mx-4 text-sm text-gray-500">or</span>
                    <div className="flex-grow border-t border-gray-300"></div>
                </div>

                <SocialButton icon={<FaGoogle />}>
                    Continue with Google
                </SocialButton>

                <SocialButton icon={<FaFacebookF />}>
                    Continue with Facebook
                </SocialButton>

                <Button
                    type="submit"
                    className="w-full mt-6 bg-lime-400 hover:bg-lime-500 text-black font-semibold py-2 rounded-md transition-colors"
                >
                    Create Account
                </Button>
            </form>

            <p className="text-center text-sm text-gray-600 mt-4">
                Already have an account?{' '}
                <a href="/login" className="text-blue-600 hover:underline font-medium">
                    log in
                </a>
            </p>
        </div>
    );
}