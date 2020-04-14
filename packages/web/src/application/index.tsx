import React from "react"
import { Router } from "@reach/router"

import { AppProvider } from "../components/providers/AppProvider"
import { CheckAuth } from "../components/CheckAuth"
import { Dashboard } from "../pages/Dashboard"
import { About } from "../pages/About"
import { UserProfile } from "../pages/UserProfile"

export function Application() {
  return (
    <AppProvider>
      <React.Suspense fallback={null}>
        <CheckAuth>
          <Router>
            <Dashboard path="/" />
            <About path="/about" />
            <UserProfile path="/settings" />
          </Router>
        </CheckAuth>
      </React.Suspense>
    </AppProvider>
  )
}
