import WithLayout from "@/components/with-layout";

type AuthLayoutProps = {
  children: React.ReactNode;
};

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <WithLayout layout="centered">
      {children}
    </WithLayout>
  );
};

export default AuthLayout;
