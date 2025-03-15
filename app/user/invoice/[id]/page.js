"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import html2pdf from "html2pdf.js";
import RaadiLoading from "@/components/RaadiLoading";
import { FaFileInvoiceDollar, FaMapMarkerAlt, FaCalendarAlt, FaMoneyBillWave, FaCheckCircle, FaUser, FaEnvelope, FaPhone, FaHome, FaArrowLeft, FaDownload, FaInfoCircle } from "react-icons/fa";

export default function InvoiceDetailPage() {
  const { id } = useParams();
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const invoiceRef = useRef();
  const router = useRouter();

  useEffect(() => {
    if (!id) return;
    const fetchInvoice = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/bill/${id}`);
        const data = response.data.data;
        setInvoice(data);
      } catch (error) {
        setError("Failed to load invoice details. Please try again.");
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
      filename: `invoice_${id}.pdf`,
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };
    html2pdf().set(options).from(element).save();
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Not Available";
    try {
      const date = new Date(dateString);
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return date.toLocaleDateString('en-US', options);
    } catch (error) {
      return "Invalid Date";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7F7F9] pt-28 pb-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-xl shadow-md p-12 flex justify-center">
            <RaadiLoading fullScreen={false} />
          </div>
        </div>
      </div>
    );
  }

  if (error || !invoice) {
    return (
      <div className="min-h-screen bg-[#F7F7F9] pt-28 pb-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-xl shadow-md p-12 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <FaInfoCircle className="text-red-500 text-2xl" />
            </div>
            <h2 className="text-xl font-semibold text-gray-700">Error Loading Invoice</h2>
            <p className="text-gray-500 mt-2 max-w-md">{error || "Invoice not found or has been deleted."}</p>
            <Link 
              href="/user/invoice" 
              className="mt-6 inline-flex items-center text-[#4C8492] hover:text-[#1A3B5D] transition-colors"
            >
              <FaArrowLeft className="mr-2" />
              Back to Invoices
            </Link>
          </div>
        </div>
      </div>
    );
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
    updatedAt,
    createdAt,
    _id
  } = invoice;

  return (
    <div className="min-h-screen bg-[#F7F7F9] pt-28 pb-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Back Button */}
        <Link 
          href="/user/invoice" 
          className="inline-flex items-center text-gray-600 hover:text-[#4C8492] mb-4 transition-colors"
        >
          <FaArrowLeft className="mr-2" />
          Back to Invoices
        </Link>

        {/* Page Header */}
        <div className="bg-gradient-to-r from-[#4C8492] to-[#1A3B5D] rounded-xl p-6 mb-6 text-white shadow-md">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">Invoice</h1>
              <p className="mt-1 text-gray-100">
                {property?.title || "Property Invoice"}
              </p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-xl px-5 py-3 text-center">
              <p className="text-sm text-white">Receipt #</p>
              <p className="text-sm font-mono text-white truncate max-w-[120px]">{_id}</p>
            </div>
          </div>
        </div>

        {/* Invoice Content */}
        <div
          ref={invoiceRef}
          className="bg-white rounded-xl shadow-md overflow-hidden"
        >
          {/* Invoice Header - For PDF */}
          <div className="p-6 bg-[#F7F7F9] hidden print:block">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-[#1A3B5D]">INVOICE</h1>
                <p className="text-gray-600">
                  {property?.title || "Property Invoice"}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Receipt #</p>
                <p className="text-sm font-mono text-gray-800">{_id}</p>
              </div>
            </div>
          </div>

          {/* Payment Status Banner */}
          <div className="bg-green-50 px-6 py-3 border-b border-green-100 flex items-center justify-between">
            <div className="flex items-center">
              <FaCheckCircle className="text-green-500 mr-2" />
              <span className="font-medium text-green-800">Payment Completed</span>
            </div>
            <span className="text-sm text-green-700">
              <FaCalendarAlt className="inline mr-1" /> {formatDate(paymentDate || updatedAt)}
            </span>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Property Information */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-[#1A3B5D] flex items-center">
                  <FaHome className="mr-2 text-[#4C8492]" />
                  Property
                </h2>
                <div className="space-y-2 text-gray-700">
                  <p className="flex items-start">
                    <span className="w-28 text-gray-500 flex items-center">
                      <FaHome className="mr-1" /> Title:
                    </span>
                    <span className="font-medium">{property?.title}</span>
                  </p>
                  <p className="flex items-start">
                    <span className="w-28 text-gray-500 flex items-center">
                      <FaMapMarkerAlt className="mr-1" /> Address:
                    </span>
                    <span className="font-medium">{property?.address}, {property?.city}</span>
                  </p>
                  <p className="flex items-start">
                    <span className="w-28 text-gray-500 flex items-center">
                      <FaMoneyBillWave className="mr-1" /> Price:
                    </span>
                    <span className="font-medium">${property?.price}</span>
                  </p>
                  <p className="flex items-start">
                    <span className="w-28 text-gray-500 flex items-center">
                      <FaInfoCircle className="mr-1" /> Status:
                    </span>
                    <span className={`font-medium ${
                      property?.status === "Sold" ? "text-red-600" : "text-green-600"
                    }`}>
                      {property?.status}
                    </span>
                  </p>
                </div>
              </div>

              {/* Payment Details */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-[#1A3B5D] flex items-center">
                  <FaMoneyBillWave className="mr-2 text-[#4C8492]" />
                  Payment Details
                </h2>
                <div className="space-y-2 text-gray-700">
                  <p className="flex items-start">
                    <span className="w-28 text-gray-500 flex items-center">
                      <FaMoneyBillWave className="mr-1" /> Amount:
                    </span>
                    <span className="font-medium text-[#F47C48]">${amount}</span>
                  </p>
                  <p className="flex items-start">
                    <span className="w-28 text-gray-500 flex items-center">
                      <FaCalendarAlt className="mr-1" /> Due Date:
                    </span>
                    <span className="font-medium text-red-600">{formatDate(dueDate)}</span>
                  </p>
                  <p className="flex items-start">
                    <span className="w-28 text-gray-500 flex items-center">
                      <FaCalendarAlt className="mr-1" /> Paid Date:
                    </span>
                    <span className="font-medium text-green-600">{formatDate(paymentDate || updatedAt)}</span>
                  </p>
                  <p className="flex items-start">
                    <span className="w-28 text-gray-500 flex items-center">
                      <FaInfoCircle className="mr-1" /> Status:
                    </span>
                    <span className="font-medium bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                      {status}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* User & Owner Information */}
            <div className="border-t border-gray-100 pt-6 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* User Information */}
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold text-[#1A3B5D] flex items-center">
                    <FaUser className="mr-2 text-[#4C8492]" />
                    Tenant Information
                  </h2>
                  <div className="space-y-2 text-gray-700">
                    <p className="flex items-start">
                      <span className="w-28 text-gray-500 flex items-center">
                        <FaUser className="mr-1" /> Name:
                      </span>
                      <span className="font-medium">{user?.username}</span>
                    </p>
                    <p className="flex items-start">
                      <span className="w-28 text-gray-500 flex items-center">
                        <FaEnvelope className="mr-1" /> Email:
                      </span>
                      <span className="font-medium">{user?.email}</span>
                    </p>
                    {user?.mobile && (
                      <p className="flex items-start">
                        <span className="w-28 text-gray-500 flex items-center">
                          <FaPhone className="mr-1" /> Phone:
                        </span>
                        <span className="font-medium">{user?.mobile}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Owner Information */}
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold text-[#1A3B5D] flex items-center">
                    <FaUser className="mr-2 text-[#4C8492]" />
                    Owner Information
                  </h2>
                  <div className="space-y-2 text-gray-700">
                    <p className="flex items-start">
                      <span className="w-28 text-gray-500 flex items-center">
                        <FaUser className="mr-1" /> Name:
                      </span>
                      <span className="font-medium">{owner?.username}</span>
                    </p>
                    <p className="flex items-start">
                      <span className="w-28 text-gray-500 flex items-center">
                        <FaEnvelope className="mr-1" /> Email:
                      </span>
                      <span className="font-medium">{owner?.email}</span>
                    </p>
                    {owner?.mobile && (
                      <p className="flex items-start">
                        <span className="w-28 text-gray-500 flex items-center">
                          <FaPhone className="mr-1" /> Phone:
                        </span>
                        <span className="font-medium">{owner?.mobile}</span>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Comment Section */}
            {comment && (
              <div className="border-t border-gray-100 pt-6 mt-6">
                <h2 className="text-lg font-semibold text-[#1A3B5D] mb-4 flex items-center">
                  <FaInfoCircle className="mr-2 text-[#4C8492]" />
                  Payment Notes
                </h2>
                <div className="bg-gray-50 p-4 rounded-lg text-gray-700">
                  {comment}
                </div>
              </div>
            )}

            {/* Footer */}
            <div className="border-t border-gray-100 pt-6 mt-6 text-center text-gray-500 text-sm">
              <p>This is an official receipt for your payment.</p>
              <p className="mt-1">Generated on {formatDate(new Date())}</p>
              <div className="mt-4 text-xs text-gray-400">
                Invoice ID: {_id}
              </div>
            </div>
          </div>
        </div>

        {/* Download Button */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={handleDownload}
            className="px-6 py-3 bg-[#1A3B5D] text-white rounded-lg hover:bg-[#16324A] focus:outline-none focus:ring-2 focus:ring-[#1A3B5D] transition duration-200 flex items-center"
          >
            <FaDownload className="mr-2" />
            Download as PDF
          </button>
        </div>
      </div>
    </div>
  );
}