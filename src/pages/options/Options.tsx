import brand from "@assets/img/brand.jpg"
import logo from "@assets/img/logo.svg"
import { Box, Button, Divider, Flex, Grid, GridItem, Image, Text, useColorModeValue } from "@chakra-ui/react"
import "@pages/options/Options.css"
import React from "react"
import { Link, Outlet, Route, Routes, useLocation } from "react-router-dom"
import About from "./routers/About"
import Settings from "./routers/Settings"
import Words from "./routers/Words"

export const Options: React.FC = () => {
  return (
    <Box my="8">
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

const Layout: React.FC = () => {
  const location = useLocation()
  const bg = useColorModeValue("slate.200", "slate.900")

  const router_map = new Map([
    ["/", "General"],
    ["/words", "Words"],
    ["/about", "About"],
  ])

  return (
    <Grid gap={8} templateColumns="repeat(6, 1fr)">
      <GridItem
        rowSpan={2}
        colSpan={2}
        py="2"
        style={{
          position: "fixed",
          top: 0,
          bottom: 0,
          left: 0,
          backgroundColor: bg,
          width: "240px",
          overflowY: "auto",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          zIndex: 1,
        }}
      >
        <Flex alignItems="center" justifyContent="center" gap="2" my="6">
          <Image src={logo} alt="canger" boxSize="32px" />
          <Text fontSize={"xl"}>Canger</Text>
        </Flex>
        <Flex
          direction={"column"}
          justifyContent="space-between"
          style={{
            height: "calc(100vh - 120px)",
          }}
        >
          <Box display="flex" flexDirection="column" gap="2" mx="4" my="2">
            {Array.from(router_map).map(([path, name]) => {
              return (
                <Link to={path} key={path}>
                  <Button width={"100%"}>{name}</Button>
                </Link>
              )
            })}
          </Box>
          <Flex alignItems="center" gap="2" justifyContent="center" textAlign="center">
            <Image src={brand} boxSize="32px"></Image>
            <Text fontSize="sm">山小出品</Text>
          </Flex>
        </Flex>
      </GridItem>

      <GridItem colSpan={3} colStart={3} colEnd={6} pl="2">
        <Text fontSize={"xl"}>{router_map.get(location.pathname)}</Text>
        <Divider my="4" />
        <Outlet />
      </GridItem>
    </Grid>
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
