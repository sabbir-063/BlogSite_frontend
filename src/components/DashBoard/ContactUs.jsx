import React, { useState } from 'react';
import { Button } from '../ui/button';
import axios from "../../utils/axiosInstance";
import { toast } from "react-toastify";
import { Mail, Phone, MapPin, Github, Linkedin, Twitter } from 'lucide-react';

const ContactUs = () => {
    return (
        <section id="contact" className="py-16 px-4 bg-white">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">Get in Touch</h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Ready to start your journey? Let's connect and create something amazing together
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl p-8 shadow-xl flex flex-col justify-between h-full">
                        <div className="space-y-6">
                            <div className="flex items-center space-x-4 bg-white/80 rounded-xl p-4 shadow">
                                <div className="w-12 h-12 bg-blue-200 rounded-lg flex items-center justify-center">
                                    <Mail className="h-6 w-6 text-blue-600" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-blue-700">Email</h3>
                                    <p className="text-gray-700">sabbir.musfique01@gmail.com</p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-4 bg-white/80 rounded-xl p-4 shadow">
                                <div className="w-12 h-12 bg-green-200 rounded-lg flex items-center justify-center">
                                    <Phone className="h-6 w-6 text-green-600" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-green-700">Phone</h3>
                                    <p className="text-gray-700">+880-1884952804</p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-4 bg-white/80 rounded-xl p-4 shadow">
                                <div className="w-12 h-12 bg-purple-200 rounded-lg flex items-center justify-center">
                                    <MapPin className="h-6 w-6 text-purple-600" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-purple-700">Location</h3>
                                    <p className="text-gray-700">Mirpur, Dhaka, Bangladesh</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8">
                            <h3 className="text-lg font-semibold text-blue-700 mb-4">Follow Us</h3>
                            <div className="flex space-x-4">
                                {[
                                    { icon: Github, href: 'https://github.com/sabbir-063', label: 'GitHub' },
                                    { icon: Linkedin, href: 'https://www.linkedin.com/in/msmusfique063/', label: 'LinkedIn' },
                                    { icon: Twitter, href: 'https://x.com/Sabbir_063', label: 'Twitter' }
                                ].map((social, index) => (
                                    <Button
                                        key={index}
                                        variant="outline"
                                        size="icon"
                                        className="w-10 h-10 bg-white shadow hover:bg-blue-100"
                                        onClick={() => window.open(social.href, '_blank')}
                                    >
                                        <social.icon className="h-5 w-5 text-blue-600" />
                                    </Button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-8 text-white shadow-xl">
                        <h3 className="text-2xl font-bold mb-6 text-center">Contact Form</h3>
                        <ContactForm />
                    </div>
                </div>
            </div>
        </section>
    );
};


const ContactForm = () => {
    const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const validate = () => {
        const errs = {};
        if (!form.name.trim()) errs.name = 'Name is required.';
        if (!form.email.trim()) errs.email = 'Email is required.';
        else if (!/^\S+@\S+\.\S+$/.test(form.email)) errs.email = 'Invalid email.';
        if (!form.subject.trim()) errs.subject = 'Subject is required.';
        if (!form.message.trim()) errs.message = 'Message is required.';
        return errs;
    };

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: '' });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length) {
            setErrors(errs);
            return;
        }
        setLoading(true);
        try {
            const res = await axios.post("/contact/send", form);
            if (res.data && res.data.success) {
                toast.success(res.data.message || 'Message sent successfully!');
                setForm({ name: '', email: '', subject: '', message: '' });
            } else {
                toast.error(res.data.error || 'Failed to send message.');
            }
        } catch (err) {
            toast.error(`Network error. ${err.message}`);
        }
        setLoading(false);
    };

    return (
        <form className="space-y-5" onSubmit={handleSubmit} noValidate>
            <div>
                <label className="block mb-1 font-semibold text-white" htmlFor="name">Name</label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    className={`w-full px-4 py-2 rounded-lg bg-blue-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400 ${errors.name ? 'border border-red-500' : ''}`}
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                />
                {errors.name && <p className="text-red-200 text-sm mt-1">{errors.name}</p>}
            </div>
            <div>
                <label className="block mb-1 font-semibold text-white" htmlFor="email">Email</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    className={`w-full px-4 py-2 rounded-lg bg-purple-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-400 ${errors.email ? 'border border-red-500' : ''}`}
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Your Email"
                />
                {errors.email && <p className="text-red-200 text-sm mt-1">{errors.email}</p>}
            </div>
            <div>
                <label className="block mb-1 font-semibold text-white" htmlFor="subject">Subject</label>
                <input
                    type="text"
                    name="subject"
                    id="subject"
                    className={`w-full px-4 py-2 rounded-lg bg-green-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-400 ${errors.subject ? 'border border-red-500' : ''}`}
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="Subject"
                />
                {errors.subject && <p className="text-red-200 text-sm mt-1">{errors.subject}</p>}
            </div>
            <div>
                <label className="block mb-1 font-semibold text-white" htmlFor="message">Message</label>
                <textarea
                    name="message"
                    id="message"
                    rows={5}
                    className={`w-full px-4 py-2 rounded-lg bg-pink-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-400 ${errors.message ? 'border border-red-500' : ''}`}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Your Message"
                />
                {errors.message && <p className="text-red-200 text-sm mt-1">{errors.message}</p>}
            </div>
            <div className="flex justify-center">
                <Button
                    type="submit"
                    variant="secondary"
                    size="lg"
                    className="bg-white text-blue-600 hover:bg-gray-100 w-full flex items-center justify-center gap-2 shadow-lg"
                    disabled={loading}
                >
                    {loading ? 'Sending...' : 'Send Message'}
                    <Mail className="ml-2 h-5 w-5" />
                </Button>
            </div>
        </form>
    );
};

export default ContactUs;