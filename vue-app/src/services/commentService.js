import axios from "@/plugins/axios.js";

export async function postComment(commentData, prod_id, user_id) {
  const response = axios.post("/api/postcomment", commentData, {
    params: { user_id, prod_id }
  });
  return await response;
}

export async function getAllComments(prod_id) {
  const response = axios.get("/api/getcomments", { params: { prod_id } });
  return await response;
}
