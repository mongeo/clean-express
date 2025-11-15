import React from "react";
import UsersList from "../components/UsersList";
import AppointmentsList from "../components/AppointmentsList";
import PaymentsList from "../components/PaymentsList";
import ReviewsList from "../components/ReviewsList";
import ServicesList from "../components/ServicesList";

export default function DashboardPage() {
  return (
    <div>
      <h1>Welcome to the Dashboard</h1>
      <h2>Users</h2>
      <UsersList />
      <h2>Appointments</h2>
      <AppointmentsList />
      <h2>Payments</h2>
      <PaymentsList />
      <h2>Reviews</h2>
      <ReviewsList />
      <h2>Services</h2>
      <ServicesList />
    </div>
  );
}