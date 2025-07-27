import React, { useEffect } from 'react';
import Hero from './Hero';
import AboutUs from './AboutUs';
import Services from './Services';
import ContactUs from './ContactUs';

const Dashboard = () => {
    // Handle navigation from navbar
    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Listen for navigation events from navbar
    useEffect(() => {
        const handleNavClick = (event) => {
            if (event.detail && event.detail.path) {
                const path = event.detail.path;
                // Add a small delay to ensure the component is fully rendered
                setTimeout(() => {
                    if (path === '/') {
                        scrollToSection('home');
                    } else if (path === '/services') {
                        scrollToSection('services');
                    } else if (path === '/about') {
                        scrollToSection('about');
                    } else if (path === '/contact') {
                        scrollToSection('contact');
                    }
                }, 100);
            }
        };

        // Also handle URL hash changes for direct navigation
        const handleHashChange = () => {
            const hash = window.location.hash;
            if (hash) {
                const sectionId = hash.substring(1); // Remove the # symbol
                setTimeout(() => {
                    scrollToSection(sectionId);
                }, 100);
            }
        };

        // Check for hash on initial load
        if (window.location.hash) {
            handleHashChange();
        }

        window.addEventListener('navClick', handleNavClick);
        window.addEventListener('hashchange', handleHashChange);

        return () => {
            window.removeEventListener('navClick', handleNavClick);
            window.removeEventListener('hashchange', handleHashChange);
        };
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
            <Hero scrollToSection={scrollToSection} />
            <AboutUs />
            <Services />
            <ContactUs />
        </div>
    );
};

export default Dashboard;