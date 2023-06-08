import React from "react";
import {
  Container,
  Flex,
  FormControl,
  FormLabel,
  Card,
  CardBody,
  Center,
  Input,
  Button,
  Image,
  Heading,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default class AddForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      image: "",
      preview: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange = (e) => {
    if (!e.target.value) {
      alert("Please add a some text");
    } else {
      const inputValue = e.target.value;
      this.setState({ title: inputValue });
    }
  };

  handleTextareaChange = (e) => {
    if (!e.target.value) {
      alert("Please add a some text");
    } else {
      const inputValue = e.target.value;
      this.setState({ description: inputValue });
    }
  };

  handleImageChange = (e) => {
    if (!e.target.files) {
      alert("Please add a file image");
    } else {
      const inputValue = e.target.files[0];
      this.setState({ image: inputValue });
      this.setState({ preview: URL.createObjectURL(inputValue) });
    }
  };

  async handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", this.state.title);
    formData.append("description", this.state.description);
    formData.append("image", this.state.image);

    try {
      await fetch("http://localhost:5000/todos", {
        method: "POST",
        body: formData,
      });

      alert("Data Berhasil Ditambah");
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <>
        <Container
          display={"flex"}
          maxW={"container.sm"}
          minH={"100vh"}
          flexDir={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          gap={8}
          my={12}
        >
          <Card
            minW={"full"}
            shadow={"md"}
            borderWidth={"thin"}
            borderColor={"gray.400"}
          >
            <CardBody>
              <Center flexDir={"column"}>
                <Heading>Add Data</Heading>
                <Text>Aplikasi Todo List</Text>
                <Link to={"/"}>
                  <Button ml={3} my={4} colorScheme="green">
                    Back
                  </Button>
                </Link>
              </Center>
              <Flex flexDir={"column"} gap={4}>
                <form onSubmit={this.handleSubmit}>
                  <FormControl mb={4}>
                    <FormLabel>Title</FormLabel>
                    <Input
                      type="text"
                      onChange={this.handleInputChange}
                      placeholder="Input Something ..."
                    />
                  </FormControl>
                  <FormControl mb={4}>
                    <FormLabel>Description</FormLabel>
                    <Textarea
                      onChange={this.handleTextareaChange}
                      placeholder="Input Something ..."
                      size="sm"
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Image</FormLabel>
                    {this.state.preview === "" ? null : (
                      <Image
                        src={this.state.preview}
                        alt={this.state.preview}
                        w={"full"}
                        h={"auto"}
                        mb={4}
                      />
                    )}
                    <Input
                      pt={1}
                      pl={1}
                      type="file"
                      onChange={this.handleImageChange}
                      placeholder="Input Something ..."
                    />
                  </FormControl>
                  <Flex justifyContent={"flex-end"} mt={8}>
                    <Button colorScheme="teal" type="submit">
                      Save
                    </Button>
                  </Flex>
                </form>
              </Flex>
            </CardBody>
          </Card>
        </Container>
      </>
    );
  }
}
