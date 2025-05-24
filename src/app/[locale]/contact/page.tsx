import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { setRequestLocale } from 'next-intl/server';

type PageProps = {
  params: { locale: string };
};

export default async function ContactPage({ params }: PageProps) {
  const locale = params.locale;
  setRequestLocale(locale);
  
  return (
    <div className="container mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold mb-8 text-center">Contact Us</h1>
      
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Contact Information */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">Get In Touch</h2>
          
          <div className="mb-8">
            <h3 className="text-xl font-medium mb-3">Our Office</h3>
            <p className="mb-1">123 Tech Boulevard</p>
            <p className="mb-1">Silicon Valley, CA 94025</p>
            <p>United States</p>
          </div>
          
          <div className="mb-8">
            <h3 className="text-xl font-medium mb-3">Contact Information</h3>
            <p className="mb-1"><strong>Email:</strong> info@moonwhale.com</p>
            <p className="mb-1"><strong>Phone:</strong> +1 (555) 123-4567</p>
            <p><strong>Hours:</strong> Monday-Friday, 9AM-6PM PST</p>
          </div>
          
    <div>
            <h3 className="text-xl font-medium mb-3">Follow Us</h3>
            <div className="flex space-x-4">
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                <span>X</span>
              </div>
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                <span>IG</span>
              </div>
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                <span>LI</span>
              </div>
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                <span>YT</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Contact Form */}
        <div className="bg-gray-100 p-8 rounded-lg">
          <h2 className="text-2xl font-semibold mb-6">Send Us a Message</h2>
          
          <form>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2" htmlFor="name">Name</label>
              <input type="text" id="name" className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="Your Name" />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2" htmlFor="email">Email</label>
              <input type="email" id="email" className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="your@email.com" />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2" htmlFor="subject">Subject</label>
              <input type="text" id="subject" className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="How can we help?" />
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2" htmlFor="message">Message</label>
              <textarea id="message" rows={5} className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="Your message..."></textarea>
            </div>
            
            <button type="submit" className="bg-black text-white px-6 py-3 rounded-md font-medium">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
} 