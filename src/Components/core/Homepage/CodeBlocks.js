import React from "react";
import CTAButton from "./Button";
import { FaArrowRight } from "react-icons/fa";
import { TypeAnimation } from "react-type-animation";

export const CodeBlocks = ({
  position,
  heading,
  subHeading,
  ctabtn1,
  ctabtn2,
  codeblock,
  backgroundGradient,
  codeColour,
}) => {
  return (
    <div
      className={`flex ${position} w-[90%] mx-auto my-20 justify-between gap-10`}
    >
      {/* {//Section 1} */}
      <div className="w-[50%] flex flex-col gap-8">
        {heading}
        <div className="text-blue-400 font-bold">{subHeading}</div>

        <div className="flex gap-7 mt-7">
          <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
            <div className="flex gap-2 items-center">
              {ctabtn1.btnText}
              <FaArrowRight />
            </div>
          </CTAButton>
          <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
            <div className="flex gap-2 items-center">{ctabtn2.btnText}</div>
          </CTAButton>
        </div>
      </div>
      {/* {Section 2} */}
      <div className="">
        <div className="relative h-fit flex flex-row text-[15px] w-[100%] py-4 lg:w-[500px] backdrop-blur-lg bg-white/50">
          <div className="flex flex-row w-[100%] ">
            <div className="w-[300px]  absolute bg-caribbeangreen-500 bg-gradient-to-t" />
            <div className="flex  flex-col text-center w-[10%] text-blue-400 font-inter font-bold">
              <p>1</p>
              <p>2</p>
              <p>3</p>
              <p>4</p>
              <p>5</p>
              <p>6</p>
              <p>7</p>
              <p>8</p>
              <p>9</p>
              <p>10</p>
            </div>
            <div
              className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColour} pr-2`}
            >
              <TypeAnimation
                sequence={[codeblock, 2000, ""]}
                repeat={Infinity}
                cursor={true}
                style={{
                  whiteSpace: "pre-line",
                  display: "block",
                }}
                omitDeletionAnimation={true}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
