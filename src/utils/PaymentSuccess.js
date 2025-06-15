// import { useEffect, useRef } from "react";
// import { useNavigate, useSearchParams } from "react-router-dom";
// import './paymentStatus.css';

// const PaymentSuccess = () => {
//   const navigate = useNavigate();
//   const [searchParams] = useSearchParams();
//   const orderId = searchParams.get("orderId");

//   // useEffect(() => {
//   //   const allowed = sessionStorage.getItem("allowSuccessPage");
//   //   console.log("Redirecting with session flag:", allowed);

//   //   // If not allowed OR if orderId is not null, redirect to home
//   //   if (allowed !== "true" || orderId === null) {
//   //     console.log("If is running - redirecting to home");
//   //     navigate("/"); 
//   //   } else {
//   //     console.log("else is running - staying on success page");
//   //     sessionStorage.removeItem("allowSuccessPage"); // Use-once
//   //   }
//   // }, [navigate, orderId]);

//   const hasCheckedRef = useRef(false);
//   const hasUnmountedRef = useRef(false);

//   useEffect(() => {
//     return () => {
//       hasUnmountedRef.current = true;
//     };
//   }, []);

//   useEffect(() => {
//     // Only run this check once per component mount
//     if (!hasCheckedRef.current) {
//       hasCheckedRef.current = true;
      
//       const allowed = sessionStorage.getItem("allowSuccessPage");
    
//       if (allowed === "true") {
//         // User is allowed to be on success page

//         // Delay the removal to ensure the page stays visible
//         setTimeout(() => {
//           if (!hasUnmountedRef.current) {
//             sessionStorage.removeItem("allowSuccessPage");
//           }
//         }, 1000);
//       } else {
//         // User tried to access page directly - redirect to home
//         navigate("/");
//       }
//     }
//   }, [navigate]);
//   return (
//     <div className="payment-status-wrapper" role="status" aria-live="polite">
//       <div className="payment-status-box payment-success-box">
//         <h1 className="payment-status-title payment-success-title">
//           ✅ Payment Successful
//         </h1>
//         <p className="payment-status-message">
//           Your order has been placed successfully. You’ll receive a confirmation email shortly.
//         </p>
//         <a href="/" className="payment-status-link">Back to Home</a>
//       </div>
//     </div>
//   );
// };

// export default PaymentSuccess;







import { useSearchParams } from "react-router-dom";
import './paymentStatus.css';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");

  if (success !== "true") {
    return (
      <div className="payment-status-wrapper">
        <div className="payment-status-box payment-error-box">
          <h1 className="payment-status-title payment-error-title">❌ Payment Failed</h1>
          <p className="payment-status-message">Your payment was unsuccessful or canceled.</p>
          <a href="/" className="payment-status-link">Back to Home</a>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-status-wrapper" role="status" aria-live="polite">
      <div className="payment-status-box payment-success-box">
        <h1 className="payment-status-title payment-success-title">✅ Payment Successful</h1>
        <p className="payment-status-message">
          Your order has been placed successfully.
        </p>
        <a href="/" className="payment-status-link">Back to Home</a>
      </div>
    </div>
  );
};

export default PaymentSuccess;