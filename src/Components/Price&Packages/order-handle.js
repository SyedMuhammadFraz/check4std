import { useNavigate } from "react-router-dom";
import { CHECKOUT_TESTS_KEY, writeStored } from "../../utils/checkoutStorage";
import { useCart } from "../../utils/CartContext";

const useGotoOrderPage = () => {
  const navigate = useNavigate();
  const { setSelectedTests } = useCart();

  const gotoOrderPage = (tests) => {
    setSelectedTests(tests);
    writeStored(CHECKOUT_TESTS_KEY, tests);
    navigate("/journey/centers");
  };

  return gotoOrderPage;
};

export default useGotoOrderPage;
