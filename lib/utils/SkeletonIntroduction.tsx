import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import React from "react";
import '@/lib/utils/responsive.css'

const SkeletonIntroduction = () => {
  return (
    <div className="p-6 PaddingHeader">
      <div className="flex items-center mb-6 flex-col">
        <Skeleton
          circle
          containerClassName="avatar-skeleton"
          width={150}
          height={150}
          className=" ContainerCourtLogo mb-4"
        />
        <h3 className="font-medium text-center text-gray-900 my-6 uppercase">
          <span className="block text-2xl text-gray-700 ContainerTittle">
            <Skeleton width={300} className="ContainerTittleSkeleton"/>
          </span>
          <span className="block text-3xl font-semibold text-gray-900 mt-2 ContainerCourt  ">
            <Skeleton width={550} height={40} className="ContainerCourtSkeleton"/>
          </span>
        </h3>

        <hr className="border-t-2 border-gray-300 w-full mt-2" />
      </div>

      <div>
        <p className="text-gray-800 mt-[3rem] font-inter leading-8 tracking-wide whitespace-pre-line break-words ContainerDescription">
          <Skeleton width={100}  />
          <br />
          <Skeleton width={500} height={100} className="ContainerCourt_SkeletonDescription"/>
          <br />
          <Skeleton width={500} height={80} className="ContainerCourt_SkeletonDescription"/>
          <br />
          <Skeleton width={500} height={30} className="ContainerCourt_SkeletonDescription"/>
          <br />
          <Skeleton width={500} height={50} className="ContainerCourt_SkeletonDescription"/>
        </p>

        <div className="flex justify-center mt-6">
          <button className="ContainerHeaderButton my-2 px-4 py-3  text-white font-medium text-sm rounded-md shadow-lg flex items-center space-x-3 ease-in-out hover:from-sky-600 hover:to-sky-900 transition-transform duration-300">
            <Skeleton width={150} height={40} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SkeletonIntroduction;
