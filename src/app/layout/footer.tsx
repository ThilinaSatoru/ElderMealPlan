import Image from "next/image";


export default function Footer() {
    return (
        <footer className="border-t p-8 bg-gray-50">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                    <h3 className="font-bold text-lg mb-4">Brand</h3>
                    <p className="text-gray-500">Modern UI components built with React and Tailwind CSS.</p>
                </div>
                <div>
                    <h3 className="font-bold mb-4">Company</h3>
                    <ul className="space-y-2">
                        <li><a href="#" className="text-gray-500 hover:text-primary">About</a></li>
                        <li><a href="#" className="text-gray-500 hover:text-primary">Careers</a></li>
                        <li><a href="#" className="text-gray-500 hover:text-primary">Contact</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-bold mb-4">Resources</h3>
                    <ul className="space-y-2">
                        <li><a href="#" className="text-gray-500 hover:text-primary">Documentation</a></li>
                        <li><a href="#" className="text-gray-500 hover:text-primary">Blog</a></li>
                        <li><a href="#" className="text-gray-500 hover:text-primary">Community</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-bold mb-4">Legal</h3>
                    <ul className="space-y-2">
                        <li><a href="#" className="text-gray-500 hover:text-primary">Privacy</a></li>
                        <li><a href="#" className="text-gray-500 hover:text-primary">Terms</a></li>
                    </ul>
                </div>
            </div>
            <div className="max-w-7xl mx-auto pt-8 mt-8 border-t text-center text-gray-500">
                <p>© 2025 Your Company. All rights reserved.</p>
            </div>
        </footer>
    );
}