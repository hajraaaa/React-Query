import { useState } from 'react';
import { useQueryClient, useMutation } from "react-query";
import { Form, FormGroup, Label, Input, Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";


const EditModal = ({ userID }) => {
    const queryClient = useQueryClient()
    const query = queryClient.getQueryData('User')
    const currData = query.find(x => x.id === userID)

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const mutation = useMutation(async newUser => {
        const rawResponse = await fetch(`http://localhost:3004/users/${userID}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        });
        const content = await rawResponse.json();
        console.log('response from the endppoint', content);
    },
        {
            onSuccess: () => {
                return queryClient.invalidateQueries(['User'])
            }
        }
    )

    const handleSubmit = (event) => {
        event.preventDefault();

        const {
            id: { value: userID },
            name: { value: userName },
            email: { value: userEmail },
            age: { value: userAge }
        } = event.target.elements;

        mutation.mutate({ id: userID, name: userName, email: userEmail, age: userAge })
        toggle()
    }

    return (
        <>
            <Button color="success" onClick={toggle}>
                Edit
            </Button>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Update User Details</ModalHeader>
                <ModalBody>
                    <Form className="border border-2 border-dark rounded p-4" onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label for="userID">
                                Enter your ID:
                            </Label>
                            <Input
                                id="userID"
                                name="id"
                                placeholder="User ID"
                                type="text"
                                defaultValue={currData.id}
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label for="userName">
                                Enter Your Name:
                            </Label>
                            <Input
                                id="userName"
                                name="name"
                                placeholder="User Name"
                                type="text"
                                defaultValue={currData.name}
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label for="userEmail">
                                Enter Your Email:
                            </Label>
                            <Input
                                id="userEmail"
                                name="email"
                                placeholder="User Email"
                                type="text"
                                defaultValue={currData.email}
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label for="userAge">
                                Enter Your Age:
                            </Label>
                            <Input
                                id="userAge"
                                name="age"
                                placeholder="User Age"
                                type="text"
                                defaultValue={currData.age}
                            />
                        </FormGroup>

                        <Button className="d-block mx-auto" color="primary" outline>
                            Update
                        </Button>
                    </Form>
                </ModalBody>
                <ModalFooter>

                    <Button color="secondary" onClick={toggle}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    );
}

export default EditModal
