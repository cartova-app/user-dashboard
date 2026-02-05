import { Archive } from "lucide-react";
import { House } from "lucide-react";
import { ShoppingCart } from "lucide-react";
import SuccessImage from "@/assets/images/complete-profile-success.png";
const SuccessStep = () => {
  const succesMessage = [
    {
      icon: <ShoppingCart className="text-secondary" />,
      text: "Add your first products",
    },
    {
      icon: <Archive className="text-secondary" />,
      text: "Set up payment & shipping",
    },
    {
      icon: <House className="text-secondary" />,
      text: "Customize your store design",
    },
  ];
  return (
    <div className="w-full py-6">
      <div className="mb-8 space-y-1.5">
        <h1 className="text-[32px] font-bold leading-[38px] font-family-satoshi">
          Congratulations! Your Store is Ready
        </h1>
        <p className="text-[16px] leading-6 text-gray-600 font-family-satoshi">
          You’ve completed onboarding journey, Head over to the dashboard to
          finish setting up your Store.
        </p>
      </div>
      <div className="flex items-center gap-1 justify-start">
        {succesMessage.map((item, index) => (
          <div key={index} className="flex items-center gap-1">
            {item.icon}
            <p className="text-[16px] leading-6 font-bold text-gray-600 font-family-satoshi">
              {item.text}
            </p>
          </div>
        ))}
      </div>
      <div className="grid place-items-center mt-8">
        <img src={SuccessImage} alt="" className="w-90 h-60 object-contain" />
      </div>
    </div>
  );
};

export default SuccessStep;
