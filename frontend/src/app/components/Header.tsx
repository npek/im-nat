type HeaderProps = {
  children: React.ReactNode;
};

const Header = ({ children }: HeaderProps) => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-dark font-mono text-nat-pink">
      <div className="flex flex-col absolute bg-dark w-screen">
        <div className="flex flex-row items-center px-4 space-x-2 h-12 border-nat-pink border-2">
          <div className="rounded-full border-nat-pink border-2 w-5 h-5" />
          <div className="rounded-full border-nat-pink border-2 w-5 h-5" />
          <div className="rounded-full border-nat-pink border-2 w-5 h-5" />
        </div>
      </div>
      {children}
    </main>
  );
};

export default Header;
