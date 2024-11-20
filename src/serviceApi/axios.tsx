import axios from "axios";
import { parseCookies } from "nookies";
import { toast } from "react-hot-toast";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export  function getAPIClient(ctx: any) {
	const { "acl0": token } = parseCookies(ctx);
	
	const api = axios.create({
		baseURL: process.env.NEXT_PUBLIC_API_URL,
		headers: {
			"Access-Control-Allow-Origin": "*",
			"Content-Type": "application/json",
			"Access-Control-Allow-Methods": "*",
			"Access-Control-Allow-Headers": "*",
			"Authorization": token ? `Bearer ${token}` : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5hbmRvcHMyNUBob3RtYWlsLmNvbSIsInN1YiI6IjYzYmM5ZWE3ZmRkODlkMzFhZjYwYzk1NiIsImlhdCI6MTcwODQyMzg2OCwiZXhwIjoxNzA4NDI3NDY4fQ.oqAoR9l2cw08lgRDBrpuUsJddLtCb4qUk8ZTS03UHyI'
		},
	});

	// if (token) {
	// 	api.defaults.headers["Authorization"] = `Bearer ${token}`;
	//   }
	

	api.interceptors.response.use(
		(response) => response,
		(error) => {
			if (error.response.status === 401) {
				toast.error("O tempo de sua seção expirou, faça login novamente.");
				return {
					redirect: {
						destination: "/login",
						permanent: false,
					},
				};
			}
			return Promise.reject(error);
		},
	);

	return api;
}
