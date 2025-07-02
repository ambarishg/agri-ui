import { Box, VStack } from '@chakra-ui/react';
import FileUpload from './FileUpload';

const FileUploadList = () => {
  return (
    <VStack spacing={2} align="stretch" p={2} bg="gray.50" borderRadius="md" boxShadow="lg">
      
      <VStack spacing={2} align="stretch">
        <Box 
          p={2} 
          borderWidth={1} 
          borderColor="blue.300" 
          borderRadius="md" 
          bg="white"
          boxShadow="md"
          transition="0.2s"
          _hover={{ boxShadow: 'lg', borderColor: 'blue.500' }} // Hover effect
        >
          <FileUpload />
        </Box>
      </VStack>
    </VStack>
  );
};

export default FileUploadList;
