import ApiManager from "./ApiManager";

export const adminUpdateProduct = async (formData, productID) => {
    try {
        console.log("formData:", formData);
        console.log("productID:", productID);

        const response = await ApiManager.axios.put(
            `/adminCrud/updateItem/${productID}`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        );

        return response.data; 
    } catch (error) {
        console.error("Error updating product:", error);
        return {
            status: error.response?.status || 500,
            message: error.response?.data?.error?.message || error.message || "An error occurred while updating the product.",
        };
    }
};
