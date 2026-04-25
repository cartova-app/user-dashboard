import { zodResolver } from "@hookform/resolvers/zod";
import { ImagePlus, Package, Tag, Upload, X } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useRef, useState } from "react";
import { Controller, useForm, type Resolver } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { InputWithIcon } from "@/core/components/common/InputWithIcon";
import { MultiSelect } from "@/core/components/common/MultiSelect";
import { SelectWithIcon } from "@/core/components/common/Select";
import { Button } from "@/core/components/ui/button";
import { InlineLoader } from "@/core/components/ui/LoadingFallback";
import { Label } from "@/core/components/ui/label";
import {
  addProductImageMutationOptions,
  categoryListQueryOptions,
  createProductMutationOptions,
} from "@/feature/store/api/storeQueryDefinitions";
import {
  createProductSchema,
  type CreateProductFormData,
} from "../../schemas/productSchema";

interface AddProductFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

interface FilePreview {
  file: File;
  preview: string;
}

export default function AddProductForm({
  onSuccess,
  onCancel,
}: AddProductFormProps) {
  const { storeId } = useParams<{ storeId: string }>();
  const queryClient = useQueryClient();
  const { data: categoriesData } = useQuery({
    ...categoryListQueryOptions(storeId, { limit: 100 }),
    enabled: Boolean(storeId),
  });
  const { mutateAsync: createProduct, isPending: isCreating } = useMutation(
    createProductMutationOptions(queryClient, storeId ?? ""),
  );
  const { mutateAsync: addImage } = useMutation(
    addProductImageMutationOptions(queryClient, storeId ?? ""),
  );

  const [imageFiles, setImageFiles] = useState<FilePreview[]>([]);
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

  const handleImageSelect = useCallback(
    (files: FileList | null) => {
      if (!files) return;
      const newFiles = Array.from(files).slice(0, 5 - imageFiles.length);
      const previews = newFiles.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }));
      setImageFiles((prev) => [...prev, ...previews].slice(0, 5));
    },
    [imageFiles.length],
  );

  const removeImage = useCallback((index: number) => {
    setImageFiles((prev) => {
      const updated = [...prev];
      URL.revokeObjectURL(updated[index].preview);
      updated.splice(index, 1);
      return updated;
    });
  }, []);

  const onSubmit = async (data: CreateProductFormData) => {
    try {
      const product = await createProduct({
        name: data.name,
        description: data.description,
        price: data.price,
        quantity: data.quantity,
        categories: data.categories,
      });

      for (const img of imageFiles) {
        try {
          await addImage({ productId: product.id, file: img.file });
        } catch {
          toast.error(`Failed to upload image: ${img.file.name}`);
        }
      }

      toast.success("Product created successfully");
      reset();
      setImageFiles([]);
      onSuccess();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to create product";
      toast.error(errorMessage);
    }
  };

  const handleSaveAsDraft = async () => {
    const values = control._formValues as CreateProductFormData;
    if (!values.name) {
      toast.error("Product name is required");
      return;
    }
    try {
      const product = await createProduct({
        name: values.name,
        description: values.description,
        price: values.price || 0,
        quantity: values.quantity || 0,
        categories: values.categories,
      });

      for (const img of imageFiles) {
        try {
          await addImage({ productId: product.id, file: img.file });
        } catch {
          toast.error(`Failed to upload image: ${img.file.name}`);
        }
      }

      toast.success("Product saved as draft");
      reset();
      setImageFiles([]);
      onSuccess();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to save draft";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
      <div className="flex items-center gap-2 mb-6">
        <h2 className="text-xl font-bold text-foreground">Add new product</h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Form Fields */}
          <div className="space-y-5">
            <Controller
              name="name"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <InputWithIcon
                  label="Product name"
                  placeholder="Enter product name"
                  icon={<Package className="w-5 h-5" />}
                  error={error?.message}
                  maxLength={100}
                  {...field}
                />
              )}
            />

            <p className="text-xs text-muted-foreground -mt-3">
              20 character maximum
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                    value={field.value ?? []}
                    onValueChange={field.onChange}
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                    placeholder="Input"
                    className="w-full min-h-[100px] rounded-xl border-2 border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-ring focus:border-ring outline-none resize-none"
                    {...field}
                  />
                  {error?.message && (
                    <p className="text-sm text-destructive">{error.message}</p>
                  )}
                  <p className="text-xs text-muted-foreground">
                    Fill in a maximum of 100 character when entering a product
                    name.
                  </p>
                </div>
              )}
            />
          </div>

          {/* Right Column - Image Upload */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-foreground">
              Product image
            </Label>
            <div className="grid grid-cols-3 gap-3">
              {imageFiles.map((img, index) => (
                <div
                  key={img.preview}
                  className="relative aspect-square rounded-xl overflow-hidden border border-border group"
                >
                  <img
                    src={img.preview}
                    alt={`Product ${index + 1}`}
                    className="size-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="p-2 bg-destructive text-white rounded-lg hover:bg-destructive/90"
                    >
                      <X className="size-4" />
                    </button>
                  </div>
                </div>
              ))}

              {imageFiles.length < 5 &&
                Array.from({
                  length:
                    Math.min(
                      5 - imageFiles.length,
                      3 - (imageFiles.length % 3 || 3),
                    ) || (imageFiles.length === 0 ? 3 : 5 - imageFiles.length),
                }).map((_, i) => {
                  const slotId = `upload-slot-${imageFiles.length + i}`;
                  return (
                    <button
                      key={slotId}
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="aspect-square rounded-xl border-2 border-dashed border-border bg-muted/50 hover:bg-muted flex flex-col items-center justify-center gap-2 transition-colors cursor-pointer"
                    >
                      <Upload className="size-5 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground text-center px-2">
                        Drop your image here or{" "}
                        <span className="text-primary font-medium">
                          click to browse
                        </span>
                      </span>
                    </button>
                  );
                })}
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => handleImageSelect(e.target.files)}
            />
            <p className="text-xs text-muted-foreground">
              You need to add at least 4 images with one video or none. Pay
              attention with the quality of your pictures. Make sure your photo
              has the best quality. Picture must be fit.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t border-border">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isCreating}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={handleSaveAsDraft}
            disabled={isCreating}
          >
            {isCreating ? <InlineLoader className="size-4" /> : null}
            Save as draft
          </Button>
          <Button type="submit" variant="primary" disabled={isCreating}>
            {isCreating ? (
              <InlineLoader className="size-4" />
            ) : (
              <ImagePlus className="size-4" />
            )}
            Add product
          </Button>
        </div>
      </form>
    </div>
  );
}
