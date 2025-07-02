import { useState, useRef, useEffect } from 'react';
import {
  Box, Button, Input, useToast, Heading, VStack, HStack, Text,
  IconButton, Center, Textarea, Select, useColorModeValue, Alert, AlertIcon, AlertTitle, AlertDescription, Stack
} from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import { useLocation } from 'react-router-dom';

// Example agriculture background image (replace with your own if desired)
const AGRI_BG_URL = 'https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&w=1500&q=80';

const CATEGORY_OPTIONS = ['Paddy', 'Cassava', 'Poultry', 'Pest', 
  'Mango', 'Sugarcane','Tea'];

function getCategoryFromQuery(search) {
  const params = new URLSearchParams(search);
  const category = params.get('category');
  if (CATEGORY_OPTIONS.includes(category)) return category;
  return '';
}

const FileUpload = () => {
  const location = useLocation();
  const initialCategory = getCategoryFromQuery(location.search);

  const [selectedFile, setSelectedFile] = useState(null);
  const [fileDescription, setFileDescription] = useState('');
  const [fileSize] = useState(50 * 1024 * 1024); // 50MB
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [isCategoryDisabled, setIsCategoryDisabled] = useState(!!initialCategory);
  const toast = useToast();
  const fileInputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  const [prediction, setPrediction] = useState(null);
  const [predictionError, setPredictionError] = useState(null);

  // Themed colors
  const borderColor = useColorModeValue('green.200', 'green.700');
  const accentColor = useColorModeValue('green.700', 'green.400');
  const headingColor = useColorModeValue('green.800', 'yellow.300');

  useEffect(() => {
    const cat = getCategoryFromQuery(location.search);
    setSelectedCategory(cat);
    setIsCategoryDisabled(!!cat);
  }, [location.search]);

  const handleFileChange = (event) => {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      if (file.size > fileSize) {
        toast({
          title: 'File Size Exceeded',
          description: "This file exceeds the 50 MB limit and can’t be processed. Please select a file smaller than 50 MB.",
          status: 'warning',
          duration: 5000
        });
        setSelectedFile(null);
        fileInputRef.current.value = '';
      } else {
        setSelectedFile(file);
      }
    } else {
      setSelectedFile(null);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile  || !selectedCategory) {
      toast({ title: 'Missing Information', description: 'Please fill in all required fields.', status: 'warning', duration: 5000 });
      return;
    }
    setIsLoading(true);
    setPrediction(null);
    setPredictionError(null);

    let fileDescription2 = '';

    if (!fileDescription.trim()) {
      fileDescription2 = selectedFile.name; // Use file name if no description provided
    }
    else {
      fileDescription2 = fileDescription.trim();
    }

    const formData = new FormData();
    formData.append('file_data', selectedFile);
    formData.append('file_description', fileDescription2);
    formData.append('category', selectedCategory);
    try {
      const response = await fetch(import.meta.env.VITE_UPLOAD_URL, { method: 'POST', body: formData });
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      if (data && data.prediction) {
        setPrediction(data.prediction);
      } else {
        setPredictionError('Prediction not found in server response.');
        toast({ title: 'Upload succeeded, but no prediction returned.', status: 'warning', duration: 5000 });
      }
    } catch (error) {
      setPredictionError(error.message || 'An unexpected error occurred.');
      toast({ title: 'Error uploading file.', description: error.message || 'An unexpected error occurred.', status: 'error', duration: 5000 });
    } finally {
      setIsLoading(false);
      setSelectedFile(null);
      setFileDescription('');
      if (!initialCategory) setSelectedCategory('');
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setFileDescription('');
    setPrediction(null);
    setPredictionError(null);
    setSelectedCategory('');
    setIsCategoryDisabled(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <Box
      minH="100vh"
      w="100vw"
      position="relative"
      bg="green.100" // fallback color for slow connections
      sx={{
        backgroundImage: `url('${AGRI_BG_URL}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Overlay for readability */}
      <Box
        position="absolute"
        top={0}
        left={0}
        w="100%"
        h="100%"
        bg="rgba(0, 64, 32, 0.60)"
        zIndex={0}
      />
      {/* Main content */}
      <Center minH="100vh" position="relative" zIndex={1}>
        <VStack spacing={{ base: 6, md: 8 }} w="full" maxW="lg" px={{ base: 2, md: 0 }}>
          <Box
            w="full"
            borderWidth={2}
            borderRadius="2xl"
            overflow="hidden"
            p={{ base: 4, md: 8 }}
            boxShadow="2xl"
            bg="white"
            borderColor={borderColor}
            minW={{ base: '90vw', md: '400px' }}
            maxW={{ base: '95vw', md: 'lg' }}
            opacity={0.97}
          >
            <Heading
              as="h3"
              size={{ base: 'md', md: 'lg' }}
              mb={4}
              textAlign="center"
              color={headingColor}
              fontWeight="extrabold"
              letterSpacing="wide"
              fontFamily="Inter, sans-serif"
            >
              {import.meta.env.VITE_TITLE || 'Agriculture Hub Upload'}
            </Heading>
            <form onSubmit={handleSubmit}>
              <VStack spacing={{ base: 4, md: 6 }} align="stretch">
                <Text fontWeight="semibold" fontSize={{ base: 'sm', md: 'md' }} color="green.700">Upload File *</Text>
                <Input
                  type="file"
                  onChange={handleFileChange}
                  ref={fileInputRef}
                  variant="filled"
                  accept={import.meta.env.VITE_ACCEPTED_FILE_TYPES}
                  bg="green.50"
                  borderColor="green.200"
                  _hover={{ borderColor: accentColor }}
                  rounded="lg"
                  fontSize={{ base: 'sm', md: 'md' }}
                />
                {selectedFile && (
                  <HStack justifyContent="space-between" alignItems="center">
                    <Text fontWeight="medium" fontSize="sm" color="green.800">{selectedFile.name}</Text>
                    <IconButton
                      icon={<CloseIcon />}
                      isRound
                      size="sm"
                      onClick={() => { setSelectedFile(null); fileInputRef.current.value = ''; }}
                      aria-label="Remove File"
                      colorScheme="red"
                    />
                  </HStack>
                )}

                <Text fontWeight="semibold" fontSize={{ base: 'sm', md: 'md' }} color="green.700">Select Category *</Text>
                <Select
                  placeholder="Select category"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  variant="filled"
                  size="md"
                  bg="green.50"
                  borderColor="green.200"
                  _hover={{ borderColor: accentColor }}
                  rounded="lg"
                  color="green.800"
                  isDisabled={isCategoryDisabled}
                  fontSize={{ base: 'sm', md: 'md' }}
                >
                  {CATEGORY_OPTIONS.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </Select>

                <Text fontWeight="semibold" fontSize={{ base: 'sm', md: 'md' }} color="green.700">Enter File Description</Text>
                <Textarea
                  placeholder="Enter file description..."
                  value={fileDescription}
                  onChange={(e) => setFileDescription(e.target.value)}
                  variant="filled"
                  size="md"
                  bg="green.50"
                  borderColor="green.200"
                  _hover={{ borderColor: accentColor }}
                  rounded="lg"
                  color="green.800"
                  fontSize={{ base: 'sm', md: 'md' }}
                />
                {/* Responsive button stack */}
                <Stack direction={{ base: 'column', sm: 'row' }} spacing={4} pt={2}>
                  <Button
                    type="submit"
                    colorScheme="green"
                    bg={accentColor}
                    color="white"
                    isFullWidth
                    isDisabled={!selectedFile  || !selectedCategory}
                    isLoading={isLoading}
                    rounded="full"
                    fontWeight="bold"
                    fontSize={{ base: 'md', md: 'lg' }}
                    shadow="md"
                    _hover={{ bg: 'green.900' }}
                  >
                    Upload
                  </Button>
                  <Button
                    type="button"
                    colorScheme="gray"
                    variant="outline"
                    isFullWidth
                    rounded="full"
                    fontWeight="bold"
                    fontSize={{ base: 'md', md: 'lg' }}
                    shadow="md"
                    onClick={handleReset}
                  >
                    Reset
                  </Button>
                </Stack>
              </VStack>
            </form>
          </Box>

          {(prediction || predictionError) && (
            <Box
              w="full"
              maxW={{ base: '95vw', md: 'lg' }}
              p={{ base: 4, md: 6 }}
              borderRadius="xl"
              borderWidth={2}
              borderColor={borderColor}
              boxShadow="lg"
              bg="white"
              mt={4}
              opacity={0.97}
            >
              <Heading as="h4" size={{ base: 'sm', md: 'md' }} mb={3} color={headingColor} fontWeight="bold" letterSpacing="wide">
                Prediction Result
              </Heading>
              {prediction && (
                <Alert status="success" borderRadius="md" mb={2}>
                  <AlertIcon />
                  <AlertTitle>Prediction:</AlertTitle>
                  <AlertDescription ml={2} fontWeight="semibold" color="green.700">
                    {prediction}
                  </AlertDescription>
                </Alert>
              )}
              {predictionError && (
                <Alert status="error" borderRadius="md">
                  <AlertIcon />
                  <AlertTitle>Error:</AlertTitle>
                  <AlertDescription ml={2}>{predictionError}</AlertDescription>
                </Alert>
              )}
            </Box>
          )}
        </VStack>
      </Center>
    </Box>
  );
};

export default FileUpload;
