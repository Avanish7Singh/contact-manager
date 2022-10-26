import React from 'react';
import SpinnerImg from "../../spinner/Loading_icon.gif"

const Spinner = () => {
  return (
    <div>
        <img src={ SpinnerImg} alt="" style={{ display:" block", margin:"auto", backgroundColor:"white"}} />
    </div>
  )
}

export default Spinner