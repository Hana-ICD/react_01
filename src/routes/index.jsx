import { createBrowserRouter } from 'react-router-dom';

import Home from '@/pages/Home';
import Demo from '@/pages/Demo'
import Todo from '@/pages/Todo'
import Todoold from '@/pages/Todoold';
import Checkout from '@/pages/Checkout'
import Usecallback from '@/pages/Checkout'
import HooksApi from '@/pages/HooksApi'
import PageForm from '@/pages/PageForm'
import Reference from '@/pages/Reference'
import ReferenceChildLayout from '@/components/layouts/ReferenceChildLayout'
import ReferenceChild from '@/pages/ReferenceChild'
import UsersList from "@/pages/Users"
import UserAdd from "@/pages/Users/add"
import UserEdit from "@/pages/Users/edit"
import Ex from "@/pages/Ex"
import NotFound from "@/pages/404"
import UserAdd01 from "@/pages/Users/add01"

import { Navigate } from 'react-router-dom';

export const routes = createBrowserRouter([
  { path: '/', element: <Home/>  },
  { path: '/demo', element: <Demo/> },
  { path: '/todo', element: <Todo/> },
  { path: '/todo-old', element: <Todoold /> },
  { path: '/checkout', element: <Checkout /> },
  { path: '/usecallback', element: <Usecallback/> },
  { path: '/form', element: <PageForm/> },
  { path: '/hooks_api', element: <HooksApi/> },
  { 
    path: '/reference', 
    // element: <Reference/>
    element: <Navigate to="/reference/react" replace /> // feature redirect to /react => if not => open comment out above => to element Reference 
  },
  // do page /reference la trang rieng => dung rieng => create route seperate for each parent / child
  { 
    path: '/reference', 
    element: <ReferenceChildLayout/>, //
    children: [
      {
        path: ":slug",
        element: <ReferenceChild />
      }
    ]
   },
  {
    path: '/users',
    element: <UsersList/>,
  },
  {
    path: "/users/add",
    element: <UserAdd/>,
  },
  {
    path: "/users/add01",
    element: <UserAdd01/>,
  },
  {
    path: "/users/:id",
    element: <UserEdit/>,
  },
  {
    path: "/ex",
    element: <Ex />
  },
  {
    path: "*",
    element: <NotFound />
  },
  // { path: '/reference/hooks', element: <Reference/>, name:'hooks' },
  // { path: '/reference/useState', element: <Reference/>, name:'useState' },
  // { path: '/reference/useEffect', element: <Reference/>, name:'useEffect' },
  // { path: '/reference/useRef', element: <Reference/>, name:'useState' },
  // { path: '/reference/useMemo', element: <Reference/>, name:'useEffect' },
  // { path: '/reference/useCallback', element: <Reference/>, name:'useEffect' },
  // { path: '/reference/apis', element: <Reference/>, name:'apis' },
  // { path: '/reference/lazy', element: <Reference/>, name:'lazy' },
])