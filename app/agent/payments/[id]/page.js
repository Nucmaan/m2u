"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function Page() {
  const { id } = useParams();
  const [payment, setPayment] = useState(null);
  const [loading, setLoading] = useState(true);

  const [amount, setAmount] = useState("");
  //const [dueDate, setDueDate] = useState(null);
  //const [paymentDate, setPaymentDate] = useState("");
  const [status, setStatus] = useState("Pending");
  const [comment, setComment] = useState("");

  const [dueDate, setDueDate] = useState("");
  const [paymentDate, setPaymentDate] = useState("");

  const router = useRouter();

  useEffect(() => {
    if (!id) return;
    const fetchPayment = async () => {
      try {
        const response = await axios.get(`/api/bill/${id}`);
        const data = response.data.data;
        setPayment(data);

        // Populate the state with fetched data
        setAmount(data.amount || "");
        setDueDate(data.dueDate || "");
        setPaymentDate(data.paymentDate || "");
        setStatus(data.status || "Pending");
        setComment(data.comment || "");
      } catch (error) {
        console.error("Error fetching payment details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPayment();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const payload = {
      amount,
      status,
      paymentDate,
      comment,
    };
  
    try {
      const response = await axios.put(`/api/bill/${id}`, payload);
  
      if (response.status === 200) {
        toast.success("Payment updated successfully.");
        router.push("/agent/payments");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };
  

  if (loading) {
    return <div>Loading payment details...</div>;
  }

  return (
    <div className="min-h-screen bg-[#F7F7F9] p-6">
      <h1 className="text-3xl font-bold text-[#1A3B5D] mb-6">Edit Payment</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white border border-[#E0E0E0] p-6 rounded-lg shadow-md"
      >
        <div className="mb-4">
          <label
            className="block text-[#333333] font-medium mb-2"
            htmlFor="amount"
          >
            Amount
          </label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-4 py-2 border border-[#E0E0E0] rounded-md"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-[#333333] font-medium mb-2"
            htmlFor="dueDate"
          >
            Due Date
          </label>
          <input
            type="date"
            id="dueDate"
            value={dueDate ? dueDate.split("T")[0] : ""}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full px-4 py-2 border border-[#E0E0E0] rounded-md"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-[#333333] font-medium mb-2"
            htmlFor="paymentDate"
          >
            Payment Date
          </label>
          <input
            type="date"
            id="paymentDate"
            value={paymentDate ? paymentDate.split("T")[0] : ""}
            onChange={(e) => setPaymentDate(e.target.value)}
            className="w-full px-4 py-2 border border-[#E0E0E0] rounded-md"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-[#333333] font-medium mb-2"
            htmlFor="status"
          >
            Status
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full px-4 py-2 border border-[#E0E0E0] rounded-md"
          >
            <option value="Pending">Pending</option>
            <option value="Paid">Paid</option>
            <option value="Overdue">Overdue</option>
          </select>
        </div>

        <div className="mb-4">
          <label
            className="block text-[#333333] font-medium mb-2"
            htmlFor="comment"
          >
            Comment
          </label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full px-4 py-2 border border-[#E0E0E0] rounded-md"
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-[#F47C48] text-white px-6 py-2 rounded-md hover:bg-[#E76036] transition"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
