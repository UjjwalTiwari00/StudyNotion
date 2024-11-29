import React from "react";

const ShowCardComponent = ({ data }) => {
    
  function ShowAllCards({ datas }) {
    return(
    <div>
      <h1 className="">{datas.heading}</h1>
      <p>{datas.description}</p>
      <p>{datas.level}</p>
      <p>{datas.lessionNumber}</p>
    </div>
    )
  }

  return <div className="w-[30%] flex flex-row">
  <div>
<ShowAllCards datas={(data)}/>
  </div>
  </div>;
};

export default ShowCardComponent;
