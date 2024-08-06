import Items from "./Items";
import { useContext } from "react";
import { MainContext } from "../../context/MainContext";

const FeedArea = () => {
  const { productsData } = useContext(MainContext);

  return (
    <div className="mt-7 px-[10%]" id="food-area">
      <h2 className="font-bold text-xl text-gray-900">List of Products</h2>
      <div className="grid grid-cols-auto-fill-220 gap-7 gap-x-8 my-10 overflow-x-scroll">
        {productsData.map((item, index) => {
          return (
            <Items
              key={index}
              id={item._id}
              price={item.price}
              description={item.description}
              title={item.title}
              image={item.image}
              category={item.category}
            />
          );
        })}
      </div>
    </div>
  );
};

export default FeedArea;
