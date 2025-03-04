# AI Image Generator with Voice Input

A modern Next.js application that generates AI images using FAL.AI's image generation API and supports voice input through Deepgram's speech-to-text API.

## Features

- 🎨 AI Image Generation using FAL.AI's flux/dev model
- 🎤 Voice-to-Text input using Deepgram
- ⚡ Real-time image generation with status updates
- 🎯 High-definition square image output
- 🎨 Modern UI with Tailwind CSS
- 🔒 Secure API key handling through proxy routes

## Demo

[Add screenshots or GIF here]

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- FAL.AI Client
- Deepgram SDK
- React Hooks

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- FAL.AI API key ([Get one here](https://fal.ai))
- Deepgram API key ([Get one here](https://deepgram.com))

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/ai-image-generator.git
cd ai-image-generator
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the root directory:
```env
FAL_KEY=your_fal_ai_key_here
DEEPGRAM_API_KEY=your_deepgram_key_here
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. Enter a text prompt describing the image you want to generate, or click the microphone button to use voice input.
2. If using voice input, speak your prompt and click the button again to stop recording.
3. Click "Generate" to create your image.
4. Wait for the image to be generated (usually takes 10-15 seconds).
5. The generated image will appear below the input field.

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── fal/
│   │   │   └── proxy/
│   │   │       └── route.ts    # FAL.AI proxy route
│   │   │
│   │   └── components/
│   │       └── ImageGenerator.tsx  # Main component
│   │
│   ├── lib/
│   │   └── contexts/
│   │       └── DeepgramContext.tsx  # Deepgram context
│   │
│   ├── layout.tsx
│   └── page.tsx
│
├── .env.local.example
└── package.json
```

## Environment Variables

Create a `.env.local` file with the following variables:

```env
FAL_KEY=your_fal_ai_key_here
DEEPGRAM_API_KEY=your_deepgram_key_here
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [FAL.AI](https://fal.ai) for their amazing image generation API
- [Deepgram](https://deepgram.com) for their speech-to-text API
- [Next.js](https://nextjs.org) team for the awesome framework
- [Tailwind CSS](https://tailwindcss.com) for the styling utilities