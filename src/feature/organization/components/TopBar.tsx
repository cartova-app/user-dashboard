import Logo from "@/assets/icons/logo.svg";

const TopBar = () => {
  return (
    <nav className="py-4 px-6 bg-white border-b ">
      <div className="container mx-auto px-4">
        <img src={Logo} alt="Logo" className="object-contain" />
      </div>
    </nav>
  );
};

export default TopBar;
