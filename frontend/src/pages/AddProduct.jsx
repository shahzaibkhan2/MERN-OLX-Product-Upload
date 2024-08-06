import { useContext } from "react";
import { assets } from "../assets/assets";
import { MainContext } from "../context/MainContext";

const AddProduct = () => {
  const {
    isLoading,
    onSubmitHandler,
    category,
    image,
    imageRef,
    handleImageUpload,
    categoryRef,
    descriptionRef,
    titleRef,
    priceRef,
  } = useContext(MainContext);
  return isLoading ? (
    <div className="grid min-h-[80vh] place-items-center">
      <div className="h-16 w-16 border-4 place-items-center border-gray-400 border-t-green-800 animate-spin rounded-full"></div>
    </div>
  ) : (
    <div className="w-full h-full bg-gray-700">
      <form
        onSubmit={onSubmitHandler}
        className="flex items-center flex-col text-white gap-8 w-full px-[10%]"
      >
        <section className="flex gap-8">
          <div className="flex gap-4 flex-col">
            <p>Upload Image</p>
            <input
              onChange={() => handleImageUpload(imageRef)}
              ref={imageRef}
              type="file"
              id="image"
              accept="image/*"
              hidden
            />
            <label htmlFor="image">
              <img
                className="w-24 cursor-pointer"
                src={image ? image : assets.upload}
                alt="upload"
              />
            </label>
          </div>
        </section>
        <section className="flex gap-2.5 flex-col text-white">
          <p>Title</p>
          <input
            ref={titleRef}
            type="text"
            className="outline-gray-700 border-2 bg-transparent border-gray-400 p-2.5 custom-width-2xl rounded-lg"
            placeholder="Title Here..."
            required
          />
        </section>
        <section className="flex gap-2.5 flex-col text-white">
          <p>Price</p>
          <input
            ref={priceRef}
            type="number"
            className="outline-gray-700 border-2 bg-transparent border-gray-400 p-2.5 custom-width-2xl rounded-lg"
            placeholder="Title Here..."
            required
          />
        </section>
        <section className="flex gap-2.5 flex-col text-white">
          <p>Description</p>
          <input
            ref={descriptionRef}
            type="text"
            className="outline-gray-700 border-2 bg-transparent border-gray-400 p-2.5 custom-width-2xl rounded-lg"
            placeholder="Description Here..."
            required
          />
        </section>
        <section className="flex gap-2.5 flex-col">
          <p>Category</p>
          <select
            ref={categoryRef}
            className="outline-green-600 border-2 bg-transparent border-gray-400 p-2.5 w-[150px] rounded-lg text-black bg-white"
          >
            <option value="none">None</option>
            {category.map((item, index) => (
              <option className="text-black" key={index} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
        </section>
        <button
          type="submit"
          className="bg-black text-base text-white px-12 py-2.5 rounded-lg cursor-pointer"
        >
          Post
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
