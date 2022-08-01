import { toNumber } from "lodash";
import moment from "moment";
import { NextPage } from "next";
import { Router, useRouter } from "next/router";
import { useEffect, useState } from "react";
import { SHIPPING_COST } from "..";
import Layout from "../../../components/layout/Layout";
import { useAppSelector } from "../../../store";
import { cart, cartList } from "../../../store/features/cart/cartSlice";

import { ICart } from "../../../store/features/cart/type";
import { formatPrices } from "../../../utils";

const Checkout: NextPage = () => {
  const cartStore = useAppSelector(cart);
  const router = useRouter();

  const [orderNo, setOrderNo] = useState("");
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (cartStore.cartList.length <= 0) {
      router.push("/cart");
    }

    const result = cartStore.cartList.reduce((prev: number, cur: ICart) => {
      return (prev += toNumber(cur.product.prices) * cur.amount);
    }, 0);

    const generateOrderNo = Date.now();

    setSubtotal(result);
    setTotal(result + SHIPPING_COST);
    setOrderNo(generateOrderNo.toString());
  }, [cartStore, router]);

  return (
    <Layout>
      <div className="max-w-[1248px] w-full mx-auto desktop:max-w-[90%] pt-[107px]">
        <div className="mt-[96px] grid grid-cols-2 gap-[166px] ipad:grid-cols-1">
          <div>
            <h2>Order Details</h2>
            <div className="grid grid-cols-2">
              <div className="flex flex-col space-y-[6px] mt-7">
                <h5>ORDER NUMBER</h5>
                <h5 className="text-dark-gray">SPP{orderNo}</h5>
              </div>
              <div className="flex flex-col space-y-[6px] mt-7">
                <h5>DELIVERY OPTIONS</h5>
                <h5 className="text-dark-gray">Standard delivery</h5>
              </div>

              <div className="flex flex-col space-y-[6px] mt-7">
                <h5>EMAIL</h5>
                <h5 className="text-dark-gray">Vitathemes@gmail.com</h5>
              </div>
              <div className="flex flex-col space-y-[6px] mt-7 row-span-2">
                <h5>DELIVERY ADDRESS</h5>
                <h5 className="text-dark-gray">
                  Kristian holst 34 old street W1F 7NU london United Kingdom
                </h5>
              </div>

              <div className="flex flex-col space-y-[6px] mt-7">
                <h5>PAYMENT METHOD</h5>
                <h5 className="text-dark-gray">Mastercard*************7865</h5>
              </div>

              <div className="flex flex-col space-y-[6px] mt-7">
                <h5>ORDER DATE</h5>
                <h5 className="text-dark-gray">{moment().format("LL")}</h5>
              </div>
              <div className="flex flex-col space-y-[6px] mt-7">
                <h5>CONTACT NUMBER</h5>
                <h5 className="text-dark-gray">+44 xxxxxxx988</h5>
              </div>
            </div>
          </div>
          <div>
            <p className="text-[26px]">ORDER Summary</p>
            <div className="mt-10 bg-light-gray px-[60px] pt-10 grid grid-cols-2 ">
              <h5 className="border-b border-gray inline-block pb-[18px]">
                PRODUCT
              </h5>
              <h5 className="text-end border-b border-gray inline-block pb-[18px]">
                TOTAL
              </h5>
            </div>

            {cartStore.cartList.map((cart) => (
              <div
                key={cart.cartId}
                className="flex justify-between items-center px-[60px] bg-light-gray"
              >
                <h5 className="text-dark-gray my-2">{cart.product.name}</h5>
                <h5 className="text-dark-gray my-2 text-end">
                  {cart.product.priceSymbol}{" "}
                  {formatPrices(toNumber(cart.product.prices) * cart.amount)}
                </h5>
              </div>
            ))}

            <div className="grid grid-cols-2 items-center px-[60px] bg-light-gray">
              <h5 className="border-t border-gray py-4">SUBTOTAL</h5>
              <h5 className="text-dark-gray text-end border-t border-gray py-4">
                $ {formatPrices(subtotal)}
              </h5>
            </div>
            <div className="grid grid-cols-2 items-center px-[60px] bg-light-gray">
              <h5 className="border-t border-gray py-4">SHIPPING</h5>
              <h5 className="text-dark-gray text-end border-t border-gray py-4">
                $ {SHIPPING_COST}
              </h5>
            </div>
            <div className="grid grid-cols-2 items-center px-[60px] bg-light-gray">
              <h5 className="border-t border-gray pt-4 pb-10 font-bold">
                TOTAL
              </h5>
              <h5 className="text-end pb-10 border-t border-gray pt-4 font-bold">
                {formatPrices(total)}
              </h5>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
