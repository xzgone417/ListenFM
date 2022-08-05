import React, { useState } from 'react';
import styles from './index.less';
import {
  UserCircleOutline, RightOutline, CollectMoneyOutline,
  HeartOutline, MailOutline, AppOutline, MessageOutline, PayCircleOutline
} from 'antd-mobile-icons';
import { List, Image, Toast, Button } from 'antd-mobile'
import { NavLink, history } from '@umijs/max';
import { useRequest } from '@umijs/max';
import { queryMycollect } from '@/services/cai'



export default function Page() {
  const [sign, setSign] = useState<boolean>(true);
  const { data, loading } = useRequest(() => queryMycollect());
  // console.log(data, loading)
  const tiao = () => {
    history.push('/mycare')
  };
  const tiao1 = () => {
    history.push('/myCollection')
  };
  const tiao3 = () => {
    history.push('/myTopic')
  };
  const tiao4 = () => {
    history.push('/myInform')
  };

  const signOK = () => {
    setSign(false)
  }



  // const users = [
  //   {
  //     avatar:
  //       'https://images.unsplash.com/photo-1548532928-b34e3be62fc6?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ',
  //     name: 'Novalee Spicer',
  //     description: 'Deserunt dolor ea eaque eos',
  //   },
  //   {
  //     avatar:
  //       'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9',
  //     name: 'Sara Koivisto',
  //     description: 'Animi eius expedita, explicabo',
  //   },

  // ]
  return (
    <div>
      <div className={styles.login}>
        <ul>
          <li style={{ fontSize: 50, color: 'grey' }}><UserCircleOutline /></li>
          <li>登录<RightOutline /></li>
          {/* <li>签到</li> */}
       
          {sign ? <Button
            onClick={() => {
              signOK()
              Toast.show({
                content: '已签到50金币',
                icon: <PayCircleOutline />,
              })
            }}
          >
            签到
          </Button> 
          :
           <Button>已签到</Button>
          }
    


        </ul>
      </div>

      <div className={styles.middle}>
        <List>
          <List.Item prefix={<CollectMoneyOutline />} onClick={() => { tiao() }} >
            我关注的电台
          </List.Item>
          <List.Item prefix={<HeartOutline />} onClick={() => { tiao1() }}>
            我收藏的播单
          </List.Item>
          <List.Item prefix={<AppOutline />} onClick={() => { tiao3() }}>
            我的话题
          </List.Item>
          <List.Item prefix={<MessageOutline />} onClick={() => { tiao4() }}>
            我的通知
          </List.Item>
        </List>
      </div>

      <div className={styles.collect}>
        <List header='收藏列表'>
          {!loading && data.map((item: any) => (
            <List.Item key={item.id} prefix={<Image src={item.cover} style={{ borderRadius: 20 }} fit='cover' width={40} height={40} />
            }
              description={item.content}
            >
              {item.speak}
            </List.Item>
          ))}
        </List>
      </div>

    </div>
  );
}
