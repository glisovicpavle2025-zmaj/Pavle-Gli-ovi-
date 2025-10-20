
import React, { useState, useCallback } from 'react';
import { generateImage } from './services/geminiService';
import ImageDisplay from './components/ImageDisplay';
import PromptInput from './components/PromptInput';

const App: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateImage = useCallback(async () => {
    if (!prompt.trim() || isLoading) return;

    setIsLoading(true);
    setImageUrl(null);
    setError(null);

    try {
      const url = await generateImage(prompt);
      setImageUrl(url);
    } catch (err) {
      console.error(err);
      setError('Došlo je do greške prilikom generisanja slike. Molimo proverite vaš API ključ i pokušajte ponovo.');
    } finally {
      setIsLoading(false);
    }
  }, [prompt, isLoading]);

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white font-sans">
      <header className="p-4 text-center border-b border-gray-700 shadow-lg">
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          AI Generator Slika
        </h1>
        <p className="text-gray-400 mt-1">Oživite vaše ideje uz pomoć veštačke inteligencije</p>
      </header>
      
      <main className="flex-grow flex items-center justify-center p-4 overflow-auto">
        <ImageDisplay imageUrl={imageUrl} isLoading={isLoading} error={error} />
      </main>

      <footer className="p-4 bg-gray-900/80 backdrop-blur-sm border-t border-gray-700">
        <PromptInput
          prompt={prompt}
          setPrompt={setPrompt}
          onGenerate={handleGenerateImage}
          isLoading={isLoading}
        />
      </footer>
    </div>
  );
};

export default App;
