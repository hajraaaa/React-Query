import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { useQueryClient, useMutation } from 'react-query';
// import { useState, useCallback } from 'react'
import { useState } from 'react';


const ModalDelete = ({ userID }) => {
    const queryClient = useQueryClient();
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);
    const mutation = useMutation(async recordID => {
        const rawResponse = await fetch(`http://localhost:3004/users/${recordID}`, {
            method: 'DELETE',
            // headers: {
            //     'Accept': 'application/json',
            //     'Content-Type': 'application/json'
            // },
            // body: JSON.stringify(newUser)
        });
        const content = await rawResponse.json();
        console.log('response from the endppoint', content);
    }, {
        onSuccess: () => {
            return queryClient.invalidateQueries(['User'])
        }
    });

    const handleDelete = () => {
        console.log(userID)
        toggle();
        mutation.mutate(userID);
    }

    // const handleDelete = useCallback(() => {
    //     console.log(userID)
    //     toggle();
    //     mutation.mutate(userID);
    // }, [toggle, mutation, userID])

    return (
        <>
            <Button color="danger" onClick={toggle}>
                Delete
            </Button>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Confirmation</ModalHeader>
                <ModalBody>
                    ARE YOU SURE?
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleDelete}>
                        YES!
                    </Button>{' '}
                    <Button color="secondary" onClick={toggle}>
                        NO!
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    )
}

export default ModalDelete;
