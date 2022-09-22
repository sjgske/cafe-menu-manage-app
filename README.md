# 카페메뉴 상태관리 앱

Vanilla JS로 구현하는 상태관리가 가능한 카페메뉴 앱


### 개발 기록
1. [localStorage](https://danheon.notion.site/localStorage-0f6811ff77484291ae8c937baef8e938)
2. [카테고리별 메뉴 관리](https://danheon.notion.site/bd2132a8e6144f8289a0a8d6b47d0fc7)
3. [서버 요청](https://danheon.notion.site/7ada83863e124bbf8e2ab7817bbba162)

<br>

## ✨ Feature.
### 1. DOM 조작과 이벤트 핸들링으로 메뉴 관리
 * 메뉴 추가·삭제·수정
 * 품절 메뉴 관리
 * 메뉴 개수 count
 
<br>

### 2. 카테고리별 메뉴 관리
**상태 계층화**

- `this.menu`를 object 형식으로 변경
    
    { `categoryMenu: []` } 형태
    
    ```jsx
    this.menu = {
    	espresso: [],
    	frappucino: [],
    	blended: [],
    	teavana: [],
    	dessert: [],
    }
    ```
    
- `this.menu` category-menu에 대응되는 배열에 메뉴 추가, 수정, 삭제하기
    **object 안의 배열에 접근하기 → `object[key값]`**
        
     ```jsx
     this.menu[this.currentCategory]
     ```
        
- 현재 category-menu 알 수 있게 `this.currentCategory` 라는 상태값 추가

<br>

### 3. 웹 서버를 띄우고, api 요청하여 메뉴판 관리하기
**api 요청하는 method 객체 분리 (`MenuApi`)**
   - 메뉴 생성 (addMenu)
   - 전체 메뉴 get (getAllMenuByCategory)
   - 메뉴 수정 (updateMenu)
   - 메뉴 삭제 (deleteMenu)
   - 품절메뉴토글 (toggleSoldOutMenu)


<br>

## 📚 Stack.
- HTML/CSS
- JavaScript
