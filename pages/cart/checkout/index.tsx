import { NextPage } from "next";
import Layout from "../../../components/layout/Layout";
import { useAppSelector } from "../../../store";
import { cart, cartList } from "../../../store/features/cart/cartSlice";

const Checkout: NextPage = () => {
  return (
    <Layout>
      <div className="max-w-[1248px] w-full mx-auto desktop:max-w-[90%] pt-[107px]">
        <div className="mt-[96px] flex flex-col items-center gap-16 ipad:flex-col">
          asd
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
