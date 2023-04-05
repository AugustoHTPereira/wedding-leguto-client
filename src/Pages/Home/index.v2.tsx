import React from "react";
import { Box } from "@chakra-ui/react";
import HomePhototeca from "./components/HomePhototeca";
import HomeMainContent from "./components/HomeMainSection";
import HomeNavbar from "./components/HomeNavbar";
import HomeWelcomeSection from "./components/HomeWelcomeSection";

const Home = () => {
    return (
        <Box bg='black' minH='100vh'>
            <HomeNavbar />

            <HomeMainContent />
            <HomeWelcomeSection />
            <HomePhototeca />
        </Box>
    )
}



export default Home;