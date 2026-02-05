import PageHeading from "@/core/components/common/PageHeading";
import SearchInput from "@/core/components/common/SearchInput";
import EmptyState from "@/core/components/common/EmptyState";
import { useMemo, useState } from "react";
import OrganizationCard from "../components/OrganizationCard";
import CreateOrganizationModal from "../components/CreateOrganizationModal";
import { Button } from "@/core/components/ui/button";
import { Building2, Loader2, Plus, SearchX } from "lucide-react";
import CompeleteProfileDialog from "@/feature/profile/components/CompeleteProfileDialog";
import { useEffect } from "react";
import { useOrganizations } from "../api/quiries/useOrganizations";

const List = () => {
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openOnBoarding, setOpenOnBoarding] = useState(false);

  const { data, isPending, error, refetch } = useOrganizations();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const organizations = data?.data ?? [];

  const filteredOrganizations = useMemo(() => {
    if (!search.trim()) return organizations;
    return organizations.filter((org) =>
      org.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [organizations, search]);
  useEffect(() => {
    setOpenOnBoarding(organizations.length === 0);
  }, [organizations]);
  if (isPending) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-red-500">Failed to load organizations</p>
      </div>
    );
  }

  return (
    <div className="space-y-10 text-start">
      <div className="flex justify-between items-center">
        <PageHeading heading="Organizations" />
        <Button onClick={() => setIsModalOpen(true)} variant="primary">
          <Plus className="w-4 h-4 mr-2" />
          New Organization
        </Button>
      </div>
      <SearchInput
        value={search}
        onChange={setSearch}
        placeholder="Filter organizations..."
        showClearButton
        size="md"
        className="bg-[#F5F5F5] "
        containerClassName="w-64"
      />
      {organizations.length === 0 ? (
        <EmptyState
          icon={<Building2 className="w-8 h-8 text-gray-400" />}
          title="No organizations yet"
          description="Create your first organization to start managing your stores."
          actionLabel="Create Organization"
          onAction={() => setIsModalOpen(true)}
        />
      ) : filteredOrganizations.length === 0 ? (
        <EmptyState
          icon={<SearchX className="w-8 h-8 text-gray-400" />}
          title="No results found"
          description={`No organizations match "${search}". Try a different search term.`}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredOrganizations.map((org) => (
            <OrganizationCard key={org.id} organization={org} />
          ))}
        </div>
      )}

      <CreateOrganizationModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onSuccess={refetch}
      />
      <CompeleteProfileDialog
        isOpen={openOnBoarding}
        setIsOpen={setOpenOnBoarding}
      />
    </div>
  );
};

export default List;
