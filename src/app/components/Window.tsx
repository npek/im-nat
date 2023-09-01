type WindowProps = {
  children: React.ReactNode;
};

const Window = ({ children }: WindowProps) => {
  return (
    <main className="flex min-h-screen min-w-screen max-h-screen max-w-screen overflow-y-scroll flex-col space-y-12 font-mono text-nat-pink border-2 border-nat-pink bg-dark">
      <div className="flex flex-col p-1 fixed border-nat-pink border-b-2 w-full">
        <div className="flex flex-row bg-dark items-center pl-4 space-x-2 h-12">
          <div className="rounded-full border-nat-pink border-2 w-5 h-5" />
          <div className="rounded-full border-nat-pink border-2 w-5 h-5" />
          <div className="rounded-full border-nat-pink border-2 w-5 h-5" />
        </div>
      </div>
      <div className="flex flex-col sm:p-24 p-8 sm:pt-24 pt-16">{children}</div>
    </main>
  );
};

export default Window;
