import { FC } from 'react';
//一旦使用了@umijs/max之后，那么就是 import all from '@umijs/max'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from '@/layouts/index.less';
import { NavLink, Outlet } from '@umijs/max';

const Layout: FC = () => {
  return (
    <div>
      <ul className={styles.navs}>
        <li>
          <NavLink
            to="/search"
            style={({ isActive }) =>
              isActive ? { color: 'red' } : { color: 'black' }
            }
          >
            发现
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/home"
            style={({ isActive }) =>
              isActive ? { color: 'red' } : { color: 'black' }
            }
          >
            心聆FM
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/my"
            style={({ isActive }) =>
              isActive ? { color: 'red' } : { color: 'black' }
            }
          >
            我的
          </NavLink>
        </li>
      </ul>

      <Outlet />
      {/* <Outlet context={{ prop: 'a' }} /> */}
    </div>
  );
};

export default Layout;
