import { queryMyinform } from '@/services/cai';
import { useRequest } from '@umijs/max';
import { Image, List, NavBar } from 'antd-mobile';
import styles from './index.less';

export default function Page() {
  const { data, loading } = useRequest(() => queryMyinform());
  console.log(data, loading);

  const back = () => {
    history.go(-1);
  };
  return (
    <div>
      <NavBar onBack={back}>我的通知</NavBar>

      <div>
        {!loading &&
          data.map((item: any) => (
            <div title={item.title} key={item.id} className={styles.list}>
              <List header={item.title}>
                <List.Item>
                  <Image
                    src={item.user.avatar}
                    className={styles.listimg}
                  ></Image>
                  <ul>
                    <li>{item.user.nickname}</li>
                    <li>{item.content}</li>
                    <li>{item.created}</li>
                  </ul>
                </List.Item>
              </List>
            </div>
          ))}
      </div>
    </div>
  );
}
