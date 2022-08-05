import React from 'react';
import styles from './index.less';
import { NavBar,Image } from 'antd-mobile';
import { useRequest } from '@umijs/max';
import { queryMycollect } from '@/services/cai'


export default function Page() {
  const { data, loading } = useRequest(() => queryMycollect());
  console.log(data, loading)


  const back = () => {
    history.go(-1)
  }
  return (
    <div>
      <NavBar onBack={back} >我收藏的播单</NavBar>
      <div>
        {!loading && data.map((item: any) => (
          <div title={item.title} key={item.id} className={styles.list}>
            <Image src={item.cover} className={styles.listimg}></Image>
            <p>{item.title}</p>
          </div>

        ))}

      </div>
    </div>
  );
}
