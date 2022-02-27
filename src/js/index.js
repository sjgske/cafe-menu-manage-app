import { $ } from "./utils/dom.js";
import store from "./store/index.js";

const BASE_URL = "http://localhost:3000/api";
const MenuApi = {
	async getAllMenuByCategory(category) {
		const response = await fetch(`${BASE_URL}/category/${category}/menu`);
		return response.json();
	},
	async createMenu(category, name) {
		const response = await fetch(`${BASE_URL}/category/${category}/menu`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ name }),
		});
		if (!response.ok) {
			console.error("에러가 발생했습니다.");
		}
	},
};

function App() {
	this.menu = {
		espresso: [],
		frappuccino: [],
		blended: [],
		teavana: [],
		desert: [],
	};
	this.currentCategory = "espresso";
	this.init = async () => {
		this.menu[this.currentCategory] = await MenuApi.getAllMenuByCategory(this.currentCategory);
		render();
		initEventListeners();
	};

	const render = () => {
		const template = this.menu[this.currentCategory]
			.map((menuItem, index) => {
				return `
        <li data-menu-id="${index}" class="menu-list-item d-flex items-center py-2">
        <span class="w-100 pl-2 menu-name ${menuItem.soldOut ? "sold-out" : ""} ">${
					menuItem.name
				}</span>
        <button
          type="button"
          class="bg-gray-50 text-gray-500 text-sm mr-1 menu-sold-out-button"
        >
          품절
        </button>
        <button
          type="button"
          class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
        >
          수정
        </button>
        <button
          type="button"
          class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
        >
          삭제
        </button>
        </li>`;
			})
			.join("");

		$("#menu-list").innerHTML = template;
		updateMenuCount();
	};

	const updateMenuCount = () => {
		const menuCount = this.menu[this.currentCategory].length;
		$(".menu-count").innerText = `총 ${menuCount}개`;
	};

	const addMenuName = async () => {
		const menuName = $("#menu-name").value;
		if (menuName === "") {
			alert("메뉴명을 입력해주세요.");
			return;
		}

		await MenuApi.createMenu(this.currentCategory, menuName);
		this.menu[this.currentCategory] = await MenuApi.getAllMenuByCategory(this.currentCategory);
		render();
		$("#menu-name").value = "";
	};

	const updateMenuName = e => {
		const menuId = e.target.closest("li").dataset.menuId;
		const $menuName = e.target.closest("li").querySelector(".menu-name");
		const newMenuName = prompt("메뉴명을 수정하세요.", $menuName.innerText);
		this.menu[this.currentCategory][menuId].name = newMenuName;
		store.setLocalStorage(this.menu);

		if (newMenuName === "") {
			alert("메뉴명을 입력해주세요!");
		} else if (newMenuName !== null) {
			render();
		}
	};

	const removeMenuName = e => {
		if (confirm("정말 삭제하시겠습니까?")) {
			const menuId = e.target.closest("li").dataset.menuId;
			this.menu[this.currentCategory].splice(menuId, 1);
			store.setLocalStorage(this.menu);
			render();
		}
	};

	const soldOutMenu = e => {
		const menuId = e.target.closest("li").dataset.menuId;
		this.menu[this.currentCategory][menuId].soldOut =
			!this.menu[this.currentCategory][menuId].soldOut;
		store.setLocalStorage(this.menu);
		render();
	};

	const initEventListeners = () => {
		$("#menu-list").addEventListener("click", e => {
			if (e.target.classList.contains("menu-edit-button")) {
				updateMenuName(e);
				return;
			}
			if (e.target.classList.contains("menu-remove-button")) {
				removeMenuName(e);
				return;
			}
			if (e.target.classList.contains("menu-sold-out-button")) {
				soldOutMenu(e);
				return;
			}
		});

		$("#menu-form").addEventListener("submit", e => {
			e.preventDefault();
			addMenuName();
		});

		$("nav").addEventListener("click", async e => {
			const isCategoryButton = e.target.classList.contains("cafe-category-name");
			if (isCategoryButton) {
				const categoryName = e.target.dataset.categoryName;
				this.currentCategory = categoryName;
				$("#category-title").innerText = `${e.target.innerText} 메뉴 관리`;
				this.menu[this.currentCategory] = await MenuApi.getAllMenuByCategory(this.currentCategory);
				render();
			}
		});
	};
}

const app = new App();
app.init();
