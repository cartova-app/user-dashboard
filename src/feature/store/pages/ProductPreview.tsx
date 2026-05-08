import {
  ArrowLeft,
  ArrowUpDown,
  Box,
  Boxes,
  Clock,
  Copy,
  DollarSign,
  Eye,
  LayoutGrid,
  List,
  ListFilter,
  Package,
  Pencil,
  Search,
  ShoppingBag,
  Trash2,
  User,
} from "lucide-react";

import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Button } from "@/core/components/ui/button";
import { Badge } from "@/core/components/ui/badge";
import { Input } from "@/core/components/ui/input";
import { Card } from "@/core/components/ui/card";

import PageHeading from "@/core/components/common/PageHeading";
import { productDetailQueryOptions } from "../api/storeQueryDefinitions";

// ─── Image Gallery Card ───────────────────────────────────────────────────────
// Handles 1–4+ images dynamically:
//   1 image  → full-width large, no thumbnails
//   2 images → large main + 1 thumbnail
//   3 images → large main + 2 thumbnails
//   4+ images→ large main + 3 thumbnails (4th shows "+N more" overlay if extras exist)
// Clicking a thumbnail swaps it into the main slot.

type ProductImage = { url: string };

const ImageGalleryCard = ({ images }: { images: ProductImage[] }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });

  // Show all images as thumbnails on the side (including the active one)
  const thumbnails = images.map((img, idx) => ({ img, idx }));

  const hasThumbnails = images.length > 0;

  return (
    <Card className="bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/10 rounded-2xl p-4 flex gap-4">
      {/* MAIN IMAGE */}
      <div
        role="img"
        aria-label="Product image preview with zoom on hover"
        className="flex-1 flex items-center justify-center bg-white dark:bg-[#111] rounded-xl min-h-[220px] overflow-hidden cursor-zoom-in"
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => {
          setIsZoomed(false);
          setZoomPosition({ x: 50, y: 50 });
        }}
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const x = ((e.clientX - rect.left) / rect.width) * 100;
          const y = ((e.clientY - rect.top) / rect.height) * 100;
          setZoomPosition({
            x: Math.max(0, Math.min(100, x)),
            y: Math.max(0, Math.min(100, y)),
          });
        }}
      >
        {images[activeIndex]?.url ? (
          <img
            src={images[activeIndex].url}
            alt="Main product"
            className="max-h-[220px] max-w-full object-contain rounded-lg transition-transform duration-200"
            style={{
              transform: isZoomed ? 'scale(2.1)' : 'scale(1)',
              transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
            }}
          />
        ) : (
          <Package className="size-16 text-gray-400 dark:text-gray-500" />
        )}
      </div>

      {/* THUMBNAILS COLUMN — only rendered when there are 2+ images */}
      {hasThumbnails && (
        <div className="flex flex-col gap-2">
            {thumbnails.map(({ img, idx }) => {
              return (
                <div
                  key={idx}
                  role="button"
                  tabIndex={0}
                  onClick={() => setActiveIndex(idx)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setActiveIndex(idx);
                    }
                  }}
                  className={`relative w-14 h-14 rounded-lg border overflow-hidden cursor-pointer transition-all
                    ${
                      activeIndex === idx
                        ? "border-purple-500 ring-2 ring-purple-400"
                        : "border-gray-200 dark:border-white/10 hover:border-gray-400 dark:hover:border-white/30"
                    }`}
                >
                <img
                  src={img.url}
                  alt={`Thumbnail ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
                </div>
              );
            })}
        </div>
      )}
    </Card>
  );
};

// ─────────────────────────────────────────────────────────────────────────────

const ProductPreview = () => {
  const { storeId, productId } = useParams<{
    storeId: string;
    productId: string;
  }>();

  const navigate = useNavigate();

  const query = useSuspenseQuery(
    productDetailQueryOptions(storeId ?? '', productId ?? '')
  );

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

  const purchases = [
    {
      id: 1,
      date: "12Aug2026,12:25PM",
      order: "ORD-10428",
      type: "Home Delivery",
      customer: "Marcus Lee",
      qty: 2,
      total: "7,000$",
      status: "Completed",
    },
    {
      id: 2,
      date: "08Aug2026,09:14AM",
      order: "ORD-10399",
      type: "Pickup",
      customer: "Sade Williams",
      qty: 1,
      total: "4,550$",
      status: "Pending",
    },
  ];

  return (
    <div className="p-8 space-y-6 bg-white dark:bg-[#0f0f0f] min-h-screen text-gray-900 dark:text-white">

      {/* HEADER */}
      <div className="flex items-center justify-between text-gray-900 dark:text-white">
        <div>
          <PageHeading heading="Product" />
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mt-1">
            <Box className="size-4" />
            Product Overview
            <span>›</span>
            <Package className="size-4" />
            Preview Product
          </div>
        </div>

        <div className="flex gap-2">
          <Button className="bg-[#ecff77] hover:bg-[#e4ff5f] text-black rounded-xl">
            Edit product <Pencil className="ml-2 size-4" />
          </Button>
          <Button variant="destructive" className="rounded-xl bg-red-500 hover:bg-red-600">
            Delete <Trash2 className="ml-2 size-4" />
          </Button>
        </div>
      </div>

      {/* TOP SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* IMAGE CARD */}
        <ImageGalleryCard images={product.images ?? []} />

        {/* RIGHT COLUMN — product info strip + two cards stacked */}
        <div className="lg:col-span-2 flex flex-col gap-4">

          {/* PRODUCT NAME / DATE / URL STRIP */}
          <div className="flex items-center gap-3 flex-wrap px-1">
            <span className="font-bold text-lg text-gray-900 dark:text-white">
              {product.name ?? "Polo shirt"}
            </span>
            <span className="text-gray-300 dark:text-gray-600">|</span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Date Added&nbsp;
              <span className="text-gray-700 dark:text-gray-300 font-medium">
                12 sept 2025 . 12:55 PM
              </span>
            </span>
            <span className="ml-auto text-sm text-gray-400 dark:text-gray-500 flex items-center gap-1.5">
              <span className="text-gray-400 dark:text-gray-500">Product URL:</span>
              <span className="text-gray-600 dark:text-gray-300">
                shoes.com/floral-cup-1234
              </span>
              <Copy className="size-3.5 cursor-pointer text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors" />
            </span>
          </div>

          {/* DETAILS + ANALYTICS CARDS SIDE BY SIDE */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">

            {/* DETAILS CARD */}
            <Card className="bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/10 rounded-2xl p-6 flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Last Order</p>
                  <p className="text-sm font-medium text-gray-800 dark:text-white mt-0.5">
                    12 sept 2022
                  </p>
                </div>
                <Badge className="bg-green-100 text-green-700 dark:bg-emerald-500/15 dark:text-emerald-300 rounded-full h-8 px-3">
                  Active
                </Badge>
              </div>

              <div className="flex justify-between mt-6">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Price</p>
                  <p className="font-semibold text-gray-900 dark:text-white mt-0.5">
                    ${product.price}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Inventory</p>
                  <p className="font-semibold text-gray-900 dark:text-white mt-0.5">
                    {product.quantity}
                  </p>
                </div>
              </div>
            </Card>

            {/* ANALYTICS CARD */}
            <Card className="bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/10 rounded-2xl p-6 flex flex-col justify-between">
              <div className="flex justify-between items-center">
                <div className="bg-blue-100 dark:bg-blue-500/15 p-2 rounded-lg">
                  <Eye className="size-5 text-blue-700 dark:text-blue-300" />
                </div>
                <div className="bg-gray-100 dark:bg-[#111] text-gray-500 dark:text-gray-400 text-sm px-3 py-1 rounded-lg flex items-center gap-1 cursor-pointer">
                  All-time
                  <svg className="size-3" viewBox="0 0 20 20" fill="currentColor" role="img">
                    <title>Toggle</title>
                    <path
                      fillRule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.937a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>

              <div className="flex justify-between mt-6">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Views</p>
                  <p className="font-semibold text-lg text-gray-900 dark:text-white">1,200</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Favourite</p>
                  <p className="font-semibold text-lg text-gray-900 dark:text-white">23</p>
                </div>
              </div>
            </Card>

          </div>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Orders card */}
        <Card className="bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="bg-purple-100 dark:bg-purple-500/15 p-2 rounded-lg">
              <Box className="text-purple-700 dark:text-purple-300 size-5" />
            </div>
            <div className="bg-gray-100 dark:bg-[#111] text-gray-500 dark:text-gray-400 text-sm px-3 py-1 rounded-lg flex items-center gap-1 cursor-pointer">
              All-time
                  <svg className="size-3" viewBox="0 0 20 20" fill="currentColor" role="img">
                    <title>Toggle</title>
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.937a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">All orders</p>
              <p className="font-semibold text-lg text-gray-900 dark:text-white">1,200</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Pending</p>
              <p className="font-semibold text-lg text-gray-900 dark:text-white">23</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Completed</p>
              <p className="font-semibold text-lg text-gray-900 dark:text-white">23</p>
            </div>
          </div>
        </Card>

        {/* Returns card */}
        <Card className="bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="bg-red-100 dark:bg-red-500/15 p-2 rounded-lg">
              <ShoppingBag className="text-red-700 dark:text-red-300 size-5" />
            </div>
            <div className="bg-gray-100 dark:bg-[#111] text-gray-500 dark:text-gray-400 text-sm px-3 py-1 rounded-lg flex items-center gap-1 cursor-pointer">
              All-time
              <svg className="size-3" viewBox="0 0 20 20" fill="currentColor" role="img">
                <title>Toggle</title>
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.937a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Cancelled</p>
              <p className="font-semibold text-lg text-gray-900 dark:text-white">0</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Returned</p>
              <p className="font-semibold text-lg text-gray-900 dark:text-white">0</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Damaged</p>
              <p className="font-semibold text-lg text-gray-900 dark:text-white">0</p>
            </div>
          </div>
        </Card>
      </div>

      {/* PURCHASES TABLE */}
      <Card className="bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/10 rounded-2xl p-6">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-5">
          <PageHeading heading="Purchases" />

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
              <Input
                placeholder="Search ..."
                className="pl-9 w-56 bg-white dark:bg-[#111] border-gray-200 dark:border-white/10 text-gray-900 dark:text-white placeholder:text-gray-400 rounded-xl"
              />
            </div>

            <Button
              variant="outline"
              size="icon"
              className="border-gray-200 dark:border-white/10 bg-white dark:bg-transparent text-gray-600 dark:text-gray-300"
            >
              <LayoutGrid className="size-4" />
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="border-gray-200 dark:border-white/10 bg-white dark:bg-transparent text-gray-600 dark:text-gray-300"
            >
              <ListFilter className="size-4" />
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="border-gray-200 dark:border-white/10 bg-white dark:bg-transparent text-gray-600 dark:text-gray-300"
            >
              <ArrowUpDown className="size-4" />
            </Button>
          </div>
        </div>

        {/* TABLE HEADER */}
        <div className="bg-gray-100 dark:bg-[#111] rounded-xl px-4 py-3 text-sm text-gray-500 dark:text-gray-400 flex items-center gap-4">
          <input type="checkbox" className="accent-purple-500" />

          <div className="flex items-center gap-1 w-[220px]">
            <Clock className="size-4" />
            Order Date
          </div>

          <div className="flex items-center gap-1 w-[180px]">
            <Package className="size-4" />
            Order Type
          </div>

          <div className="flex items-center gap-1 w-[180px]">
            <User className="size-4" />
            Customer
          </div>

          <div className="flex items-center gap-1 w-[80px]">
            <Boxes className="size-4" />
            QTY
          </div>

          <div className="flex items-center gap-1 w-[140px]">
            <DollarSign className="size-4" />
            Order total
          </div>

          <div className="flex items-center gap-1 w-[140px]">
            <List className="size-4" />
            Status
          </div>

          <div className="flex items-center gap-1">
            <Pencil className="size-4" />
            Action
          </div>
        </div>

        {/* ROWS */}
        <div className="mt-3 space-y-3">
          {purchases.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 bg-white dark:bg-[#151515] border border-gray-100 dark:border-white/5 rounded-xl px-4 py-4 hover:bg-gray-50 dark:hover:bg-[#1f1f1f] transition text-gray-900 dark:text-white"
            >
              <input type="checkbox" className="accent-purple-500" />

              {/* DATE */}
              <div className="w-[220px]">
                <p className="text-sm">{item.date}</p>
                <p className="text-xs text-gray-400 dark:text-gray-500">{item.order}</p>
              </div>

              {/* TYPE */}
              <div className="w-[180px]">
                <span className="bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300 text-xs px-3 py-1 rounded-full">
                  {item.type}
                </span>
              </div>

              {/* CUSTOMER */}
              <div className="w-[180px] font-medium">{item.customer}</div>

              {/* QTY */}
              <div className="w-[80px]">{item.qty}</div>

              {/* TOTAL */}
              <div className="w-[140px]">{item.total}</div>

              {/* STATUS */}
              <div className="w-[140px]">
                <span
                  className={`text-xs px-3 py-1 rounded-full ${
                    item.status === "Completed"
                      ? "bg-green-100 text-green-700 dark:bg-emerald-500/15 dark:text-emerald-300"
                      : "bg-[#ecff77] text-yellow-900 dark:bg-yellow-500/20 dark:text-yellow-200"
                  }`}
                >
                  {item.status}
                </span>
              </div>

              {/* ACTION */}
              <div className="text-gray-400 dark:text-gray-400 cursor-pointer">•••</div>
            </div>
          ))}
        </div>

        {/* FOOTER */}
        <div className="flex items-center justify-between mt-6">
          <Button
            variant="ghost"
            className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          >
            <ArrowLeft className="size-4 mr-2" />
            Back
          </Button>

          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5, "..."].map((n) => (
              <Button
                key={n}
                size="sm"
                variant={n === 1 ? "default" : "outline"}
                className={
                  n === 1
                    ? "bg-gray-900 dark:bg-white text-white dark:text-black"
                    : "border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-400 bg-white dark:bg-transparent"
                }
              >
                {n}
              </Button>
            ))}
          </div>

          <Button
            variant="ghost"
            className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          >
            Next →
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ProductPreview;