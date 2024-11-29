import React, { useEffect, useState } from "react";
import HighLightText from "./HighLightText";
import { HomePageExplore } from "../../../data/homepage-explore";
import ShowCardComponent from "./ShowCardComponent";

const ExploreMore = () => {
  const [onSelect, setOnselect] = useState("");
  const [Courses,onSetCourses]=useState(HomePageExplore)

  useEffect(()=>{

  },[setOnselect])
  const tabtexts = [
    "Free",
    "New to coding",
    "Most popular",
    "Skills paths",
    "Career paths",
  ];
  return (
    <div className="items-center flex flex-col">
      <h1>
        unlock the <HighLightText text={"Power Of code"}></HighLightText>
      </h1>
      <p>learn to build any thing you can imagine</p>

      <div className="w-[40%] bg-richblack-200 rounded-lg items-center flex flex-row justify-center gap-5">
        {tabtexts.map((ele, index) => {
          return (
            <div className="m-3">
              <button
                onClick={() => {
                  setOnselect(ele);
                }}
                className={`${
                  onSelect === ele ? " bg-richblack-400 rounded-lg p-1" : ""
                }`}
                key={ele}
              >
                {ele}
              </button>
            </div>
          );
        })}
      </div>
      <div>
      <div className="bg-richblack-100 w-full h-[30%]">
      <div>
      {HomePageExplore.map((ele) => {
        return ele.tag.toLowerCase() === onSelect.toLowerCase() &&
          ele.courses.map((cours,ind) => (
              <div className="flex flex-r">
              <ShowCardComponent data={cours} index={ind}/>
              </div>
          ));
      })}
    </div>
    </div>
      </div>
    </div>
  );
};

export default ExploreMore;
