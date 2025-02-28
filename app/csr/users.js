import { useEffect, useState } from "react";
import Loading from "../components/Loading";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ id: "", name: "", email: "" });
  const [editingUser, setEditingUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch users when the component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/users");
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  const handleAddUser = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...newUser, id: Date.now() }), // Simple ID generation
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const updatedUsers = await res.json();
      setUsers(updatedUsers);
      setNewUser({ id: "", name: "", email: "" }); // Reset form
    } catch (error) {
      console.error("Failed to add user:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateUser = async (id) => {
    setLoading(true);
    try {
      const res = await fetch("/api/users", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingUser),
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const updatedUsers = await res.json();
      setUsers(updatedUsers);
      setEditingUser(null); // Close the editing menu
    } catch (error) {
      console.error("Failed to update user:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (id) => {
    setLoading(true);
    try {
      const res = await fetch("/api/users", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const updatedUsers = await res.json();
      setUsers(updatedUsers);
    } catch (error) {
      console.error("Failed to delete user:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-10 bg-white text-gray-900 rounded-xl shadow-md relative">
      <h1 className="text-2xl font-bold mb-6">Users</h1>

      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75 z-50">
          <Loading mode="light" />
        </div>
      )}

      <ul className="space-y-4 overflow-y-auto max-h-96">
        {users.map((user) => (
          <li
            key={user.id}
            className="flex flex-col bg-gray-100 p-4 rounded-xl shadow-sm"
          >
            <div className="flex justify-between items-center">
              <span>
                {user.name} ({user.email})
              </span>
              <div>
                <button
                  onClick={() => setEditingUser(user)}
                  className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors duration-200 mr-2"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDeleteUser(user.id)}
                  className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition-colors duration-200"
                >
                  Delete
                </button>
              </div>
            </div>
            {editingUser && editingUser.id === user.id && (
              <div className="mt-4">
                <input
                  type="text"
                  placeholder="Name"
                  value={editingUser.name}
                  onChange={(e) =>
                    setEditingUser({ ...editingUser, name: e.target.value })
                  }
                  className="bg-gray-100 p-2 rounded mr-2 text-gray-900 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={editingUser.email}
                  onChange={(e) =>
                    setEditingUser({ ...editingUser, email: e.target.value })
                  }
                  className="bg-gray-100 p-2 rounded mr-2 text-gray-900 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={() => handleUpdateUser(user.id)}
                  className="bg-green-500 text-white p-2 rounded hover:bg-green-600 transition-colors duration-200"
                >
                  Save
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>

      <div className="mt-8">
        <input
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          className="bg-gray-100 p-2 rounded mr-2 text-gray-900 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          className="bg-gray-100 p-2 rounded mr-2 text-gray-900 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleAddUser}
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors duration-200"
        >
          Add User
        </button>
      </div>
    </div>
  );
}
