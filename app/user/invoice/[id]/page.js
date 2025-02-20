"use client";

import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import html2pdf from "html2pdf.js";
import RaadiLoading from "@/components/RaadiLoading";

export default function Page() {
  const { id } = useParams();
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);
  const invoiceRef = useRef();

  useEffect(() => {
    if (!id) return;
    const fetchInvoice = async () => {
      try {
        const response = await axios.get(`/api/bill/${id}`);
        const data = response.data.data;
        setInvoice(data);
      } catch (error) {
        console.error("Error fetching payment details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchInvoice();
  }, [id]);

  const handleDownload = () => {
    const element = invoiceRef.current;
    const options = {
      margin: 1,
      filename: `invoice_Details_${id}.pdf`,
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };
    html2pdf().set(options).from(element).save();
  };

  if (loading) {
    return <RaadiLoading />;
  }

  const {
    user,
    owner,
    property,
    amount,
    dueDate,
    status,
    comment,
    paymentDate,
  } = invoice;

  return (
    <div className="min-h-screen bg-[#F7F7F9] p-6 md:p-12">
      <h1 className="text-3xl font-extrabold text-[#1A3B5D] mb-8">Invoice Details</h1>

      {/* Invoice Content */}
      <div
        ref={invoiceRef}
        className="bg-white rounded-lg shadow-md border border-[#E0E0E0] p-6 md:p-8"
      >
        {/* Owner Information */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-[#1A3B5D] mb-4">Owner Information</h2>
          <div className="text-[#7A7A7A] space-y-2">
            <p>
              <span className="font-bold">Name:</span> {owner.username}
            </p>
            <p>
              <span className="font-bold">Email:</span> {owner.email}
            </p>
          </div>
        </section>

        {/* User Information */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-[#1A3B5D] mb-4">User Information</h2>
          <div className="text-[#7A7A7A] space-y-2">
            <p>
              <span className="font-bold">Name:</span> {user.username}
            </p>
            <p>
              <span className="font-bold">Email:</span> {user.email}
            </p>
          </div>
        </section>

        {/* Property Information */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-[#1A3B5D] mb-4">Property Information</h2>
          <div className="text-[#7A7A7A] space-y-2">
            <p>
              <span className="font-bold">Title:</span> {property.title}
            </p>
            <p>
              <span className="font-bold">Address:</span> {property.address}, {property.city}
            </p>
            <p>
              <span className="font-bold">Price:</span> ${property.price}
            </p>
            <p>
              <span className="font-bold">Status:</span>{" "}
              <span
                className={`font-bold ${
                  property.status === "Sold" ? "text-[#E74C3C]" : "text-[#27AE60]"
                }`}
              >
                {property.status}
              </span>
            </p>
          </div>
        </section>

        {/* Payment Details */}
        <section>
          <h2 className="text-xl font-semibold text-[#1A3B5D] mb-4">Payment Details</h2>
          <div className="text-[#7A7A7A] space-y-2">
            <p>
              <span className="font-bold">Amount:</span>{" "}
              <span className="text-[#F47C48] font-bold">${amount}</span>
            </p>
            <p>
              <span className="font-bold">Due Date:</span>{" "}
              <span className="text-[#E74C3C] font-bold">
                {new Date(dueDate).toLocaleDateString()}
              </span>
            </p>
            <p>
              <span className="font-bold">Payment Date:</span>{" "}
              <span className="text-[#27AE60] font-bold">
                {new Date(paymentDate).toLocaleDateString()}
              </span>
            </p>
            <p>
              <span className="font-bold">Status:</span>{" "}
              <span
                className={`font-bold ${
                  status === "Overdue" ? "text-[#E74C3C]" : "text-[#27AE60]"
                }`}
              >
                {status}
              </span>
            </p>
            <p>
              <span className="font-bold">Comment:</span> {comment}
            </p>
          </div>
        </section>
      </div>

      {/* Auto-Generated Message */}
      <div className="text-[#7A7A7A] mt-8 text-sm text-center">
        This is an auto-generated invoice. No signature is required.
      </div>

      {/* Download Button */}
      <div className="mt-8 text-center">
        <button
          onClick={handleDownload}
          className="px-6 py-3 bg-[#1A3B5D] text-white rounded-lg hover:bg-[#16324A] focus:outline-none focus:ring-2 focus:ring-[#1A3B5D] transition duration-200"
        >
          Download Invoice
        </button>
      </div>
    </div>
  );
}