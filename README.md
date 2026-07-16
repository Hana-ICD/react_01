# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


## My doc
https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Frameworks_libraries

https://react.dev/reference/react/useRef

## Getting
### basic
npm create vite@latest moz-todo-react -- --template react         // moz-todo-react: create folder name
cd moz-todo-react && npm install
npm run dev -- --open --port 3000

### typescript
npm create vite@latest moz-todo-react-ts -- --template react-ts

### convert jsx to ts
npm create vite@latest react-learning -- --template react-ts
--- then =>
    Copy toàn bộ src từ project cũ sang.
    run 
    npm install
    npm run dev

## Error
If old version => notification about version err & some other err
=> setting nvm new version and if notification other err => delete node_modules & package-block.json
rm -rf node_modules package-lock.json

## CSS
### tailwind css
#### Project
Nhỏ	          CSS Modules / CSS Thuần	Nhanh, không cần cài đặt thêm.
Trung bình	  Tailwind CSS	Dễ bảo trì, thống nhất giao diện team.
Lớn	          Tailwind hoặc SCSS + CSS Modules	Khả năng mở rộng tốt, quản lý theme dễ dàng.

#### install
npm install -D tailwindcss@3 postcss autoprefixer
npx tailwindcss init -p      // version >= 4 -> not need because KHÔNG còn CLI

#### install plugin 
npm install -D @tailwindcss/postcss
npm install nanoid    // nanoid create automation id for FE   => import { nanoid } from "nanoid";   // Co the ep kieu id

#### tailwindcss follow class
https://tailwind.build/classes

### SASS
npm install -D sass-embedded
(Dùng sass-embedded sẽ nhanh hơn bản sass cũ, nhưng cả hai đều hoạt động tốt).

## check version
npm -v
node -v
npm list tailwindcss
npm list react

### Move into the src directory
cd src

### Delete the App.css file and the React logo provided by Vite
// rm = remove
rm App.css assets/react.svg

### Empty the contents of App.jsx and index.css
echo -n > App.jsx && echo -n > index.css

### Move back up to the root of the project
cd ..

### Create folder
cd to location => mkdir src/component

#### create file into
cd to location => touch src/component/todo.jsx  
cd to location => touch src/component/{todo,todo01,todo02}.jxs   // will create mutiple files -> not space

Declare component => Viet hoa first letter => import Todo from "./component/toDo"
Declare data: Uppercase

### filter & map
const found_task = toTask.filter(item => item.id === id) // filter
toTask.filter((item, index) => {})  // map

### trim()
($input.trim() !== "")   // check value input !== "" (and space)

### useEffect(() => {}) & const editFieldRef = useRef={null}
at input | button => ref={editFieldRef}
useEffect(()=> { // after DOM rendered
  if(isEditing) {
    // If focus don't show => can by css => add css: :focus, :focus-visible {outline: auto 1px; }
    editFieldRef.current.focus();  // create focus after user entered the Edit button
  }
}, [isEditing]);

### useMemo - useCallback
- useMemo: cache value ( khong tham so )
- useCallback: cache function ( co tham so )
    truyền xuống memo component
    dependency của useEffect/useMemo
    performance optimization

#### useLayoutEffect 
same as useEffect but render faster useEffect // render som hon xiu

### :focus, :focus-visible
input, button, a, vv..v : have :focus
h, p, div, span, ..text: haven't focus => add tabIndex="0" || tabIndex="-1"

## useState(null | Boolean | "" | value)   &  useRef(null | Boolean | "" | value)
useState: + render
useRef: not render - trang thai - status

## useActionState
Return action (dispatchAction), isPending (false / true) // di kem startTransition

## useOptimistic
Phan hoi nhanh

## async - await
Use - data / api
Khi run data, api need to wait data OK (save) => return result
If not, return result => data doesn't save ( internet, sap nguon )

## ViewTransition
<ViewTransition
  /* turn off any animation not defined below */
  default="none"
  enter={{
    /* apply slide-in for Transition Type `forward` */
    "forward": 'slide-in',
    /* otherwise use the browser default animation */
    "default": 'auto'
  }}
  /* use the browser default for exit animations*/
  exit="auto"
  /* apply a custom `cross-fade` class for updates */
  update="cross-fade"
>

## icon
Lucide icons: https://lucide.dev/icons/
MUI icons

## json data
https://jsonplaceholder.typicode.com/users/

### .find()
return result found
const inventory = [
  { name: 'apples', quantity: 2 },
  { name: 'bananas', quantity: 0 },
  { name: 'cherries', quantity: 5 }
];

const result = inventory.find(fruit => fruit.name === 'cherries'); 
console.log(result); 
// Output: { name: 'cherries', quantity: 5 }

### {}: must return value trong {} & (): output result


### .some()
return true / false => exist hay khong ton tai

### React query

useQuery
↓
GET (lấy dữ liệu)

useMutation
↓
POST / PUT / PATCH / DELETE (thay đổi dữ liệu)

-----------------------------------------------

POST /users
↓
Thành công
↓
invalidate ["users"]
↓
GET /users
↓
Cache mới
↓
UI cập nhật

------------------------------------------------

| Chức năng     | Hook          |
| ------------- | ------------- |
| GET danh sách | `useQuery`    |
| GET detail    | `useQuery`    |
| POST thêm     | `useMutation` |
| PUT update    | `useMutation` |
| PATCH update  | `useMutation` |
| DELETE        | `useMutation` |


#### Object.keys
const [err, setErr] = useState({})
const newErr = {}
// handle
setErr(newErr);
return Object.keys(newErr).length === 0; // newErr = {} => if error => { name: true, ..vv..} => return false, if okay => newErr = {} => return true

###
react-phone-number-input // use for internation
react-number-format 


### Object.entries & Object.keys
Object.entries(objectName).map(([key, value]) => {})
Object.keys(objectName).map(([key]) => {})

#### Create array static
Array.from({length: 10}).map((_, index) => ())

<!-- or create function -->

const arrayStatic = Array.from(
  { length: 10 },
  (_, index) => ({
    id: index + 1,
  })
);


### flatMap
const arr = [1, 2, 1];

const result = arr.flatMap((num) => (num === 2 ? [2, 2] : 1));

console.log(result);
// Expected output: Array [1, 2, 2, 1]