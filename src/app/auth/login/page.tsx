import LoginHeader from "@/modules/auth/login/components/LoginHeader";
import LoginForm from "@/modules/auth/login/components/LoginForm";
import LoginFooter from "@/modules/auth/login/components/LoginFooter";
import { RegisterBackButton } from "@/shared/components/RegisterBackButton";

export default function LoginPage() {
  return (
    <div className="flex flex-col h-full w-full">
      <div className="mb-auto pb-4">
        <RegisterBackButton />
      </div>
      <div className="flex flex-col gap-10 justify-center">
        <LoginHeader />
        <LoginForm />
        <LoginFooter />
      </div>
      <div className="mt-auto"></div>
    </div>
  );
}