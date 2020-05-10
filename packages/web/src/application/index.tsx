import React, { Suspense } from "react"
import { Redirect, Router } from "@reach/router"

import { AppProvider } from "../components/providers/AppProvider"
import { HostingDash } from "../pages/HostingDash"
import { About } from "../pages/About"
import { UserProfile } from "../pages/UserProfile"
import { NotFound } from "../pages/NotFound"
import { CreateListing } from "../pages/CreateListing"
import { RentingDash } from "../pages/Dashboard"
import { LoadSpinner } from "../components/shared/LoadSpinner"
import { ListingDetails } from "../pages/ListingDetails"

const CheckAuth = React.lazy(() =>
  import("../components/shared/CheckAuth").then(({ CheckAuth }) => ({
    default: CheckAuth,
  })),
)

export function Application() {
  return (
    <AppProvider>
      <Suspense fallback={<LoadSpinner />}>
        <CheckAuth>
          <Router>
            <RentingDash path="/" />
            <About path="about" />
            <UserProfile path="u/:userId" />
            <HostingDash path="hosting" />
            <ListingDetails path="listing/:listingId" />

            {/* Can't figure out how to nest CreateListing inside HostingDash */}
            <CreateListing path="hosting/create_listing" />

            {/* If logged in, don't show these pages */}
            <Redirect from="/reset-password" to="/" />
            <Redirect from="/forgot-password" to="/" />
            <Redirect from="/login" to="/" />
            <Redirect from="/register" to="/" />

            <NotFound default />
          </Router>
        </CheckAuth>
      </Suspense>
    </AppProvider>
  )
}
