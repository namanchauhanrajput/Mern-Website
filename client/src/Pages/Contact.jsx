import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

export const Contact = () => {
    const navigate = useNavigate();



    const [contact, setContact] = useState({
        username: "",
        email: "",
        message: "",
    });

    const [userData, setUserData] = useState(true);

    const { user } = useAuth();

    if (userData && user) {
        setContact({
            username: user.username,
            email: user.email,
            message: "",
        });
        setUserData(false);
    };

    const handleInput = (e) => {
        const { name, value } = e.target;
        setContact((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(contact);

        try {
            const response = await fetch(`https://mern-website-five.vercel.app/api/form/contact`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(contact),
            });

            console.log("contact form", response);

            if (response.ok) {
                setContact({ username: "", email: "", message: "" });
                // Add toast or success UI here
                toast.info("Message will be Send")
                navigate("/home");
            }
        } catch (error) {
            console.log("contact", error);
        }
    };

    return (
        <>
            <section className="min-h-screen bg-gradient-to-r from-purple-100 to-blue-100 flex items-center justify-center px-4 py-10">
                <div className="flex flex-col md:flex-row items-center gap-10 max-w-6xl w-full">
                    {/* Image Section */}
                    <div className="flex-1 flex justify-center">
                        <img
                            src="/images/contact.png"
                            alt="contact us"
                            className="w-72 md:w-96 object-contain drop-shadow-lg"
                        />
                    </div>

                    {/* Form Section */}
                    <div className="flex-1 w-full max-w-md bg-white shadow-2xl rounded-2xl px-8 py-10">
                        <h2 className="text-3xl font-extrabold text-center text-purple-700 mb-6">
                            Contact Us
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="block text-gray-700 font-medium mb-1">Username</label>
                                <input
                                    type="text"
                                    name="username"
                                    autoComplete="off"
                                    placeholder="Enter username"
                                    value={contact.username}
                                    onChange={handleInput}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 font-medium mb-1">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Enter email"
                                    autoComplete="off"
                                    value={contact.email}
                                    onChange={handleInput}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 font-medium mb-1">Message</label>
                                <textarea
                                    name="message"
                                    autoComplete="off"
                                    value={contact.message}
                                    onChange={handleInput}
                                    required
                                    className="w-full h-40 md:h-48 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg shadow-md transition duration-300"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            {/* Google Map Section */}
            <section className="bg-gradient-to-r from-purple-100 to-blue-100 py-8 md:py-14 px-4">
                <div className="max-w-6xl mx-auto text-center">
                    <h2 className="text-2xl md:text-3xl font-bold text-purple-800 mb-6 md:mb-8">
                        Here's My Location
                    </h2>

                    <div className="rounded-xl overflow-hidden shadow-lg border border-purple-200">
                        <iframe
                            title="Google Map of Madhowala"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13902.104654772305!2d78.77780030369232!3d29.413414503954908!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390a3267e3890ab7%3A0x6d9cdaf979a07eb8!2sMadhowala%2C%20Uttar%20Pradesh%20246722!5e0!3m2!1sen!2sin!4v1751449771448!5m2!1sen!2sin"
                            width="100%"
                            height="450"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="w-full h-[450px]"
                        ></iframe>
                    </div>
                </div>
            </section>
        </>
    );
};
