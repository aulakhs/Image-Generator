import Link from "next/link";
import ImageGenerator from './components/ImageGenerator';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <ImageGenerator />
    </main>
  );
}
