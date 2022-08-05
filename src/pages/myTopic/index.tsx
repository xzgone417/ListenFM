import React from 'react';
import styles from './index.less';
import { NavBar } from 'antd-mobile';
import { useRequest,history} from '@umijs/max';
import { queryMytopic } from '@/services/cai'



export default function Page() {
  // const location:any=useLocation()
  // console.log(location)
  

  // const { data, loading } = useRequest(() => {
  //  return queryMytopic(location.state.id)
  // })
  // console.log(data, loading)

  const { data, loading } = useRequest(() => queryMytopic())
    console.log(data, loading)

  const back = () => {
    history.go(-1)
  }
  const tiaoReply=(item)=>{
    history.push('/myTopicReply',item)
  }
 
  return (
    <div>
      <NavBar onBack={back}>我的话题</NavBar>
      <div>
        {!loading && data.map((item: any) => (
          <div title={item.title} key={item.id} className={styles.list} onClick={() => {tiaoReply(item)}}>
            <p>{item.thread.title}</p>
            <p>{item.thread.content}</p>
            <p>{item.thread.created}</p>
          </div>
        ))}
      </div>

    </div>
  );
}
