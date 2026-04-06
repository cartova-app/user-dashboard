import { queryOptions } from "@tanstack/react-query";
import { teamDefinitions } from "@/feature/team/api/constants";
import type { TeamListResponse } from "@/feature/team/types/team";

export const teamDefs = teamDefinitions;

export const teamListQueryOptions = () =>
  queryOptions({
    queryKey: teamDefs.list.key(),
    queryFn: async (): Promise<TeamListResponse> => ({ items: [] }),
    staleTime: 30_000,
  });
