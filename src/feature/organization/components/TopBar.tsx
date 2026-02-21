import Logo from '@/assets/icons/logo.svg';

const TopBar = () => {
  return (
    <nav className="py-4 px-6 bg-background border-b border-border">
      <div className="container mx-auto px-4">
        <img src={Logo} alt="Logo" className="object-contain dark:brightness-0 dark:invert" />
      </div>
    </nav>
  );
};

export default TopBar;
