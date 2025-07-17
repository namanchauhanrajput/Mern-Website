import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

export const AdminUpdate = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { authorizationToken } = useAuth();

    const [userData, setUserData] = useState({
        username: "",
        email: "",
        phone: "",
        gender: "",
        dob: "",
    });

    // Fetch existing user data
    useEffect(() => {
        const getUserData = async () => {
            try {
                const response = await fetch(`https://mern-website-1-4w0c.onrender.com/admin/users/${id}`, {
                    headers: {
                        Authorization: authorizationToken,
                    },
                });
                const result = await response.json();
                setUserData(result.data);
            } catch (error) {
                console.log("Error fetching user data", error);
            }
        };

        getUserData();
    }, [id, authorizationToken]);

    // Handle input change
    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    // Submit updated data
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`https://mern-website-1-4w0c.onrender.com/api/admin/users/update${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: authorizationToken,
                },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                toast.success("User updated successfully");
                navigate("/admin/users");
            } else {
                toast.error("Failed to update user");
            }
        } catch (error) {
            console.log("Error updating user:", error);
        }
    };

    return (
        <section className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-6 text-center">Update User Info</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="username"
                    value={userData.username}
                    onChange={handleChange}
                    placeholder="Username"
                    className="w-full px-4 py-2 border rounded"
                />
                <input
                    type="email"
                    name="email"
                    value={userData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="w-full px-4 py-2 border rounded"
                />
                <input
                    type="number"
                    name="phone"
                    value={userData.phone}
                    onChange={handleChange}
                    placeholder="Phone"
                    className="w-full px-4 py-2 border rounded"
                />
                <select
                    name="gender"
                    value={userData.gender}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded"
                >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
                <input
                    type="date"
                    name="dob"
                    value={userData.dob?.slice(0, 10)}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded"
                />

                {/* ✅ Button Centered on Desktop, Full Width on Mobile */}
                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="w-full sm:w-52 bg-gradient-to-r from-blue-700 to-purple-700 text-white py-2 rounded-full hover:bg-blue-700 transition"
                    >
                        Update
                    </button>
                </div>
            </form>
        </section>
    );
};
