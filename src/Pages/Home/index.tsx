import React from "react";
import { Box, Button, Flex, HStack, Heading, Image, StackDivider, StackItem, Text } from "@chakra-ui/react";
import Photo from "../../Assets/img/wedding.avif"
import useWeddingDate from "../../Hooks/useWeddingDate";
import Img from '../../Assets/img/photo-1520854221256-17451cc331bf.avif';
import HomeNavbar from "./components/HomeNavbar";
import HomeMainContent from "./components/HomeMainSection";
import HomeWelcomeSection from "./components/HomeWelcomeSection";


const Home = () => {
    const { str, date, diff } = useWeddingDate();
    
    return (
        <Box bg='white' minH='100vh'>
            {/* <HomeNavbar />
            <HomeMainContent />
            <HomeWelcomeSection /> */}
        </Box>
    )
}



export default Home;