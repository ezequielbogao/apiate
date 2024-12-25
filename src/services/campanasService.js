import axios from "axios";

const BASE_URL = "http://localhost:5000/atenea/api";

export const setCampanasData = async (formData) => {
	try {
		const response = await axios.post(
			`${BASE_URL}/campania/data`,
			formData,
			{
				headers: {
					"Content-Type": "multipart/form-data",
				},
				responseType: "blob",
			}
		);
		return response;
	} catch (err) {
		throw new Error(
			err.response ? err.response.data.message : "Error desconocido"
		);
	}
};

