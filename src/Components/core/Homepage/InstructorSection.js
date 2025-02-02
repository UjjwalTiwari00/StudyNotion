
import React from 'react'
import Instructor from '../../../assets/Images/Instructor.png'
import HighLightText from './HighLightText'
import Button from './Button'
import { FaArrowRight } from 'react-icons/fa'
export const InstructorSection = () => {
    return (
        <div className='mt-16'>
            <div className='flex flex-row gap-20 items-center'>
                <div className='w-[50%] '>
                    <img src={Instructor} alt="Instructor" className='shadow-white' />

                </div>
                <div className='w-[50%] flex flex-col gap-10'>
                    <div className='text-4xl font-semibold w-[50%]'>
                        Become an <HighLightText text={"Instructor"} />
                    </div>
                    <p className='font-medium text-[16px] w-[80%] text-richblack-300'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos quasi assumenda voluptate incidunt.
                    </p>
                    <div className='w-fit'>
                        <Button active={true} linkto={"/signup"}>
                            <div className='flex flex-row gap-2 items-center'>
                                Start Teaching Today
                                <FaArrowRight />
                            </div>
                        </Button>
                    </div>

                </div>
            </div>
        </div>
    )
}
