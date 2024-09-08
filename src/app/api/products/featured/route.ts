import data from '../data.json'
export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 1500))
  const featuredProducts = data.products.filter((p) => p.featured)
  return Response.json(featuredProducts)
}
