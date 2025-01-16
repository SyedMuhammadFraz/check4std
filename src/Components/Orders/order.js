import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import './order.css';

const OrderPage = () => {
  
  const location = useLocation();
  const { selectedTests = [] } = location.state || {};

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    dobMonth: "",
    dobDay: "",
    dobYear: "",
    notificationMethod: "",
    addPartnerTest: false,
    paymentMethod: "",
    creditCardNumber: "",
    cardExpirationMonth: "",
    cardExpirationYear: "",
    billingCountry: "",
    billingZipCode: "",
  });


  const [isModalOpen, setIsModalOpen] = useState(false); 
  const totalCost = selectedTests.reduce((sum, test) => sum + test.price, 0);
  console.log(selectedTests);
  console.log(totalCost);
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
    }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Open the modal after form submission
  };

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  const getDaysInMonth = (month, year) => {
    const monthIndex = months.indexOf(month);
    if (monthIndex === -1) return 31; // Default to 31 days if invalid month
    return new Date(year || 2024, monthIndex + 1, 0).getDate();
  };

  // Generate day options based on selected month and year
  const dates = Array.from(
    { length: getDaysInMonth(formData.dobMonth, formData.dobYear) || 31 },
    (_, i) => i + 1
  );

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

  const handleMonthChange = (e) => setFormData({ ...formData, dobMonth: e.target.value });
  const handleDayChange = (e) => setFormData({ ...formData, dobDay: e.target.value });
  const handleYearChange = (e) => setFormData({ ...formData, dobYear: e.target.value });

  return (
    <div className="order-page">
      
      <div className="order-card">
          <div className="order-card-content">
            <h2>Order Summary</h2>
            <ul>
            {(selectedTests || []).map((test, index) => (
                <li key={index}>
                  {test.name} - ${test.price.toFixed(2)}
                </li>
              ))}
            </ul>
            <h3>Total: ${totalCost.toFixed(2)}</h3>
            <button onClick={() => setIsModalOpen(false)}>Add/Edit Tests</button>
          </div>
        </div>
      <div className="container">
        <h1>Quick & Confidential STD Testing</h1>

        <form onSubmit={handleSubmit}>
          {/* Section 1: Find a Test Center */}
          <section>
            <h2 className="blue-background">1. Find a Test Center</h2>
            <div>
              <p>Your Selected Lab:</p>
              <p>Labcorp at Walgreens</p>
              <p>4651 W Kennedy Blvd, Tampa, FL 33609</p>
              <button type="button">Change Location</button>
            </div>
          </section>

          {/* Section 2: Enter Patient Information */}
          <section>
            <h2 className="blue-background">2. Enter Patient Information</h2>
            <div>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={formData.gender === "Male"}
                  onChange={handleChange}
                />
                Male
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={formData.gender === "Female"}
                  onChange={handleChange}
                />
                Female
              </label>
            </div>

            <div>
              <select value={formData.dobMonth} onChange={handleMonthChange}>
                <option value="">Month</option>
                {months.map((month, index) => (
                  <option key={index} value={month}>
                    {month}
                  </option>
                ))}
              </select>
              <select value={formData.dobDay} onChange={handleDayChange}>
                <option value="">Day</option>
                {dates.map((date) => (
                  <option key={date} value={date}>
                    {date}
                  </option>
                ))}
              </select>
              <select value={formData.dobYear} onChange={handleYearChange}>
                <option value="">Year</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </section>

         

          {/* Section 4: Enter Payment Information */}
          <section>
            <h2 className="blue-background">3. Enter Payment Information</h2>
            <div>
              <select
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
              >
                <option value="">Choose Payment Method</option>
                <option value="Credit Card">Credit Card</option>
                <option value="PayPal">PayPal</option>
              </select>
            </div>

            <div>
              <input
                type="text"
                name="creditCardNumber"
                placeholder="Credit Card Number"
                value={formData.creditCardNumber}
                onChange={handleChange}
              />
              <select
                name="cardExpirationMonth"
                value={formData.cardExpirationMonth}
                onChange={handleChange}
              >
                <option value="">Month</option>
                {months.map((month, index) => (
                  <option key={index} value={month}>
                    {month}
                  </option>
                ))}
              </select>
              <select
                name="cardExpirationYear"
                value={formData.cardExpirationYear}
                onChange={handleChange}
              >
                <option value="">Year</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </section>

          <button type="submit">Place Your Order</button>
        </form>

    </div>
      </div>
  );
};

export default OrderPage;
