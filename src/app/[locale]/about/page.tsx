import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { setRequestLocale } from 'next-intl/server';

type PageProps = {
  params: { locale: string };
};

export default async function AboutPage({ params }: PageProps) {
  const locale = params.locale;
  setRequestLocale(locale);
  
  return (
    <div className="container mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold mb-8 text-center">About MoonWhale</h1>
      
      <div className="max-w-3xl mx-auto">
        <p className="mb-6 text-lg">
          MoonWhale is a leading technology company specializing in innovative solutions for businesses of all sizes. 
          Founded in 2015, we've been at the forefront of digital transformation, helping our clients navigate the 
          ever-changing technological landscape.
        </p>
        
        <h2 className="text-2xl font-semibold mb-4 mt-8">Our Mission</h2>
        <p className="mb-6">
          To empower businesses through cutting-edge technology solutions that drive growth, efficiency, and innovation.
          We believe in creating meaningful partnerships with our clients to understand their unique challenges and deliver
          tailored solutions that exceed expectations.
        </p>
        
        <h2 className="text-2xl font-semibold mb-4 mt-8">Our Team</h2>
        <p className="mb-6">
          Our diverse team of experts brings together a wealth of knowledge and experience from various fields. From software
          development to design, project management to strategy, we have the expertise to tackle any challenge.
        </p>
        
        <div className="mt-12 p-6 bg-gray-100 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
          <p>
            Ready to start your next project with us? Reach out today and let's create something amazing together.
          </p>
        </div>
      </div>
    </div>
  );
} 