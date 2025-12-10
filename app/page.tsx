import Header from "@/components/Header";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Header />

      <div className="w-full h-full bg-white flex items-center justify-center font-semibold ">
        Landing page
      </div>
    </div>
  );
}
