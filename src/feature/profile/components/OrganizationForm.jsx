import { Controller, useForm } from 'react-hook-form';
import { InputWithIcon } from '@core/components/common/InputWithIcon';
import { useProfileStore } from '../store/profileStore';
import { StepperButtons } from './StepperButtons';

export default function OrganizationForm() {
    const { formData, updateFormData, nextStep } = useProfileStore();
    console.log(formData)
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            organizationName: formData.organizationName || '',
            storeName: formData.storeName || '',
            storeDescription: formData.storeDescription || '',
        },
    });

    const onSubmit = (data) => {
        updateFormData(data);
        nextStep();
    };

    return (
        <div className="w-full py-6">
            <div className="mb-8 space-y-1.5">
                <h1
                    className="text-[32px] font-bold leading-[38px] font-family-satoshi"

                >
                    Let's Set Up Your Store
                </h1>
                <p
                    className="text-[16px] leading-6 text-gray-600 font-family-satoshi"
                    style={{ fontFamily: 'Satoshi, sans-serif' }}
                >
                    Tell us more about your business to get started.
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <Controller
                    name='name'
                    control={control}
                    render={({ field }) => (
                        <InputWithIcon
                            label={'Name'}
                            id="name"
                            type="text"
                            placeholder="John Doe"
                            error={errors.name?.message}
                            {...field}
                        />
                    )}
                />
                <Controller
                    name='email'
                    control={control}
                    render={({ field }) => (
                        <InputWithIcon
                            label={'Name'}
                            id="name"
                            type="text"
                            placeholder="John Doe"
                            error={errors.email?.message}
                            {...field}
                        />
                    )}
                />
                <Controller
                    name='storeName'
                    control={control}
                    render={({ field }) => (
                        <InputWithIcon
                            label={'Store Name'}
                            id="storeName"
                            type="text"
                            placeholder="Store Name"
                            error={errors.storeName?.message}
                            {...field}
                        />
                    )}
                />
                <Controller
                    name='storeDescription'
                    control={control}
                    render={({ field }) => (
                        <InputWithIcon
                            label={'Store Description'}
                            id="storeDescription"
                            type="text"
                            placeholder="What do you sell? (e.g), Handcrafted jewelry, eco-friendly apparel, digital products."
                            error={errors.storeDescription?.message}
                            {...field}
                        />
                    )}
                />
                <StepperButtons showBackButton={false} />
            </form>
        </div>
    );
}