import Image from "next/image";
export default function AuthCard({ children, title, subtitle }) {
  return (
    <div className="w-[80%] flex flex-row bg-white/95 backdrop-blur-md rounded-small shadow-xl border border-white/20 p-6">
      <div className="mb-4 w-[40%] flex flex-col items-center justify-center">
        <h1 className="text-2xl font-semibold text-slate-800">{title}</h1>
        {subtitle && <p className="text-sm text-slate-500 mt-1">{subtitle}</p>}
        <Image
          src="/logo1.png"
            alt="Logo"
            width={200}
            height={200}
            className="mx-auto mb-4 h-[80%] w-[100%]"
        />
      </div>
      <div className="w-[58%] m-[1%] items-center grid">{children}</div>
    </div>
  );
}