import React from "react"
import { Router } from "@reach/router"

import { useUser } from "../providers/MeProvider"
import { Login } from "../../pages/Login"
import { Register } from "../../pages/Register"
import { ForgotPassword } from "../../pages/ForgotPassword"
import { ResetPassword } from "../../pages/ResetPassword"
import { RentingDash } from "../../pages/Dashboard"
import { ListingDetails } from "../../pages/ListingDetails"

export const CheckAuth: React.FC = ({ children }) => {
  const user = useUser()
  return user ? (
    <>{children}</>
  ) : (
    <Router>
      {/* If not logged in, show just these pages */}
      <RentingDash default={true} path="/" />
      <ListingDetails path="listing/:listingId" />

      <Login path="/login" />
      <Register path="/register" />
      <ForgotPassword path="/forgot-password" />
      <ResetPassword path="/reset-password/:token" />
    </Router>
  )
}
