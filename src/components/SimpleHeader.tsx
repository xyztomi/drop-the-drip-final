import { Droplet } from 'lucide-react';

export function SimpleHeader() {
  return (
    <header className="bg-white border-b-4 border-black mb-8 md:mb-12">
      <div className="container mx-auto px-4 py-6 md:px-6 md:py-10">
        <div className="flex items-center justify-center gap-3 md:gap-4">
          <div className="bg-black text-white p-2.5 md:p-3 border-2 border-black">
            <Droplet className="w-8 h-8 md:w-10 md:h-10" fill="white" />
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight">
            Drop the Drip
          </h1>
        </div>
        <p className="text-center mt-3 text-sm md:text-lg uppercase tracking-wider">
          AI-Powered Virtual Try On
        </p>
      </div>
    </header>
  );
}