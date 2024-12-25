import axios from "axios";

const BASE_URL = "http://localhost:5000/atenea/api/persona";

export const getSystems = async (documento) => {
	try {
		const response = await axios.get(`${BASE_URL}/${documento}/sistemas`);
		return response.data.data[0];
	} catch (err) {
		throw new Error(
			err.response ? err.response.data.message : "Error desconocido"
		);
	}
};

export const getAdicionales = async (documento) => {
	try {
		const response = await axios.get(`${BASE_URL}/${documento}/adicionales`);
		return response.data.data;
	} catch (err) {
		throw new Error(
			err.response ? err.response.data.message : "Error desconocido"
		);
	}
};
