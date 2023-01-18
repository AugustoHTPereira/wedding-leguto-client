
import { useCallback, useState } from "react"
import { Box, Button, CircularProgress, Divider, Flex, FormControl, FormLabel, HStack, IconButton, StackItem, Switch, Text, VStack, Image } from "@chakra-ui/react"
import { useDropzone } from "react-dropzone";
import { CheckCircleIcon, DeleteIcon } from "@chakra-ui/icons";
import { uniqueId } from "lodash";
import { filesize } from "filesize";

export interface UploadedFile {
    id: string,
    size: string,
    file: File,
    preview: string,
    uploaded: boolean,
    progress: number
}

interface FileUploadContainerProps {
    onUpload?: (files: UploadedFile[]) => Promise<void>,
}

const FileUploadContainer = ({ onUpload }: FileUploadContainerProps) => {
    const [previews, setPreviews] = useState<UploadedFile[]>([]);
    const [isUploading, setIsUploading] = useState<boolean>(false);

    const onDropAccepted = useCallback((acceptedFiles: File[]) => {
        setPreviews(acceptedFiles.map(f => ({
            file: f,
            id: uniqueId('file'),
            size: filesize(f.size).toString(),
            preview: URL.createObjectURL(f),
            progress: 0,
            uploaded: false,
        })));
    }, [])

    const {
        getRootProps, getInputProps, isDragActive, isFocused, isDragReject
    } = useDropzone({
        accept: { 'image/*': [] },
        onDropAccepted
    });

    const handleRemovePreviewFile = (id: string) => {
        setPreviews(previews?.filter(x => x.id !== id));
    }

    const handleUpload = async () => {
        setIsUploading(true);
        try {
            !!onUpload && await onUpload(previews);
            setPreviews([]);
        } catch (error: any) {
            alert(error.message)
        } finally {
            setIsUploading(false);
        }
    }

    return (
        <>
            <Flex {...getRootProps()} 
                bg='white' 
                h='120px' 
                w='full' 
                cursor='pointer'
                borderRadius='base'
                border='2px solid'
                borderColor={isDragActive || isFocused ? 'gray.300' : isDragReject ? 'red.400' : 'gray.100'}
                color={isDragActive || isFocused ? 'gray.500': isDragReject ? 'red.400' : 'gray.400'}
                align='center' 
                textAlign='center'
                justify='center'>
                <input {...getInputProps()} type='file' />

                {
                    isDragActive ?
                    <p>Você já pode soltar os arquivos</p> :
                    isDragReject ?
                    <p>Tipo de arquivo não suportado</p> :
                    <p>Arraste os arquivos aqui, ou clique para selecionar</p>
                }
            </Flex>

            {
                previews.length > 0 && (
                    <>
                        <VStack w='full' mt='4'>
                            {
                                previews.map(preview => (
                                    <StackItem key={preview.id} w='full' bg='white' borderRadius='base' boxShadow='sm' p='2' pr='3'>
                                        <Flex h='55' alignItems='center'>
                                            <Box bg='gray.100' w='55px' h='55px' minW='55px' borderRadius='base' overflow='hidden'>
                                                <Image src={preview.preview} alt={preview.file.name} width='55' height='55' />
                                            </Box>
                                            <Box flex='1' ml='3' pr='4'>
                                                <Text fontWeight='semibold' color='gray.700' fontSize='sm' noOfLines={1}>
                                                    {preview.file.name}
                                                </Text>
                                                <Text fontSize='xs' color='gray.400'>
                                                    {preview.size}
                                                </Text>
                                            </Box>

                                            <Flex align='center'>
                                                <FormControl display='flex' alignItems='center' mr='2' isDisabled={isUploading}>
                                                    <FormLabel htmlFor='email-alerts' mb='0'>
                                                        público
                                                    </FormLabel>
                                                    <Switch id='email-alerts' disabled defaultChecked />
                                                </FormControl>

                                                {
                                                    isUploading ? 
                                                        <CircularProgress size='18px' color='teal' thickness='11px' isIndeterminate /> : 
                                                    !preview.uploaded ?
                                                        <IconButton onClick={() => handleRemovePreviewFile(preview.id)} aria-label="delete-file" colorScheme='red' icon={<DeleteIcon />} variant='ghost' size='sm' /> :
                                                        <CheckCircleIcon color='green.400' />
                                                }
                                            </Flex>
                                        </Flex>
                                    </StackItem>
                                ))
                            }
                        </VStack>

                        <Flex justifyContent='end' mt='4'>
                            <Button w={{base: 'full', md: 'max'}} colorScheme='teal' onClick={handleUpload} isLoading={isUploading}>
                                Enviar
                            </Button>
                        </Flex>
                    </>
                )
            }
        </>
    )
}

export default FileUploadContainer;