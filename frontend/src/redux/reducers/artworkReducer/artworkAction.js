import {
  FETCH_ARTS_REQUEST,
  FETCH_ARTS_SUCCESS,
  FETCH_ARTS_FAILURE,
  UPDATE_ART_FAILURE,
  POST_ART_REQUEST,
  POST_ART_SUCCESS,
  POST_ART_FAILURE,
  DELETE_ART_FAILURE,
  DELETE_ART_REQUEST,
  DELETE_ART_SUCCESS,
  FETCH_ALLARTS_SUCCESS,
  UPDATE_ART_SUCCESS,
} from "../../actionTypes";

import axios from "axios";

// Set the token as a header in the request
const accessToken = JSON.parse(localStorage.getItem("token"));

const config = {
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
};
const url = `http://localhost:8080`;

// For fetching arts in profile page
export const fetchArts = (dispatch) => {
  dispatch({ type: FETCH_ARTS_REQUEST });

  axios
    .get(`${url}/arts/profile`, config)
    .then((response) => {
      dispatch({
        type: FETCH_ARTS_SUCCESS,
        payload: response.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: FETCH_ARTS_FAILURE,
        payload: error.message,
      });
    });
};

// For fetching all arts

export const fetchAllArts = (dispatch) => {
  dispatch({ type: FETCH_ARTS_REQUEST });

  return axios
    .get(`${url}/arts/getarts`, config)
    .then((response) => {
      dispatch({
        type: FETCH_ALLARTS_SUCCESS,
        payload: response.data,
      });

      return response.data;
    })
    .catch((error) => {
      dispatch({
        type: FETCH_ARTS_FAILURE,
        payload: error.message,
      });
    });
};

export const postArt = (artData) => (dispatch) => {
  dispatch({ type: POST_ART_REQUEST });
  console.log("inside postArt function", artData);
  axios
    .post(`${url}/arts/addart`, artData, config)
    .then((response) => {
      dispatch({
        type: POST_ART_SUCCESS,
        payload: response.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: POST_ART_FAILURE,
        payload: error.message,
      });
    });
};

export const deleteArt = (id) => (dispatch) => {
  console.log("inside deleteArt function id is", id);
  dispatch({ type: DELETE_ART_REQUEST });
  axios
    .delete(`${url}/arts/${id}`, config)
    .then((response) => {
      const { msg, deletedpost } = response.data;
      console.log("deletedpost", deletedpost);
      console.log(msg); // "Post deleted successfully"
      dispatch({
        type: DELETE_ART_SUCCESS,
        payload: id,
      });
    })
    .catch((error) => {
      console.error("Error deleting post:", error.message);
      dispatch({
        type: DELETE_ART_FAILURE,
        payload: error.message,
      });
    });
};

export const patchArt = (id, data) => (dispatch) => {
  console.log("inside patchArt function id is", id);
  dispatch({ type: DELETE_ART_REQUEST });

  axios
    .patch(`${url}/arts/${id}`, data, config)
    .then((response) => {
      const updatedart = response.data.updatedart;
      dispatch({
        type: UPDATE_ART_SUCCESS,
        payload: updatedart,
      });
    })
    .catch((error) => {
      dispatch({
        type: UPDATE_ART_FAILURE,
        error: error.message,
      });
    });
};

// productApi.js
export async function getProductById(productId) {
  try {
    console.log(config);
    const response = await fetch(`${url}/arts/${productId}`, config);

    if (response.ok) {
      const productData = await response.json();
      console.log("product data", productData);
      return productData;
    } else if (response.status === 404) {
      return null; // Product with the specified ID not found
    } else {
      // Handle other possible error cases
      console.error(`Error: ${response.status} - ${response.statusText}`);
      return null;
    }
  } catch (error) {
    console.error(`Error: ${error}`);
    return null;
  }
}

// Like function

export const handleLike = async (id, userId) => {
  try {
    // Make a POST request to the backend API to like/unlike the artwork
    console.log("inside handleLike", userId, id);
    const response = await axios.post(`${url}/arts/${id}/like`, userId, config);
    return response;
  } catch (error) {
    console.error("Error liking/unliking artwork:", error);
  }
};

// script.js
export async function postComment(postId, commentText) {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log("inside post comment function", user);
  try {
    // Prepare the request data

    const requestData = {
      createdby: user.name,
      comment_text: commentText,
      comment_creator_img: user.profilePicture,
    };

    // Send the POST request to your backend API
    const response = await axios.post(
      `${url}/arts/${postId}/comments`,
      requestData,
      config
    );

    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getComments(postId) {
  try {
    // Replace 'yourApiEndpoint' with the actual endpoint to get comments for a post
    return await axios.get(`${url}/arts/${postId}/comments`, config);
  } catch (error) {
    throw error;
  }
}
