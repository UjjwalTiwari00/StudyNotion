import React from "react";
import { FaArrowRight } from "react-icons/fa";
import Button from "../Components/core/Homepage/Button";
import { Link } from "react-router-dom";
import HighLightText from "../Components/core/Homepage/HighLightText";
import Banner from "../assets/Images/banner.mp4";
import { CodeBlocks } from "../Components/core/Homepage/CodeBlocks";
import Footer from "../Components/common/Footer";
import ReviewSlider from "../Components/core/Homepage/ReviewSlider";
import { InstructorSection } from "../Components/core/Homepage/InstructorSection";
import { TimeLineSection } from "../Components/core/Homepage/TimeLineSection";
import { LearningLanguageSection } from "../Components/core/Homepage/LearningLanguageSection";
import ExploreMore from "../Components/core/Homepage/ExploreMore";

const Home = () => {
  return (
    <div>
      {/* section 1 */}
      <div className="relative mx-auto flex flex-col w-11/12 max-w-maxContent items-center text-white justify-between">
        <div className="group mt-16  p-1 mb-14 mx-auto rounded-full bg-richblack-800  font-bold text-richblack-200  transition-all duration-200 hover:scale-95 w-fit ">
          <Link className=" mt-[15px]" to={"/signup"}>
            {" "}
            <div className="flex flex-row items-center gap-2 rounded-full px-10  py-[5px] transition-all duration-200 group-hover:bg-richblack-900 ">
              <p>Become an instructor</p>
              <FaArrowRight />
            </div>
          </Link>
        </div>
      </div>

      <div className="text-center text-4xl font-semibold text-blue-600">
        Empower your future with <HighLightText text={"Coding Skills"} />
      </div>
      <div className=" w-[50%] mx-auto mt-8 text-center text-lg font-bold text-richblack-300">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorum nobis
        voluptatem nihil placeat voluptatibus provident,Lorem, ipsum dolor sit
        amet consectetur adipisicing
      </div>
      <div className="flex flex-row gap-7 mt-10  items-center justify-center">
        <Button active={true} linkto={"/signup"}>
          Learn More
        </Button>
        <Button active={false} linkto={"/signup"}>
          Book a Demo
        </Button>
      </div>

      <div className="w-[90%] mx-auto my-12 shadow-blue-500">
        <video className="rounded-lg " muted loop autoPlay>
          <source src={Banner} type="video/mp4" />
        </video>
      </div>

      {/* code 1 */}
      <div>
        <CodeBlocks
          position={"lg:flex-row"}
          heading={
            <div className="text-blue-600 font-bold">
              {" "}
              Unlock your <HighLightText text={"coding potential"} /> with our
              online course
            </div>
          }
          subHeading={
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Architecto impedit tempora, recusandae voluptatibus, non veritatis cumque perspiciatis sequi delectus maxime pariatur error harum, aperiam deserunt."
          }
          ctabtn1={{
            btnText: "Try it yourself",
            linkto: "/signup",
            active: true,
          }}
          ctabtn2={{
            btnText: "Learn more",
            linkto: "/login",
            active: false,
          }}
          codeblock={`<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1.0">\n<title>Document</title>\n</head>\n<body>\n</body>`}
          codeColour={"text-yellow-25"}
        />
      </div>
      {/* code 2 */}
      <div>
        <CodeBlocks
          position={"lg:flex-row-reverse"}
          heading={
            <div className="text-blue-600 font-bold">
              {" "}
              Unlock your <HighLightText text={"coding potential"} /> with our
              online course
            </div>
          }
          subHeading={
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Architecto impedit tempora, recusandae voluptatibus, non veritatis cumque perspiciatis sequi delectus maxime pariatur error harum, aperiam deserunt."
          }
          ctabtn1={{
            btnText: "Try it yourself",
            linkto: "/signup",
            active: true,
          }}
          ctabtn2={{
            btnText: "Learn more",
            linkto: "/login",
            active: false,
          }}
          codeblock={`<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1.0">\n<title>Document</title>\n</head>\n<body>\n</body>`}
          codeColour={"text-yellow-25"}
        />
      </div>
      <div className=" bg-pure-greys-5 text-richblack-700">
      <ExploreMore />
      </div>
      {/* section 2 */}
      <div className=" bg-pure-greys-5 text-richblack-700">
        <div className="homepage_bg h-[310px]">
          <div className="w-11/12 max-w-maxContent flex flex-col items-center gap-5 justify-center mx-auto">
            <div className="h-[150px]"></div>
            <div className="flex flex-row gap-7 text-white ">
              <Button active={true} linkto={"./signup"}>
                <div className="flex items-center gap-3">
                  Explore full catalog
                  <FaArrowRight />
                </div>
              </Button>
              <Button active={false} linkto={"./signup"}>
                <div className="flex items-center gap-3">
                  Learn More
                  <FaArrowRight />
                </div>
              </Button>
            </div>
          </div>
        </div>
        <div className="mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-7 ">
          <div className="flex flex-row gap-5 mb-10 mt-[110px]">
            <div className="text-4xl font-semibold w-[45%]">
              Get the skills for a{" "}
              <HighLightText text={"Job that is in demand"} />
            </div>
            <div className="flex flex-col gap-10 w-[40%] items-start">
              <div className="text-[16px]">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur
                distinctio commodi quae delectus cum provident.
              </div>
              <Button active={true} linkto={"/signup"}>
                <div>Learn More</div>
              </Button>
            </div>
          </div>

          <TimeLineSection />
          <LearningLanguageSection />
        </div>
      </div>

      {/* section 3 */}
      <div className="w-11/12 mx-auto max-w-maxContent flex flex-col items-center justify-between gap-8 bg-richblack-900 text-white">
        <InstructorSection />
        <h2 className="text-center text-4xl font-semibold mt-10">
          Review from other learners
        </h2>
        <ReviewSlider />
      </div>
      {/* {Section 4} */}
      <Footer />
    </div>
  );
};

export default Home;
