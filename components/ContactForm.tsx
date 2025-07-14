'use client';

import { useState } from 'react';
import { ContactFormData } from '@/types';

export default function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    company: '',
    message: '',
    services: []
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Here you would typically send the data to your API
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      setSubmitStatus('success');
      setFormData({ name: '', email: '', company: '', message: '', services: [] });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleServiceChange = (service: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services?.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...(prev.services || []), service]
    }));
  };

  const services = [
    'Brand Identity',
    'Web Design',
    'Development',
    'UI/UX Design',
    'Mobile Apps',
    'Strategy'
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-blue-100 mb-2">
          Name *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-blue-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-blue-100 mb-2">
          Email *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-blue-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
        />
      </div>

      <div>
        <label htmlFor="company" className="block text-sm font-medium text-blue-100 mb-2">
          Company
        </label>
        <input
          type="text"
          id="company"
          name="company"
          value={formData.company}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-blue-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-blue-100 mb-2">
          Services Interested In
        </label>
        <div className="grid grid-cols-2 gap-2">
          {services.map((service) => (
            <label key={service} className="flex items-center">
              <input
                type="checkbox"
                checked={formData.services?.includes(service) || false}
                onChange={() => handleServiceChange(service)}
                className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-blue-300 rounded"
              />
              <span className="text-sm text-blue-100">{service}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-blue-100 mb-2">
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          value={formData.message}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-blue-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-white text-blue-600 py-2 px-4 rounded-md font-semibold hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>

      {submitStatus === 'success' && (
        <p className="text-green-200 text-sm">Message sent successfully! We'll get back to you soon.</p>
      )}
      
      {submitStatus === 'error' && (
        <p className="text-red-200 text-sm">There was an error sending your message. Please try again.</p>
      )}
    </form>
  );
}