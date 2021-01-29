import axios from "@/plugins/axios.js";

export async function getAllProducts() {
  const response = axios.get("/api/product");

  return await response;
}

export async function getAllBrands() {
  const response = axios.get("/api/brand");

  return await response;
}

export async function getProductDetails(prod_id) {
  const response = axios.get("/api/product/" + prod_id);

  return await response;
}
