const $ = (selector) => document.querySelector(selector);

const store = {
  setLocalStorage(menu) {
    localStorage.setItem("menu", JSON.stringify(menu));
  },
  getLocalStorage() {
    return JSON.parse(localStorage.getItem("menu"));
  }
}

function App() {
  // 상태는 변하는 데이터! (메뉴명)
  this.menu = [];
  this.init = () => {
    if (store.getLocalStorage().length > 1) {
      this.menu = store.getLocalStorage();
    }
    render();
  }

  const render = () => {
    const template = this.menu.map((menuItem, index) => {
      return `
        <li data-menu-id="${index}" class="menu-list-item d-flex items-center py-2">
        <span class="w-100 pl-2 menu-name">${menuItem.name}</span>
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
      .join('');

    $('#espresso-menu-list').innerHTML = template;
    updateMenuCount();
  }

  const updateMenuCount = () => {
    const menuCount = $('#espresso-menu-list').querySelectorAll('li').length;
    $('.menu-count').innerText = `총 ${menuCount}개`;
  };

  const addMenuName = () => {
    const menuName = $('#espresso-menu-name').value;
    this.menu.push({ name: menuName });
    store.setLocalStorage(this.menu);

    if (menuName === '') {
      alert('메뉴명을 입력해주세요.');
      return;
    }
    render();
    $('#espresso-menu-name').value = '';
  };

  const updateMenuName = (e) => {
    const menuId = e.target.closest('li').dataset.menuId;
    const $menuName = e.target.closest('li').querySelector(".menu-name");
    const newMenuName = prompt("메뉴명을 수정하세요.", $menuName.innerText);
    this.menu[menuId].name = newMenuName;
    store.setLocalStorage(this.menu);

    if (newMenuName === '') {
      alert('메뉴명을 입력해주세요!');
    } else if (newMenuName !== null) {
      $menuName.innerText = newMenuName;
    }
  };

  const removeMenuName = (e) => {
    if (confirm("정말 삭제하시겠습니까?")) {
      const menuId = e.target.closest('li').dataset.menuId;
      this.menu.splice(menuId, 1);
      store.setLocalStorage(this.menu);
      e.target.closest('li').remove();
      updateMenuCount();
    }
  };

  $('#espresso-menu-list').addEventListener('click', e => {
    if (e.target.classList.contains('menu-edit-button')) {
      updateMenuName(e);
    }
    if (e.target.classList.contains('menu-remove-button')) {
      removeMenuName(e);
    }
  });

  $('#espresso-menu-form').addEventListener('submit', e => {
    e.preventDefault();
    addMenuName();
  });
}

const app = new App();
app.init();