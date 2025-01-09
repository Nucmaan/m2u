"use client";

import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import html2pdf from "html2pdf.js";

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
    return <div className="text-center text-lg text-gray-600">Loading Invoice details...</div>;
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
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-blue-900 mb-8">Invoice Details</h1>

      {/* Invoice Content */}
      <div ref={invoiceRef} className="bg-white border border-gray-300 p-6 rounded-lg shadow-md">
        {/* User Details */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-blue-800 mb-2">Owner Information</h2>
          <div className="text-gray-700 space-y-1">
            <p>
              <span className="font-bold">Name:</span> {owner.username}
            </p>
            <p>
              <span className="font-bold">Email:</span> {owner.email}
            </p>
          </div>
        </section>

         {/* User Details */}
         <section className="mb-8">
         <h2 className="text-lg font-semibold text-blue-800 mb-2">User Information</h2>
         <div className="text-gray-700 space-y-1">
           <p>
             <span className="font-bold">Name:</span> {user.username}
           </p>
           <p>
             <span className="font-bold">Email:</span> {user.email}
           </p>
         </div>
       </section>

        {/* Property Details */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-blue-800 mb-2">Property Information</h2>
          <div className="text-gray-700 space-y-1">
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
                  property.status === "Sold" ? "text-red-500" : "text-green-600"
                }`}
              >
                {property.status}
              </span>
            </p>
          </div>
        </section>

        {/* Payment Details */}
        <section>
          <h2 className="text-lg font-semibold text-blue-800 mb-2">Payment Details</h2>
          <div className="text-gray-700 space-y-1">
            <p>
              <span className="font-bold">Amount:</span>{" "}
              <span className="text-orange-600 font-bold">${amount}</span>
            </p>
            <p>
              <span className="font-bold">Due Date:</span>{" "}
              <span className="text-red-600 font-bold">
                {new Date(dueDate).toLocaleDateString()}
              </span>
            </p>
            <p>
              <span className="font-bold">Payment Date:</span>{" "}
              <span className="text-green-600 font-bold">
                {new Date(paymentDate).toLocaleDateString()}
              </span>
            </p>
            <p>
              <span className="font-bold">Status:</span>{" "}
              <span
                className={`font-bold ${
                  status === "Overdue" ? "text-red-600" : "text-green-600"
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
      <div className="text-gray-500 mt-8 text-sm text-center">
        This is an auto-generated invoice. No signature is required.
      </div>

      {/* Download Button */}
      <div className="mt-4 text-center">
        <button
          onClick={handleDownload}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none"
        >
          Download Invoice
        </button>
      </div>
    </div>
  );
}
