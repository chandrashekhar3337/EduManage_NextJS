import { useState } from 'react';
import Router from 'next/router';

export default function AddSchool() {
  const [form, setForm] = useState({ name:'', address:'', city:'', state:'', contact:'', email_id:'' });
  const [image, setImage] = useState(null);
  const [msg, setMsg] = useState(null);

const onChange = (e) => {
  if (e.target.type === "file") {
    console.log("Selected file:", e.target.files[0]);
    setImage(e.target.files[0]);
  } else {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  }
};


  const onSubmit = async (e) => {
    e.preventDefault();
  console.log("IMAGE FILE:", image);
  if (!image) {
    setMsg("⚠️ Please upload an image");
    return;
  }

    const fd = new FormData();
    Object.entries(form).forEach(([k,v]) => fd.append(k,v));
    fd.append('image', image);

    const res = await fetch('/api/schools', { method:'POST', body:fd });
    const data = await res.json();

    if (!res.ok) setMsg(data.message || 'Error');
    else {
      setMsg('✅ School added successfully');
      setForm({ name:'', address:'', city:'', state:'', contact:'', email_id:'' });
      setImage(null);
      setTimeout(() => Router.push('/showSchools'), 1200);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-400 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-lg">
        <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">Add School</h2>

        <form onSubmit={onSubmit} className="space-y-4">
          <input name="name" placeholder="Name" value={form.name} onChange={onChange} required className="w-full border rounded-lg p-2" />
          <textarea name="address" placeholder="Address" value={form.address} onChange={onChange} required className="w-full border rounded-lg p-2" />
          
          <div className="grid grid-cols-2 gap-4">
            <input name="city" placeholder="City" value={form.city} onChange={onChange} required className="border rounded-lg p-2" />
            <input name="state" placeholder="State" value={form.state} onChange={onChange} required className="border rounded-lg p-2" />
          </div>
          
          <input name="contact" placeholder="Contact" value={form.contact} onChange={onChange} required className="w-full border rounded-lg p-2" />
          <input type="email" name="email_id" placeholder="Email" value={form.email_id} onChange={onChange} required className="w-full border rounded-lg p-2" />
          <input type="file" name="image" accept="image/*" onChange={onChange} className="w-full border rounded-lg p-2" required/>

          <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition">Save</button>
        </form>

        {msg && <p className="text-center mt-4 text-sm text-red-600">{msg}</p>}

        {/* ShowSchools button */}
        <div className="mt-6 text-center">
          <button
            onClick={() => Router.push('/showSchools')}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
          >
            📖 View Schools
          </button>
        </div>
      </div>
    </div>
  );
}
