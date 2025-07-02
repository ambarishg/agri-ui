import { useEffect, useState } from 'react';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Heading,
  Flex,
  IconButton,
  Spinner,
  Text,
  Input,
} from '@chakra-ui/react';
import { RepeatIcon, LinkIcon, DownloadIcon } from '@chakra-ui/icons'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FileList = () => {
  const [filesList, setFilesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  // Fetch files from the server
  const fetchFiles = async () => {
    setLoading(true);
    setError(null);
    const email = sessionStorage.getItem('email_address');
    
    if (!email) {
      navigate('/login'); // Redirect to login if email is null
      return;
    }

    try {
      const response = await axios.post(import.meta.env.VITE_GET_FILES_LIST, { email_address: email });
      if (!response.data) {
        throw new Error('No data received');
      }
      setFilesList(response.data || []); // Ensure it's an array
    } catch (error) {
      setError('Error fetching files: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch files on component mount
  useEffect(() => {
    fetchFiles();

    // Set interval to refresh the file list every minute
    const intervalId = setInterval(() => {
      console.log('Fetching files...');
      fetchFiles();
    }, 60000); // Refresh every minute (60000 milliseconds)

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filter files based on search query
  const filteredFiles = filesList.filter((file) =>
    file[0].toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box p={{ base: "4", md: "5" }}>
      <Flex direction={{ base: "column", md: "row" }} justifyContent="space-between" alignItems="center" mb={2}>
        <Heading mb={6} fontSize={{ base: "xl", md: "2xl" }}>Uploaded Files</Heading>
        <IconButton
          colorScheme="orange"
          aria-label="Refresh List"
          icon={<RepeatIcon />}
          onClick={fetchFiles}
          size={{ base: "md", md: "lg" }} // Responsive button size
        />
      </Flex>
      <Input
        placeholder="Search files..."
        value={searchQuery}
        onChange={handleSearchChange}
        mb={4}
        size={{ base: "md", md: "lg" }} // Responsive input size
      />
      {loading ? (
        <Spinner size="xl" />
      ) : error ? (
        <Text color="red.500">{error}</Text>
      ) : filesList.length === 0 ? (
        <Text>No files uploaded yet.</Text>
      ) : filteredFiles.length === 0 ? (
        <Text>No matching files found.</Text>
      ) : (
        <Box overflowX="auto"> {/* Allow horizontal scrolling for small screens */}
          <Table variant="striped" colorScheme="orange" size={{ base: "sm", md: "md" }} mt={2}>
            <Thead>
              <Tr>
                <Th py={3}>File Name</Th>
                <Th py={3}>Status</Th>
                <Th py={3}>Video</Th>
                <Th py={3}>Report</Th>
                <Th py={3}>Location</Th>
                <Th py={3}>Status Time</Th>              
              </Tr>
            </Thead>
            <Tbody>
              {filteredFiles.map((file, index) => (
                <Tr key={index} _hover={{ bg: 'orange.100' }}>
                  <Td>{file[0]}</Td>
                  <Td>{file[1]}</Td>
                  <Td>
                    {file[2] && file[2].trim() !== "" ? (
                      <a href={file[2]} target="_blank" rel="noopener noreferrer">
                        <LinkIcon boxSize={{ base: 4, md: 5 }} color="orange.500" />
                      </a>
                    ) : null}
                  </Td>
                  <Td>
                    <a href={file[3]} target="_blank" rel="noopener noreferrer">
                      <DownloadIcon boxSize={{ base: 4, md: 5 }} color="blue.500" />
                    </a>
                  </Td>
                  <Td>{file[4]}</Td>
                  <Td>{file[5]}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      )}
    </Box>
  );
};

export default FileList;
