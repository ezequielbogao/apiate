import axios from "axios";

export const getSystems = async (documento) => {
	try {
		const response = await axios.get(`${import.meta.env.VITE_API_URL}/atenea/api/persona/${documento}/sistemas`);
		return response.data.data[0];
	} catch (err) {
		throw new Error(
			err.response ? err.response.data.message : "Error desconocido"
		);
	}
};

export const getAdicionales = async (documento) => {
	try {
		const response = await axios.get(`${import.meta.env.VITE_API_URL}/atenea/api/persona/${documento}/adicionales`);
		return response.data.data;
	} catch (err) {
		throw new Error(
			err.response ? err.response.data.message : "Error desconocido"
		);
	}
};
