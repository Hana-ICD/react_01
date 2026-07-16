import { BrowserRouter as Router, Routes, Route, RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '@/components/ThemeProvider';
import './App.css'
import { routes } from '@/routes'

function App() {
  return (
    <ThemeProvider>
      {/* <Router>
        <Routes>
          {routes.map((item) => (
            <Route key={item.path} path={item.path} element={item.element}></Route>
          ))}          
        </Routes>
      </Router> */}
      <RouterProvider router={routes} />
    </ThemeProvider>
    
  )
}

export default App
