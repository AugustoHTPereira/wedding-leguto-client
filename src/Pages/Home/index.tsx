import React from "react";
import { Box } from "@chakra-ui/react";
import HomeNavbar from "./components/HomeNavbar";
import HomeMainContent from "./components/HomeMainSection";
import HomeWelcomeSection from "./components/HomeWelcomeSection";


const Home = () => {    
    return (
        <Box bg='white' minH='100vh'>
            <HomeNavbar />
            <HomeMainContent />
            <HomeWelcomeSection />
        </Box>
    )
}



export default Home;