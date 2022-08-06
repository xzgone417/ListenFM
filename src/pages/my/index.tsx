import { queryMycollect } from '@/services/cai';
import { history, useRequest } from '@umijs/max';
import { Button, Image, List, Toast } from 'antd-mobile';
import {
  AppOutline,
  CollectMoneyOutline,
  HeartOutline,
  MessageOutline,
  PayCircleOutline,
  RightOutline,
  UserCircleOutline,
} from 'antd-mobile-icons';
import { useState } from 'react';
import styles from './index.less';

export default function Page() {
  const [sign, setSign] = useState<boolean>(true);
  const { data, loading } = useRequest(() => queryMycollect());
  console.log(data, loading);
  const tiao = () => {
    history.push('/mycare');
  };
  const tiao1 = () => {
    history.push('/myCollection');
  };
  const tiao3 = () => {
    history.push('/myTopic');
  };
  const tiao4 = () => {
    history.push('/myInform');
  };

  const signOK = () => {
    setSign(false);
  };

  return (
    <div>
      <div className={styles.login}>
        <ul>
          <li style={{ fontSize: 50, color: 'grey' }}>
            <UserCircleOutline />
          </li>
          <li>
            登录
            <RightOutline />
          </li>
          {sign ? (
            <Button
              onClick={() => {
                signOK();
                Toast.show({
                  content: '已获得50金币',
                  icon: <PayCircleOutline />,
                });
              }}
            >
              签到
            </Button>
          ) : (
            <Button>已签到</Button>
          )}
        </ul>
      </div>

      <div className={styles.middle}>
        <List>
          <List.Item
            prefix={<CollectMoneyOutline />}
            onClick={() => {
              tiao();
            }}
          >
            我关注的电台
          </List.Item>
          <List.Item
            prefix={<HeartOutline />}
            onClick={() => {
              tiao1();
            }}
          >
            我收藏的播单
          </List.Item>
          <List.Item
            prefix={<AppOutline />}
            onClick={() => {
              tiao3();
            }}
          >
            我的话题
          </List.Item>
          <List.Item
            prefix={<MessageOutline />}
            onClick={() => {
              tiao4();
            }}
          >
            我的通知
          </List.Item>
        </List>
      </div>

      <div className={styles.collect}>
        <List header="收藏列表">
          {!loading &&
            data.map((item: any) => (
              <List.Item
                key={item.id}
                prefix={
                  <Image
                    src={item.cover}
                    style={{ borderRadius: 20 }}
                    fit="cover"
                    width={40}
                    height={40}
                  />
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
