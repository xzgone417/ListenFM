import React from 'react';
import styles from './index.less';
import { NavBar, Image, List } from 'antd-mobile';
import { useRequest, history, useLocation } from '@umijs/max';
import { queryMytopic } from '@/services/cai'



export default function Page() {
  const location: any = useLocation()
  // console.log(location, "mmmmmm")
  const { data, loading } = useRequest(() => queryMytopic())
  // console.log(data, loading)

  const back = () => {
    history.go(-1)
  }


  return (
    <div>
      <NavBar onBack={back}>话题回复</NavBar>

      <div>
        <div className={styles.list}>
          <p>{location.state.thread.title}</p>
          <p>{location.state.thread.content}</p>
          <p>{location.state.thread.created}</p>
        </div>


        {!loading && data.map((item: any) => (
          <div title={item.title} key={item.id} className={styles.list2}>
            <List>
              <List.Item>
                <Image src={item.user.avatar} className={styles.list2img}></Image>
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
