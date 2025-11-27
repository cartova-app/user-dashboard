import React from 'react';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@core/components/ui/input-otp';
import { Button } from '@core/components/ui/button';
import { useOtpStore } from '../stores/useOtpStore';
import { useSignUpStore } from '../stores/useSignUpStore';

const OtpForm = () => {
    const { otp, isComplete, error, setOtp, clearOtp, validateOtp } = useOtpStore();
    const { verifyOtp, isLoading, signUpData } = useSignUpStore();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateOtp()) {
            const result = await verifyOtp(otp);
            if (result.success) {
                console.log('OTP verified successfully');
                // TODO: Navigate to dashboard or next step
            }
        }
    };

    const handleResend = async () => {
        clearOtp();
        // TODO: Add your resend OTP API logic here
        console.log('Resend OTP to:', signUpData?.email);
    };

    return (
        <div className="bg-white p-10 rounded-3xl shadow-xl max-w-md w-full border border-gray-100">
            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-8">
                    {/* Header Section */}
                    <div className="text-center space-y-4">
                        <div className="space-y-2">
                            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
                                Enter verification code
                            </h2>
                            <p className="text-base text-gray-600 leading-relaxed">
                                We've sent a 4-digit code to{' '}
                                <span className="font-semibold text-gray-900">{signUpData?.email}</span>
                            </p>
                        </div>
                    </div>

                    {/* OTP Input Section */}
                    <div className="space-y-6">
                        <div className="flex justify-center">
                            <InputOTP
                                maxLength={4}
                                value={otp}
                                onChange={setOtp}
                                disabled={isLoading}
                            >
                                <InputOTPGroup className="gap-4">
                                    <InputOTPSlot
                                        index={0}
                                    />
                                    <InputOTPSlot
                                        index={1}
                                    />
                                    <InputOTPSlot
                                        index={2}
                                    />
                                    <InputOTPSlot
                                        index={3}
                                    />
                                </InputOTPGroup>
                            </InputOTP>
                        </div>

                        {error && (
                            <div className="text-center">
                                <p className="text-sm text-red-600 bg-red-50 py-2 px-3 rounded-lg border border-red-200 inline-flex items-center">
                                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    {error}
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Buttons Section */}
                <div className="space-y-4">
                    <Button
                        type="submit"
                        variant="primary"
                        className="w-full h-12 text-base font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 disabled:transform-none disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={!isComplete || isLoading}
                    >
                        {isLoading ? (
                            <div className="flex items-center justify-center space-x-2">
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                <span>Verifying...</span>
                            </div>
                        ) : (
                            'Verify Code'
                        )}
                    </Button>

                    <div className="text-center pt-2">
                        <button
                            type="button"
                            onClick={handleResend}
                            disabled={isLoading}
                            className="text-sm text-gray-600 hover:text-gray-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group"
                        >
                            Didn't receive the code?{' '}
                            <span className="font-semibold text-blue-600 group-hover:text-blue-700 group-hover:underline transition-all duration-200">
                                Resend
                            </span>
                        </button>
                    </div>
                </div>

                {/* Security Footer */}
                <div className="text-center pt-6 border-t border-gray-100">
                    <div className="flex items-center justify-center space-x-2 text-xs text-gray-500">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                        </svg>
                        <span>Your security is our priority</span>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default OtpForm;