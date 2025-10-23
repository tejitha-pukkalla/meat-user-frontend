import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import UserLogin from "../Components/UserLogin";
import { LOGO_URL } from "./utils/constants";
import { useAuth } from "../context/AuthContext";
import { ShoppingCart, MapPin, Loader2 } from "lucide-react";

const Header = () => {
    const { isLoggedIn, logout } = useAuth();
    const [showLogin, setShowLogin] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const profileRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false);
    const [location, setLocation] = useState("Seethammadhara, Visakhapatnam");
    const [showAddressModal, setShowAddressModal] = useState(false);

    const handleGetLocation = async () => {
        setIsLoading(true);
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                try {
                    const response = await fetch(
                        `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=069d026b831a4676abf7120c2db84474`
                    );
                    const data = await response.json();
                    const props = data.features[0]?.properties;
                    const trimmedAddress = {
                        area: props?.district || props?.suburb || "",
                        city: props?.city || props?.town || props?.village || "",
                        state: props?.state || "",
                        pincode: props?.postcode || "",
                        country: props?.country || "",
                    };
                    const formatted = `${trimmedAddress.area}, ${trimmedAddress.city}, ${trimmedAddress.state} - ${trimmedAddress.pincode}, ${trimmedAddress.country}`;
                    setLocation(formatted);
                } catch (error) {
                    console.error("Geoapify error:", error);
                    setLocation("Unable to fetch location");
                }
                setIsLoading(false);
                setShowAddressModal(false);
            },
            (error) => {
                console.error("Location access denied:", error);
                alert("Location access denied");
                setIsLoading(false);
            }
        );
    };

    useEffect(() => {
        document.body.style.overflow = showLogin ? "hidden" : "auto";
    }, [showLogin]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setShowProfileMenu(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <header className="w-full bg-[#ffe0e4] border-b border-pink-300 shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
                {/* Logo + Address */}
                <div className="flex items-center gap-2 bg-transparent">
                    <Link to="/">
                        <img
                            className="h-12 sm:h-16 md:h-20 lg:h-24 w-auto object-contain bg-transparent mix-blend-multiply"
                            alt="logo"
                            src={LOGO_URL}
                        />
                    </Link>
                    <div className="flex flex-col justify-center mt-1 text-gray-700">
                        <div
                            className="flex items-center gap-2 cursor-pointer"
                            onClick={() => setShowAddressModal(true)}
                        >
                            <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-red-500 flex-shrink-0" />
                            <span className="text-base sm:text-lg font-semibold leading-tight whitespace-nowrap">
                                Visakhapatnam Store
                            </span>
                        </div>
                        <div className="ml-7 mt-1 text-left text-xs sm:text-sm text-gray-600 leading-snug space-y-[2px]">
                            {location.split(",").map((line, index) => (
                                <div key={index} className="max-w-[300px] break-words">
                                    {line.trim()}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Desktop Search Box */}
                <div className="hidden md:flex items-center relative w-[280px] sm:w-[290px] lg:w-[380px] ml-6">
                    <input
                        type="text"
                        placeholder="Search for any delicious product"
                        className="w-full py-2 pl-4 pr-10 border rounded-full outline-none focus:ring-2 focus:ring-red-400"
                    />
                    <img
                        src="https://www.licious.in/image/search_venus_icon.svg"
                        alt="Search"
                        className="absolute right-3 w-5 h-5 cursor-pointer"
                    />
                </div>

                {/* Nav + Cart */}
                <div className="flex items-center gap-6">
                    <nav className="hidden md:block">
                        <ul className="flex gap-6 text-gray-700 font-medium items-center">
                            {isLoggedIn ? (
                                <>
                                    <li className="relative" ref={profileRef}>
                                        <div
                                            onClick={() => setShowProfileMenu(!showProfileMenu)}
                                            className="cursor-pointer flex items-center gap-1 hover:text-red-500"
                                        >
                                            <img
                                                src="https://cdn-icons-png.flaticon.com/512/747/747376.png"
                                                alt="Profile"
                                                className="w-6 h-6 rounded-full object-cover cursor-pointer"
                                            />
                                            <span className="hidden lg:block">Profile</span>
                                        </div>
                                        {showProfileMenu && (
                                            <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md border">
                                                <Link
                                                    to="/profile"
                                                    className="block px-4 py-2 hover:bg-pink-100 cursor-pointer"
                                                    onClick={() => setShowProfileMenu(false)}
                                                >
                                                    View Profile
                                                </Link>
                                                <Link
                                                    to="/profile"
                                                    className="block px-4 py-2 hover:bg-pink-100 cursor-pointer"
                                                    onClick={() => setShowProfileMenu(false)}
                                                >
                                                    My Orders
                                                </Link>
                                                <button
                                                    onClick={() => {
                                                        logout();
                                                        setShowProfileMenu(false);
                                                    }}
                                                    className="block w-full text-left px-4 py-2 hover:bg-pink-100 cursor-pointer"
                                                >
                                                    Logout
                                                </button>
                                            </div>
                                        )}
                                    </li>
                                </>
                            ) : (
                                <li
                                    className="cursor-pointer flex items-center gap-1 hover:text-red-500"
                                    onClick={() => setShowLogin(true)}
                                >
                                    <img
                                        src="https://cdn-icons-png.flaticon.com/512/747/747376.png"
                                        alt="Profile"
                                        className="w-6 h-6 rounded-full object-cover cursor-pointer"
                                    />
                                    <span>Login</span>
                                </li>
                            )}
                            <li className="cursor-pointer flex items-center gap-1 hover:text-red-500">
                                Cart
                                <ShoppingCart className="w-6 h-6 text-gray-800" />
                            </li>
                        </ul>
                    </nav>

                    {/* Mobile Search Icon */}
                    <div className="md:hidden">
                        <img
                            src="https://www.licious.in/image/search_venus_icon.svg"
                            alt="Search"
                            className="w-6 h-6 cursor-pointer"
                            onClick={() => setShowSearch(!showSearch)}
                        />
                    </div>
                </div>
            </div>

            {/* Mobile Search Box */}
            {showSearch && (
                <div className="md:hidden px-4 pb-3">
                    <div className="flex items-center relative">
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="w-full py-2 pl-4 pr-10 border rounded-full outline-none focus:ring-2 focus:ring-red-400"
                        />
                    </div>
                </div>
            )}

            {/* Login Drawer */}
            {showLogin && (
                <div className="fixed top-0 right-0 h-screen z-50 bg-white shadow-lg overflow-y-auto w-full sm:w-[400px] transition-transform duration-300">
                    <UserLogin onLoginSuccess={() => setShowLogin(false)} />
                </div>
            )}

            {/* Address Modal */}
            {showAddressModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-40 px-4 pt-[150px] pb-[40px]">
                    <div className="bg-white rounded-xl shadow-2xl px-6 py-8 w-[90%] sm:w-[400px] md:w-[500px] lg:w-[600px] h-[300px] md:h-[550px] max-h-[90vh] overflow-y-auto text-center border border-gray-200 flex flex-col justify-between">

                        {/* Message Block */}
                        <div className="bg-[#fff5f5] rounded-lg px-4 py-5 border border-pink-300">
                            <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-3">
                                Hey there! Looks like you currently have no saved addresses.
                            </h2>
                            <p className="text-sm sm:text-base text-gray-600">
                                Go ahead and click <strong>"ADD NEW ADDRESS"</strong> to get started.
                            </p>
                        </div>

                        {/* Button Block */}
                        <div className="pt-6">
                            <button
                                onClick={handleGetLocation}
                                className="bg-red-500 text-white px-5 py-2.5 rounded-full hover:bg-red-600 transition-all duration-200 flex items-center justify-center gap-2 mx-auto cursor-pointer"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="animate-spin w-4 h-4" />
                                        Getting your location...
                                    </>
                                ) : (
                                    "ADD NEW ADDRESS"
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </header>
    );
};

export default Header;