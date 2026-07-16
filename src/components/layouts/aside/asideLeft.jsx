import { Link, useLocation } from "react-router-dom";
import { Activity, useState } from "react"
import { ChevronDown, ChevronRight } from "lucide-react"

import styles from "./index.module.scss"

const AsideLeft = ({class:className, nav}) => {
  const [menu, setMenu] = useState(nav);
  const normalizePath = (path) => path.replace(/\/+$/, "") || "/";
  const location = useLocation();
  const locationPath = normalizePath(location.pathname);

  const setActivity = (key) => { 
    const newMenu = menu.map((item, index) => {
      return {
        ...item,
        isActive: index === key,
      }
    })
    setMenu(newMenu);
  }
  
  return (
    <aside className={className}>
      <nav className={styles.menu}>
        <ul>
          {menu.map((item, key) => {
            const hasSubMenu = item?.submenu?.some(
              (child) => child.link === locationPath
            );            
            const statusActivity = item.isActive || item.link === locationPath || hasSubMenu;
            // const capitalize = (str) => {
            //   return str.charAt(0).toUpperCase() + str.slice(1);
            // };

            return (
              <li key={key} className={ statusActivity ? 'is-open' : ''} >
                <Link to={item.link} className="flex align-middle justify-between px-3 py-2"
                  onClick={() => {setActivity(key)}}
                >
                  { item.slug.charAt(0).toUpperCase() + item.slug.slice(1) }
                  { 
                    item.submenu && (
                      <span>{statusActivity ? <ChevronDown size={20} /> : <ChevronRight size={20} />}</span>     
                    )
                  }                            
                </Link>
                <Activity mode={statusActivity ? 'visible' : 'hidden'}>
                  {item?.submenu && (
                    <ul className={styles.submenu}>
                      {
                        item.submenu.map((child, index) => {
                          const hasSubMenu = child.link === locationPath;            
                          const childActivity = child.isActive || hasSubMenu;
                          return (
                            <li key={index} className={ childActivity ? 'is-open' : ''}>
                              <Link to={child.link} className="flex w-full pl-5 pr-3 py-2 text-sm">{child.slug}</Link>
                            </li>
                          )
                        })
                      }
                    </ul>
                  )}
                </Activity>              
              </li>
            )
          })}
        </ul>
      </nav>
    </aside>
  );
}
export default AsideLeft;

//  location.pathName has `/` or `not` end line 