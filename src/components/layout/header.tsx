export default function Header() {
  return (
    <header className="fixed right-0 top-0 z-50 w-full border-b border-b-slate-200 bg-background py-5 lg:w-[calc(100%_-_16.666667%)]">
      <div className="container">
        <div className="relative flex flex-row justify-between gap-5">
          <span className="font-bold">ROBOT MUTASI</span>
          <div className="flex-1 text-end">
            <span>Hay</span>
          </div>
        </div>
      </div>
    </header>
  );
}
