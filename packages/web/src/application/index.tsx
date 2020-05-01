import React, { Suspense } from "react"
import { Router } from "@reach/router"

import { AppProvider } from "../components/providers/AppProvider"
import { CheckAuth } from "../components/CheckAuth"
import { RentingDash } from "../pages/Dashboard"
import { HostingDash } from "../pages/HostingDash"
import { About } from "../pages/About"
import { UserProfile } from "../pages/UserProfile"
import { NotFound } from "../pages/NotFound"
import { CreateListing } from "../pages/CreateListing"
import { ListingDetails } from "../pages/ListingDetails"

export function Application() {
  return (
    <AppProvider>
      <Suspense fallback={<h1>Loading page...</h1>}>
        <CheckAuth>
          <Router>
            <RentingDash path="/" />
            <About path="about" />
            <UserProfile path="u/:userId" />
            <HostingDash path="hosting" />

            {/* Can't figure out how to nest CreateListing inside HostingDash */}
            <CreateListing path="hosting/create_listing" />
            <ListingDetails path="listing/:listingId" />

            <NotFound default />
          </Router>
        </CheckAuth>
      </Suspense>
    </AppProvider>
  )
}
