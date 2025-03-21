import router from "./apiService";


 async function GetReportData(partnerEmail) {
    try {
      const response = await router.post(`/reportStatus`,
        {"partnerEmail":partnerEmail});
      return response.data;
    } catch (error) {
      // Handle error, e.g., log it or throw a custom error
      console.error("Error in getting status:", error);
      throw error;
    }
  }


  export { 
    GetReportData
    };
