import React from "react";
import {
  Box,
  Container,
  Flex,
  Image,
  Button,
  Heading,
  Text,
} from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";

class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      datas: { id: 0, title: "", description: "", image: "", url: "" },
    };
  }

  getDataTodos = async () => {
    const { id } = this.props.params;
    try {
      const response = await fetch(`http://localhost:5000/todos/${id}`, {
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

  componentDidMount() {
    this.getDataTodos();
  }

  render() {
    return (
      <Container
        display={"flex"}
        my={12}
        maxW={"container.sm"}
        minH={"100vh"}
        flexDir={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        gap={8}
      >
        <Flex w={"full"} alignItems={"center"}>
          <Link to={"/"}>
            <Button my={4} ml={3} colorScheme="red">
              Back
            </Button>
          </Link>
        </Flex>
        <Flex flexDir={"column"} gap={4}>
          <Image src={this.state.datas.url} alt={this.state.datas.image} />
          <Heading>{this.state.datas.title}</Heading>
          <Box>
            {this.state.datas.description.split(/\r?\n/).map((data, id) => (
              <Box key={id}>
                {" "}
                {data !== "" ? (
                  <>
                    <Text pb={0}>{data}</Text>
                  </>
                ) : (
                  <br />
                )}
              </Box>
            ))}
          </Box>
        </Flex>
      </Container>
    );
  }
}

export default (props) => <Detail {...props} params={useParams()} />;
