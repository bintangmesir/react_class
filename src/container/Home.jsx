import React from "react";
import {
  Container,
  Flex,
  Center,
  Card,
  CardBody,
  Heading,
  Text,
  Button,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      datas: [],
    };
  }

  getDataTodos = async () => {
    try {
      const response = await fetch(`http://localhost:5000/todos`, {
        headers: {
          "Content-Type": "application/json",
          mode: "cors",
        },
      });
      const data = await response.json();
      this.setState({ datas: data });
    } catch (error) {
      console.log(error);
    }
  };

  deleteDataTodos = async (id) => {
    try {
      await fetch(`http://localhost:5000/todos/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          mode: "cors",
        },
      });
      this.getDataTodos();
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount() {
    this.getDataTodos();
  }

  render() {
    return (
      <Container
        display={"flex"}
        maxW={"container.sm"}
        minH={"100vh"}
        flexDir={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        gap={8}
      >
        <Card
          minW={"full"}
          shadow={"md"}
          borderWidth={"thin"}
          borderColor={"gray.400"}
        >
          <CardBody>
            <Center flexDir={"column"} my={4}>
              <Heading>Selamat Datang</Heading>
              <Text>Aplikasi Todo List</Text>
            </Center>
            <Center w="full">
              <Link to={"/add"}>
                <Button my={4} colorScheme="green">
                  Add
                </Button>
              </Link>
            </Center>
            <Flex flexDir={"column"} gap={4}>
              {this.state.datas.map((data, id) => (
                <Card
                  key={id}
                  shadow={"md"}
                  borderWidth={"thin"}
                  borderColor={"gray.400"}
                >
                  <CardBody display={"flex"} flexDir={"column"} gap={2}>
                    <Heading fontSize={"lg"}>{data?.title}</Heading>
                    <Flex alignItems={"center"} gap={2}>
                      <Link to={`/show/${data.id}`}>
                        <Button size="xs" colorScheme="blue">
                          Show
                        </Button>
                      </Link>
                      <Link to={`/edit/${data.id}`}>
                        <Button size="xs" colorScheme="green">
                          Edit
                        </Button>
                      </Link>
                      <Button
                        onClick={() => this.deleteDataTodos(data.id)}
                        size="xs"
                        colorScheme="red"
                      >
                        Delete
                      </Button>
                    </Flex>
                  </CardBody>
                </Card>
              ))}
            </Flex>
          </CardBody>
        </Card>
      </Container>
    );
  }
}
