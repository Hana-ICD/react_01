import Layout from "@/components/layouts";
import { ThemeContext } from "@/components/ThemeContext"
import { useContext, useEffect, useState, useRef } from "react";
import Users from "@/components/user";

export default function Home(){
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <Layout>      
      <section>
        <div className="container">          
          <div className={ theme }>
            <p>Theme is: <strong>{theme}</strong>
              <button className="btn ml-4" type="button" onClick={toggleTheme}>Toggle theme</button>
            </p>
          </div>  
        </div>        
      </section>  
      
      <Users/> 
         
    </Layout>
  );
}