
import React, { useEffect, useState } from 'react'
import { Image, Box, Flex, Button, Heading, Text, Input, InputGroup, InputLeftElement, Grid, GridItem } from '@chakra-ui/react'
import BgVideo from "../images/background.mp4"
import BgVideo2 from "../images/background2.mp4"
import { Search2Icon } from '@chakra-ui/icons'
import YouTube from 'react-youtube';
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllArts } from "../../redux/reducers/artworkReducer/artworkAction";
import { Link } from "react-router-dom";
import axios from "axios";
import { url } from "../url";
function Container() {

    const opts = {
        height: '130%',
        width: '100%',

    };


    const dispatch = useDispatch()
    // useEffect(() => {

    //     dispatch(fetchAllArts)
    // }, [])


    const allArts = useSelector((store => store.artworkReducer.allarts.arts))
    // const product = [{ "obj": "new obj" }]
    console.log("inside homepage products", allArts)


    const [search, setSearch] = useState();

    const [products, setProducts] = useState(allArts);
    useEffect(() => {
        console.log("allarts before fetchArts", allArts)
        dispatch(fetchAllArts).then((res) => {
            console.log("res inside dispatch", res)
            setProducts(res.arts)
        });
        // setProducts(allArts)
        console.log("allarts after fetchArts", allArts)
    }, []);

    const handleSearch = async () => {
        await axios
            .get(`${url}/arts/getarts`, {
                params: { creator_name: search },
            })
            .then((res) => setProducts(res.data.arts));
    };

    useEffect(() => {
        console.log("inside second useeffect", allArts)
        const debounce = setTimeout(() => {
            if (search) {
                handleSearch();
            }
            return () => clearTimeout(debounce);
        }, 2000);
    }, [search, products]);
    console.log("inside component: ", products)
    return (
        <>
            <Box mt={"5%"} w={"100%"} h={"80vh"}>
                {/* <video style={{ objectFit: "cover", height: "100%", width: "100%" }} src={BgVideo} autoPlay loop muted /> */}
                <video
                    style={{
                        objectFit: "cover",
                        height: "100%",
                        width: "100%",
                        filter: "brigthness(70%)",
                    }}
                    src={BgVideo2}
                    autoPlay
                    loop
                    muted
                />
                <Box
                    position={"absolute"}
                    w={"100%"}
                    h={"80vh"}
                    top={"20"}
                    textAlign={"center"}
                    alignItems={"center"}
                    color={"white"}
                >
                    <Flex width={"100%"} justify={"center"}>

                        <Flex w={"60%"} flexWrap={"wrap"} justifyContent={"space-evenly"} gap={"2%"}>
                            <Button borderRadius={"20px"} background={"rgba(0, 0, 0, .2)"} _hover={{ color: "black", bgColor: "white" }} color={"white"}><Text size={"md"}>Painting</Text></Button>
                            <Button borderRadius={"20px"} background={"rgba(0, 0, 0, .2)"} _hover={{ color: "black", bgColor: "white" }} color={"white"}><Text size={"md"}>Photography</Text></Button>
                            <Button borderRadius={"20px"} background={"rgba(0, 0, 0, .2)"} _hover={{ color: "black", bgColor: "white" }} color={"white"}><Text size={"md"}>Branding</Text></Button>
                            <Button borderRadius={"20px"} background={"rgba(0, 0, 0, .2)"} _hover={{ color: "black", bgColor: "white" }} color={"white"}><Text size={"md"}>Illustration</Text></Button>
                            <Button borderRadius={"20px"} background={"rgba(0, 0, 0, .2)"} _hover={{ color: "black", bgColor: "white" }} color={"white"}><Text size={"md"}>Modern Art</Text></Button>
                            <Button borderRadius={"20px"} background={"rgba(0, 0, 0, .2)"} _hover={{ color: "black", bgColor: "white" }} color={"white"}><Text size={"md"}>Typography</Text></Button>
                            <Button borderRadius={"20px"} background={"rgba(0, 0, 0, .2)"} _hover={{ color: "black", bgColor: "white" }} color={"white"}><Text size={"md"}>Design</Text></Button>

                        </Flex>


                    </Flex>
                    <Box pt={"3%"}>
                        <Heading>Explore the world’s leading </Heading>
                        <Heading>design portfolios</Heading>
                    </Box>
                    <Box pt={"3%"}>
                        <Text fontSize={"lg"}>
                            Millions of designers and agencies around the world showcase their
                            portfolio work{" "}
                        </Text>
                        <Text fontSize={"lg"}>
                            on ArtHub - the home to the world’s best design and creative
                            professionals.
                        </Text>
                    </Box>
                    <Flex pt={"3%"} justifyContent={"center"} w={"100%"}>
                        {/* <Input w={"60%"} variant='flushed' placeholder='Search Artists...' /> */}
                        <InputGroup w={"45%"}>
                            <Input
                                onChange={(e) => setSearch(e.target.value)}
                                color={"black"}
                                _focus={{ bg: "white", border: "0px solid white" }}
                                bgColor={"white"}
                                borderRadius={"50px"}
                                variant="filled"
                                placeholder="Search..."
                            />
                            <InputLeftElement>
                                {/* <CheckIcon color='green.500' /> */}
                                <Search2Icon color="grey" />
                            </InputLeftElement>
                        </InputGroup>
                    </Flex>
                </Box>
            </Box >
            <Flex width={"100%"} justifyContent={"center"}>
                <Grid
                    w={"90%"}
                    mt={"5%"}
                    templateColumns={{
                        base: "repeat(1,1fr)",
                        sm: "repeat(2,1fr)",
                        md: "repeat(3, 1fr)",
                        lg: "repeat(4, 1fr)",
                    }}
                    gap={6}
                >
                    {products?.map((art) => {
                        return (
                            <GridItem
                                w="100%"
                                h="auto"
                                transition="transform .2s"
                                _hover={{ transform: "scale(1.1)" }}
                                key={art._id}
                            >
                                <Link to={`product/${art._id}`}>
                                    {" "}
                                    <Image src={art.image} alt="art-pic" />{" "}
                                </Link>
                                <Flex p={"5%"} pt={"2%"} justifyContent={"space-between"}>
                                    <Text as={"b"}>{art.creator_name}</Text>
                                    <Flex>
                                        <AiFillHeart color="red" size={"20px"} />
                                        <Text>12</Text>
                                    </Flex>
                                </Flex>
                            </GridItem>
                        );
                    })}
                </Grid>
            </Flex>
            <Box
                textAlign={"center"}
                w={"90%"}
                m={"auto"}
                mt={"5%"}
                h={{ base: "70vh", md: "40vh" }}
            >
                <Text className="colorprop" fontSize={"4xl"} as={"b"}>
                    Feedback{" "}
                </Text>
                <Flex
                    justifyContent={"space-evenly"}
                    alignItems={"center"}
                    w={"100%"}
                    m={"auto"}
                    mt={"3%"}
                    direction={{ base: "column", md: "row" }}
                >
                    <Box mb={{ base: "5%", md: "1%" }} w={{ base: "60%", md: "20%" }}>
                        <YouTube videoId="WynO-PamxfM" opts={opts} />
                    </Box>
                    <Box mb={{ base: "5%", md: "1%" }} w={{ base: "60%", md: "20%" }}>
                        <YouTube videoId="BMkXEtFiBNg" opts={opts} />
                    </Box>
                    <Box mb={{ base: "5%", md: "1%" }} w={{ base: "60%", md: "20%" }}>
                        <YouTube videoId="p1bsCYFTh0g" opts={opts} />
                    </Box>
                </Flex>
            </Box>
        </>
        // <iframe width="560" height="315" src="https://www.youtube.com/embed/WynO-PamxfM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
    );
}

export default Container;
