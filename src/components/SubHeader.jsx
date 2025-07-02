import { Box, Flex, Link } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';

const Subheader = () => {
    return (
        <Box 
            bg="gray.50" 
            p={{ base: 4, md: 6 }} // Responsive padding for better spacing
            boxShadow="sm" // Subtle shadow for a clean look
            borderBottom="1px solid" 
            borderColor="gray.200" // Adding a bottom border for separation
        >
            <Flex 
                maxW="1200px" // Limit width for better readability
                mx="auto" // Center horizontally
                alignItems="center" 
                justifyContent="center" // Center all items horizontally
                direction={{ base: "column", md: "row" }} // Stack items vertically on small screens
                wrap="wrap" // Allow wrapping of links if space is limited
                gap={4} // Add spacing between items
            >
                {/* Navigation Links */}
                <Flex 
                    direction={{ base: "column", md: "row" }} 
                    alignItems="center"
                    gap={{ base: 2, md: 6 }} // Add spacing between links
                >
                    <Link 
                        as={NavLink} 
                        to="/home" 
                        fontSize={{ base: "sm", md: "md" }} 
                        fontWeight="medium"
                        color="gray.700"
                        _hover={{ textDecoration: "none", color: "teal.500" }}
                        _activeLink={{ fontWeight: "bold", color: "teal.600" }}
                    >
                        Home
                    </Link>
                   
                    <Link 
                        as={NavLink} 
                        to="/file-upload-list" 
                        fontSize={{ base: "sm", md: "md" }} 
                        fontWeight="medium"
                        color="gray.700"
                        _hover={{ textDecoration: "none", color: "teal.500" }}
                        _activeLink={{ fontWeight: "bold", color: "teal.600" }}
                    >
                        Disease Detection
                    </Link>
                    
                </Flex>

                
            </Flex>
        </Box>
    );
};

export default Subheader;
