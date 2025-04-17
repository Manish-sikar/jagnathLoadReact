import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { getPaymentDetails, updatePaymentStatus } from "../../../services/billingService";

const PaymentRequestPage = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    try {
      const res = await getPaymentDetails();
      setRequests(res?.data.requests || []);
    } catch (err) {
      console.error("Failed to fetch requests", err);
      Swal.fire("Error", "Failed to load payment requests", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const updateStatus = async (id, JN_ID) => {
    const confirm = await Swal.fire({
      title: "Approve Payment?",
      text: "Are you sure you want to mark this as approved?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Approve",
    });

    if (confirm.isConfirmed) {
      try {
        const payloadData = {
          id,
          JN_ID,
        };

        const result = await updatePaymentStatus(payloadData);

        if (result.status ===200) {
          Swal.fire("Success", "Payment approved!", "success");
          fetchRequests(); // refresh data
        } else {
          Swal.fire("Error", result.message || "Update failed", "error");
        }
      } catch (err) {
        console.error("Status update error:", err);
        Swal.fire("Error", "Failed to update status", "error");
      }
    }
  };

  return (
    <div className="container mt-5">
      <h4 className="mb-4">🧾 Payment Requests</h4>
      {loading ? (
        <p>Loading...</p>
      ) : requests.length === 0 ? (
        <div className="alert alert-warning">No requests found.</div>
      ) : (
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>JN ID</th>
              <th>Amount</th>
              <th>UTR No</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req._id}>
                <td>{req.JN_Id}</td>
                <td>₹{req.requestingAmount}</td>
                <td>{req.Utr_No}</td>
                <td>{req.timestamp}</td>
                <td>
                  <span
                    className={`badge ${
                      req.status === "pending"
                        ? "bg-warning text-dark"
                        : "bg-success"
                    }`}
                  >
                    {req.status}
                  </span>
                </td>
                <td>
                  {req.status === "pending" && (
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() =>
                        updateStatus(req._id, req.JN_Id)
                      }
                    >
                      Approve
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PaymentRequestPage;
