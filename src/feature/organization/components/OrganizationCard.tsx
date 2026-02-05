import { Badge } from "@/core/components/ui/badge";
import HomeUserIcon from "@/assets/icons/home-user-icon.svg";
import { ChevronRightIcon } from "lucide-react";
import { useNavigate } from "react-router";
import { authClient } from "@/core/config/auth-client";
import { InferOrganization } from "better-auth/client/plugins";

export default function OrganizationCard({
  organization,
}: {
  organization: InferOrganization<{}>;
}) {
  const navigate = useNavigate();
  const { refetch: refetchSession } = authClient.useSession();
  const storeCount = organization?.metadata?.storeCount ?? 0;

  const handleClick = async () => {
    await authClient.organization.setActive({
      organizationId: organization.id,
    });
    await refetchSession();
    navigate(`/`);
  };

  return (
    <div
      onClick={handleClick}
      className="w-full max-w-2xl bg-white p-6 rounded-lg border border-[#CACACA] space-y-2 cursor-pointer hover:border-primary transition-colors"
    >
      {/* Organization Info */}
      <div className="flex gap-8 border-b border-[#CACACA] pb-6 justify-between items-center">
        <div className="flex gap-2">
          {organization?.logo ? (
            <img
              src={organization.logo}
              alt={organization.name}
              className="w-[50px] h-[50px] rounded-full object-cover"
            />
          ) : (
            <div className="w-[50px] h-[50px] rounded-full bg-[#EDFCF2] grid place-items-center">
              <img src={HomeUserIcon} alt="Default Organization Icon" />
            </div>
          )}
          <div className="flex flex-col">
            <h3 className="font-['Anton'] font-normal not-italic text-base leading-6 tracking-normal">
              {organization?.name}
            </h3>
            <p className="font-['Satoshi_Variable'] font-normal text-sm leading-5 tracking-normal text-gray-500">
              {storeCount} {storeCount === 1 ? "Store" : "Stores"}
            </p>
          </div>
        </div>
        <ChevronRightIcon />
      </div>
      <div className="flex justify-between items-center">
        <Badge
          variant="outline"
          className="h-7 text-[14px] font-normal leading-5 tracking-normal"
        >
          {organization?.metadata?.plan ?? "Free plan"}
        </Badge>
        <Badge
          variant="outline"
          className="h-7 text-[14px] leading-5 tracking-normal bg-[#C9F6D9]"
        >
          Active
        </Badge>
      </div>
    </div>
  );
}
