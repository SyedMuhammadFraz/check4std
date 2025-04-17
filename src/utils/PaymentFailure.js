import { useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import './paymentStatus.css';

const PaymentFailure = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");

 const hasCheckedRef = useRef(false);
   const hasUnmountedRef = useRef(false);
 
   useEffect(() => {
     return () => {
       hasUnmountedRef.current = true;
     };
   }, []);
 
   useEffect(() => {
    // Only run this check once per component mount
    if (!hasCheckedRef.current) {
      hasCheckedRef.current = true;
      
      const allowed = sessionStorage.getItem("allowFailurePage");
      console.log("FAILURE PAGE: Redirecting with session flag:", allowed);
    
      if (allowed === "true") {
        // User is allowed to be on failure page
        console.log("FAILURE PAGE: User allowed on failure page");
        
        // Delay the removal to ensure the page stays visible
        setTimeout(() => {
          if (!hasUnmountedRef.current) {
            console.log("FAILURE PAGE: Removing session flag");
            sessionStorage.removeItem("allowFailurePage");
          }
        }, 1000);
      } else {
        // User tried to access page directly - redirect to home
        console.log("FAILURE PAGE: User not allowed, redirecting to home");
        navigate("/");
      }
    }
  }, [navigate]);

  return (
    <div className="payment-status-wrapper" role="alert" aria-live="assertive">
      <div className="payment-status-box payment-failure-box">
        <h1 className="payment-status-title payment-failure-title">
          ❌ Payment Failed
        </h1>
        <p className="payment-status-message">
          Your payment could not be processed. Please try again or contact support.
        </p>
        <a href="/" className="payment-status-link">Back to Home</a>
      </div>
    </div>
  );
};

export default PaymentFailure;
