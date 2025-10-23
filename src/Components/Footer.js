import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
    return (
        <footer className="bg-gray-100 text-gray-700 py-10 px-6">
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                {/* Company Section */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Company</h3>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#" className="hover:text-red-500">Privacy Policy</a></li>
                        <li><a href="#" className="hover:text-red-500">Terms & Conditions</a></li>
                    </ul>
                </div>

                {/* Help & Support */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Help & Support</h3>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#" className="hover:text-red-500">Contact Us</a></li>
                        <li><a href="#" className="hover:text-red-500">FAQs</a></li>
                        <li><a href="#" className="hover:text-red-500">Shipping Info</a></li>
                    </ul>
                </div>

                {/* Social links Here */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Stay Connected</h3>
                    <ul className="space-y-2 text-sm">
                        <li>
                            Email: <a href="mailto:support@meatapp.com" className="text-red-600 hover:underline">support@meatapp.com</a>
                        </li>
                        <li className="flex gap-4 mt-2">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon icon={faFacebook} className="text-blue-600 w-5 h-5 hover:scale-110 transition" />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon icon={faInstagram} className="text-pink-500 w-5 h-5 hover:scale-110 transition" />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon icon={faTwitter} className="text-blue-400 w-5 h-5 hover:scale-110 transition" />
                            </a>
                        </li>
                    </ul>
                </div>


                {/* Useful Links */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Useful Links</h3>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#" className="hover:text-red-500">Store Locator</a></li>
                        <li><a href="#" className="hover:text-red-500">Sitemap</a></li>
                        <li><a href="#" className="hover:text-red-500">Quality Check</a></li>
                    </ul>
                </div>
            </div>

            {/* Bottom Line */}
            <div className="mt-10 text-center text-xs text-gray-500">
                &copy; {new Date().getFullYear()} MeatApp. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;