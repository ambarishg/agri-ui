import { Box, Flex, Image, Heading, Text, Link } from '@chakra-ui/react';

const Header = () => {
  return (
    <Box
      bgGradient="linear(to-r, green.700, green.500, yellow.300)"
      color="white"
      py={{ base: 6, md: 8 }}
      px={{ base: 4, md: 12 }}
      boxShadow="md"
    >
      <Flex
        alignItems="center"
        justifyContent="space-between"
        flexDirection={{ base: "column", md: "row" }}
        textAlign={{ base: "center", md: "left" }}
      >
        {/* Logo or Icon with Home Link */}
        <Link href="/" _hover={{ textDecoration: "none" }}>
          <Image
            src="https://img.icons8.com/ios-filled/100/ffffff/tractor.png"
            alt="Agriculture Hub Logo"
            boxSize={{ base: "50px", md: "60px" }}
            mb={{ base: 3, md: 0 }}
          />
        </Link>

        {/* Heading and Tagline */}
        <Box flex="1" px={{ base: 0, md: 6 }}>
          
          <Heading
            as="h1"
            fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
            fontWeight="bold"
            letterSpacing="wide"
            color="white"
          >
            Agriculture Hub
          </Heading>

          <Text
            fontSize={{ base: "md", md: "lg" }}
            color="whiteAlpha.900"
            mt={2}
            fontWeight="medium"
          >
            Empowering Farmers. Growing Futures.
          </Text>
        </Box>

        {/* Optional Spacer for symmetry */}
        <Box display={{ base: "none", md: "block" }} width="60px" />
      </Flex>
    </Box>
  );
};

export default Header;
