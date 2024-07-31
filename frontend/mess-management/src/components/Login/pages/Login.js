import Header from "../components/Header";
import Login from "../components/Login";

export default function LoginPage() {
  return (
    <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-neutral-900">
      <div className="border border-neutral-400 max-w-xl sm:max-h-[38rem] sm:h-full w-full  flex justify-center items-center rounded-lg bg-neutral-100">
        <div className="max-w-md w-full space-y-8 ">
          <Header
            heading="Login"
            paragraph="Don't have an account yet? "
            linkName="Signup"
            linkUrl="/signup"
          />
          <Login />
        </div>
      </div>
    </div>
  );
}
