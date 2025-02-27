import React from "react";
import Dashboard_Chart from "./Dashboard_Chart";
import Dashboard_Pie_Chart from "./Dashboard_Pie_Chart";
import Dashboard_Bar_Chart from "./Dashboard_Bar_Chart";
import AdminNavBar from "./AdminNavBar";
import "./AdminDashboard.css";

function AdminDashboard() {
  return (
    <div>
      <AdminNavBar />
      <section className="AdminDashboard">
        <h1>
          <strong>Dashboard</strong>
        </h1>
        <section className="Dashboard-Charts">
          <div>
            <h4>Total Orders Per Month</h4>
            <Dashboard_Chart width="100%" height={300} />
          </div>
          <div>
            <h4>Total Revenue Per Month</h4>
            <Dashboard_Chart width="100%" height={300} />
          </div>
          <div>
            <h4>Total Orders By Each Test</h4>
            <Dashboard_Bar_Chart width="100%" height={300} />
          </div>
          <div>
            <h4>Total Revenue Per Each Test</h4>
            <Dashboard_Bar_Chart width="100%" height={300} />
          </div>
        </section>
      </section>
    </div>
  );
}

export default AdminDashboard;
