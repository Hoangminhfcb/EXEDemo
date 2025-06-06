import CakeDetailClient from "./CakeDetailClient";

// Define props for the dynamic route
interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params; // Await params to resolve id
  return <CakeDetailClient id={id} />;
}
