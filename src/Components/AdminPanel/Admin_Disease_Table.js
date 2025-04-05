import React, { useEffect, useState, useContext } from "react";
import AdminNavBar from "./AdminNavBar";
import "./Admin_User_Table.css";
import { webApiInstance } from "../../AxiosInstance";
import { AuthContext } from "../../utils/AuthContext";
import { useLoader } from "../../utils/LoaderContext";
import { toast } from "react-toastify";

function Admin_Disease_Table() {
  const { authToken } = useContext(AuthContext);
  const [Diseases, setDiseases] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [newPrice, setNewPrice] = useState("");
  const { setLoading } = useLoader();

  const getData = async () => {
    try {
      const response = await webApiInstance.get(`/Disease`, {
        headers: {
          Authorization: `Bearer ${authToken}`, // Replace with actual token
        },
      });
      if (response.data.statusCode === 200) {
        setDiseases(response.data.result);
        setLoading(false);
      } else {
        toast.error("There was an error fetching the data. Please try again.");
        setLoading(false);
      }
    } catch (error) {
      toast.error("There was an error fetching the data. Please try again.");
      setLoading(false);
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    setLoading(true);
    getData();
  }, []);

  const handleEditClick = (disease) => {
    setEditingId(disease.id);
    setNewPrice(disease.price); // Set current price in input field
  };

  const handlePriceChange = (event) => {
    setNewPrice(event.target.value);
  };

  const handleUpdatePrice = async (disease) => {
    try {
      setLoading(true);
      const updatedDisease = {
        id: disease.id,
        name: disease.name, // Keep the name unchanged
        price: Number(newPrice), // Convert price to number
      };
      const response = await webApiInstance.put(
        `/Disease/${disease.id}`,
        updatedDisease,
        {
          headers: {
            Authorization: `Bearer ${authToken}`, // Replace with actual token
          },
        }
      );
      if (response.status === 204) {
        getData();
      }
      setEditingId(null); // Exit edit mode
    } catch (error) {
      console.error("Error updating price:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AdminNavBar />
      <div className="my-5"></div>
      <section className="Admin-User-Table-User-Table">
        <h1>
          <strong>Tests Table</strong>
        </h1>
        <table>
          <thead>
            <tr>
              <th>Sr No.</th>
              <th>Name</th>
              <th>Created At</th>
              <th>Last Updated</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Diseases.map((disease, index) => (
              <tr key={disease.id} className="user-table-row">
                <td>{index + 1}</td>
                <td>{disease.name}</td>
                <td>
                  {new Date(disease.createdAt).toLocaleDateString("en-US")}
                </td>
                <td>
                  {new Date(disease.updatedAt).toLocaleDateString("en-US")}
                </td>
                <td>
                  {editingId === disease.id ? (
                    <input
                      type="number"
                      value={newPrice}
                      onChange={handlePriceChange}
                      onBlur={() => handleUpdatePrice(disease)}
                      autoFocus
                    />
                  ) : (
                    `$${disease.price}`
                  )}
                </td>
                <td>
                  <span
                    className="line-md--edit-filled"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleEditClick(disease)}
                  ></span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
}

export default Admin_Disease_Table;
