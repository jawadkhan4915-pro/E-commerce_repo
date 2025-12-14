import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaTrash, FaUserCheck, FaUserTimes } from 'react-icons/fa';
import toast from 'react-hot-toast';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchUsers = async () => {
        try {
            const token = JSON.parse(localStorage.getItem('userInfo'))?.token;
            const config = {
                headers: { Authorization: `Bearer ${token}` },
            };
            const { data } = await axios.get('/api/users', config);
            setUsers(data);
            setLoading(false);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error fetching users');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const deleteHandler = async (id) => {
        if (window.confirm('Are you sure you want to remove this user?')) {
            try {
                const token = JSON.parse(localStorage.getItem('userInfo'))?.token;
                const config = {
                    headers: { Authorization: `Bearer ${token}` },
                };
                await axios.delete(`/api/users/${id}`, config);
                toast.success('User removed successfully');
                fetchUsers();
            } catch (error) {
                toast.error(error.response?.data?.message || 'Error deleting user');
            }
        }
    };

    if (loading) return <div className="spinner"></div>;

    return (
        <div className="admin-table-container">
            <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
                <h2>Users ({users.length})</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>EMAIL</th>
                            <th>ROLE</th>
                            <th>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id}>
                                <td>{user._id.substring(0, 10)}...</td>
                                <td>
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600">
                                            {user.name.charAt(0)}
                                        </div>
                                        {user.name}
                                    </div>
                                </td>
                                <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                                <td>
                                    {user.role === 'admin' ? (
                                        <span className="badge badge-success">Admin</span>
                                    ) : (
                                        <span className="badge badge-primary">User</span>
                                    )}
                                </td>
                                <td>
                                    <div className="flex gap-2">
                                        <button
                                            className="btn btn-sm btn-outline text-red-500 border-red-500 hover:bg-red-500"
                                            onClick={() => deleteHandler(user._id)}
                                            disabled={user.role === 'admin'}
                                        >
                                            <FaTrash />
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
};

export default UserList;
