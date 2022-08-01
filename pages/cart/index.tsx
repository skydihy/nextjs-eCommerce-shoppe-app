import { toNumber } from "lodash";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import ProductCartRow from "../../components/ui/ProductCartRow";
import { useAppDispatch, useAppSelector } from "../../store";
import { cartList, updateAllCart } from "../../store/features/cart/cartSlice";
import { ICart } from "../../store/features/cart/type";
import { setStatus } from "../../store/features/popup/popupSlice";
import { PopupStatus } from "../../store/features/popup/type";
import { formatPrices } from "../../utils";

export const SHIPPING_COST = 7.49;

const Cart: NextPage = () => {
  const cartListStore = useAppSelector(cartList);
  const dispatch = useAppDispatch();

  const [total, setTotal] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [haveChanges, setHaveChanges] = useState(false);
  const [updateCalculation, setUpdateCalculation] = useState(false);
  const [previewList, setPreviewList] = useState<ICart[]>(cartListStore);

  const handleChanges = () => {
    setHaveChanges(true);
  };

  const handleCalculate = () => {
    setUpdateCalculation(true);
  };

  const handleIncreasePreview = (
    cartId: string,
    stockTotal: number,
    currentAmount: number,
    setCurrentAmount: any
  ) => {
    if (currentAmount + 1 > stockTotal) {
      dispatch(
        setStatus({
          status: PopupStatus.failed,
          message: "exceeds amount",
        })
      );

      return;
    }

    setCurrentAmount((prev: number) => prev + 1);

    const cartChanges = previewList.map((cart) => {
      if (cart.cartId === cartId) {
        return {
          ...cart,
          amount: currentAmount + 1,
        };
      }
      return cart;
    });

    setPreviewList(cartChanges);

    handleChanges();
  };

  const handleDecreasePreview = (
    cartId: string,
    currentAmount: number,
    setCurrentAmount: any
  ) => {
    if (currentAmount - 1 < 1) {
      return;
    }

    setCurrentAmount((prev: number) => prev - 1);

    const cartChanges = previewList.map((cart) => {
      if (cart.cartId === cartId) {
        return {
          ...cart,
          amount: currentAmount - 1,
        };
      }
      return cart;
    });

    setPreviewList(cartChanges);

    handleChanges();
  };

  const handleRemovePreview = (cartId: string) => {
    const newCart = previewList.filter((cart) => cart.cartId !== cartId);

    setPreviewList(newCart);

    handleChanges();
  };

  useEffect(() => {
    setPreviewList(cartListStore);
  }, [cartListStore]);

  useEffect(() => {
    if (updateCalculation) {
      const result = previewList.reduce((prev: number, cur: ICart) => {
        return (prev += toNumber(cur.product.prices) * cur.amount);
      }, 0);

      setSubtotal(result);
      setTotal(result + SHIPPING_COST);

      dispatch(updateAllCart(previewList));
      dispatch(
        setStatus({
          status: PopupStatus.success,
          message: "Cart updated",
        })
      );

      setHaveChanges(false);
    }

    setUpdateCalculation(false);
  }, [dispatch, previewList, updateCalculation]);

  useEffect(() => {
    const result = previewList.reduce((prev: number, cur: ICart) => {
      return (prev += toNumber(cur.product.prices) * cur.amount);
    }, 0);

    setSubtotal(result);
    setTotal(result + SHIPPING_COST);

    setHaveChanges(false);
    setUpdateCalculation(false);
  }, []);

  return (
    <Layout>
      <div className="max-w-[1248px] w-full mx-auto desktop:max-w-[90%] pt-[107px]">
        <div className="mt-[96px] flex flex-col items-center gap-16 ipad:flex-col">
          <h1>Shopping Cart</h1>

          <div className="grid grid-cols-2 gap-20 ipad:grid-cols-1">
            <div className="flex flex-col">
              <div className="flex flex-col space-y-10">
                {previewList.map((cart) => (
                  <ProductCartRow
                    key={cart.cartId}
                    cart={cart}
                    onHaveChanges={handleChanges}
                    onIncrease={handleIncreasePreview}
                    onDecrease={handleDecreasePreview}
                    onRemove={handleRemovePreview}
                  />
                ))}
              </div>

              <div
                onClick={() => {
                  if (haveChanges) {
                    return handleCalculate();
                  }
                  return null;
                }}
                className={`mt-14 ml-auto w-max px-[1.875rem] py-4 px-auto rounded border border-black text-center ${
                  haveChanges
                    ? "cursor-pointer opacity-100"
                    : "cursor-not-allowed opacity-40"
                }`}
              >
                <p>UPDATE CART</p>
              </div>
            </div>

            <div className="px-[60px] py-10">
              <p className="text-[1.625rem]">Cart totals</p>
              <div className="grid grid-cols-2 gap-6 mt-11">
                <p>SUBTOTAL</p>
                <p className="text-dark-gray">$ {subtotal}</p>
                <p>SHIPPING</p>
                <p className="text-dark-gray">
                  Shipping costs will be calculated once you have provided
                  address.
                </p>
              </div>

              <div className="w-full bg-light-gray h-[1px] mt-10" />

              {subtotal > 0 && (
                <div className="flex justify-between mt-10 font-bold">
                  <p>TOTAL</p>
                  <p>$ {total}</p>
                </div>
              )}

              {cartListStore.length > 0 ? (
                <Link href="/cart/checkout" passHref>
                  <div className="bg-black w-full flex justify-center items-center text-white py-4 cursor-pointer mt-16">
                    <p>PROCEED TO CHECKOUT</p>
                  </div>
                </Link>
              ) : (
                <div className="bg-black/50 w-full flex justify-center items-center text-white py-4 cursor-not-allowed mt-16">
                  <p>PROCEED TO CHECKOUT</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
