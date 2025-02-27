import React, { useState, useEffect } from "react";
import "./Admin_User_Table.css";
import AdminNavBar from "./AdminNavBar";

function Admin_User_Table() {
  const [orders, setOrders] = useState([
    {
      OrderID: "ORD-001",
      User_Name: "John Doe",
      Order_Status: "Pending",
      Date: "2024-02-18",
    },
    {
      OrderID: "ORD-002",
      User_Name: "Jane Smith",
      Order_Status: "Processed",
      Date: "2024-02-17",
    },
    {
      OrderID: "ORD-003",
      User_Name: "Michael Johnson",
      Order_Status: "Completed",
      Date: "2024-02-16",
    },
    {
      OrderID: "ORD-004",
      User_Name: "Emily Davis",
      Order_Status: "Pending",
      Date: "2024-02-15",
    },
    // Generate 96 more entries
    ...Array.from({ length: 96 }, (_, i) => ({
      OrderID: `ORD-${i + 5}`,
      User_Name: `User-${i + 5}`,
      Order_Status: ["Pending", "Processed", "Completed"][
        Math.floor(Math.random() * 3)
      ], // Randomly assign a status
      Date: new Date(2024, 1, Math.floor(Math.random() * 28) + 1)
        .toISOString()
        .split("T")[0], // Random date in Feb 2024
    })),
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 20;

  // Calculate indexes for current page records
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = orders.slice(indexOfFirstRecord, indexOfLastRecord);

  // Total pages calculation
  const totalPages = Math.ceil(orders.length / recordsPerPage);

  // Pagination function to render page numbers with ellipsis
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5; // How many page numbers to show at a time
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
  const [filteredOrders, setFilteredOrders] = useState(orders);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState({ from: "", to: "" });
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    filterOrders();
  }, [searchQuery, statusFilter, dateFilter, orders]);

  const filterOrders = () => {
    let filtered = [...orders];

    // Apply status filter
    if (statusFilter !== "All") {
      filtered = filtered.filter(
        (order) => order.Order_Status === statusFilter
      );
    }

    // Apply date filter
    if (dateFilter.from && dateFilter.to) {
      filtered = filtered.filter(
        (order) =>
          new Date(order.Date) >= new Date(dateFilter.from) &&
          new Date(order.Date) <= new Date(dateFilter.to)
      );
    }

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (order) =>
          order.OrderID.toLowerCase().includes(searchQuery.toLowerCase()) ||
          order.User_Name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredOrders(filtered);
  };

  // Sorting function
  const handleSort = (field) => {
    const order = sortField === field && sortOrder === "asc" ? "desc" : "asc";
    const sortedOrders = [...filteredOrders].sort((a, b) => {
      if (field === "Date") {
        return order === "asc"
          ? new Date(a.Date) - new Date(b.Date)
          : new Date(b.Date) - new Date(a.Date);
      }
      return order === "asc"
        ? a[field].localeCompare(b[field])
        : b[field].localeCompare(a[field]);
    });

    setSortField(field);
    setSortOrder(order);
    setFilteredOrders(sortedOrders);
  };

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
              placeholder="Search by Order ID or User Name..."
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
          </div>
          <table>
            <thead>
              <th>Sr No.</th>
              <th>Order ID</th>
              <th>User Name</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </thead>
            <tbody>
              {filteredOrders.map((record, index) => (
                <tr key={index} className="user-table-row">
                  <td className="user-table-cell first-cell">
                    {(currentPage - 1) * recordsPerPage + index + 1}
                  </td>
                  <td className="user-table-cell">{record.OrderID}</td>
                  <td className="user-table-cell">{record.User_Name}</td>
                  <td className="user-table-cell">
                    {record.Order_Status === "Pending" ? (
                      <button className="status-btn Pending">Pending</button>
                    ) : record.Order_Status === "Processed" ? (
                      <button className="status-btn Processed">
                        Processed
                      </button>
                    ) : record.Order_Status === "Completed" ? (
                      <button className="status-btn Completed">
                        Completed
                      </button>
                    ) : (
                      <button className="status-btn unknown">Unknown</button> // Just in case an unknown status appears
                    )}
                  </td>

                  <td className="user-table-cell">{record.Date}</td>
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
    </div>
  );
}

export default Admin_User_Table;
