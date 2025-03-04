'use client';

import { useState } from 'react';
import { useDeepgram } from '@/lib/contexts/DeepgramContext';
import { fal } from "@fal-ai/client";

// Configure FAL.AI client with proxy URL to protect API key
fal.config({
  proxyUrl: "/api/fal/proxy"
});

/**
 * ImageGenerator Component
 * 
 * A React component that generates AI images using FAL.AI's image generation API.
 * Features:
 * - Text input for image prompts
 * - Voice input using Deepgram for speech-to-text
 * - Real-time image generation with loading states
 * - Modern UI with Tailwind CSS
 */
export default function ImageGenerator() {
  // State management for user inputs and UI states
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const { startRecording, stopRecording } = useDeepgram();

  /**
   * Handles voice input recording and transcription
   * Uses Deepgram's speech-to-text API to convert voice to text
   */
  const handleVoiceInput = async () => {
    if (isRecording) {
      setIsRecording(false);
      const transcript = await stopRecording();
      if (transcript) {
        setPrompt(transcript);
      }
    } else {
      setIsRecording(true);
      startRecording();
    }
  };

  /**
   * Generates an image using FAL.AI's image generation API
   * Uses the flux/dev model which is optimized for high-quality image generation
   */
  const generateImage = async () => {
    if (!prompt) return;
    
    setIsLoading(true);
    try {
      console.log("Starting image generation with prompt:", prompt);
      
      // Call FAL.AI API to generate image
      const result = await fal.subscribe("fal-ai/flux/dev", {
        input: {
          prompt,
          image_size: "square_hd" // High-definition square image
        },
        pollInterval: 1000, // Check generation status every second
        logs: true,
        onQueueUpdate(update) {
          console.log("Generation status:", update);
        },
      });
      
      console.log("Generation result:", result);
      
      // Update UI with generated image
      if (result?.data?.images?.[0]?.url) {
        setImageUrl(result.data.images[0].url);
        console.log("Setting image URL:", result.data.images[0].url);
      } else {
        console.error("No image URL in the response:", result);
      }
    } catch (error) {
      console.error('Error generating image:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="px-6 py-8">
            <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
              AI Image Generator
            </h1>
            
            <div className="space-y-6">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe the image you want to generate..."
                  className="flex-1 min-w-0 block w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 text-base placeholder:text-gray-500"
                />
                <button
                  onClick={handleVoiceInput}
                  className={`inline-flex items-center justify-center p-3 rounded-md ${
                    isRecording 
                      ? 'bg-red-600 hover:bg-red-700' 
                      : 'bg-blue-600 hover:bg-blue-700'
                  } text-white transition-colors duration-200`}
                  title={isRecording ? 'Stop Recording' : 'Start Recording'}
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    strokeWidth={2} 
                    stroke="currentColor" 
                    className="w-6 h-6"
                  >
                    {isRecording ? (
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
                    )}
                  </svg>
                </button>
                <button
                  onClick={generateImage}
                  disabled={isLoading || !prompt}
                  className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  {isLoading ? 'Generating...' : 'Generate'}
                </button>
              </div>

              <div className="mt-8 aspect-video w-full overflow-hidden rounded-lg bg-gray-100">
                {isLoading ? (
                  <div className="flex h-full items-center justify-center">
                    <div className="inline-flex items-center px-4 py-2 space-x-3">
                      <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>
                      <span className="text-gray-700">Generating your image...</span>
                    </div>
                  </div>
                ) : imageUrl ? (
                  <img
                    src={imageUrl}
                    alt="Generated image"
                    className="h-full w-full object-contain"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <p className="text-gray-500">Your generated image will appear here</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 