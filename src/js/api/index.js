const BASE_URL = "http://localhost:3000/api";

// Request option
const HTTP_METHOD = {
	POST(data) {
		return {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		};
	},
	PUT(data) {
		return {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: data ? JSON.stringify(data) : null,
		};
	},
	DELETE() {
		return {
			method: "DELETE",
		};
	},
};

// fetch -> response 받아오기 + 에러 메시지
// 데이터를 받는 경우
const request = async (url, option) => {
	const response = await fetch(url, option);
	if (!response.ok) {
		alert("에러가 발생했습니다.");
		console.error(e);
	}
	return response.json();
};

// 데이터를 받지 않는 경우
const requestWithoutJson = async (url, option) => {
	const response = await fetch(url, option);
	if (!response.ok) {
		alert("에러가 발생했습니다.");
		console.error(e);
	}
	return response;
};

// 서버 비동기 통신
const MenuApi = {
	async getAllMenuByCategory(category) {
		return request(`${BASE_URL}/category/${category}/menu`);
	},
	async createMenu(category, name) {
		return request(`${BASE_URL}/category/${category}/menu`, HTTP_METHOD.POST({ name }));
	},
	async updateMenu(category, name, menuId) {
		return request(`${BASE_URL}/category/${category}/menu/${menuId}`, HTTP_METHOD.PUT({ name }));
	},
	async deleteMenu(category, menuId) {
		return requestWithoutJson(
			`${BASE_URL}/category/${category}/menu/${menuId}`,
			HTTP_METHOD.DELETE(),
		);
	},
	async toggleSoldOutMenu(category, menuId) {
		return request(`${BASE_URL}/category/${category}/menu/${menuId}/soldout`, HTTP_METHOD.PUT());
	},
};

export default MenuApi;
