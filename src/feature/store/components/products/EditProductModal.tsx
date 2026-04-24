import { zodResolver } from "@hookform/resolvers/zod";
import { Package, Tag, Upload, X } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useRef, useState } from "react";
import { Controller, useForm, type Resolver } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { InputWithIcon } from "@/core/components/common/InputWithIcon";
import Modal from "@/core/components/common/Modal";
import { MultiSelect } from "@/core/components/common/MultiSelect";
import { SelectWithIcon } from "@/core/components/common/Select";
import { Button } from "@/core/components/ui/button";
import { InlineLoader } from "@/core/components/ui/LoadingFallback";
import { Label } from "@/core/components/ui/label";
import {
  addProductImageMutationOptions,
  categoryListQueryOptions,
  removeProductImageMutationOptions,
  updateProductMutationOptions,
} from "@/feature/store/api/storeQueryDefinitions";
import {
  createProductSchema,
  type CreateProductFormData,
} from "../../schemas/productSchema";
import type { Product } from '../../types';

type ProductImage = Product['images'][number];

interface FilePreview {
  file: File;
  preview: string;
}

interface EditProductModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: Product | null;
}

export default function EditProductModal({
  open,
  onOpenChange,
  product,
}: EditProductModalProps) {
  const { storeId } = useParams<{ storeId: string }>();
  const queryClient = useQueryClient();
  const { data: categoriesData } = useQuery({
    ...categoryListQueryOptions(storeId, { limit: 100 }),
    enabled: Boolean(storeId),
  });
  const { mutateAsync: updateProduct, isPending: isUpdating } = useMutation(
    updateProductMutationOptions(queryClient, storeId ?? ""),
  );
  const { mutateAsync: addImage } = useMutation(
    addProductImageMutationOptions(queryClient, storeId ?? ""),
  );
  const { mutateAsync: removeImage } = useMutation(
    removeProductImageMutationOptions(queryClient, storeId ?? ""),
  );

  const [existingImages, setExistingImages] = useState<ProductImage[]>([]);
  const [newImageFiles, setNewImageFiles] = useState<FilePreview[]>([]);
  const [removedImageKeys, setRemovedImageKeys] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { control, handleSubmit, reset } = useForm<CreateProductFormData>({
    resolver: zodResolver(
      createProductSchema,
    ) as Resolver<CreateProductFormData>,
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      quantity: 0,
      categories: [],
      visible: true,
    },
  });

  const categoryOptions = (categoriesData?.items ?? []).map((cat) => ({
    value: cat.id,
    label: cat.name,
  }));

  useEffect(() => {
    if (open && product) {
      reset({
        name: product.name,
        description: product.description ?? "",
        price: product.price,
        quantity: product.quantity,
        categories: product.categories?.map((c) => c.id) ?? [],
        visible: product.visible,
      });
      setExistingImages(product.images ?? []);
      setNewImageFiles([]);
      setRemovedImageKeys([]);
    } else if (open) {
      reset({
        name: "",
        description: "",
        price: 0,
        quantity: 0,
        categories: [],
        visible: true,
      });
      setExistingImages([]);
      setNewImageFiles([]);
      setRemovedImageKeys([]);
    }
  }, [open, product, reset]);

  const totalImages = existingImages.length + newImageFiles.length;

  const handleImageSelect = useCallback(
    (files: FileList | null) => {
      if (!files) return;
      const available = 5 - totalImages;
      if (available <= 0) return;
      const selected = Array.from(files).slice(0, available);
      const previews = selected.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }));
      setNewImageFiles((prev) => [...prev, ...previews]);
    },
    [totalImages],
  );

  const removeExistingImage = useCallback((image: ProductImage) => {
    setExistingImages((prev) => prev.filter((img) => img.key !== image.key));
    setRemovedImageKeys((prev) => [...prev, image.key]);
  }, []);

  const removeNewImage = useCallback((index: number) => {
    setNewImageFiles((prev) => {
      const updated = [...prev];
      URL.revokeObjectURL(updated[index].preview);
      updated.splice(index, 1);
      return updated;
    });
  }, []);

  const onSubmit = async (data: CreateProductFormData) => {
    if (!product) return;
    try {
      await updateProduct({
        productId: product.id,
        data: {
          name: data.name,
          description: data.description,
          price: data.price,
          quantity: data.quantity,
          categories: data.categories,
        },
      });

      for (const key of removedImageKeys) {
        try {
          await removeImage({ productId: product.id, key });
        } catch {
          toast.error("Failed to remove an image");
        }
      }

      for (const img of newImageFiles) {
        try {
          await addImage({ productId: product.id, file: img.file });
        } catch {
          toast.error(`Failed to upload image: ${img.file.name}`);
        }
      }

      toast.success("Product updated successfully");
      onOpenChange(false);
    } catch (error) {
      const msg =
        error instanceof Error ? error.message : "Failed to update product";
      toast.error(msg);
    }
  };

  const handleClose = (value: boolean) => {
    for (const img of newImageFiles) {
      URL.revokeObjectURL(img.preview);
    }
    reset();
    onOpenChange(value);
  };

  return (
    <Modal
      open={open}
      onOpenChange={handleClose}
      title="Edit Product"
      width="700px"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Controller
            name="name"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <InputWithIcon
                label="Product name"
                placeholder="Enter product name"
                icon={<Package className="w-5 h-5" />}
                error={error?.message}
                required
                maxLength={100}
                {...field}
              />
            )}
          />

          <Controller
            name="categories"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <MultiSelect
                label="Categories"
                placeholder="Select categories"
                icon={<Tag className="size-5" />}
                error={error?.message}
                options={categoryOptions}
                defaultValue={field.value ?? []}
                onValueChange={field.onChange}
              />
            )}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Controller
            name="quantity"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <InputWithIcon
                label="Stock"
                placeholder="Input stock"
                type="number"
                error={error?.message}
                {...field}
                onChange={(e) => field.onChange(e.target.value)}
              />
            )}
          />

          <Controller
            name="price"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <InputWithIcon
                label="Price"
                placeholder="Input price"
                type="number"
                error={error?.message}
                {...field}
                onChange={(e) => field.onChange(e.target.value)}
              />
            )}
          />

          <Controller
            name="visible"
            control={control}
            render={({ field }) => (
              <SelectWithIcon
                label="Visibility"
                placeholder="Select visibility"
                options={[
                  { value: "true", label: "Published" },
                  { value: "false", label: "Hidden" },
                ]}
                value={String(field.value)}
                onValueChange={(val) => field.onChange(val === "true")}
              />
            )}
          />
        </div>

        <Controller
          name="description"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <div className="space-y-1">
              <Label className="text-sm font-medium text-foreground">
                Description
              </Label>
              <textarea
                placeholder="Product description"
                className="w-full min-h-[80px] rounded-xl border-2 border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-ring focus:border-ring outline-none resize-none"
                {...field}
              />
              {error?.message && (
                <p className="text-sm text-destructive">{error.message}</p>
              )}
            </div>
          )}
        />

        {/* Images */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-foreground">
            Product images
          </Label>
          <div className="flex flex-wrap gap-3">
            {existingImages.map((img) => (
              <div
                key={img.key}
                className="relative size-20 rounded-xl overflow-hidden border border-border group"
              >
                <img src={img.url} alt="" className="size-full object-cover" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button
                    type="button"
                    onClick={() => removeExistingImage(img)}
                    className="p-1.5 bg-destructive text-white rounded-lg hover:bg-destructive/90"
                  >
                    <X className="size-3" />
                  </button>
                </div>
              </div>
            ))}

            {newImageFiles.map((img, index) => (
              <div
                key={img.preview}
                className="relative size-20 rounded-xl overflow-hidden border border-border group"
              >
                <img
                  src={img.preview}
                  alt=""
                  className="size-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button
                    type="button"
                    onClick={() => removeNewImage(index)}
                    className="p-1.5 bg-destructive text-white rounded-lg hover:bg-destructive/90"
                  >
                    <X className="size-3" />
                  </button>
                </div>
              </div>
            ))}

            {totalImages < 5 && (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="size-20 rounded-xl border-2 border-dashed border-border bg-muted/50 hover:bg-muted flex flex-col items-center justify-center gap-1 transition-colors cursor-pointer"
              >
                <Upload className="size-4 text-muted-foreground" />
                <span className="text-[10px] text-muted-foreground">Add</span>
              </button>
            )}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => handleImageSelect(e.target.files)}
          />
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => handleClose(false)}
            disabled={isUpdating}
          >
            Cancel
          </Button>
          <Button type="submit" variant="primary" disabled={isUpdating}>
            {isUpdating && <InlineLoader className="size-4" />}
            Save Changes
          </Button>
        </div>
      </form>
    </Modal>
  );
}
