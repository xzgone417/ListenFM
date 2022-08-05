import Playbar from '@/components/Playbar';
import React from 'react';
import './index.less'   //不会给index.less开启模块化

export default function Page() {
  
  return (
    <div>
      <h1 className="title">Home Page index</h1>
      <Playbar></Playbar>
    </div>
  );
}
