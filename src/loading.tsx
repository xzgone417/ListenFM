import { FC } from "react";

const Loading:FC = ()=>{
    return <div  className="BIGbox" >
    <div className="trinity-rings-spinner">
    <div className="circle"></div>
    <div className="circle"></div>
    <div className="circle"></div>
  </div>
  <style>
{`
.BIGbox{
    margin-top:200px;
    margin-left:70px;
}

.trinity-rings-spinner, .trinity-rings-spinner * {
    box-sizing: border-box;
  }

  .trinity-rings-spinner {
    height: 240px;
    width: 240px;
    padding: 3px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    overflow: hidden;
    box-sizing: border-box;
  }
  .trinity-rings-spinner .circle {
    position:absolute;
    display:block;
    border-radius:50%;
    border: 3px solid #ff1d5e;
    opacity: 1;
  }

  .trinity-rings-spinner .circle:nth-child(1) {
    height: 200px;
    width: 200px;
    animation : trinity-rings-spinner-circle1-animation 1.5s infinite linear;
    border-width: 3px;
  }
  .trinity-rings-spinner .circle:nth-child(2) {
    height: calc(200px * 0.65);
    width: calc(200px * 0.65);
    animation : trinity-rings-spinner-circle2-animation 1.5s infinite linear;
    border-width: 2px;
  }
  .trinity-rings-spinner .circle:nth-child(3) {
    height: calc(200px * 0.1);
    width: calc(200px * 0.1);
    animation:trinity-rings-spinner-circle3-animation 1.5s infinite linear;
    border-width: 1px;
  }

  @keyframes trinity-rings-spinner-circle1-animation{
    0% {
      transform: rotateZ(20deg) rotateY(0deg);
    }
    100% {
      transform: rotateZ(100deg) rotateY(360deg);
    }
  }
  @keyframes trinity-rings-spinner-circle2-animation{
    0% {
      transform: rotateZ(100deg) rotateX(0deg);
    }
    100% {
      transform: rotateZ(0deg) rotateX(360deg);
    }
  }
  @keyframes trinity-rings-spinner-circle3-animation{
    0% {
      transform: rotateZ(100deg) rotateX(-360deg);
    }
    100% {
      transform: rotateZ(-360deg) rotateX(360deg);
    }
  }

`}
 </style>
  </div>
  
}

export default Loading