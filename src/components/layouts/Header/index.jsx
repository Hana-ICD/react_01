import { Link } from "react-router-dom";
import styles from "./index.module.scss";
import heroLogo from '@/assets/hero.png'

const Header = (props) => {    
  return (
    <header className={`py-3`}>
      <div className={`container ${styles.container}`}>
        <h1>
          <img className='mx-auto' src={heroLogo} alt="" width={60} />
        </h1>
        <nav className={styles.nav}>
          <ul className={styles.nav_list}>
            {props.children.map((item, key) => (
              <li className={styles.nav_listItem} key={key}>
                <Link
                  to={`${item.link}${item.id ? '#' + item.id : ''}`}
                  target={item.target}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>      
    </header>
  );
}
export default Header;