import OtpBannar from '@/assets/images/otp-bannar.png';
import SignUpBannar from '@/assets/images/sign-up-bannar.png';
import { Tabs, TabsContent } from '@/core/components/ui/tabs';
import LoginForm from '../components/LoginForm';
import OtpForm from '../components/OtpForm';
import { type TabType, useSignUpStore } from '../stores/useSignUpStore';

const Login = () => {
  const { currentTab, setCurrentTab } = useSignUpStore();

  const slides = [
    {
      id: 1,
      image: SignUpBannar,
      title: 'Build Your Dream Store, Manage Everything, Grow Globally',
    },
    {
      id: 2,
      image: OtpBannar,
      title: 'Your security is our priority',
    },
  ];

  // Get the current slide based on the active tab
  const currentSlide = currentTab === 'otp' ? slides[1] : slides[0];

  const handleTabChange = (value: string) => {
    setCurrentTab(value as TabType);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="flex flex-col md:flex-row items-center gap-8 w-full max-w-6xl">
        <div className="w-full md:w-1/2">
          <Tabs value={currentTab} onValueChange={handleTabChange}>
            <TabsContent value="signup" className="mt-0">
              <LoginForm />
            </TabsContent>
            <TabsContent value="otp" className="mt-0">
              <OtpForm />
            </TabsContent>
          </Tabs>
        </div>

        <div className="hidden md:block w-full md:w-1/2">
          <div className="w-full">
            <img
              src={currentSlide.image}
              alt={currentSlide.title}
              className="rounded-lg w-[500px] h-auto transition-opacity duration-300"
            />
            <h2 className="text-2xl font-bold mt-4 text-center">{currentSlide.title}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
