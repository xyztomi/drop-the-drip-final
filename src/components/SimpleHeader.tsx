import { Droplet } from 'lucide-react';

export function SimpleHeader() {
  return (
    <header className="bg-white border-b-4 border-black mb-12">
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-center gap-4">
          <div className="bg-black text-white p-3 border-2 border-black">
            <Droplet className="w-10 h-10" fill="white" />
          </div>
          <h1 className="text-5xl lg:text-7xl font-black tracking-tight">
            Drop the Drip
          </h1>
        </div>
        <p className="text-center mt-4 text-xl uppercase tracking-wider">
          AI-Powered Virtual Try On
        </p>
      </div>
    </header>
  );
}