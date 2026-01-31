import authClient from "@/core/config/auth-client";
import { useQuery } from "@tanstack/react-query";


export const useOrganizations = () => {
    return useQuery({
        queryKey: ["organizations"],
        queryFn: () => authClient.organization.list(),
    });
};