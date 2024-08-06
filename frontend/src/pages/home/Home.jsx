import { Route, Routes } from "react-router-dom";
import FeedArea from "../../components/feed/FeedArea";
import AddProduct from "../AddProduct";
import PostProduct from "../../components/feed/PostProduct";

const Home = () => {
  return (
    <>
      <PostProduct />
      <Routes>
        <Route path="/add-post" element={<AddProduct />} />
        <Route path="/" element={<FeedArea />} />
      </Routes>
    </>
  );
};

export default Home;
