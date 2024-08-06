import { assets } from "../../assets/assets";
import { NavLink } from "react-router-dom";

const PostProduct = () => {
  return (
    <article className="px-[10%] py-[2%] flex flex-col mx-auto rounded-lg gap-2 w-1/2">
      <div className="flex gap-5 items-center">
        <img
          src={assets.user}
          alt="profile-image"
          className="size-12 rounded-full"
        />
        <NavLink
          to="/add-post"
          className="text-black border border-gray-400 px-6 py-3 rounded-full w-full text-center hover:text-white hover:bg-gray-900 transition duration-300 cursor-pointer"
        >
          Post your Product
        </NavLink>
      </div>
    </article>
  );
};

export default PostProduct;
