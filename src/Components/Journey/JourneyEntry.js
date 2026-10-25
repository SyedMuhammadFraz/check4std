import React, { useEffect } from "react";
import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import { useCart } from "../../utils/CartContext";
import { CHECKOUT_TESTS_KEY, writeStored } from "../../utils/checkoutStorage";
import { journeyNames, journeyPath } from "./journeyModel";

// Existing test-detail buttons pass their selection through router state.
export default function JourneyEntry() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { setSelectedTests } = useCart();
  useEffect(() => {
    if (state?.selectedTests?.length) {
      writeStored(CHECKOUT_TESTS_KEY, state.selectedTests);
      setSelectedTests(state.selectedTests);
    }
    navigate(journeyPath("centers"), { replace: true });
  }, [state, navigate, setSelectedTests]);
  return <p role="status">Opening your testing journey…</p>;
}

export function JourneyPageAlias() {
  const { slug } = useParams();
  return <Navigate to={journeyPath(journeyNames[slug] ? slug : "tests")} replace />;
}
