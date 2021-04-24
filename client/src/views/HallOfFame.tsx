import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  StatArrow,

} from "@chakra-ui/react"

interface User {
  name: string,
  points: number,

}

export const HallOfFame = () => {

  const [users, setUsers] = useState<User[]>([]);

  // useEffect(() => {
  //   axios.get('/api/users')
  //     .then(({ users }) => setUsers(users));
  // }, [users])
  useEffect(() => {
    const usersFromApi = [
      {
        name: 'bob',
        points: 25
      },
      {
        name: 'ana',
        points: 15
      },
      {
        name: 'roger',
        points: 35
      },
      {
        name: 'kuciapka',
        points: 10
      },
      {
        name: 'morgoth',
        points: 35100
      },
    ];
    setUsers(usersFromApi);
  }, [])


  enum sortDirection {
    ASC, DESC
  }
  const [sortingDirection, setSortingDirection] = useState<sortDirection>(sortDirection.ASC);


  const sortByUsername = () => {
    setSortingDirection(prev => {
      if (prev === sortDirection.ASC) return sortDirection.DESC
      else return sortDirection.ASC
    })
    setIsSortedByPoints(false);
    const sortedUsersByName = sortingDirection === sortDirection.ASC ?
      users.sort((u1, u2) => u1.name.localeCompare(u2.name)) :
      users.sort((u1, u2) => u2.name.localeCompare(u1.name));

    setUsers(sortedUsersByName);
  }

  const sortByPoints = () => {
    setSortingDirection(prev => {
      if (prev === sortDirection.ASC) return sortDirection.DESC
      else return sortDirection.ASC
    })
    setIsSortedByPoints(true);
    const sortedUsersByPoints = sortingDirection === sortDirection.DESC ?
      users.sort((u1, u2) => u2.points - u1.points) :
      users.sort((u1, u2) => u1.points - u2.points);

    setUsers(sortedUsersByPoints);
  }

  const { isOpen, onOpen, onClose } = useDisclosure()

  const [isSortedByPoints, setIsSortedByPoints] = useState(true);

  const sortingDirectionIcon = sortingDirection === sortDirection.DESC
    ? <StatArrow type="decrease" />
    : <StatArrow type="increase" />

  const displayConditionalArrow = (value: "points" | "username") => {
    if (value === "points" && isSortedByPoints) {
      return sortingDirectionIcon;
    }
    else if (value === "username" && !isSortedByPoints) {
      return sortingDirectionIcon;
    }
  }

  return (
    <>
      <Modal isOpen={true} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Hall of Fame</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Table
              variant="striped"
              colorScheme="teal"
              size="sm">
              <Thead>
                <Tr>
                  <Th>Id</Th>
                  <Th onClick={sortByUsername}>
                    Username
                    {displayConditionalArrow("username")}</Th>
                  <Th>Badges</Th>
                  <Th isNumeric onClick={sortByPoints}>Points{displayConditionalArrow("points")}</Th>
                </Tr>
              </Thead>
              <Tbody>
                {users.map((user, index) => {
                  return (
                    <Tr>
                      <Td>{index + 1}</Td>
                      <Td>{user.name}</Td>
                      <Td>*bages to be*</Td>
                      <Td isNumeric>{user.points}</Td>
                    </Tr>)
                })}
              </Tbody>
            </Table>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}