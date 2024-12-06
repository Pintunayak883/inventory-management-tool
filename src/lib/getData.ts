import axios from "axios";

export async function GetData(endpoint) {
  const baseUrl = "http://localhost:3000";
  try {
    const res = await axios.get(`${baseUrl}/api/${endpoint}`);
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
}
