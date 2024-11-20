"use client";

import React, { useState } from "react";

function BillsPage() {
  // Sample data for contracts
  const initialContracts = [
    {
      id: 1,
      property: "Luxury Apartment",
      status: "Rent",
      monthlyRent: 1200,
      deposit: 2400,
      contractEndDate: "2025-01-01",
      isPaid: false,
    },
    {
      id: 2,
      property: "Cozy Villa",
      status: "Buy",
      price: 400000,
      isPaid: false,
    },
  ];

  const [contracts, setContracts] = useState(initialContracts);
  const [payments, setPayments] = useState([]);

  const handlePay = (contractId) => {
    const updatedContracts = contracts.map((contract) => {
      if (contract.id === contractId) {
        if (contract.status === "Buy") {
          alert(`Paid $${contract.price} for buying ${contract.property}.`);
        } else if (contract.status === "Rent") {
          const paymentDate = new Date();
          const newPayment = {
            contractId,
            property: contract.property,
            amount: contract.monthlyRent,
            date: paymentDate.toDateString(),
          };

          setPayments([...payments, newPayment]);
          alert(
            `Paid $${contract.monthlyRent} for ${contract.property} on ${paymentDate.toDateString()}.`
          );
        }
        return { ...contract, isPaid: true };
      }
      return contract;
    });

    setContracts(updatedContracts);
  };

  return (
    <div className="p-4 md:p-8 bg-[#F7F7F9] min-h-screen">
      <h1 className="text-2xl font-bold text-[#1A3B5D] mb-6">All Bills</h1>

      {/* Contracts List */}
      <div className="space-y-6">
        {contracts.map((contract) => (
          <div
            key={contract.id}
            className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center"
          >
            <div>
              <h3 className="text-lg font-medium text-gray-800">
                {contract.property}
              </h3>
              <p className="text-sm text-gray-500">
                {contract.status === "Buy"
                  ? `Price: $${contract.price}`
                  : `Monthly Rent: $${contract.monthlyRent}`}
              </p>
              {contract.status === "Rent" && (
                <p className="text-sm text-gray-500">
                  Contract Expires:{" "}
                  {new Date(contract.contractEndDate).toDateString()}
                </p>
              )}
            </div>
            <button
              onClick={() => handlePay(contract.id)}
              disabled={contract.isPaid}
              className={`px-4 py-2 rounded-md transition ${
                contract.isPaid
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              {contract.isPaid ? "Paid" : contract.status === "Buy" ? "Pay One-Time" : "Pay Monthly Rent"}
            </button>
          </div>
        ))}
      </div>

      {/* Payment History */}
      {payments.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Payment History
          </h2>
          <div className="space-y-4">
            {payments.map((payment, index) => (
              <div
                key={index}
                className="bg-gray-100 rounded-lg p-4 shadow-md flex justify-between items-center"
              >
                <div>
                  <h3 className="text-gray-800 font-medium">
                    {payment.property}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Amount Paid: ${payment.amount}
                  </p>
                  <p className="text-sm text-gray-600">Date: {payment.date}</p>
                </div>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold">
                  Success
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default BillsPage;
