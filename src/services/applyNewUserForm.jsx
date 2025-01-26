import router, { setAuthToken } from "./apiService";

 

async function AddnewUserApplyForm(formdata) {
  try {
    const response = await router.post("/user_apply_form", formdata );
    return response;
  } catch (error) {
    // Handle error, e.g., log it or throw a custom error
    console.error("Error in adding status:", error);
    throw error;
  }
}

async function GetnewUserApplyForm() {
    try {
      const response = await router.get("/user_apply_form" );
      return response.data;
    } catch (error) {
      // Handle error, e.g., log it or throw a custom error
      console.error("Error in getting status:", error);
      throw error;
    }
  }
  async function GetnewpartnerData() {
    try {
      const response = await router.get("/User-reg" );
      return response.data;
    } catch (error) {
      // Handle error, e.g., log it or throw a custom error
      console.error("Error in getting status:", error);
      throw error;
    }
  }

 



export {  AddnewUserApplyForm , GetnewUserApplyForm , GetnewpartnerData };
 
