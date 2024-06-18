import LoginForm from '@/components/auth/login-form';
import CenteredLayout from '@/components/layouts/centered';

const LoginPage = () => {
  return (
    <CenteredLayout className='items-center'>
        <LoginForm />
    </CenteredLayout>
  );
};

export default LoginPage;
