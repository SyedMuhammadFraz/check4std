import { useNavigate } from "react-router-dom";

const useGotoOrderPage = () => {
  const navigate = useNavigate();

  const gotoOrderPage = (tests) => {
    navigate("/order", { state: { selectedTests: tests } });
  };

  return gotoOrderPage;
};

export default useGotoOrderPage;
