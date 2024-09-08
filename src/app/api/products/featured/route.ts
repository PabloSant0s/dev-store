import data from '../data.json'
export function GET() {
  const featuredProducts = data.products.filter((p) => p.featured)
  return Response.json(featuredProducts)
}
