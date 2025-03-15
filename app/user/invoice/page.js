"use client";

import RaadiLoading from "@/components/RaadiLoading";
import userAuth from "@/myStore/UserAuth";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaFileInvoiceDollar, FaMapMarkerAlt, FaCalendarAlt, FaIdCard, FaMoneyBillWave, FaCheckCircle, FaExclamationTriangle, FaFileAlt, FaDownload } from "react-icons/fa";

const AllInvoicesPage = () => {
  const [ownerPayments, setOwnerPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = userAuth((state) => state.user);

  useEffect(() => {
    const fetchOwnerPayments = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get("/api/bill");

        // Ensure response has data before filtering
        if (!response.data || !Array.isArray(response.data.data)) {
          throw new Error("Invalid API response format.");
        }

        // Filter invoices safely
        const filteredPayments = response.data.data.filter(
          (payment) =>
            payment.user && 
            payment.user._id === user?._id && 
            payment.status === "Paid"
        );

        setOwnerPayments(filteredPayments);
      } catch (error) {
        setError("Failed to fetch invoices. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (user && user._id) {
      fetchOwnerPayments();
    } else {
      setLoading(false);
    }
  }, [user]);

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

  return (
    <div className="min-h-screen bg-[#F7F7F9] pt-28 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Page Header */}
        <div className="bg-gradient-to-r from-[#4C8492] to-[#1A3B5D] rounded-xl p-6 mb-6 text-white shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">My Invoices</h1>
              <p className="mt-1 text-gray-100">View and download your payment records</p>
            </div>
            <div className="hidden md:flex items-center justify-center bg-white bg-opacity-20 rounded-full h-16 w-16">
              <FaFileInvoiceDollar className="text-3xl text-white" />
            </div>
          </div>
        </div>

        {loading ? (
          <div className="bg-white rounded-xl shadow-md p-12 flex justify-center">
            <RaadiLoading fullScreen={false} />
          </div>
        ) : error ? (
          <div className="bg-white rounded-xl shadow-md p-12 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <FaExclamationTriangle className="text-red-500 text-2xl" />
            </div>
            <h2 className="text-xl font-semibold text-gray-700">Error Loading Invoices</h2>
            <p className="text-gray-500 mt-2 max-w-md">{error}</p>
          </div>
        ) : ownerPayments.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <div className="flex flex-col items-center justify-center">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <FaFileInvoiceDollar className="text-gray-400 text-4xl" />
              </div>
              <h2 className="text-xl font-semibold text-gray-700">No Invoices Found</h2>
              <p className="text-gray-500 mt-2 max-w-md">
                You don't have any payment invoices at the moment.
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="bg-gray-50 px-6 py-4 border-b">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                  <FaFileAlt className="mr-2 text-[#4C8492]" />
                  Payment History
                </h2>
                <div className="text-sm text-gray-500">
                  Total Invoices: <span className="font-semibold text-[#1A3B5D]">{ownerPayments.length}</span>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 gap-6">
                {ownerPayments.map((invoice) => (
                  <div
                    key={invoice._id}
                    className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-300"
                  >
                    <div className="bg-gray-50 px-6 py-4 border-b flex justify-between items-center">
                      <div className="flex items-center">
                        <FaCheckCircle className="mr-3 text-green-500" />
                        <h3 className="font-semibold text-gray-800">
                          {invoice.property?.title || "Unknown Property"}
                        </h3>
                      </div>
                      <div className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                        Paid
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <div className="md:flex md:justify-between md:items-start">
                        <div className="space-y-3 mb-6 md:mb-0">
                          <div className="flex items-start">
                            <FaMapMarkerAlt className="mt-1 mr-3 text-gray-400" />
                            <div>
                              <p className="text-sm text-gray-500">Property Address</p>
                              <p className="font-medium text-gray-800">
                                {invoice.property?.address || "Address not available"}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-start">
                            <FaMoneyBillWave className="mt-1 mr-3 text-gray-400" />
                            <div>
                              <p className="text-sm text-gray-500">Amount Paid</p>
                              <p className="font-medium text-[#F47C48]">
                                ${invoice.amount}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-start">
                            <FaCalendarAlt className="mt-1 mr-3 text-gray-400" />
                            <div>
                              <p className="text-sm text-gray-500">Payment Date</p>
                              <p className="font-medium text-gray-800">
                                {formatDate(invoice.paymentDate || invoice.updatedAt)}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-start">
                            <FaIdCard className="mt-1 mr-3 text-gray-400" />
                            <div>
                              <p className="text-sm text-gray-500">Invoice Number</p>
                              <p className="font-medium text-gray-800 font-mono">
                                {invoice._id}
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex flex-col gap-3">
                          <Link
                            href={`/user/invoice/${invoice._id}`}
                            className="flex items-center justify-center px-6 py-3 bg-[#1A3B5D] text-white rounded-md hover:bg-[#16324A] transition-colors duration-200"
                          >
                            <FaFileAlt className="mr-2" />
                            View Invoice
                          </Link>
                        </div>
                      </div>
                      
                      {invoice.comment && (
                        <div className="mt-4 p-3 bg-gray-50 rounded-md border border-gray-100">
                          <p className="text-sm text-gray-500 font-medium mb-1">Payment Note:</p>
                          <p className="text-gray-700">{invoice.comment}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllInvoicesPage;
