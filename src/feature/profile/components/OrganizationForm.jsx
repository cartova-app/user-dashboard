import { useForm } from 'react-hook-form';
import { InputWithIcon } from '@core/components/common/InputWithIcon';
import { useProfileStore } from '../store/profileStore';
import { StepperButtons } from './StepperButtons';

export default function OrganizationForm() {
    const { formData, updateFormData, nextStep } = useProfileStore();

    const {
        register,
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
                <InputWithIcon
                    label={'Organization Name'}
                    id="organizationName"
                    type="text"
                    placeholder="Your Company Inc."
                    error={errors.organizationName?.message}
                    {...register('organizationName', { required: 'Organization name is required' })}
                />

                <InputWithIcon
                    label={'Store Name'}
                    id="storeName"
                    type="text"
                    placeholder="Store Name"
                    error={errors.storeName?.message}
                    {...register('storeName', { required: 'Store name is required' })}
                />

                <InputWithIcon
                    label={'Store Description'}
                    id="storeDescription"
                    type="text"
                    placeholder="What do you sell? (e.g), Handcrafted jewelry, eco-friendly apparel, digital products."
                    error={errors.storeDescription?.message}
                    {...register('storeDescription', { required: 'Store description is required' })}
                />

                <StepperButtons showBackButton={false} />
            </form>
        </div>
    );
}