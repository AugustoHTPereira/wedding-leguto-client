import { Box, Stack, StackItem } from "@chakra-ui/react"

const HomeLinks = () => {
    return (
        <Box
            mx='auto'
            maxW='container.xl'
            w='full'
        >
            <Stack>
                <StackItem w='full'>
                    <Box>
                        <Box>
                            <Box w='full' h='180px' bg='gray.200' />
                        </Box>
                    </Box>    
                </StackItem>    
            </Stack>   
        </Box>
    )
}

export default HomeLinks;