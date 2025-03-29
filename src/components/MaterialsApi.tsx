import { useFetch } from "../hooks/useFetch";

export default function MaterialsApi() {
  const { data, loading, error } = useFetch<any>(
    process.env.NEXT_PUBLIC_API_URL_MATERIALS || ""
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Derivados</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre> {/* Muestra los datos como JSON */}
    </div>
  );
}