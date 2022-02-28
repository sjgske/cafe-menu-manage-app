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

// api 비동기 요청
const MenuApi = {
	// 메뉴 리스트 불러오기
	async getAllMenuByCategory(category) {
		return request(`${BASE_URL}/category/${category}/menu`);
	},

	// 메뉴 추가
	async createMenu(category, name) {
		return request(`${BASE_URL}/category/${category}/menu`, HTTP_METHOD.POST({ name }));
	},

	// 메뉴 수정
	async updateMenu(category, name, menuId) {
		return request(`${BASE_URL}/category/${category}/menu/${menuId}`, HTTP_METHOD.PUT({ name }));
	},

	// 메뉴 삭제
	async deleteMenu(category, menuId) {
		return requestWithoutJson(
			`${BASE_URL}/category/${category}/menu/${menuId}`,
			HTTP_METHOD.DELETE(),
		);
	},

	// 품절 메뉴 토글
	async toggleSoldOutMenu(category, menuId) {
		return request(`${BASE_URL}/category/${category}/menu/${menuId}/soldout`, HTTP_METHOD.PUT());
	},
};

export default MenuApi;
