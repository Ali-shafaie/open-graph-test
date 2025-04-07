import { getProduct } from "@/lib/products";
import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export const runtime = "nodejs";

// Set CORS headers to allow access from any origin
export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    console.log("Generating OG image for product ID:", id);

    if (!id) {
      return new ImageResponse(
        (
          <div
            style={{
              display: "flex",
              fontSize: 48,
              background: "white",
              width: "100%",
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Product ID is required
          </div>
        ),
        {
          width: 1200,
          height: 630,
          headers: {
            "Cache-Control": "public, max-age=31536000, immutable",
            "Content-Type": "image/png",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }

    const product = await getProduct(id);

    if (!product) {
      return new ImageResponse(
        (
          <div
            style={{
              display: "flex",
              fontSize: 48,
              background: "white",
              width: "100%",
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Product Not Found
          </div>
        ),
        {
          width: 1200,
          height: 630,
          headers: {
            "Cache-Control": "public, max-age=31536000, immutable",
            "Content-Type": "image/png",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }

    // Fetch the product image
    let imageData;
    try {
      const imageResponse = await fetch(product.image);
      imageData = await imageResponse.arrayBuffer();
    } catch (e) {
      console.error("Error fetching product image:", e);
      // We'll handle the case where image fetching fails
    }

    return new ImageResponse(
      (
        <div
          style={{
            display: "flex",
            fontFamily: "Inter, sans-serif",
            background: "white",
            width: "100%",
            height: "100%",
            flexDirection: "column",
          }}
        >
          {/* Header with brand */}
          <div
            style={{
              display: "flex",
              padding: "24px 40px",
              backgroundColor: "#f9fafb",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: "1px solid #e5e7eb",
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: 24,
                fontWeight: 700,
                color: "#7c3aed",
              }}
            >
              YourStore
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 16,
                color: "#6b7280",
              }}
            >
              Premium Products
            </div>
          </div>

          {/* Main content */}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              height: "100%",
              padding: "40px",
            }}
          >
            {/* Product image */}
            <div
              style={{
                display: "flex",
                width: "50%",
                height: "100%",
                borderRadius: 12,
                overflow: "hidden",
                marginRight: 40,
                boxShadow:
                  "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
              }}
            >
              {imageData ? (
                <img
                  src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                  alt={product.name}
                />
              ) : (
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    height: "100%",
                    backgroundColor: "#f4f4f5",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: 120,
                  }}
                >
                  🛍️
                </div>
              )}
            </div>

            {/* Product details */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                width: "50%",
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: 16,
                    fontWeight: 600,
                    color: "#7c3aed",
                    marginBottom: 12,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  {product.category}
                </div>
                <div
                  style={{
                    fontSize: 48,
                    fontWeight: 800,
                    color: "#111827",
                    lineHeight: 1.2,
                    marginBottom: 16,
                  }}
                >
                  {product.name}
                </div>
                <div
                  style={{
                    fontSize: 20,
                    color: "#4b5563",
                    lineHeight: 1.6,
                  }}
                >
                  {product.description}
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: 24,
                }}
              >
                <div
                  style={{
                    fontSize: 36,
                    fontWeight: 700,
                    color: "#7c3aed",
                  }}
                >
                  ${product.price.toFixed(2)}
                </div>
                <div
                  style={{
                    marginLeft: 16,
                    padding: "8px 16px",
                    borderRadius: 9999,
                    fontSize: 16,
                    fontWeight: 600,
                    backgroundColor: product.inStock ? "#dcfce7" : "#fee2e2",
                    color: product.inStock ? "#166534" : "#991b1b",
                  }}
                >
                  {product.inStock ? "In Stock" : "Out of Stock"}
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div
            style={{
              display: "flex",
              padding: "16px 40px",
              backgroundColor: "#f9fafb",
              alignItems: "center",
              justifyContent: "center",
              borderTop: "1px solid #e5e7eb",
            }}
          >
            <div
              style={{
                fontSize: 16,
                color: "#6b7280",
              }}
            >
              e-comarce-website.vercel.app • Shop now for exclusive deals
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        headers: {
          "Cache-Control": "public, max-age=31536000, immutable",
          "Content-Type": "image/png",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  } catch (error: any) {
    console.error("Error generating OG image:", error);
    return new Response(`Error generating image: ${error.message}`, {
      status: 500,
    });
  }
}
