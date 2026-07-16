import { Helmet } from "react-helmet-async";
import { ThemeContext } from "@/components/ThemeContext"
import { useContext } from "react";
import Header from "@/components/layouts/Header"
import Footer from "./Footer"
import AsideLeft from "./aside/asideLeft";
import AsideRight from "./aside/asideRight";
import { AnimatePresence, motion  } from "motion/react";
import { REFERENCE } from "@/data/reference"

const nav = [
  {name: "Home", link: "/", target: ""},
  {name: "Reference", link: "/reference", target: ""},
  {name: "Todo", link: "/todo", target: ""},
  {name: "useActionState", link: "/checkout", target: ""},
  {name: "useCallBack", link: "/usecallback", target: "", id:"useCallback"},
  {name: "Demo", link: "/demo", target: "_blank"},
  {name: "Form", link: "/form", target: ""},
  {name: "Hooks & Api", link: "/hooks_api", target: ""},
];

function Layout({title, children, hasSidebar}) {  
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <>
      <Helmet>
        <title>{`${title ? title : 'Project'} | RJ`}</title>
      </Helmet>
      <Header children={nav} />
      <main className={`text-left py-5 ${theme === 'dark' ? 'dark' : ''}`}>
        {hasSidebar ? (
          <>
            <div className="grid grid-cols-[20rem/auto] py-5">
              <AsideLeft class={``} nav={REFERENCE} />       
              <AnimatePresence>
                <div className="px-3">
                  <motion.div initial={{ opacity: 0 }} animate={{opacity: 1}} exit={{opacity: 0}}>
                    { children }
                  </motion.div>
                </div>
              </AnimatePresence>   
              {/* <AsideRight class={`col-span-1`} /> */}
            </div>
          </>
        ) : (
          <div>{ children }</div>
        )}
        
      </main>      
      <Footer></Footer>
    </>    
  );
}
export default Layout;