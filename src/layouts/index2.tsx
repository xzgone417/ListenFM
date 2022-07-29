import { FC } from "react";
//一旦使用了@umijs/max之后，那么就是 import all from '@umijs/max'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Link, NavLink, Outlet } from "@umijs/max";
import styles from '@/layouts/index.less';

const Layout: FC = () => {
    return <div>
        <ul className={styles.navs}>
            <li>
                <NavLink to="/home" style={({ isActive }) => isActive ? { color: 'red' } : {}}>跳转首页</NavLink>
            </li>
        </ul>
        <Outlet/>
    </div>
}

export default Layout