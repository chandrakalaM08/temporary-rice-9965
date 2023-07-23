import React, { useEffect, useState } from "react";
import { Box, Image, Button, Flex } from "@chakra-ui/react";
import { FaHeart } from "react-icons/fa";
import ArtistDetails from "./ArtistDetails";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllArts, getProductById } from "../../redux/reducers/artworkReducer/artworkAction";

let artistData = {
  name: "John Doe",
  bio: "Talented artist passionate about creating beautiful art.",
  isFavorite: false,
};

export default function LeftPart() {
  const dispatch = useDispatch();
  const [isFavorite, setIsFavorite] = useState(artistData.isFavorite);

  useEffect(() => {
    dispatch(fetchAllArts);
  }, []);

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const { id } = useParams();
  const [product, setProduct] = useState({});
  const products = useSelector((store) => store.artworkReducer.allarts.arts);

  useEffect(() => {

    // const item = products?.find((element) => element._id === id);
    let item = getProductById(id).then((res) => {
      console.log("res is", res.art)
      setProduct(res.art)
    })
    console.log("item inside useEffect item is", item)

    console.log("item is", item)
  }, [id]);

  console.log("single product", product)


  // const handleToggleFavorite = () => {
  //   // Toggle the favorite status of the artist
  //   const updatedArtist = { ...artistData, isFavorite: !artistData.isFavorite };
  //   artistData = updatedArtist;
  //   console.log(artistData);
  // };

  // useEffect(() => {
  //   handleToggleFavorite();
  // }, []);

  return (
    <Box>
      <Box className="image">
        <Image m="auto" className="img" src={product?.image} />
      </Box>
      <Box m="9" mt="4">
        {/* likePurchaseBtn */}
        <Flex gap="4" className="likePurchaseBtn">
          <Button
            // mt="2"
            // size="sm"
            colorScheme="white"
            color="black"
            leftIcon={
              isFavorite ? <FaHeart color="red" /> : <FaHeart color="grey" />
            }
            sx={{
              _hover: {
                backgroundColor: "#319795",
                // backgroundColor: "#0066FF",
              },
            }}
            onClick={handleToggleFavorite}
          >
            {/* Add to Favorites */}
            {isFavorite ? "Added" : "Add to Favorites"}
          </Button>
          <Button
            // mt="2"
            // size="sm"
            colorScheme="white"
            color="black"
            sx={{
              _hover: {
                backgroundColor: "#319795",
                // backgroundColor: "#0066FF",
              },
            }}
          >
            Purchase for ₹ {product?.price}
          </Button>
        </Flex>

        {/* Artist Details */}
        <ArtistDetails {...product} />
      </Box>
    </Box>
  );
}
