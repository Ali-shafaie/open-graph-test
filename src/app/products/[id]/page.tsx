import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getProduct } from "@/lib/products";
import { SocialShare } from "@/app/components/share-social";

interface ProductPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const product = await getProduct(params.id);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  // Create absolute URLs for Open Graph
  const origin = "https://e-comarce-website.vercel.app";
  const ogImageUrl = `${origin}/api/og?id=${params.id}`;

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      type: "website",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: product.description,
      images: [ogImageUrl],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProduct(params.id);

  if (!product) {
    notFound();
  }

  // Create the absolute URL for sharing
  const origin = "https://e-comarce-website.vercel.app";
  const productUrl = `${origin}/products/${params.id}`;

  return (
    <div className="container mx-auto px-4 py-12">
      <Link
        href="/"
        className="inline-flex items-center mb-8 text-sm font-medium"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Products
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative aspect-square rounded-lg overflow-hidden">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>

        <div>
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold">{product.name}</h1>
              <p className="text-xl font-semibold mt-2">
                ${product.price.toFixed(2)}
              </p>
            </div>
            <SocialShare
              url={productUrl}
              title={product.name}
              description={product.description}
              image={`${origin}/api/og?id=${params.id}`}
            />
          </div>

          <div className="mt-4">
            <span
              className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${
                product.inStock
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {product.inStock ? "In Stock" : "Out of Stock"}
            </span>
            <span className="inline-flex ml-2 px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
              {product.category}
            </span>
          </div>

          <Separator className="my-6" />

          <div>
            <h2 className="text-lg font-semibold mb-2">Description</h2>
            <p className="text-gray-700">{product.description}</p>
          </div>

          <Separator className="my-6" />

          <Button className="w-full" disabled={!product.inStock}>
            {product.inStock ? "Add to Cart" : "Out of Stock"}
          </Button>

          <Card className="mt-6 p-4 bg-gray-50">
            <div className="text-sm">
              <p className="font-medium">Share this product</p>
              <p className="text-muted-foreground mt-1">
                Click the share button to share this product on social media
                with a beautiful preview image.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
