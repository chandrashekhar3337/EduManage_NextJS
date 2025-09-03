import { useEffect, useState } from 'react';
import Link from "next/link";

export default function ShowSchools() {
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    fetch('/api/schools')
      .then(res => res.json())
      .then(data => { if (data.success) setSchools(data.data); });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-indigo-600 mb-10">
          🏫 Schools Directory
        </h2>
        <div className="text-center mb-6">
      <button
             onClick={() => window.location.href='/addSchool'}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition">
        Add School
      </button>
      </div>


        {schools.length === 0 ? (
          <p className="text-center text-gray-500">No schools found.</p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {schools.map((s) => (
              <Link href={`/school/${s.id}`}>
  <div
    key={s.id}
    className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-2 cursor-pointer"
  >
    <img
      src={s.image}
      alt={s.name}
      className="w-full h-48 object-cover"
    />
    <div className="p-5">
      <h3 className="text-xl font-semibold text-gray-800 mb-2">
        {s.name}
      </h3>
      <p className="text-gray-600 mb-1">
        📍 {s.city}, {s.state}
      </p>
      <p className="text-gray-500 text-sm">{s.address}</p>
      <div className="mt-4">
        <p className="text-sm text-gray-700">📞 {s.contact}</p>
        <p className="text-sm text-gray-700">✉️ {s.email_id}</p>
      </div>
    </div>
  </div>
</Link>

            ))}
          </div>
        )}
      </div>
    </div>
  );
}
