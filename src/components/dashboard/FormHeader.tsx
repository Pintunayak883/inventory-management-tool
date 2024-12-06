import { X } from "lucide-react";
import Link from "next/link";

const FormHeader = ({ title, href }: { title: string; href: any }) => {
  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between bg-white py-3 px-8">
        <h2 className="text-xl font-semibold">{title}</h2>
        <Link href={href}>
          <X />
        </Link>
      </div>
    </>
  );
};

export default FormHeader;
