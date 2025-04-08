import React from 'react';
import { UserCircle2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function LandingPage() {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <main className="flex-1 flex flex-col items-center justify-center text-center p-6 py-24 relative">
                {/* Banner Image - Using placeholder as the original path might be incorrect */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="/brooke-lark.jpg"
                        alt="Welcome Banner"
                        className="w-full h-full object-cover brightness-75"
                    />
                </div>

                {/* Content with increased z-index to appear above the banner */}
                <div className="relative z-10 flex flex-col items-center">
                    <div
                        className="opacity-0 animate-[fadeIn_0.5s_ease-out_forwards]"
                        style={{animationDelay: "0ms"}}
                    >
                        <h1 className="text-5xl font-bold mb-4 text-white drop-shadow-md">
                            Welcome to Our Platform
                        </h1>
                    </div>
                    <div
                        className="opacity-0 animate-[fadeIn_0.5s_ease-out_forwards]"
                        style={{animationDelay: "150ms"}}
                    >
                        <p className="text-lg text-gray-100 max-w-lg mb-8 drop-shadow">
                            Discover amazing features and seamless experiences built with modern UI components.
                        </p>
                    </div>
                    <div
                        className="opacity-0 animate-[fadeIn_0.5s_ease-out_forwards]"
                        style={{animationDelay: "300ms"}}
                    >
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button size="lg">Get Started</Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white border-white"
                            >
                                Learn More
                            </Button>
                        </div>
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
                                <div
                                    className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                         fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                         strokeLinejoin="round">
                                        <path
                                            d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.5a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
                                        <circle cx="12" cy="12" r="3"></circle>
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Expert Recommendation</h3>
                                <p className="text-gray-500">Easily customize components to match your brand identity
                                    and design requirements.</p>
                            </CardContent>
                        </Card>
                        <Card className="overflow-hidden shadow-lg">
                            <CardContent className="p-6 text-center">
                                <div
                                    className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                         fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                         strokeLinejoin="round">
                                        <path d="M8.25 3 12 7l3.75-4h-7.5Z"></path>
                                        <path d="M5 10h14"></path>
                                        <path d="M5 18h14"></path>
                                        <path d="M10 14h4"></path>
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Personalized Meal Plan</h3>
                                <p className="text-gray-500">All components are built with accessibility in mind,
                                    ensuring a great experience for all users.</p>
                            </CardContent>
                        </Card>
                        <Card className="overflow-hidden shadow-lg">
                            <CardContent className="p-6 text-center">
                                <div
                                    className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                         fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                         strokeLinejoin="round">
                                        <path d="m12 14 4-4"></path>
                                        <path d="M3.34 19a10 10 0 1 1 17.32 0"></path>
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold mb-2">AI Recommendation</h3>
                                <p className="text-gray-500">Optimized for speed and efficiency, providing a smooth
                                    experience with minimal load times.</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Testimonial Section */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-6xl mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center mb-12">Expert Recommendations for Diabetes
                        Management</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <p className="italic mb-4 text-gray-700">"I recommend a plate method approach: fill half
                                your plate with non-starchy vegetables, a quarter with lean protein, and a quarter with
                                whole grains or starchy vegetables. This balanced approach helps maintain steady blood
                                glucose levels."</p>
                            <div className="flex items-center">
                                <div className="text-blue-600">
                                    <UserCircle2 size={40}/>
                                </div>
                                <div className="ml-4">
                                    <p className="font-semibold">Dr. Sarah Johnson, MD</p>
                                    <p className="text-gray-500 text-sm">Endocrinologist, Diabetes Research Center</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-md p-6">
                            <p className="italic mb-4 text-gray-700">"Consistent carbohydrate intake throughout the day
                                helps prevent blood sugar spikes. Focus on high-fiber foods like beans, whole grains,
                                and vegetables which slow glucose absorption and improve insulin sensitivity."</p>
                            <div className="flex items-center">
                                <div className="text-blue-600">
                                    <UserCircle2 size={40}/>
                                </div>
                                <div className="ml-4">
                                    <p className="font-semibold">Dr. Michael Chen, PhD, RD</p>
                                    <p className="text-gray-500 text-sm">Director of Nutrition, Metropolitan Diabetes
                                        Clinic</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-md p-6">
                            <p className="italic mb-4 text-gray-700">"Mediterranean and DASH diets show excellent
                                results for diabetes management. They emphasize vegetables, fruits, whole grains, lean
                                proteins, and healthy fats while limiting refined carbs and processed foods."</p>
                            <div className="flex items-center">
                                <div className="text-blue-600">
                                    <UserCircle2 size={40}/>
                                </div>
                                <div className="ml-4">
                                    <p className="font-semibold">Dr. Amara Patel, MD, MPH</p>
                                    <p className="text-gray-500 text-sm">Preventive Medicine, University Health
                                        Systems</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-md p-6">
                            <p className="italic mb-4 text-gray-700">"For my patients with diabetes, I emphasize the
                                importance of meal timing and portion control. Regular meals with balanced
                                macronutrients help maintain glycemic control throughout the day."</p>
                            <div className="flex items-center">
                                <div className="text-blue-600">
                                    <UserCircle2 size={40}/>
                                </div>
                                <div className="ml-4">
                                    <p className="font-semibold">Dr. Robert Williams, MD</p>
                                    <p className="text-gray-500 text-sm">Chief of Endocrinology, Central Medical
                                        Center</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-md p-6">
                            <p className="italic mb-4 text-gray-700">"Beyond just counting carbs, I recommend focusing
                                on food quality. Choose foods with a lower glycemic index and higher nutrient density.
                                Small, sustainable changes to diet often yield the best long-term results."</p>
                            <div className="flex items-center">
                                <div className="text-blue-600">
                                    <UserCircle2 size={40}/>
                                </div>
                                <div className="ml-4">
                                    <p className="font-semibold">Lisa Rodriguez, MS, RDN, CDE</p>
                                    <p className="text-gray-500 text-sm">Certified Diabetes Educator, Community Health
                                        Partners</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-md p-6">
                            <p className="italic mb-4 text-gray-700">"Research consistently shows that reducing added
                                sugars and refined carbohydrates while increasing dietary fiber is beneficial for
                                glucose management. Even moderate weight loss of 5-7% can significantly improve insulin
                                sensitivity."</p>
                            <div className="flex items-center">
                                <div className="text-blue-600">
                                    <UserCircle2 size={40}/>
                                </div>
                                <div className="ml-4">
                                    <p className="font-semibold">Dr. James Thompson, PhD</p>
                                    <p className="text-gray-500 text-sm">Research Director, Institute for Metabolic
                                        Health</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-primary text-white py-16">
                <div className="max-w-4xl mx-auto text-center px-6">
                    <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
                    <p className="mb-8">Join thousands of developers building amazing user experiences with our
                        components.</p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Button size="lg" variant="secondary">Start Your Plan</Button>
                        <Button size="lg" variant="outline"
                                className="bg-transparent border-white hover:bg-white hover:text-primary">
                            View Documentation
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
};