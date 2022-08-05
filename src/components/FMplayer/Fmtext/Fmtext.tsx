import React, { RefObject, useEffect, useRef } from 'react'

export default function Fmtext(props) {
// console.log(props,"ppppppppppppppppp");
const mytext: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
// console.log(props,"oo");

useEffect(()=>{
  if (props.text && props.text!=="") {
    mytext.current!.innerHTML=props.text;
  }
})

 if ( props.text&&  props.text!=="") {
  return  ( <div ref={mytext}></div>) 
 }
 else{
  return (  <h4 style={{"textAlign":"center"}}>。。。加载中。。。</h4> )
 }
}
