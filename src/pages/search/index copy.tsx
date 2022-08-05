
import React, { useEffect, useRef, useState } from 'react';
import { useRequest, connect, history } from '@umijs/max';
import styles from './index.less';
import { SearchBar, Tag, Space, Toast } from 'antd-mobile'
import { queryHotTags, querySearch, queryTagSearch } from '@/services/search';
import { SearchBarRef } from 'antd-mobile/es/components/search-bar';
import { clear } from 'antd-mobile/es/components/dialog/clear';



export default function Page() {

  const searchRef = useRef<SearchBarRef>(null);
  let inputvalue =document.getElementsByTagName("input")[0];
 
  // console.log(searchRef.current,"rrr");
  const [myval, setMyval] = useState("")
  const [mytag, setMytag] = useState("")
  const [mysooo, setSooo] = useState([] as any)
  const [mypanduan, setpanduan] = useState(false)
  // const [mytag, setMytag] = useState("")
  const hotTags = useRequest(() => queryHotTags())
  // console.log(hotTags);
  const tagSearch = useRequest(() => queryTagSearch(mytag), {
    manual: true
  })
  const Search1 = useRequest(() => querySearch(myval), {
    manual: true
  })

  // console.log(tagSearch, "tttttttttttttttttttttttttgggggggggg");
  const tagsoso = (val) => {
    console.log(val,"注意此时的vallllll");
    // console.log(val, "xxx");
    // myval =encodeURI(val);
    setMytag(encodeURI(val)); 
    // console.log(mytag,"运行时的mytag，虽然tag会变，但是是在tag发完请求后变);
  //这里的tag变化跟不上请求
    setpanduan(true)
    // input属性，DOM操作
    if (inputvalue) {
     inputvalue.value=val
      // console.log(inputvalue.value);    
    }
    // return  myval
  }
  // 加一个副作用再tag修改过后再手动调用请求
  useEffect(()=>{
    tagSearch.run(); 
  },[mytag])
  // console.log(mytag,"修改后的tag,但已经发过请求了");
  const soso = (val) => {
    // console.log(val, "xx");
    // myval =encodeURI(val);
    setMyval(encodeURI(val));   //把最新的关键词给了myval，但是下面发请求还是用的旧值，解决？不用useRequest了

    setpanduan(true)
    // searchRef.current?.clear();
    // return  myval
  }
  useEffect(()=>{
    Search1.run();
  },[myval])
  // 请求数据变化后再修改数组
  useEffect(()=>{
    setSooo(Search1.data)
  },[Search1.data])
  useEffect(()=>{
    setSooo(tagSearch.data)
  },[tagSearch.data])
  // console.log(mysooo, "sssssssssssssssssssss");
  // 清空和取消
const myclear =()=>{
  // setSooo([]);
  setpanduan(false)
};
const mycancle =()=>{
  // setSooo([]);
  setpanduan(false)
};
// console.log(Search1, "jkjjjkjj");
// console.log(mysooo,"sss");

  return (
    <div className={styles.searchbox}>
      <SearchBar placeholder='请输入内容' showCancelButton ref={searchRef} 
      onSearch={(val) => soso(val)} onClear={() => myclear()}    onCancel={() => mycancle()}/>
      { mypanduan ?
       <div className={styles.HAVE}>
        <div className={styles.searchlisthead}>搜索列表</div>
       {mysooo && mysooo!==[] && mysooo!.map((item)=>{
         return(<div key={item.id} className={styles.anyone}>{item.title}</div>)
       }) }
     </div>
        :
        <div className={styles.NOso}>
        <div className={styles.hot}><span>热门搜索</span></div>
        <div className={styles.alltags}>
          <Space wrap style={{ '--gap': '10px' }}>
            {hotTags.data && hotTags.data.map((item) => {
              return (<Tag round color='#F5F5F5' key={item.id} style={{ "--text-color": "#696969" }} onClick={() => tagsoso(item.name)}>{item.name} </Tag>)
            })}
          </Space>
        </div>
        <div className={styles.record}><span>历史搜索记录</span><span></span></div>
      </div>
 
      }
    </div>
  );
}
