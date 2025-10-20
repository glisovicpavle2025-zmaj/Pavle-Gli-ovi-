
import React from 'react';
import Spinner from './Spinner';

interface ImageDisplayProps {
  imageUrl: string | null;
  isLoading: boolean;
  error: string | null;
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({ imageUrl, isLoading, error }) => {
  const getDisplayContent = () => {
    if (isLoading) {
      return (
        <div className="text-center">
          <Spinner />
          <p className="mt-4 text-lg text-gray-300 animate-pulse">Generisanje slike... Molimo sačekajte.</p>
        </div>
      );
    }
    if (error) {
      return (
        <div className="text-center text-red-400 bg-red-900/30 p-6 rounded-lg border border-red-500">
          <i className="fas fa-exclamation-triangle fa-2x mb-4"></i>
          <p className="font-semibold">Greška</p>
          <p className="text-sm">{error}</p>
        </div>
      );
    }
    if (imageUrl) {
      return (
        <img
          src={imageUrl}
          alt="Generisana slika"
          className="max-w-full max-h-full object-contain rounded-lg shadow-2xl animate-fade-in"
        />
      );
    }
    return (
      <div className="text-center text-gray-500">
        <i className="fas fa-image fa-4x mb-4"></i>
        <h2 className="text-2xl font-semibold">Vaša slika će se pojaviti ovde</h2>
        <p>Opišite šta želite da vidite u polju ispod.</p>
      </div>
    );
  };

  return (
    <div className="w-full h-full max-w-2xl max-h-[60vh] md:max-h-[70vh] flex items-center justify-center bg-gray-800/50 rounded-xl border border-gray-700 p-4 transition-all duration-300">
      {getDisplayContent()}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default ImageDisplay;
