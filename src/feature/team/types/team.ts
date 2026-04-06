export interface TeamMember {
  id: string;
  name: string;
  role: string;
}

export interface TeamListResponse {
  items: TeamMember[];
}
