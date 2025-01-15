import router, { setAuthToken } from "./apiService";

async function GetBillingDetailsData() {
  try {
    const response = await router.get("/billing_data");
    return response.data;
  } catch (error) {
    // Handle error, e.g., log it or throw a custom error
    console.error("Error in adding status:", error);
    throw error;
  }
}

async function updateBillingDetailsData(formdata) {
  try {

    const response = await router.put("/billing_data", formdata );
    return response;
  } catch (error) {
    // Handle error, e.g., log it or throw a custom error
    console.error("Error in adding status:", error);
    throw error;
  }
}

export { GetBillingDetailsData, updateBillingDetailsData };
