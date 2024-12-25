import React, { useState } from "react";
import { IconEdit, IconTrash, IconEye } from "@tabler/icons-react";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
// import { deleteUser } from "@/store/feature/user/userSlice"; // Assuming you have a deleteUser action

const ManageUsers: React.FC = () => {
    const [users, setUsers] = useState([
        // Mock user data
        { id: 1, email: "john@example.com", role: "Admin" },
        { id: 2, email: "jane@example.com", role: "Editor" },
        { id: 3, email: "samuel@example.com", role: "Viewer" },
    ]);
    const dispatch = useDispatch();

    const handleDelete = (userId: number) => {
        // Dispatch delete action (assuming you have a deleteUser action in your Redux slice)
        // dispatch(deleteUser(userId));
        setUsers(users.filter(user => user.id !== userId)); // Remove the user from state after deletion
    };

    return (
        <div className="flex-1 p-6 bg-gray-100 dark:bg-neutral-800">
            <h2 className="text-2xl font-bold text-gray-700 dark:text-white mb-6">Manage Users</h2>

            {/* Table */}
            <div className="overflow-x-auto bg-white dark:bg-neutral-700 rounded-lg shadow-md">
                <table className="w-full table-auto text-left text-gray-700 dark:text-gray-200">
                    <thead className="bg-gray-200 dark:bg-neutral-800">
                        <tr>
                            <th className="px-4 py-2">Email</th>
                            <th className="px-4 py-2">Role</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id} className="border-b border-gray-200 dark:border-neutral-600">
                                <td className="px-4 py-2">{user.email}</td>
                                <td className="px-4 py-2">{user.role}</td>
                                <td className="px-4 py-2">
                                    {/* Actions column */}
                                    <div className="flex space-x-2">
                                        {/* View button */}
                                        <motion.button
                                            whileHover={{ scale: 1.1 }}
                                            className="text-blue-500 hover:text-blue-700"
                                            title="View Profile"
                                        >
                                            <IconEye className="h-5 w-5" />
                                        </motion.button>

                                        {/* Edit button */}
                                        <motion.button
                                            whileHover={{ scale: 1.1 }}
                                            className="text-yellow-500 hover:text-yellow-700"
                                            title="Edit User"
                                        >
                                            <IconEdit className="h-5 w-5" />
                                        </motion.button>

                                        {/* Delete button */}
                                        <motion.button
                                            whileHover={{ scale: 1.1 }}
                                            className="text-red-500 hover:text-red-700"
                                            title="Delete User"
                                            onClick={() => handleDelete(user.id)}
                                        >
                                            <IconTrash className="h-5 w-5" />
                                        </motion.button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;
