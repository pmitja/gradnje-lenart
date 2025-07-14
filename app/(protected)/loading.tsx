import Spinner from "@/components/common/spinner";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center min-h-screen bg-white/80 backdrop-blur-sm">
      <Spinner />
      <span className="mt-6 text-lg text-primary-700 font-medium">Nalagam stran ...</span>
    </div>
  );
} 