export default function About() {
  return (
    <div className="min-h-screen bg-black text-white py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">About Us</h1>
        <div className="max-w-4xl">
          <p className="text-lg mb-6">
            We are a digital agency focused on creating exceptional web experiences.
          </p>
          <p className="text-lg mb-6">
            Our team combines creativity with technical expertise to deliver solutions that drive results.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <div>
              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
              <p className="text-gray-300">
                To create digital experiences that don&apos;t just keep up with the world but push it forward.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
              <p className="text-gray-300">
                A future where technology is accessible, impactful, and intuitively human.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 