import { getDictionary } from '../../lib/i18n/get-dictionary';

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dictionary = await getDictionary(locale);

  return (
    <section className="relative bg-gray-900 text-white py-20 md:py-32 lg:py-48 flex items-center justify-center min-h-[calc(100vh-120px)]">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4 animate-fade-in-up">
          {dictionary.title}
        </h1>
        <p className="text-lg md:text-xl mb-8 opacity-0 animate-fade-in-up animation-delay-200">
          {dictionary.subtitle}
        </p>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transform transition-transform hover:scale-105 opacity-0 animate-fade-in-up animation-delay-400">
          {dictionary.callToAction}
        </button>
      </div>
    </section>
  );
}