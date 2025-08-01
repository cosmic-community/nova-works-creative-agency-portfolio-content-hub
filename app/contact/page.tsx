import ContactForm from '@/components/ContactForm'
import { generateSEO } from '@/lib/seo'
import { Mail, Phone, MapPin } from 'lucide-react'

export const metadata = generateSEO({
  title: 'Contact Us - Start Your Project with Nova Works',
  description: 'Ready to transform your digital presence? Get in touch with our creative team to discuss your web design, development, or branding project.',
  keywords: [
    'contact creative agency',
    'web design consultation',
    'development services',
    'branding consultation', 
    'project inquiry',
    'get quote',
    'hire designers',
    'hire developers',
    'San Francisco agency'
  ],
  canonical: '/contact'
})

export default function ContactPage() {
  return (
    <div className="container section-padding">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            Get In <span className="text-gradient">Touch</span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            Ready to start your next project? We would love to hear from you. 
            Let's discuss how we can bring your creative vision to life.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Send us a message</h2>
            <ContactForm />
          </section>

          {/* Contact Info */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
            
            <address className="space-y-6 not-italic">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Email</h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    <a href="mailto:hello@novaworks.com" className="hover:text-primary">hello@novaworks.com</a>
                  </p>
                  <p className="text-slate-600 dark:text-slate-400">
                    <a href="mailto:projects@novaworks.com" className="hover:text-primary">projects@novaworks.com</a>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Phone</h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    <a href="tel:+15551234567" className="hover:text-primary">+1 (555) 123-4567</a>
                  </p>
                  <p className="text-slate-600 dark:text-slate-400">
                    <a href="tel:+15559876543" className="hover:text-primary">+1 (555) 987-6543</a>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Address</h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    123 Creative Street<br />
                    Design District<br />
                    San Francisco, CA 94102
                  </p>
                </div>
              </div>
            </address>

            <div className="mt-8 p-6 bg-slate-50 dark:bg-slate-800 rounded-lg">
              <h3 className="font-semibold mb-2">Office Hours</h3>
              <div className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                <p>Monday - Friday: 9:00 AM - 6:00 PM PST</p>
                <p>Saturday: 10:00 AM - 4:00 PM PST</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}