import React, { useState } from 'react';

import Loader from '../../assets/images/loader.gif';


const Loading: React.FC = () => {
 
  return (
<div className="loading d-flex align-items-center justify-content-center">
    <img src={Loader} alt="loader"/>
</div>
  );
};

export default Loading;


