import LoginForm from '@/components/auth/login-form';

const LoginPage = () => {
  return (
    <main className="flex h-full flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800">
      <div className="space-y-6">
        <LoginForm />
      </div>
    </main>
  );
};

export default LoginPage;
