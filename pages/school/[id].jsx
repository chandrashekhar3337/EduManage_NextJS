// pages/school/[id].js
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function SchoolDetail() {
  const router = useRouter();
  const { id } = router.query;
  console.log("School ID:", id);
  const [school, setSchool] = useState(null);

  useEffect(() => {
    if (id) {
      fetch(`/api/schools/${id}`)
        .then(res => res.json())
        .then(data => { if (data.success) setSchool(data.data); });
    }
  }, [id]);

  if (!school) return <p>Loading...</p>;
    return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Section */}
          <div className="lg:order-1 order-2">
            <div className="aspect-w-16 aspect-h-9">
              <img
                src={school.image}
                alt={school.name}
                className="w-full h-full object-cover rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              />
            </div>
          </div>
          {/* Details Section */}
          <div className="lg:order-2 order-1 bg-white p-6 rounded-xl shadow-lg">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{school.name}</h1>
            <div className="space-y-3">
              <p className="text-lg text-gray-600">
                <span className="font-medium text-gray-800">Location:</span> 📍 {school.city}, {school.state}
              </p>
              <p className="text-gray-700">{school.address}</p>
              <p className="text-lg text-gray-600">
                <span className="font-medium text-gray-800">Contact:</span> 📞 {school.contact}
              </p>
              <p className="text-lg text-gray-600">
                <span className="font-medium text-gray-800">Email:</span> ✉️ {school.email_id}
              </p>
            </div>
            <div className="mt-6">
              <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors duration-200">
                Contact School
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
