import brand from "@assets/img/brand.jpg"
import logo from "@assets/img/logo.svg"
import {
  Avatar,
  AvatarBadge,
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  GridItem,
  Image,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Text,
  useColorModeValue,
} from "@chakra-ui/react"
import "@pages/options/Options.css"
import React, { useEffect, useState } from "react"
import { Link, Outlet, useLocation } from "react-router-dom"

export default function Layout() {
  const location = useLocation()
  const bg = useColorModeValue("slate.200", "slate.900")

  const router_map = new Map([
    ["/", "General"],
    ["/words", "Words"],
    ["/about", "About"],
  ])

  return (
    <Grid
      gridTemplateColumns={"240px 1fr"}
      templateAreas={`"nav header"
                        "nav main"
                        "nav footer"`}
    >
      <GridItem
        area={"nav"}
        width="240px"
        style={{
          position: "fixed",
          top: 0,
          bottom: 0,
          left: 0,
          backgroundColor: bg,
          overflowY: "auto",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          zIndex: 1,
        }}
      >
        <Flex alignItems="center" justifyContent="center" gap="2" my="2">
          <Image src={logo} alt="canger" boxSize="32px" />
          <Text fontSize={"xl"}>Canger</Text>
        </Flex>
        <Flex
          mt="12"
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
      <GridItem area={"header"}>
        <Header />
      </GridItem>

      <GridItem area={`main`} display="flex" flexDirection="column" justifyContent="center" my="8">
        <Grid templateColumns="repeat(5, 1fr)">
          <GridItem colSpan={3} colStart={2} colEnd={5}>
            <Text fontSize={"xl"}>{router_map.get(location.pathname)}</Text>
            <Divider my="4" />
            <Outlet />
          </GridItem>
        </Grid>
      </GridItem>

      <GridItem area={"footer"}></GridItem>
    </Grid>
  )
}

const Header: React.FC = () => {
  const [session, setSession] = useState(null)

  useEffect(() => {}, [])

  async function signOut() {}

  return (
    <Flex h="16" alignItems="center" justifyContent="right" boxShadow="0 2px 1px -1px rgba(0, 0, 0, 0.1)" px="4">
      <Popover>
        <PopoverTrigger>
          {session ? (
            <Avatar>
              <AvatarBadge boxSize="1.25em" bg="green.500" />
            </Avatar>
          ) : (
            <Button>Log In</Button>
          )}
        </PopoverTrigger>
        <PopoverContent>
          <PopoverHeader>Confirmation!</PopoverHeader>
          <PopoverBody>{session ? <Button onClick={signOut}>login Out</Button> : <></>}</PopoverBody>
        </PopoverContent>
      </Popover>
    </Flex>
  )
}
