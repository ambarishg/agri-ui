import { Box, Button, HStack, Heading, Text, Image, SimpleGrid } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const diseaseSections = [
  {
    key: 'paddy',
    title: 'Paddy Disease Detection',
    icon: 'https://img.icons8.com/ios-filled/60/388e3c/rice-bowl.png',
    description: 'Detect and manage diseases affecting paddy crops for healthier yields.',
    bg: 'green.200',
    color: 'green.900',
    hoverBg: 'green.300',
    category: 'Paddy',
  },
  {
    key: 'cassava',
    title: 'Cassava Disease Detection',
    icon: 'https://img.icons8.com/ios-filled/60/8d6e63/potato.png',
    description: 'Identify and address common cassava diseases with precision.',
    bg: 'orange.200',
    color: 'orange.900',
    hoverBg: 'orange.300',
    category: 'Cassava',
  },
  {
    key: 'poultry',
    title: 'Poultry Disease Detection',
    icon: 'https://img.icons8.com/ios-filled/60/fbc02d/chicken.png',
    description: 'Monitor and detect diseases in poultry for a healthy flock.',
    bg: 'yellow.200',
    color: 'yellow.900',
    hoverBg: 'yellow.300',
    category: 'Poultry',
  },
  {
    key: 'pest',
    title: 'Pest Detection',
    icon: 'https://img.icons8.com/ios-filled/60/0097a7/bug.png',
    description: 'Spot and control pests to protect your crops and livestock.',
    bg: 'cyan.200',
    color: 'cyan.900',
    hoverBg: 'cyan.300',
    category: 'Pest',
  },
  // --- Add this Mango Card ---
  {
    key: 'mango',
    title: 'Mango Disease Detection',
    icon: 'https://img.icons8.com/color/60/000000/mango.png',
    description: 'Detect and manage diseases affecting mango trees for better fruit quality.',
    bg: 'yellow.100',
    color: 'orange.800',
    hoverBg: 'yellow.200',
    category: 'Mango',
  },
  {
    key: 'sugarcane',
    title: 'Sugarcane Disease Detection',
    icon: 'sugar-cane-icon.png', // Ensure this path is correct
    description: 'Detect and manage diseases affecting sugarcane crops to improve yield and quality.',
    bg: 'green.100',
    color: 'green.800',
    hoverBg: 'green.200',
    category: 'Sugarcane',
},
{
    key: 'tea',
    title: 'Tea Disease Detection',
    icon: 'https://img.icons8.com/ios-filled/60/388e3c/tea-cup.png', // Tea icon from Icons8
    description: 'Detect and manage diseases affecting tea crops for improved yield and quality.',
    bg: 'green.50',
    color: 'green.800',
    hoverBg: 'green.100',
    category: 'Tea',
  },
];

const HomePage = () => {
  const navigate = useNavigate();

  // Pass the category dynamically
  const handleCardClick = (category) => {
    navigate(`/file-upload-list?category=${encodeURIComponent(category)}`);
  };

  const handleGetStartedClick = () => {
    navigate('/file-upload-list');
  };

  return (
    <Box
      minH="100vh"
      minW="100vw"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bgGradient="linear(to-br, green.300 70%, yellow.100 100%)"
      position="relative"
      overflow="hidden"
      p={0}
      m={0}
    >
      <Image
        src="https://img.icons8.com/ios-filled/120/8d8d8d/tractor.png"
        alt="Tractor"
        opacity={0.09}
        position="absolute"
        bottom="2%"
        right="3%"
        zIndex={0}
        pointerEvents="none"
        display={{ base: "none", md: "block" }}
      />

      <Box
        zIndex={1}
        bg="white"
        borderRadius="xl"
        boxShadow="2xl"
        px={{ base: 5, sm: 10 }}
        py={{ base: 8, sm: 10 }}
        w="100%"
        maxW="900px"
        mx="auto"
        textAlign="center"
        backdropFilter="blur(3px)"
      >

        <Heading
          as="h1"
          fontSize={{ base: "xl", sm: "2xl" }}
          fontWeight="bold"
          color="green.700"
          mb={2}
          letterSpacing="wider"
        >
          Agriculture Hub
        </Heading>
        <Text
          fontSize="md"
          color="gray.700"
          mb={5}
        >
          Your partner in ensuring the health and productivity of agriculture.
        </Text>

        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mb={8}>
          {diseaseSections.map(section => (
            <Box
              key={section.key}
              bg={section.bg}
              color={section.color}
              borderRadius="lg"
              boxShadow="md"
              p={6}
              display="flex"
              flexDirection="column"
              alignItems="center"
              transition="transform 0.2s, background 0.2s"
              cursor="pointer"
              _hover={{ transform: 'scale(1.04)', boxShadow: 'xl', bg: section.hoverBg }}
              onClick={() => handleCardClick(section.category)}
            >
              <Image
                src={section.icon}
                alt={section.title}
                boxSize="48px"
                mb={3}
                borderRadius="full"
                bg="white"
                p={2}
              />
              <Heading as="h3" fontSize="lg" mb={2} fontWeight="semibold" letterSpacing="wide">
                {section.title}
              </Heading>
              <Text fontSize="sm" opacity={0.95}>
                {section.description}
              </Text>
            </Box>
          ))}
        </SimpleGrid>

        <HStack justifyContent="center" mt={4}>
          <Button
            colorScheme="yellow"
            size="md"
            onClick={handleGetStartedClick}
            borderRadius="full"
            px={7}
            fontWeight="bold"
            boxShadow="md"
            _hover={{ bg: 'yellow.300', color: 'black' }}
            _active={{ bg: 'yellow.400' }}
          >
            Get Started
          </Button>
        </HStack>
      </Box>
    </Box>
  );
};

export default HomePage;
