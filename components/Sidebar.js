import Link from "next/link";
import {
  FaClipboardList,
  FaCog,
  FaFileContract,
  FaFileInvoice,
  FaMoneyBillAlt,
  FaUser,
} from "react-icons/fa";

export default function Sidebar() {
  return (
    <div className="bg-white flex flex-col h-screen w-16 md:w-48 ">
      <div className="flex gap-2 items-center justify-center md:justify-start mt-4 mb-4 px-3 md:px-5">
        <Link href="/user">
          <FaMoneyBillAlt className="text-xl md:text-2xl text-primary cursor-pointer hover:text-accent transition-all" />
        </Link>
        <Link
          href="/user"
          className="hidden md:block font-medium text-base md:text-lg text-primary hover:text-accent transition-all"
        >
          Dashboard
        </Link>
      </div>

      <div className="flex gap-2 items-center justify-center md:justify-start mb-4 px-3 md:px-5">
        <Link href="/user/profile">
          <FaUser className="text-xl md:text-2xl text-primary cursor-pointer hover:text-accent transition-all" />
        </Link>
        <Link
          href="/user/profile"
          className="hidden md:block font-medium text-base md:text-lg text-primary hover:text-accent transition-all"
        >
          Profile
        </Link>
      </div>

      <div className="flex gap-2 items-center justify-center md:justify-start mb-4 px-3 md:px-5">
        <Link href="/user/booking">
          <FaClipboardList className="text-xl md:text-2xl text-primary cursor-pointer hover:text-accent transition-all" />
        </Link>
        <Link
          href="/user/booking"
          className="hidden md:block font-medium text-base md:text-lg text-primary hover:text-accent transition-all"
        >
          Booking
        </Link>
      </div>

      <div className="flex gap-2 items-center justify-center md:justify-start mb-4 px-3 md:px-5">
        <Link href="/user/contract">
          <FaFileContract className="text-xl md:text-2xl text-primary cursor-pointer hover:text-accent transition-all" />
        </Link>
        <Link
          href="/user/contract"
          className="hidden md:block font-medium text-base md:text-lg text-primary hover:text-accent transition-all"
        >
          Contract
        </Link>
      </div>

      <div className="flex gap-2 items-center justify-center md:justify-start mb-4 px-3 md:px-5">
        <Link href="/user/bills">
          <FaMoneyBillAlt className="text-xl md:text-2xl text-primary cursor-pointer hover:text-accent transition-all" />
        </Link>
        <Link
          href="/user/bills"
          className="hidden md:block font-medium text-base md:text-lg text-primary hover:text-accent transition-all"
        >
          Bills
        </Link>
      </div>

      <div className="flex gap-2 items-center justify-center md:justify-start mb-4 px-3 md:px-5">
        <Link href="/user/invoice">
          <FaFileInvoice className="text-xl md:text-2xl text-primary cursor-pointer hover:text-accent transition-all" />
        </Link>
        <Link
          href="/user/invoice"
          className="hidden md:block font-medium text-base md:text-lg text-primary hover:text-accent transition-all"
        >
          Invoice
        </Link>
      </div>

      <div className="flex gap-2 items-center justify-center md:justify-start mb-4 px-3 md:px-5">
        <Link href="/user/setting">
          <FaCog className="text-xl md:text-2xl text-primary cursor-pointer hover:text-accent transition-all" />
        </Link>
        <Link
          href="/user/setting"
          className="hidden md:block font-medium text-base md:text-lg text-primary hover:text-accent transition-all"
        >
          Setting
        </Link>
      </div>
    </div>
  );
}
