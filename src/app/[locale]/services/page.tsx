export default function ServicesPage() {
  return (
    <div className="container mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold mb-8 text-center">Our Services</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* Web Development */}
        <div className="bg-gray-100 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Web Development</h2>
          <p className="mb-4">
            We create responsive, user-friendly websites and web applications tailored to your specific needs.
            Our development team utilizes the latest technologies to ensure your web presence is both modern and effective.
          </p>
          <ul className="list-disc pl-5 mb-4">
            <li>Custom website development</li>
            <li>E-commerce solutions</li>
            <li>Progressive web applications</li>
            <li>Content management systems</li>
          </ul>
        </div>
        
        {/* Mobile App Development */}
        <div className="bg-gray-100 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Mobile Applications</h2>
          <p className="mb-4">
            Our team develops intuitive, high-performance mobile applications for iOS and Android platforms.
            We focus on creating seamless user experiences that drive engagement and satisfaction.
          </p>
          <ul className="list-disc pl-5 mb-4">
            <li>Native iOS and Android apps</li>
            <li>Cross-platform solutions</li>
            <li>App maintenance and updates</li>
            <li>Integration with existing systems</li>
          </ul>
        </div>
        
        {/* UI/UX Design */}
        <div className="bg-gray-100 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">UI/UX Design</h2>
          <p className="mb-4">
            We craft beautiful, intuitive interfaces that enhance user experience and drive business goals.
            Our design approach balances aesthetics with functionality to create compelling digital experiences.
          </p>
          <ul className="list-disc pl-5 mb-4">
            <li>User research and testing</li>
            <li>Wireframing and prototyping</li>
            <li>Visual design and branding</li>
            <li>Interaction design</li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-3xl mx-auto mt-16 text-center">
        <h2 className="text-2xl font-semibold mb-4">Ready to get started?</h2>
        <p className="mb-6">
          Contact our team today to discuss how we can help bring your ideas to life.
        </p>
      </div>
    </div>
  );
} 