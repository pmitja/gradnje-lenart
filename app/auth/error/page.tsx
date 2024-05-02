import { ErrorCard } from '@/components/auth/error-card';

const AuthErrorPage = () => {
  return (
    <main className="flex h-full flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800">
      <div className="space-y-6">
        <ErrorCard />
      </div>
    </main>
  );
};

export default AuthErrorPage;
