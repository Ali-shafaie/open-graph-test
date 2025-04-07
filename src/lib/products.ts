export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  inStock: boolean;
  category: string;
}

const products: Product[] = [
  {
    id: "1",
    name: "Wireless Headphones",
    description:
      "Premium noise-cancelling wireless headphones with 30-hour battery life and comfortable over-ear design.",
    price: 249.99,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop",
    inStock: true,
    category: "Electronics",
  },
  {
    id: "2",
    name: "Smart Watch",
    description:
      "Advanced fitness tracker with heart rate monitoring, GPS, and 7-day battery life in a sleek, water-resistant design.",
    price: 199.99,
    image:
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=1000&auto=format&fit=crop",
    inStock: true,
    category: "Electronics",
  },
  {
    id: "3",
    name: "Ergonomic Office Chair",
    description:
      "Fully adjustable ergonomic chair with lumbar support, breathable mesh back, and premium cushioning for all-day comfort.",
    price: 349.99,
    image:
      "https://images.unsplash.com/photo-1505843490701-5c4b83d50c92?q=80&w=1000&auto=format&fit=crop",
    inStock: false,
    category: "Furniture",
  },
  {
    id: "4",
    name: "Portable Bluetooth Speaker",
    description:
      "Waterproof, rugged Bluetooth speaker with 24-hour battery life and immersive 360° sound for any adventure.",
    price: 129.99,
    image:
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=1000&auto=format&fit=crop",
    inStock: true,
    category: "Electronics",
  },
  {
    id: "5",
    name: "Ceramic Coffee Mug Set",
    description:
      "Set of 4 handcrafted ceramic coffee mugs in assorted colors, microwave and dishwasher safe.",
    price: 39.99,
    image:
      "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?q=80&w=1000&auto=format&fit=crop",
    inStock: true,
    category: "Kitchen",
  },
  {
    id: "6",
    name: "Wireless Charging Pad",
    description:
      "Fast-charging wireless pad compatible with all Qi-enabled devices, featuring LED indicators and non-slip surface.",
    price: 49.99,
    image:
      "https://images.unsplash.com/photo-1586816879360-004f5b0c51e3?q=80&w=1000&auto=format&fit=crop",
    inStock: true,
    category: "Electronics",
  },
];

export async function getProducts(): Promise<Product[]> {
  // In a real app, this would fetch from an API or database
  return products;
}

export async function getProduct(id: string): Promise<Product | undefined> {
  // In a real app, this would fetch from an API or database
  return products.find((product) => product.id === id);
}
