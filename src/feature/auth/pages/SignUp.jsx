import React from 'react'
import SignUpForm from '../components/SignUpForm'

const SignUp = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="flex flex-col md:flex-row items-center gap-8 w-full max-w-6xl">
                <div className="w-full md:w-1/2">
                    <SignUpForm />
                </div>
                <div className="hidden md:block w-full md:w-1/2">
                    <img
                        src="https://placehold.co/600x400?text=Build+Your+Dream+Store"
                        alt="Build Your Dream Store"
                        className="rounded-lg shadow-lg w-full h-auto"
                    />
                    <h2 className="text-2xl font-bold mt-4 text-center">
                        Build Your Dream Store, Manage Everything, Grow Globally
                    </h2>
                </div>
            </div>
        </div>
    )
}

export default SignUp