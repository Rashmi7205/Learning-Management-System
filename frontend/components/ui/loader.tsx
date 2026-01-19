import Image from "next/image";

export default function ClassicLoader() {
  return (
    <div className="relative flex h-12 w-12 items-center justify-center">
      {/* Spinning ring */}
      <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin" />
      <Image
        src="/images/logo-bright.png"
        alt="Loading..."
        width={24}
        height={24}
        className="w-6 h-6 object-contain"
        priority
      />
    </div>
  );
}
