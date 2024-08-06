import { useContext } from "react";
import { assets } from "../../assets/assets";
import { MainContext } from "../../context/MainContext";

const Items = ({ id, price, title, description, image, category }) => {
  return (
    <div className="flex flex-col justify-between bg-gray-900 m-auto w-full rounded-lg shadow-lg min-h-full text-white">
      <div className="relative">
        <img
          className="rounded-lg w-full h-full"
          src={image}
          alt="item-image"
        />
      </div>
      <div className="p-5">
        <div className="flex justify-between">
          <p className="font-semibold text-xl">{title}</p>
          <img src={assets.urgent} alt="urgent" className="size-10" />
        </div>
        <p className="text-sm">{description}</p>
        <p className="py-2.5 font-semibold text-xl">Rs. {price}</p>
        <p className="py-2.5 font-semibold text-xl">{category}</p>
      </div>
    </div>
  );
};

export default Items;
