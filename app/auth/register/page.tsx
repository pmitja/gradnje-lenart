import RegisterForm from '@/components/auth/register-form';

const RegisterPage = () => {
  return (
    <main className="flex h-full flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800">
      <div className="space-y-6">
        <RegisterForm />
      </div>
    </main>
  );
};

export default RegisterPage;
