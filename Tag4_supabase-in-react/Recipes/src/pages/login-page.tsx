import { LoginForm } from "@/components/login-form";
import { SocialLoginForm } from "@/components/social-login-form";

function LoginPage() {
  return (
    <div>
      <LoginForm />
      <SocialLoginForm />
    </div>
  );
}

export default LoginPage;
