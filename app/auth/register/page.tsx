
import PasswordProtectedWrapper from '@/components/auth/password-protected-wrapper'
import RegisterForm from '@/components/auth/register-form'
import { REGISTER_PAGE_PASSWORD } from '@/lib/env'

const RegisterPage = () => (
  <PasswordProtectedWrapper pagePassword={REGISTER_PAGE_PASSWORD}>
    <RegisterForm />
  </PasswordProtectedWrapper>
)

export default RegisterPage
