import { NavLink } from '@umijs/max';
import './index.less'; //不会给index.less开启模块化
import styles from './index.less';
// import { useOutletContext } from '@umijs/max';

export default function Page() {
  // const context=useOutletContext();
  // console.log(context)    通过布局文件中outlet传递数据，在这里能拿到数据

  return (
    <div>
      <ul className={styles.navs}>
        <li>分类播单</li>
        <li>
          <NavLink
            to="/indexzhubo"
            style={({ isActive }) =>
              isActive ? { color: 'red' } : { color: 'black' }
            }
          >
            {' '}
            主播电台
          </NavLink>
        </li>
        <li>聆听社区</li>
      </ul>
    </div>
  );
}
