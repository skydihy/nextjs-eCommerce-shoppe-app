import Image from "next/image";
import { FC, MouseEventHandler } from "react";
import Link from "next/link";

import { formatPrices } from "../../utils";

import { IProductDetail } from "../../types/products";

interface ProductCardProps {
  productItem: IProductDetail;
  onAddCart: any;
}

const ProductCard: FC<ProductCardProps> = ({ productItem, onAddCart }) => {
  return (
    <div className="flex flex-col items-stretch group">
      <div className="relative aspect-square rounded-2xl w-full">
        <Link href={`/shop/product/${productItem.id}`} passHref>
          <Image
            className="cursor-pointer"
            src={productItem.image}
            alt={productItem.name.toLocaleLowerCase()}
            width={380}
            height={380}
            layout="responsive"
            quality={95}
          />
        </Link>
        <div
          onClick={onAddCart}
          className="absolute z-[2] bg-white/50 h-[4.0625rem] w-full flex justify-center items-center bottom-0 opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity duration-150"
        >
          <p className="font-bold">ADD TO CART</p>
        </div>
      </div>
      <h3 className="inline-block mt-6 mb-[1.125rem]">{productItem.name}</h3>
      <h4 className="text-accent flex mt-auto">
        {productItem.priceSymbol} {formatPrices(productItem.prices)}
      </h4>
    </div>
  );
};

export default ProductCard;
