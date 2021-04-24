import { Box, Flex, Heading } from "@chakra-ui/react"
import React from "react"
import styles from './RoomCard.style'
import cardStyle from './RoomCard.style'

type props ={
    id: string,
    name: string
}



const RoomCard = ({id, name}: props) => {



    return <Flex
        rounded='40px'
        w='300px'
        h='300px'
        justify='center'
        align='center'
        bg='brand.900'
        transform='scale(0.85)'
        transition="0.3s linear"
        _hover={{transform:"scale(1)", fontWeight: 'bold'}}
    ><Heading size='sm' sx={styles}>
        {name}
    </Heading>
    </Flex>
}

export default RoomCard
