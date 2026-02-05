import PageHeading from "@/core/components/common/PageHeading";
import { ViewToggle, ViewType } from "@/core/components/common/ViewToggle";
import { Button } from "@/core/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import StoreCard from "../components/StoreCard";
import StoresDataTable from "../components/StoresDataTable";
import useGetAllStores from "../api/quiries/useGetAllStores";
import { Loader2 } from "lucide-react";
import CreateStoreModal from "../components/CreateStoreModal";

const List = () => {
  const [view, setView] = useState<ViewType>("grid");
  const [addOpenModel, setAddOpenModel] = useState(false);
  const { data, isPending } = useGetAllStores();
  console.log(data);
  if (isPending) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }
  return (
    <div className="space-y-10 text-start p-8 w-full">
      <div className="flex justify-between items-end">
        <PageHeading
          heading="Stores"
          description="Browse and manage all stores associated with your organization, Select a store to enter its dashboard."
        />
        <div className="flex">
          <ViewToggle view={view} setView={setView} />
          <Button
            variant="primary"
            className="ml-4"
            onClick={() => setAddOpenModel(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            New Store
          </Button>
        </div>
      </div>
      {view === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data?.items?.map(
            (store: { id: string; name: string; [key: string]: unknown }) => (
              <StoreCard key={store.id} store={store} />
            ),
          )}
        </div>
      ) : (
        <StoresDataTable data={data} />
      )}

      <CreateStoreModal open={addOpenModel} onOpenChange={setAddOpenModel} />
    </div>
  );
};

export default List;
