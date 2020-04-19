import React from "react"
import { Router } from "@reach/router"

import { AppProvider } from "../components/providers/AppProvider"
import { CheckAuth } from "../components/CheckAuth"
import { RentingDash } from "../pages/Dashboard"
import { HostingDash } from "../pages/HostingDash"
import { About } from "../pages/About"
import { UserProfile } from "../pages/UserProfile"
import { NotFound } from "../pages/NotFound"
import { Spinner } from "@chakra-ui/core"

export function Application() {
  const spinner = (
    <Spinner
      thickness="4px"
      speed="0.65s"
      emptyColor="gray.200"
      color="blue.500"
      size="xl"
    />
  )
  return (
    <AppProvider>
      <React.Suspense fallback={spinner}>
        <CheckAuth>
          <Router>
            <RentingDash path="/" />
            <About path="about" />
            <UserProfile path="u/:userId" />
            <HostingDash path="hosting" />
            <NotFound default />
          </Router>
        </CheckAuth>
      </React.Suspense>
    </AppProvider>
  )
}
