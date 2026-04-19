import { ArrowLeft, Package } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Button } from "@/core/components/ui/button";
import PageHeading from "@/core/components/common/PageHeading";
import { productDetailQueryOptions } from "../api/storeQueryDefinitions";

const ProductPreview = () => {
  const { storeId, productId } = useParams<{
    storeId: string;
    productId: string;
  }>();

  const navigate = useNavigate();

  const query = useSuspenseQuery({
    ...productDetailQueryOptions(storeId ?? '', productId ?? ''),
    enabled: Boolean(storeId && productId),
  });

  if (!storeId || !productId) {
    return (
      <div className="p-8">
        <p>Invalid product</p>
        <Button onClick={() => navigate(`/stores/${storeId ?? ''}/products`)}>
          Back to products
        </Button>
      </div>
    );
  }

  const { data: product } = query;

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate(`/stores/${storeId}/products`);
    }
  };

  return (
    <div className="p-8 space-y-6">
      {/* Back Button */}
      <Button variant="ghost" onClick={handleBack}>
        <ArrowLeft className="size-4 mr-2" />
        Back
      </Button>

      {/* Header */}
      <PageHeading heading={product.name} />

      {/* Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image */}
        <div className="rounded-xl border p-4 flex items-center justify-center">
          {product.images?.[0]?.url ? (
            <img
              src={product.images[0].url}
              alt={product.name}
              className="max-h-[300px] object-contain"
            />
          ) : (
            <Package className="size-16 text-muted-foreground" />
          )}
        </div>

        {/* Details */}
        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">Price</p>
            <p className="text-lg font-semibold">
              {Number(product.price).toLocaleString()}
            </p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Quantity</p>
            <p className="text-lg font-semibold">{product.quantity}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Status</p>
            <p
              className={`text-sm font-medium ${
                product.visible ? "text-green-600" : "text-red-500"
              }`}
            >
              {product.visible ? "Active" : "Inactive"}
            </p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Description</p>
            <p className="text-sm">
              {product.description || "No description available"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPreview;