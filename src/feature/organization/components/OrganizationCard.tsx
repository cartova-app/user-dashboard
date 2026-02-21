import { Badge } from "@/core/components/ui/badge";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { authClient } from "@/core/config/auth-client";
import { InferOrganization } from "better-auth/client/plugins";
import { cn } from "@/core/lib/utils";
import HomeUserIcon from "@/assets/icons/home-user-icon.svg";

interface OrganizationCardProps {
  organization: InferOrganization<{}>;
}

export default function OrganizationCard({
  organization,
}: OrganizationCardProps) {
  const navigate = useNavigate();
  const { refetch: refetchSession } = authClient.useSession();
  const storeCount = organization?.metadata?.storeCount ?? 0;
  const plan = organization?.metadata?.plan ?? "Free plan";

  const handleClick = async () => {
    await authClient.organization.setActive({
      organizationId: organization.id,
    });
    await refetchSession();
    navigate(`/`);
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        "cursor-pointer group relative flex w-full max-w-2xl flex-col rounded-2xl border border-border bg-card p-6 text-left shadow-sm transition-all duration-300 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
      )}
    >
      {/* Top Section */}
      <div className="flex w-full items-center justify-between gap-4 border-b border-border pb-6">
        <div className="flex items-center gap-4">
          {/* Icon */}
          <div className="relative flex size-[50px] shrink-0 items-center justify-center rounded-full bg-emerald-50 dark:bg-emerald-950/30">
            {organization?.logo ? (
              <img
                src={organization.logo}
                alt={organization.name}
                className="size-full rounded-full object-cover"
              />
            ) : (
              <img src={HomeUserIcon} alt="Organization" className="size-6 dark:brightness-0 dark:invert" />
            )}
          </div>

          {/* Text Info */}
          <div className="flex flex-col">
            <h3 className="font-['Anton'] text-xl font-normal tracking-wide text-card-foreground">
              {organization?.name}
            </h3>
            <p className="font-['Satoshi'] text-sm text-muted-foreground">
              {storeCount} {storeCount === 1 ? "store" : "stores"}
            </p>
          </div>
        </div>

        {/* Action Icon */}
        <ChevronRight className="size-5 text-card-foreground transition-transform duration-300 group-hover:translate-x-1" />
      </div>

      {/* Bottom Section */}
      <div className="mt-6 flex w-full items-center justify-between">
        <Badge
          variant="outline"
          className="h-[34px] rounded-full border-border px-4 text-sm font-normal text-foreground hover:bg-accent font-satoshi"
        >
          {plan}
        </Badge>

        <Badge
          className="h-[34px] rounded-full border-0 bg-emerald-100 dark:bg-emerald-900/30 px-4 text-sm font-normal text-emerald-900 dark:text-emerald-400 hover:bg-emerald-200 dark:hover:bg-emerald-900/40 font-satoshi shadow-none"
        >
          Active
        </Badge>
      </div>
    </button>
  );
}
