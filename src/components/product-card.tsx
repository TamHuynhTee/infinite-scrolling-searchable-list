import { IProduct } from "@interfaces/index";
import { FC } from "react";

type Props = IProduct & {};

export const ProductCard: FC<Props> = (props) => {
  return (
    <div className="relative border border-gray-200 bg-cover group rounded-3xl bg-center overflow-hidden mx-auto sm:mr-0 xl:mx-auto aspect-square cursor-pointer">
      <img
        className="rounded-2xl object-cover w-full h-full"
        src={props.thumbnail}
        alt={props.title}
        width={300}
        height={300}
        loading="lazy"
      />
      <div className="absolute z-10 bottom-3 left-0 mx-3 p-3 bg-white w-[calc(100%-24px)] rounded-xl shadow-sm shadow-transparent transition-all duration-500 group-hover:shadow-indigo-200 group-hover:bg-indigo-50">
        <div className="flex items-center justify-between mb-2">
          <h6 className="font-semibold text-base leading-7 text-black ">
            {props.title}
          </h6>
          <h6 className="font-semibold text-base leading-7 text-indigo-600 text-right">
            ${props.price}
          </h6>
        </div>
      </div>
    </div>
  );
};

export const ProductCardSkeleton: FC = () => {
  return (
    <div className="animate-pulse relative group rounded-3xl aspect-square bg-[#e0e0e0]">
      <div className="absolute z-10 bottom-3 left-0 mx-3 p-3 bg-white w-[calc(100%-24px)] rounded-xl shadow-sm shadow-transparent transition-all duration-500 group-hover:shadow-[#d2d2d2] group-hover:bg-[#d2d2d2]"></div>
    </div>
  );
};
