import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";


// Main component with animation effects
const HomePage = () => {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <main className="flex-1 flex flex-col items-center justify-center text-center p-6 py-24">
                <div
                    className="opacity-0 translate-y-4 animate-[fadeIn_0.5s_ease-out_forwards]"
                    style={{ animationDelay: "0ms" }}
                >
                    <h1 className="text-5xl font-bold mb-4">
                        Welcome to Our Platform
                    </h1>
                </div>
                <div
                    className="opacity-0 translate-y-4 animate-[fadeIn_0.5s_ease-out_forwards]"
                    style={{ animationDelay: "150ms" }}
                >
                    <p className="text-lg text-gray-600 max-w-lg mb-8">
                        Discover amazing features and seamless experiences built with modern UI components.
                    </p>
                </div>
                <div
                    className="opacity-0 translate-y-4 animate-[fadeIn_0.5s_ease-out_forwards]"
                    style={{ animationDelay: "300ms" }}
                >
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Button size="lg">Get Started</Button>
                        <Button size="lg" variant="outline">Learn More</Button>
                    </div>
                </div>
            </main>

            {/* Feature Section */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <Card className="overflow-hidden shadow-lg">
                            <CardContent className="p-6 text-center">
                                <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.5a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Customization</h3>
                                <p className="text-gray-500">Easily customize components to match your brand identity and design requirements.</p>
                            </CardContent>
                        </Card>
                        <Card className="overflow-hidden shadow-lg">
                            <CardContent className="p-6 text-center">
                                <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8.25 3 12 7l3.75-4h-7.5Z"></path><path d="M5 10h14"></path><path d="M5 18h14"></path><path d="M10 14h4"></path></svg>
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Accessibility</h3>
                                <p className="text-gray-500">All components are built with accessibility in mind, ensuring a great experience for all users.</p>
                            </CardContent>
                        </Card>
                        <Card className="overflow-hidden shadow-lg">
                            <CardContent className="p-6 text-center">
                                <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 14 4-4"></path><path d="M3.34 19a10 10 0 1 1 17.32 0"></path></svg>
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Performance</h3>
                                <p className="text-gray-500">Optimized for speed and efficiency, providing a smooth experience with minimal load times.</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Testimonial Section */}
            <section className="py-16">
                <div className="max-w-6xl mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <Card className="shadow-md">
                            <CardContent className="p-6">
                                <p className="italic mb-4">"This platform has revolutionized how we build our products. The components are beautiful and easy to implement."</p>
                                <div className="flex items-center">
                                    <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                                    <div className="ml-4">
                                        <p className="font-semibold">Sarah Johnson</p>
                                        <p className="text-gray-500 text-sm">Product Designer, TechCorp</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="shadow-md">
                            <CardContent className="p-6">
                                <p className="italic mb-4">"The attention to detail and accessibility features have made our development process much smoother."</p>
                                <div className="flex items-center">
                                    <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                                    <div className="ml-4">
                                        <p className="font-semibold">Michael Chen</p>
                                        <p className="text-gray-500 text-sm">Lead Developer, InnovateTech</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-primary text-white py-16">
                <div className="max-w-4xl mx-auto text-center px-6">
                    <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
                    <p className="mb-8">Join thousands of developers building amazing user experiences with our components.</p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Button size="lg" variant="secondary">Start Building</Button>
                        <Button size="lg" variant="outline" className="bg-transparent border-white hover:bg-white hover:text-primary">
                            View Documentation
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;