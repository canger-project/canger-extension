import { Box } from "@chakra-ui/react"
import "@pages/options/Options.css"
import React from "react"
import { Link, Route, Routes } from "react-router-dom"
import Layout from "./Layout"
import About from "./routers/About"
import Settings from "./routers/Settings"
import Words from "./routers/Words"

export const Options: React.FC = () => {
  return (
    <Box>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Settings />} />
          <Route path="words" element={<Words />} />
          <Route path="about" element={<About />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </Box>
  )
}

const NoMatch: React.FC = () => {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  )
}
