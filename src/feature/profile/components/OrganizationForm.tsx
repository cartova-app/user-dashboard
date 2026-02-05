import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { InputWithIcon } from "@/core/components/common/InputWithIcon";
import { useProfileStore } from "../store/profileStore";
import { StepperButtons } from "./StepperButtons";
import authClient from "@/core/config/auth-client";
import { toast } from "sonner";
import useGenerateSlug from "@/core/hooks/useGenerateSlug";

interface OrganizationFormData {
  organizationName: string;
  storeName: string;
  storeDescription: string;
}

export default function OrganizationForm() {
  const { formData, updateFormData, nextStep } = useProfileStore();
  const [isLoading, setIsLoading] = useState(false);
  const { generateSlug } = useGenerateSlug();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<OrganizationFormData>({
    defaultValues: {
      organizationName: formData.organizationName || "",
      storeName: formData.storeName || "",
      storeDescription: formData.storeDescription || "",
    },
  });

  const onSubmit = async (data: OrganizationFormData) => {
    setIsLoading(true);
    try {
      // Create organization using Better Auth
      const orgSlug = generateSlug(data.organizationName);
      const { data: orgData, error: orgError } =
        await authClient.organization.create({
          name: data.organizationName,
          slug: orgSlug,
        });

      if (orgError) {
        throw new Error(orgError.message || "Failed to create organization");
      }

      // Set the organization as active
      await authClient.organization.setActive({
        organizationId: orgData?.id,
      });

      toast.success("Organization created successfully");
      updateFormData({
        ...data,
      });
      nextStep();
    } catch (error) {
      console.error("Error creating organization:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to create organization";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full py-6">
      <div className="mb-8 space-y-1.5">
        <h1 className="text-[32px] font-bold leading-[38px] font-family-satoshi">
          Let's Set Up Your Store
        </h1>
        <p
          className="text-[16px] leading-6 text-gray-600 font-family-satoshi"
          style={{ fontFamily: "Satoshi, sans-serif" }}
        >
          Tell us more about your business to get started.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <Controller
          name="organizationName"
          control={control}
          rules={{
            required: "Organization name is required",
            minLength: {
              value: 2,
              message: "Organization name must be at least 2 characters",
            },
          }}
          render={({ field }) => (
            <InputWithIcon
              label={"Organization Name"}
              id="organizationName"
              type="text"
              placeholder="Organization Name"
              error={errors.organizationName?.message}
              disabled={isLoading}
              {...field}
            />
          )}
        />
        <Controller
          name="storeName"
          control={control}
          rules={{
            required: "Store name is required",
            minLength: {
              value: 2,
              message: "Store name must be at least 2 characters",
            },
          }}
          render={({ field }) => (
            <InputWithIcon
              label={"Store Name"}
              id="storeName"
              type="text"
              placeholder="Store Name"
              error={errors.storeName?.message}
              disabled={isLoading}
              {...field}
            />
          )}
        />
        <Controller
          name="storeDescription"
          control={control}
          render={({ field }) => (
            <InputWithIcon
              label={"Store Description"}
              id="storeDescription"
              type="text"
              placeholder="What do you sell? (e.g), Handcrafted jewelry, eco-friendly apparel, digital products."
              error={errors.storeDescription?.message}
              disabled={isLoading}
              {...field}
            />
          )}
        />
        <StepperButtons
          showBackButton={false}
          disabled={isLoading}
          continueText={isLoading ? "Creating..." : "Continue"}
        />
      </form>
    </div>
  );
}
