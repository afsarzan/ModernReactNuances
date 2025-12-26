import { useState, useEffect } from "react";
// TODO: Import useMemo from 'react' for Step 6
import Spinner from "../components/Spinner.jsx";

const API = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001";

export default function GalleryPage() {
  // ⏸️ WORKSHOP STEP 4: Use Custom Hook
  // TODO: Replace manual fetch with usePokemonGallery hook
  // const { data, loading, error, refetch } = usePokemonGallery();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchGallery = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`${API}/api/gallery`);
        if (!res.ok) throw new Error("Failed to load gallery");
        const json = await res.json();
        setData(json);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);


  // ⏸️ WORKSHOP STEP 6: Add useMemo for Sorting
  // TODO: Add state for sortBy and filterType
  // TODO: Implement useMemo to process and filter data

  const like = async (id) => {
    try {
      const res = await fetch(`${API}/api/pokaimon/${id}/like`, {
        method: "PATCH",
      });
      if (!res.ok) throw new Error("Failed to like");
      // Refetch data
      const galleryRes = await fetch(`${API}/api/gallery`);
      const json = await galleryRes.json();
      setData(json);
    } catch (e) {
      console.error(e);
    }
  };

  if (loading) return <Spinner label="Loading gallery…" />;
  if (error)
    return (
      <div className="text-red-500 dark:text-red-400">
        Failed to load: {String(error)}
      </div>
    );

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          PokAImon Gallery
        </h2>

        {/* ⏸️ WORKSHOP STEP 6: Add Sort and Filter Controls */}
        {/* TODO: Add select dropdowns for sorting and filtering */}
      </div>

      {data.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">
          No generated PokAImon yet. Head to the Generator!
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
         {
            data.map((p) => (
              <div key={p.id} className="bg-white dark:bg-gray-800 rounded-xl shadow p-4">
                <img
                  src={`${API}${p.image_url}`}
                  alt={p.name}
                  className="w-full aspect-square object-contain"
                />
                <h3 className="text-xl font-semibold mt-3 text-gray-900 dark:text-white">
                  {p.name}
                </h3>
                {p.type && (
                  <span className="inline-block mt-2 text-xs px-2 py-1 rounded bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-200">
                    {p.type}
                  </span>
                )}
                {p.characteristics && (
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                    {p.characteristics}
                  </p>
                )}
                {p.powers && Array.isArray(p.powers) && p.powers.length > 0 && (
                  <div className="mt-3 space-y-1">
                    <p className="text-xs font-semibold text-gray-600 dark:text-gray-400">
                      Powers:
                    </p>
                    {p.powers.map((power, idx) => (
                      <div key={idx} className="text-xs text-gray-600 dark:text-gray-400">
                        <span className="font-medium text-gray-900 dark:text-white">
                          {power.name}
                        </span>
                        {power.description && <span> - {power.description}</span>}
                      </div>
                    ))}
                  </div>
                )}
                <button
                  onClick={() => like(p.id)}
                  className="mt-3 w-full px-3 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  ❤️ Like ({p.like_count || 0})
                </button>
              </div>
            ))
          }
        </div>
      )}
    </div>
  );
}
