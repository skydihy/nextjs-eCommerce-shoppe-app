import Image from "next/image";
import { FC, MouseEventHandler, useEffect, useState } from "react";
import Link from "next/link";

import { formatPrices } from "../../utils";

import { IProductDetail } from "../../types/products";
import { ICart } from "../../store/features/cart/type";
import { useAppDispatch } from "../../store";
import { setStatus } from "../../store/features/popup/popupSlice";
import { PopupStatus } from "../../store/features/popup/type";

import CloseIcon from "../../assets/icon/close.svg";
import { removeCart } from "../../store/features/cart/cartSlice";

interface ProductCartRowProps {
  cart: ICart;
  onHaveChanges: () => void;
  onIncrease: (
    cartId: string,
    stockTotal: number,
    currentAmount: number,
    setCurrentAmount: any
  ) => void;
  onDecrease: (
    cartId: string,
    currentAmount: number,
    setCurrentAmount: any
  ) => void;
  onRemove: (
    cartId: string,
  ) => void;
}

const ProductCartRow: FC<ProductCartRowProps> = ({
  cart,
  onHaveChanges,
  onIncrease,
  onDecrease,
  onRemove
}) => {
  const [currentAmount, setCurrentAmount] = useState(cart.amount);
  const { product } = cart;

  return (
    <div className="grid cart-row-grid-layout gap-10 w-full border-b border-light-gray pb-10">
      <div className="w-[146px] aspect-square">
        <Image
          className="rounded-lg"
          src={product.image}
          alt={product.name.toLocaleLowerCase()}
          width={380}
          height={380}
          layout="responsive"
          quality={80}
        />
      </div>

      <div>
        <h3>{product.name}</h3>
        <h5 className="text-dark-gray inline-block mt-[.875rem]">
          Black / Medium
        </h5>
        <h5 className="text-accent">
          {product.priceSymbol} {formatPrices(product.prices)}
        </h5>
      </div>
      <div className="rounded bg-light-gray flex items-center h-[55px] space-x-6 px-4 justify-center text-dark-gray text-center w-max mobile:mx-auto">
        <button
          onClick={() =>
            onDecrease(
              cart.cartId,
              currentAmount,
              setCurrentAmount
            )
          }
        >{`-`}</button>
        <p className="w-[1rem]">{currentAmount}</p>
        <button
          onClick={() =>
            onIncrease(
              cart.cartId,
              product.stockTotal,
              currentAmount,
              setCurrentAmount
            )
          }
        >{`+`}</button>
      </div>
      <div className="cursor-pointer ml-[.75rem]" onClick={() => onRemove(cart.cartId)}>
        <CloseIcon />
      </div>
    </div>
  );
};

export default ProductCartRow;
