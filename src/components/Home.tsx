import { ChangeEvent, MouseEvent, useState } from "react";

// Update password type to string and add an optional id field
type User = {
  id?: number;
  name: string;
  email: string;
  password: string;
};

const Home = () => {
  const [user, setUser] = useState<User>({ name: "", email: "", password: "" });
  const [users, setUsers] = useState<User[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  // Function to handle input changes
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  // Function to add or update user
  const addOrUpdateUser = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (editIndex !== null) {
      const updatedUsers = users.map((u, index) =>
        index === editIndex ? { ...u, ...user } : u
      );
      setUsers(updatedUsers);
      setEditIndex(null);
    } else {
      setUsers([...users, { ...user, id: users.length + 1 }]);
    }
    setUser({ name: "", email: "", password: "" });
  };

  // Function to delete a user
  const deleteUser = (index: number) => {
    const updatedUsers = users.filter((_, i) => i !== index);
    setUsers(updatedUsers);
  };

  // Function to set the user for editing
  const editUser = (index: number) => {
    setUser(users[index]);
    setEditIndex(index);
  };

  return (
    <div className="w-[50%] m-auto border border-green-500 my-5">
      <p className="text-center text-2xl font-semibold">Login</p>
      <form action="">
        <label htmlFor="name" className="w-full px-4 py-2">
          Username
        </label>
        <input
          type="text"
          name="name"
          required
          value={user.name}
          placeholder="Enter your Name"
          className="w-[96%] mx-2 border border-gray-200 py-1 px-2 rounded"
          onChange={handleInput}
        />
        <label htmlFor="email" className="w-full px-4 py-2">
          Email
        </label>
        <input
          type="email"
          name="email"
          required
          value={user.email}
          placeholder="Enter your Email"
          className="w-[96%] mx-2 border border-gray-200 py-1 px-2 rounded"
          onChange={handleInput}
        />
        <label htmlFor="password" className="w-full px-4 py-2">
          Password
        </label>
        <input
          type="password"
          name="password"
          required
          value={user.password}
          placeholder="Enter your Password"
          className="w-[96%] mx-2 border border-gray-200 py-1 px-2 rounded mb-2"
          onChange={handleInput}
        />
        <div className="text-center">
          <button
            className="px-8 py-2 rounded-sm border border-black bg-green-400 my-1"
            type="button"
            onClick={addOrUpdateUser}
          >
            {editIndex !== null ? "Update" : "Add"}
          </button>
        </div>
      </form>
      <div className="mt-4">
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="px-6 py-2 text-center border-r">Name</th>
              <th className="px-6 py-2 text-center border-r">Email</th>
              <th className="px-6 py-2 text-center border-r">Password</th>
              <th className="px-6 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((item, index) => (
              <tr key={index} className="border-b">
                <td className="px-6 py-2 border-r">{item.name}</td>
                <td className="px-6 py-2 border-r">{item.email}</td>
                <td className="px-6 py-2 border-r">{item.password}</td>
                <td className="px-6 py-2 text-center">
                  <button
                    className="mr-2 px-4 py-1 border rounded bg-blue-500 text-white"
                    onClick={() => editUser(index)}
                  >
                    Update
                  </button>
                  <button
                    className="px-4 py-1 border rounded bg-red-500 text-white"
                    onClick={() => deleteUser(index)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
