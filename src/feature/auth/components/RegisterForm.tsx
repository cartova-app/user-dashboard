import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputWithIcon } from "@/core/components/common/InputWithIcon";
import { SocialButton } from "@/core/components/common/SocialButton";
import { Button } from "@/core/components/ui/button";
import { MailIcon, Facebook } from "lucide-react";
import GoogleIcon from "@/assets/icons/Google.svg?react";
import { signUpSchema } from "../schemas/signUpSchema";
import CompeleteProfileDialog from "@/feature/profile/components/CompeleteProfileDialog";
import { UserCog } from "lucide-react";
import authClient from "@/core/config/auth-client";
import { useState } from "react";
import { PasswordInputWithIcon } from "@/core/components/common/PasswordInputWithIcon";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

export default function SignUpForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    mode: "onTouched",
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignUpFormData) => {
    setLoading(true);
    const { data: resData, error } = await authClient.signUp.email(data);

    if (error) {
      const message = error.message || "Failed to create account";
      toast.error(message);
      setError("root", { message });
      setLoading(false);
      return;
    }

    if (resData?.token) {
      localStorage.setItem("bearer_token", resData.token);
    }

    toast.success("Account created successfully");
    navigate("/organizations", { replace: true });
    setLoading(false);
  };
  return (
    <div className="bg-card p-8 rounded-2xl shadow-lg max-w-md w-full">
      <h1 className="text-2xl font-bold text-center mb-2">
        Create Your Account
      </h1>
      <p className="text-sm text-muted-foreground text-center mb-6">
        Create your store in under 10 minutes
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {errors.root?.message && (
          <p className="text-sm text-destructive bg-destructive/10 p-3 rounded-lg">
            {errors.root.message}
          </p>
        )}
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

        <Button
          variant="primary"
          className="w-full"
          type="submit"
          disabled={loading}
        >
          {loading ? "Creating Account..." : "Create Account"}
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground mt-4">
        Already have an account?{" "}
        <Link to="/login" className="text-primary hover:underline font-medium">
          log in
        </Link>
      </p>
      <CompeleteProfileDialog isOpen={dialogOpen} setIsOpen={setDialogOpen} />
    </div>
  );
}
