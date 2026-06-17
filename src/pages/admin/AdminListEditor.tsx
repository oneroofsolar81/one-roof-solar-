import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../../lib/firebase';

export function AdminListEditor() {
  const { collectionId } = useParams<{ collectionId: string }>();
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!collectionId) return;
    
    async function fetchItems() {
      setLoading(true);
      try {
        const colRef = collection(db, collectionId!);
        const snapshot = await getDocs(colRef);
        const fetched = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
        setItems(fetched);
      } catch (error) {
        handleFirestoreError(error, OperationType.LIST, collectionId!);
      } finally {
        setLoading(false);
      }
    }
    fetchItems();
  }, [collectionId]);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    try {
      await deleteDoc(doc(db, collectionId!, id));
      setItems(items.filter(i => i.id !== id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `${collectionId}/${id}`);
    }
  };

  if (loading) return <div>Loading items...</div>;

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-display font-semibold capitalize">Manage {collectionId}</h1>
        <Link 
          to={`/admin/collections/${collectionId}/edit/new`}
          className="px-4 py-2 bg-brand-500 text-white rounded-lg font-medium hover:bg-brand-600 transition"
        >
          Add New
        </Link>
      </div>
      
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Title</th>
              <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Description</th>
              <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {items.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-6 py-8 text-center text-slate-500">No items found.</td>
              </tr>
            ) : items.map(item => (
              <tr key={item.id} className="hover:bg-slate-50">
                <td className="px-6 py-4 font-medium">{item.title}</td>
                <td className="px-6 py-4 text-slate-600 text-sm truncate max-w-sm">{item.description}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-3">
                    <Link 
                      to={`/admin/collections/${collectionId}/edit/${item.id}`}
                      className="text-brand-600 hover:text-brand-800 text-sm font-medium"
                    >
                      Edit
                    </Link>
                    <button 
                      onClick={() => handleDelete(item.id)}
                      className="text-red-600 hover:text-red-800 text-sm font-medium"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
