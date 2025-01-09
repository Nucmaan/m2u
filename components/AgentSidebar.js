import Link from "next/link";
import {
  FaClipboardList,
  FaCog,
  FaFileContract,
  FaFileInvoice,
  FaMoneyBillAlt,
  FaUser,
} from "react-icons/fa";
import { BsHouseLockFill } from "react-icons/bs";
import { RiSecurePaymentFill } from "react-icons/ri";


export default function AdminSidebar() {
  return (
    <div className="bg-white flex flex-col h-screen w-16 md:w-48 ">
      <div className="flex gap-2 items-center justify-center md:justify-start mt-4 mb-4 px-3 md:px-5">
        <Link href="/agent">
          <FaMoneyBillAlt className="text-xl md:text-2xl text-primary cursor-pointer hover:text-accent transition-all" />
        </Link>
        <Link
          href="/agent"
          className="hidden md:block font-medium text-base md:text-lg text-primary hover:text-accent transition-all"
        >
          Dashboard
        </Link>
      </div>

      <div className="flex gap-2 items-center justify-center md:justify-start mb-4 px-3 md:px-5">
        <Link href="/agent/profile">
          <FaUser className="text-xl md:text-2xl text-primary cursor-pointer hover:text-accent transition-all" />
        </Link>
        <Link
          href="/agent/profile"
          className="hidden md:block font-medium text-base md:text-lg text-primary hover:text-accent transition-all"
        >
          Profile
        </Link>
      </div>

      <div className="flex gap-2 items-center justify-center md:justify-start mb-4 px-3 md:px-5">
        <Link href="/agent/listings">
          <BsHouseLockFill className="text-xl md:text-2xl text-primary cursor-pointer hover:text-accent transition-all" />
        </Link>
        <Link
          href="/agent/listings"
          className="hidden md:block font-medium text-base md:text-lg text-primary hover:text-accent transition-all"
        >
          listings
        </Link>
      </div>

      <div className="flex gap-2 items-center justify-center md:justify-start mb-4 px-3 md:px-5">
        <Link href="/agent/booking">
          <FaClipboardList className="text-xl md:text-2xl text-primary cursor-pointer hover:text-accent transition-all" />
        </Link>
        <Link
          href="/agent/booking"
          className="hidden md:block font-medium text-base md:text-lg text-primary hover:text-accent transition-all"
        >
          Booking
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
      <Link href="/agent/payments">
        <RiSecurePaymentFill className="text-xl md:text-2xl text-primary cursor-pointer hover:text-accent transition-all" />
      </Link>
      <Link
        href="/agent/payments"
        className="hidden md:block font-medium text-base md:text-lg text-primary hover:text-accent transition-all"
      >
        Payments
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
        <Link href="/agent/setting">
          <FaCog className="text-xl md:text-2xl text-primary cursor-pointer hover:text-accent transition-all" />
        </Link>
        <Link
          href="/agent/setting"
          className="hidden md:block font-medium text-base md:text-lg text-primary hover:text-accent transition-all"
        >
          Setting
        </Link>
      </div>
    </div>
  );
}
