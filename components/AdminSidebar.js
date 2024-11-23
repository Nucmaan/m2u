import Link from "next/link";
import {
  FaClipboardList,
  FaCog,
  FaFileContract,
  FaFileInvoice,
  FaMoneyBillAlt,
  FaUser,
  FaUserCog
} from "react-icons/fa";
import { BsHouseLockFill } from "react-icons/bs";

export default function AdminSidebar() {
  return (
    <div className="bg-white flex flex-col h-screen w-16 md:w-48 ">
      <div className="flex gap-2 items-center justify-center md:justify-start mt-4 mb-4 px-3 md:px-5">
        <Link href="/admin">
          <FaMoneyBillAlt className="text-xl md:text-2xl text-primary cursor-pointer hover:text-accent transition-all" />
        </Link>
        <Link
          href="/admin"
          className="hidden md:block font-medium text-base md:text-lg text-primary hover:text-accent transition-all"
        >
          Dashboard
        </Link>
      </div>

      <div className="flex gap-2 items-center justify-center md:justify-start mb-4 px-3 md:px-5">
        <Link href="/admin/profile">
          <FaUser className="text-xl md:text-2xl text-primary cursor-pointer hover:text-accent transition-all" />
        </Link>
        <Link
          href="/admin/profile"
          className="hidden md:block font-medium text-base md:text-lg text-primary hover:text-accent transition-all"
        >
          Profile
        </Link>
      </div>

      <div className="flex gap-2 items-center justify-center md:justify-start mb-4 px-3 md:px-5">
        <Link href="/admin/listings">
          <BsHouseLockFill className="text-xl md:text-2xl text-primary cursor-pointer hover:text-accent transition-all" />
        </Link>
        <Link
          href="/admin/listings"
          className="hidden md:block font-medium text-base md:text-lg text-primary hover:text-accent transition-all"
        >
          listings
        </Link>
      </div>

      <div className="flex gap-2 items-center justify-center md:justify-start mb-4 px-3 md:px-5">
        <Link href="/admin/users">
          <FaUserCog className="text-xl md:text-2xl text-primary cursor-pointer hover:text-accent transition-all" />
        </Link>
        <Link
          href="/admin/users"
          className="hidden md:block font-medium text-base md:text-lg text-primary hover:text-accent transition-all"
        >
          users
        </Link>
      </div>

      <div className="flex gap-2 items-center justify-center md:justify-start mb-4 px-3 md:px-5">
        <Link href="/agent/contract">
          <FaFileContract className="text-xl md:text-2xl text-primary cursor-pointer hover:text-accent transition-all" />
        </Link>
        <Link
          href="/agent/contract"
          className="hidden md:block font-medium text-base md:text-lg text-primary hover:text-accent transition-all"
        >
          Contract
        </Link>
      </div>

      <div className="flex gap-2 items-center justify-center md:justify-start mb-4 px-3 md:px-5">
        <Link href="/agent/bills">
          <FaMoneyBillAlt className="text-xl md:text-2xl text-primary cursor-pointer hover:text-accent transition-all" />
        </Link>
        <Link
          href="/agent/bills"
          className="hidden md:block font-medium text-base md:text-lg text-primary hover:text-accent transition-all"
        >
          Bills
        </Link>
      </div>

      <div className="flex gap-2 items-center justify-center md:justify-start mb-4 px-3 md:px-5">
        <Link href="/agent/invoice">
          <FaFileInvoice className="text-xl md:text-2xl text-primary cursor-pointer hover:text-accent transition-all" />
        </Link>
        <Link
          href="/agent/invoice"
          className="hidden md:block font-medium text-base md:text-lg text-primary hover:text-accent transition-all"
        >
          Invoice
        </Link>
      </div>

      <div className="flex gap-2 items-center justify-center md:justify-start mb-4 px-3 md:px-5">
        <Link href="/admin/setting">
          <FaCog className="text-xl md:text-2xl text-primary cursor-pointer hover:text-accent transition-all" />
        </Link>
        <Link
          href="/admin/setting"
          className="hidden md:block font-medium text-base md:text-lg text-primary hover:text-accent transition-all"
        >
          Setting
        </Link>
      </div>
    </div>
  );
}
