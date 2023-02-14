// import { useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";

const AddUser = () => {
    // const [state, setState] = useState({})
    const navigate = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault();

        const {
            id: { value: userID },
            name: { value: userName },
            email: { value: userEmail },
            age: { value: userAge }
        } = event.target.elements;

        mutation.mutate({ id: userID, name: userName, email: userEmail, age: userAge })
        // setState({ id: userID, name: userName, email: userEmail, age: userAge })
        console.log(userID, userName, userEmail, userAge);
    }

    const mutation = useMutation(async newUser => {
        const rawResponse = await fetch('http://localhost:3004/users', {
            method: 'POST',
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
                return navigate('/')
            }
        })

    return (
        <>
            <div className="container w-50 mx-auto my-3">
                <h2 className="text-center mb-3">Add User</h2>
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
                        />
                    </FormGroup>

                    <Button className="d-block mx-auto" color="primary" outline>
                        Submit
                    </Button>
                </Form>
            </div>
        </>
    );
}

export default AddUser;
