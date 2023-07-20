import React, { useEffect, useState } from "react";
import "./LeftPart.css";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Text,
  Box,
  Image,
  Button,
  Flex,
  Avatar,
} from "@chakra-ui/react";

import { FaHeart, FaComment } from "react-icons/fa";
import { TbCurrencyDollar } from "react-icons/tb";
import ArtistDetails from "./ArtistDetails";

let artistData = {
  name: "John Doe",
  bio: "Talented artist passionate about creating beautiful art.",
  isFavorite: false,
};

export default function LeftPart() {
  const [isFavorite, setIsFavorite] = useState(artistData.isFavorite);

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

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
        <Image
          m="auto"
          className="img"
          src="https://png.pngtree.com/thumb_back/fh260/background/20210902/pngtree-summer-mountain-sunrise-and-sunset-scenery-clouds-natural-scenery-natural-scenery-image_789792.jpg"
        />
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
            // rightIcon={<TbCurrencyDollar />}
            sx={{
              _hover: {
                backgroundColor: "#319795",
                // backgroundColor: "#0066FF",
              },
            }}
          >
            Purchase for <TbCurrencyDollar/> 1.8
          </Button>
        </Flex>

        {/* Artist Details */}
        <ArtistDetails />
      </Box>
    </Box>
  );
}
