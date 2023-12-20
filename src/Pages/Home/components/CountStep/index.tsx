import { Flex } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

const CountStep =  (props: PropsWithChildren) => (
    <Flex
        textAlign='center'
        background='#d6bdae'
        shadow='2xl'
        w='20'
        h='20'
        flexDir='column'
        justifyContent='center'
        alignItems='center'
        rounded='base'
        position='relative'
        overflow='hidden'
        color='gray.900'
        _after={{
            content: '""',
            background:'blackAlpha.100',
            position:'absolute',
            top: '50%',
            left: '0',
            bottom: '0',
            right: '0'
        }}
    >
        {props.children}
    </Flex>
)

export default CountStep;