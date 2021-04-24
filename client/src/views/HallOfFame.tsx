import { useEffect, useState } from 'react';
import firebase from 'firebase';
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
  StatArrow
} from '@chakra-ui/react';
interface User {
  displayName: string,
  email: string,
  points: number,

}

export const HallOfFame = () => {
  const [users, setUsers] = useState<User[]>([]);

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
      users.sort((u1, u2) => u1.displayName.localeCompare(u2.displayName)) :
      users.sort((u1, u2) => u2.displayName.localeCompare(u1.displayName));
    setUsers(sortedUsersByName);
  }

  const sortByPoints = () => {
    setSortingDirection(prev => {
      if (prev === sortDirection.ASC) return sortDirection.DESC
      else return sortDirection.ASC
    })
    setIsSortedByPoints(true);
    const sortedUsersByPoints = sortingDirection === sortDirection.ASC ?
      users.sort((u1, u2) => u1.points - u2.points) :
      users.sort((u1, u2) => u2.points - u1.points);
    setUsers(sortedUsersByPoints);
  }

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

  const [isOpen, setIsOpen] = useState(true);

  const onToggleIsOpen = () => setIsOpen(!isOpen);

  useEffect(() => {
    const fetchUsers = async () => {
      const ref = firebase.firestore().collection('Users');
      const docs = await ref.get();
      const myUsers = [];
      docs.forEach((doc) => {
        const user = doc.data();
        myUsers.push(user);
      })
      setUsers(myUsers);
    }
    fetchUsers();
  }, []);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onToggleIsOpen} isCentered>
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
                  <Th isNumeric onClick={sortByPoints}>Points{displayConditionalArrow("points")}</Th>
                </Tr>
              </Thead>
              <Tbody>
                {users.map((user, index) => {
                  return (
                    <Tr key={index}>
                      <Td>{index + 1}</Td>
                      <Td>{user.displayName}</Td>
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
              onClick={onToggleIsOpen}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}