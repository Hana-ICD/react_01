import Layout from "@/components/layouts";
import { ThemeContext } from "@/components/ThemeContext"
import { useContext } from "react";

export default function Home(){
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <Layout>      
      <section>
        <div className="container">    
          <h2>404</h2>      
          <h3>Not found page</h3>
          <div className={ theme }>
            <p>Theme is: <strong>{theme}</strong>
              <button className="btn ml-4" type="button" onClick={toggleTheme}>Toggle theme</button>
            </p>
          </div>  
        </div>        
      </section> 
         
    </Layout>
  );
}