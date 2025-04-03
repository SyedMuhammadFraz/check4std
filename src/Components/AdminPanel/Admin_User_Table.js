import React, { useState, useEffect, useContext } from "react";
import "./Admin_User_Table.css";
import AdminNavBar from "./AdminNavBar";
import { webApiInstance } from "../../AxiosInstance";
import PatientInfoModal from "./Patient_info_Modal";
import { AuthContext } from "../../utils/AuthContext";
import { useLoader } from "../../utils/LoaderContext";
import { toast } from "react-toastify";

function Admin_User_Table() {
  const { authToken } = useContext(AuthContext);
  const { setLoading } = useLoader();
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState({ from: "", to: "" });
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [newStatus, setNewStatus] = useState("Pending");
  const [currentPage, setCurrentPage] = useState(1);

  const [selectedDiseases, setSelectedDiseases] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleInfoClick = (diseases) => {
    setSelectedDiseases(diseases); // Store diseases in state
    setIsModalOpen(true); // Open modal
  };

  const recordsPerPage = 20;

  useEffect(() => {
    setLoading(true);
    getData();
  }, []);

  useEffect(() => {
    filterOrders();
  }, [searchQuery, statusFilter, dateFilter, orders]);

  const getData = async () => {
    try {
      const response = await webApiInstance.get(`/Order/get-all`, {
        headers: {
          Authorization: `Bearer ${authToken}`, // Replace with actual token
        },
      });
      if(response.data.statusCode === 200)
      {

        const data = response.data.result;
        setOrders(data);
        setFilteredOrders(data);
        setLoading(false)
      }
      else
      {
        toast.error("There was an error fetching the data. Please try again.")
        setLoading(false)
      }
    } catch (error) {
      toast.error("There was an error fetching the data. Please try again.")
      console.error("Error fetching data:", error);
      setLoading(false)
    }
  };

  const handleSelectOrder = (orderID) => {
    setSelectedOrders((prevSelected) =>
      prevSelected.includes(orderID)
        ? prevSelected.filter((id) => id !== orderID)
        : [...prevSelected, orderID]
    );
  };

  const updateOrderStatus = async () => {
    try {
      // Map newStatus to corresponding numbers
      const statusMapping = {
        Pending: 1,
        Processed: 2,
        Completed: 3,
        Cancelled: 4,
      };

      const statusValue = statusMapping[newStatus] || 0; // Default to 0 if status is invalid

      // Use Promise.all to send multiple requests in parallel
      await Promise.all(
        selectedOrders.map(async (orderId) => {
          await webApiInstance.put(`/Order/update-status/${orderId}`, {
            status: statusValue,
          });
        })
      );

      console.log("Order statuses updated successfully.");
    } catch (error) {
      console.error("Error updating order statuses:", error);
    }

    setSelectedOrders([]); // Clear selected orders after update
    getData();
  };

  const filterOrders = () => {
    let filtered = [...orders];

    if (statusFilter !== "All") {
      filtered = filtered.filter((order) => order.orderStatus === statusFilter);
    }

    if (dateFilter.from && dateFilter.to) {
      filtered = filtered.filter(
        (order) =>
          new Date(order.orderDate) >= new Date(dateFilter.from) &&
          new Date(order.orderDate) <= new Date(dateFilter.to)
      );
    }

    if (searchQuery) {
      filtered = filtered.filter((order) => {
        const name = order.userName ? order.userName.toLowerCase() : "";
        const email = order.userEmail ? order.userEmail.toLowerCase() : "";

        return (
          name.includes(searchQuery.toLowerCase()) ||
          email.includes(searchQuery.toLowerCase())
        );
      });
    }

    setFilteredOrders(filtered);
  };

  const handleSort = (field) => {
    const order = sortField === field && sortOrder === "asc" ? "desc" : "asc";
    const sortedOrders = [...filteredOrders].sort((a, b) => {
      if (field === "Date") {
        return order === "asc"
          ? new Date(a.Date) - new Date(b.Date)
          : new Date(b.Date) - new Date(a.Date);
      }
      if (typeof a[field] === "number") {
        return order === "asc" ? a[field] - b[field] : b[field] - a[field];
      }
      return order === "asc"
        ? String(a[field]).localeCompare(String(b[field]))
        : String(b[field]).localeCompare(String(a[field]));
    });

    setSortField(field);
    setSortOrder(order);
    setFilteredOrders(sortedOrders);
  };

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredOrders.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );
  const totalPages = Math.ceil(filteredOrders.length / recordsPerPage);

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;
    const halfWay = Math.floor(maxPagesToShow / 2);

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= halfWay) {
        for (let i = 1; i < maxPagesToShow; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push("...");
        pageNumbers.push(totalPages);
      } else if (currentPage > totalPages - halfWay) {
        pageNumbers.push(1);
        pageNumbers.push("...");
        for (let i = totalPages - (maxPagesToShow - 2); i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        pageNumbers.push(1);
        pageNumbers.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push("...");
        pageNumbers.push(totalPages);
      }
    }
    return pageNumbers;
  };

  const handlePageClick = (page) => {
    if (page === "...") return;
    setCurrentPage(page);
  };

  // Function to check if an order is selected
  const isOrderSelected = (orderID) => selectedOrders.includes(orderID);

  return (
    <div>
      <AdminNavBar />
      <section className="Admin-User-Table">
        <section>
          <div class="row sparkboxes">
            <div class="col-md-3">
              <div class="box box1 shadow">
                <div class="details">
                  <h3>Total Orders</h3>
                  <h4>
                    <strong>200</strong>
                  </h4>
                </div>
              </div>
            </div>
            <div class="col-md-3">
              <div class="box box2 shadow">
                <div class="details">
                  <h4>Total Pending Orders</h4>
                  <h4>
                    <strong>150</strong>
                  </h4>
                </div>
              </div>
            </div>
            <div class="col-md-3">
              <div class="box box3 shadow">
                <div class="details">
                  <h4>Total Completed Orders</h4>
                  <h4>
                    <strong>50</strong>
                  </h4>
                </div>
              </div>
            </div>
            <div class="col-md-3">
              <div class="box box4 shadow">
                <div class="details">
                  <h4>Total Orders This Month</h4>
                  <h4>
                    <strong>50</strong>
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="Admin-User-Table-User-Table">
          <h1>
            <strong>Orders Table</strong>
          </h1>
          <div className="filters">
            <input
              type="text"
              placeholder="Search by User Name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Processed">Processed</option>
              <option value="Completed">Completed</option>
            </select>

            <input
              type="date"
              onChange={(e) =>
                setDateFilter({ ...dateFilter, from: e.target.value })
              }
            />
            <input
              type="date"
              onChange={(e) =>
                setDateFilter({ ...dateFilter, to: e.target.value })
              }
            />
            <div className="status-change">
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
              >
                <option value="Pending">Pending</option>
                <option value="Processed">Processed</option>
                <option value="Completed">Completed</option>
              </select>
              <button className="button1" onClick={updateOrderStatus}>
                Update Status
              </button>
            </div>
          </div>
          <table>
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedOrders((prevSelected) => [
                          ...prevSelected,
                          ...currentRecords.map((order) => order.id),
                        ]);
                      } else {
                        setSelectedOrders((prevSelected) =>
                          prevSelected.filter(
                            (id) =>
                              !currentRecords.some((order) => order.id === id)
                          )
                        );
                      }
                    }}
                    checked={currentRecords.every((order) =>
                      selectedOrders.includes(order.id)
                    )}
                  />
                </th>
                <th>Sr No.</th>
                <th>User Email</th>
                <th>User Name</th>
                <th>Patient Name</th>
                <th>Gender</th>
                <th>DOB</th>
                <th>Contact</th>
                <th>Diseases</th>
                <th>Status</th>
                <th>Date</th>
                <th>Last Updated</th>
                <th>Info</th>
              </tr>
            </thead>
            <tbody>
              {currentRecords.map((record, index) => (
                <tr key={index} className="user-table-row">
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedOrders.includes(record.id)}
                      onChange={() => handleSelectOrder(record.id)}
                    />
                  </td>
                  <td>{(currentPage - 1) * recordsPerPage + index + 1}</td>
                  <td>{record.userEmail}</td>
                  <td>{record.userName}</td>
                  <td>
                    {record.patientInfo.firstName} {record.patientInfo.lastName}
                  </td>
                  <td>{record.patientInfo.genderValue}</td>
                  <td>
                    {new Date(record.patientInfo.dob).toLocaleDateString(
                      "en-US"
                    )}
                  </td>
                  <td>{record.patientInfo.contactValue}</td>
                  <td>
                    {record.diseases.length > 0 ? (
                      <span
                        title={record.diseases
                          .map((d) => `${d.name} - $${d.price}`)
                          .join(", ")}
                      >
                        {record.diseases.length} Diseases
                      </span>
                    ) : (
                      "No Diseases"
                    )}
                  </td>

                  <td>
                    <button
                      className={`status-btn ${record.orderStatus}`}
                      onClick={() => {
                        setSelectedOrders([record.OrderID]); // Select only this order
                      }}
                    >
                      {record.orderStatus}
                    </button>
                  </td>
                  <td>
                    {new Date(record.orderDate).toLocaleDateString("en-US")}
                  </td>
                  <td>
                    {new Date(record.lastUpdated).toLocaleDateString("en-US")}
                  </td>
                  <td
                    className="td-info"
                    onClick={() => handleInfoClick(record.diseases)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 48 48"
                    >
                      <defs>
                        <mask id="ipTInfo0">
                          <g fill="none">
                            <path
                              fill="#555555"
                              stroke="#fff"
                              stroke-linejoin="round"
                              stroke-width="4"
                              d="M24 44a19.94 19.94 0 0 0 14.142-5.858A19.94 19.94 0 0 0 44 24a19.94 19.94 0 0 0-5.858-14.142A19.94 19.94 0 0 0 24 4A19.94 19.94 0 0 0 9.858 9.858A19.94 19.94 0 0 0 4 24a19.94 19.94 0 0 0 5.858 14.142A19.94 19.94 0 0 0 24 44Z"
                            />
                            <path
                              fill="#fff"
                              fill-rule="evenodd"
                              d="M24 11a2.5 2.5 0 1 1 0 5a2.5 2.5 0 0 1 0-5"
                              clip-rule="evenodd"
                            />
                            <path
                              stroke="#fff"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="4"
                              d="M24.5 34V20h-2M21 34h7"
                            />
                          </g>
                        </mask>
                      </defs>
                      <path
                        fill="#fbc02d"
                        d="M0 0h48v48H0z"
                        mask="url(#ipTInfo0)"
                      />
                    </svg>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="pagination-controls">
            {getPageNumbers().map((page, index) => (
              <button
                key={index}
                className={`page-button ${
                  currentPage === page ? "active" : ""
                }`}
                onClick={() => handlePageClick(page)}
              >
                {page}
              </button>
            ))}
          </div>
        </section>
      </section>
      {isModalOpen && (
        <PatientInfoModal
          diseases={selectedDiseases}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}

export default Admin_User_Table;
