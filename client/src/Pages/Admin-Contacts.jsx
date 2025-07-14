import { useEffect, useState, useCallback } from "react";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

export const AdminContacts = () => {
    const [contacts, setContacts] = useState([]);
    const { authorizationToken } = useAuth();

    const getContacts = useCallback(async () => {
        try {
            const response = await fetch("http://localhost:5000/api/admin/contacts", {
                headers: {
                    Authorization: authorizationToken,
                },
            });

            const data = await response.json();
            if (response.ok) {
                setContacts(data);
            } else {
                console.error("Failed to fetch contacts");
            }
        } catch (error) {
            console.log("Error fetching contacts:", error);
        }
    }, [authorizationToken]);

    // message delete krne ka logic

    const deleteContact = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/admin/contacts/delete/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: authorizationToken,
                },
            });

            if (response.ok) {
                toast.success("Contact Message deleted successfully");
                getContacts(); // refresh list
            } else {
                toast.error("Failed to delete contact");
            }
        } catch (error) {
            toast.error("Error deleting contact");
            console.log(error);
        }
    };

    useEffect(() => {
        getContacts();
    }, [getContacts]);

    return (
        <section className="h-full overflow-y-auto bg-transparent px-2 sm:px-4 pb-6">
            <div className="w-11/12 max-w-7xl mx-auto">
                <h1 className="text-xl text-center sm:text-2xl font-bold text-gray-800 mt-4 mb-6">
                    Admin Contact Messages
                </h1>

                {/* ✅ Desktop Table */}
                <div className="hidden md:block max-h-[75vh] rounded-lg shadow bg-white border border-gray-200">
                    <table className="min-w-full text-sm md:text-base border-separate border-spacing-y-2">
                        <thead className="bg-indigo-600 text-white sticky top-0 z-10">
                            <tr>
                                <th className="px-4 py-3 text-left uppercase tracking-wide">Name</th>
                                <th className="px-4 py-3 text-left uppercase tracking-wide">Email</th>
                                <th className="px-4 py-3 text-left uppercase tracking-wide">Created At</th>
                                <th className="px-4 py-3 text-left uppercase tracking-wide">Message</th>
                                <th className="px-4 py-3 text-left uppercase tracking-wide">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {contacts.map((contact, index) => (
                                <tr
                                    key={index}
                                    className="bg-gray-50 hover:bg-gray-100 transition-all"
                                >
                                    <td className="px-4 py-3 font-medium text-gray-700">
                                        {contact.username}
                                    </td>
                                    <td className="px-4 py-3 text-gray-600">{contact.email}</td>
                                    <td className="px-4 py-3 text-sm text-gray-500">
                                        {contact.createdAt
                                            ? new Date(contact.createdAt).toLocaleString()
                                            : "N/A"}
                                    </td>
                                    <td className="px-4 py-3 text-gray-800 max-w-md whitespace-pre-wrap break-words border border-gray-200 rounded">
                                        {contact.message}
                                    </td>
                                    <td className="px-4 py-3">
                                        <button
                                            onClick={() => deleteContact(contact._id)}
                                            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-5 py-2 rounded-full hover:scale-105 transition transform shadow-sm"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* ✅ Mobile Card View */}
                <div className="md:hidden space-y-4 mt-4">
    {contacts.map((contact, index) => (
        <div key={index} className="bg-white shadow-md rounded-lg p-4 space-y-3 border border-gray-200">
            <div className="space-y-1">
                <p><span className="font-semibold">Name:</span> {contact.username}</p>
                <p><span className="font-semibold">Email:</span> {contact.email}</p>
                <p><span className="font-semibold">Date:</span>{" "}
                    <span className="text-sm text-gray-600">
                        {contact.createdAt ? new Date(contact.createdAt).toLocaleString() : "N/A"}
                    </span>
                </p>
            </div>

            <div className="max-h-40 overflow-y-auto whitespace-pre-wrap break-words p-3 border border-gray-300 rounded bg-gray-50 text-gray-800 text-sm">
                <span className="font-semibold block mb-1">Message:</span>
                {contact.message}
            </div>

            <button
                onClick={() => deleteContact(contact._id)}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-full hover:bg-red-600 transition shadow"
            >
                Delete
            </button>
        </div>
    ))}
</div>
            </div>
        </section>
    );
};
