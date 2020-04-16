import React from "react"
import { Router } from "@reach/router"

import { AppProvider } from "../components/providers/AppProvider"
import { CheckAuth } from "../components/CheckAuth"
import { Dashboard } from "../pages/Dashboard"
import { RoadCam } from "../pages/RoadCam"
import { About } from "../pages/About"
import { UserProfile } from "../pages/UserProfile"
import { NotFound } from "../pages/NotFound"

export function Application() {
  return (
    <AppProvider>
      <React.Suspense fallback={null}>
        <CheckAuth>
          <Router>
            <Dashboard path="/" />
            <About path="about" />
            <UserProfile path="u/:userId" />
            <RoadCam path="roadcam" />
            <NotFound default />
          </Router>
        </CheckAuth>
      </React.Suspense>
    </AppProvider>
  )
}
