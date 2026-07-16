
import LoginHeader from "@/modules/auth/login/components/LoginHeader";
import LoginForm from "@/modules/auth/login/components/LoginForm";
import LoginFooter from "@/modules/auth/login/components/LoginFooter";

export default function LoginPage() {
  return (
    <div className="flex flex-col justify-center gap-10 min-h-screen bg-[#F7F5FC]">
      <LoginHeader />
      <LoginForm />
      <LoginFooter />
    </div>
  );
}