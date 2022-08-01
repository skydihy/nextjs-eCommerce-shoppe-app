import { NextPage } from "next";
import { shuffle } from "lodash";
import Image from "next/image";
import ReactImageMagnify from "react-image-magnify";

import { productList } from "../../../mockData";
import Layout from "../../../components/layout/Layout";
import { formatPrices } from "../../../utils";

import { IProductDetail } from "../../../types/products";
import { useCallback, useEffect, useMemo, useState } from "react";
import ProductCard from "../../../components/ui/ProductCard";

import Star from "../../../assets/icon/star.svg";
import { useAppDispatch, useAppSelector } from "../../../store";
import { addCart, cartList } from "../../../store/features/cart/cartSlice";
import { setStatus } from "../../../store/features/popup/popupSlice";
import { PopupStatus } from "../../../store/features/popup/type";

interface ProductDetailProps {
  loadedProduct: IProductDetail;
  similarList: IProductDetail[];
}

enum CurrentTabs {
  Description,
  Addition,
  Review,
}

const ProductDetail: NextPage<ProductDetailProps> = ({
  loadedProduct,
  similarList,
}) => {
  const { id } = loadedProduct;
  const dispatch = useAppDispatch();
  const cartListStore = useAppSelector(cartList);

  const [totalItem, setTotalItem] = useState(1);
  const [tab, setTab] = useState(CurrentTabs.Description); // FYI: Stock keeping units
  const [displayProduct, setDisplayProduct] = useState(loadedProduct);

  const handleDecreaseItem = () => {
    if (totalItem - 1 === 0) return;

    setTotalItem((prev) => prev - 1);
  };

  const handleIncreaseItem = () => {
    if (totalItem + 1 > displayProduct.stockTotal) return;

    setTotalItem((prev) => prev + 1);
  };

  const handleTabChange = (tab: CurrentTabs) => {
    setTab(tab);
  };

  const handleAddCart = useCallback(
    (item: IProductDetail) => {
      const cartMatched = cartListStore.find(
        (cart) => cart.product.id === item.id
      );

      if (cartMatched) {
        if (cartMatched.amount + totalItem > item.stockTotal) {
          dispatch(
            setStatus({
              status: PopupStatus.failed,
              message:
                "The amount in the cart exceeds the number of products available.",
            })
          );

          return;
        }
      }

      dispatch(
        addCart({
          product: item,
          amount: totalItem,
        })
      );

      dispatch(
        setStatus({
          status: PopupStatus.success,
          message: "The item added to your Shopping bag.",
          link:'/cart'
        })
      );
    },
    [cartListStore, dispatch, totalItem]
  );

  const renderSimilarItems = useMemo(() => {
    return (
      <div className="grid grid-cols-3 gap-12 mt-12 mobile:grid-cols-1">
        {similarList.map((product) => (
          <ProductCard
            key={product.id}
            productItem={product}
            onAddCart={() => handleAddCart(product)}
          />
        ))}
      </div>
    );
  }, [similarList, handleAddCart]);

  useEffect(() => {
    const matchedProduct = productList.find((product) => product.id === id);
    if (matchedProduct) {
      setDisplayProduct(matchedProduct);
    }
  }, [id]);

  useEffect(() => {
    setTotalItem(1);
  }, [id]);

  return (
    <Layout>
      <div className="max-w-[1248px] mx-auto desktop:max-w-[90%] pt-[107px]">
        <div className="mt-[96px] grid product-detail-grid-layout">
          <div className="grid thumbnail-cover-grid-layout">
            <div className="flex flex-col justify-between mobile:hidden">
              <Image
                className="rounded-lg"
                src={displayProduct.image}
                alt={displayProduct.name.toLocaleLowerCase()}
                width={120}
                height={120}
                layout="responsive"
                quality={80}
              />
              <Image
                className="rounded-lg"
                src={displayProduct.image}
                alt={displayProduct.name.toLocaleLowerCase()}
                width={120}
                height={120}
                layout="responsive"
                quality={80}
              />
              <Image
                className="rounded-lg"
                src={displayProduct.image}
                alt={displayProduct.name.toLocaleLowerCase()}
                width={120}
                height={120}
                layout="responsive"
                quality={80}
              />
              <Image
                className="rounded-lg"
                src={displayProduct.image}
                alt={displayProduct.name.toLocaleLowerCase()}
                width={120}
                height={120}
                layout="responsive"
                quality={80}
              />
            </div>
            <div>
              <div className="w-[540px h-[600px] relative">
                {/* <ReactImageMagnify
                  {...{
                    smallImage: {
                      alt: displayProduct.name,
                      isFluidWidth: true,
                      src: displayProduct.image,
                    },
                    largeImage: {
                      src: displayProduct.image,
                      width: 640,
                      height: 768,
                    },
                    enlargedImageContainerDimensions: {
                      width: '120%',
                      height: '120%',
                    },
                  }}
                /> */}
                <Image
                  className="absolute inset-0 object-contain rounded-lg object-center"
                  src={displayProduct.image}
                  alt={displayProduct.name.toLocaleLowerCase()}
                  layout="fill"
                  quality={100}
                />
              </div>
            </div>
          </div>
          <div>
            <h2>{displayProduct.name}</h2>
            <h4 className="text-accent inline-block mt-6">
              {displayProduct.priceSymbol} {formatPrices(displayProduct.prices)}
            </h4>
            <div className="mt-16 flex items-center space-x-6">
              <div className="flex items-center gap-2">
                <Star />
                <Star />
                <Star />
                <Star />
                <Star />
              </div>
              <h5 className="text-dark-gray">1 customer review</h5>
            </div>
            <h5 className="inline-block mt-5 text-dark-gray">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
              placerat, augue a volutpat hendrerit, sapien tortor faucibus
              augue, a maximus elit ex vitae libero. Sed quis mauris eget arcu
              facilisis consequat sed eu felis.
            </h5>

            <div className="grid total-item-grid-layout mt-12">
              <div className="rounded bg-light-gray flex items-center h-[55px] space-x-6 px-4 justify-center text-dark-gray text-center w-max mobile:mx-auto">
                <button onClick={handleDecreaseItem}>{`-`}</button>
                <p className="w-[1rem]">{totalItem}</p>
                <button onClick={handleIncreaseItem}>{`+`}</button>
              </div>
              <div
                onClick={() => handleAddCart(displayProduct)}
                className="py-4 px-auto rounded border border-black text-center cursor-pointer"
              >
                <p>ADD TO CART</p>
              </div>
            </div>

            <div className="space-x-4 flex mt-9">
              <h5>SKU:</h5>
              <h5 className="text-dark-gray">{displayProduct.stockTotal}</h5>
            </div>
            <div className="space-x-4 flex mt-[.375rem]">
              <h5>Categories:</h5>
              <h5 className="text-dark-gray">Fashion, Style</h5>
            </div>
          </div>
        </div>

        <div className="min-h-[237px] flex flex-col w-full mt-[6.1875rem]">
          <div className="h-[3.75rem] border-b border-light-gray space-x-24 flex mobile:justify-between mobile:space-x-6">
            <div
              className={`cursor-pointer border-b ${
                tab === CurrentTabs.Description ? "border-black" : "border-none"
              }`}
              onClick={() => handleTabChange(CurrentTabs.Description)}
            >
              <h3
                className={`${
                  tab === CurrentTabs.Description
                    ? "text-black"
                    : "text-dark-gray"
                }`}
              >
                Description
              </h3>
            </div>
            <div
              className={`cursor-pointer border-b ${
                tab === CurrentTabs.Addition ? "border-black" : "border-none"
              }`}
              onClick={() => handleTabChange(CurrentTabs.Addition)}
            >
              <h3
                className={`${
                  tab === CurrentTabs.Addition ? "text-black" : "text-dark-gray"
                }`}
              >
                Aditional information
              </h3>
            </div>
            <div
              className={`cursor-pointer border-b ${
                tab === CurrentTabs.Review ? "border-black" : "border-none"
              }`}
              onClick={() => handleTabChange(CurrentTabs.Review)}
            >
              <h3
                className={`${
                  tab === CurrentTabs.Review ? "text-black" : "text-dark-gray"
                }`}
              >{`Reviews(0)`}</h3>
            </div>
          </div>

          <div className="mt-[2.25rem]">
            {tab === CurrentTabs.Description && (
              <h5 className="text-dark-gray">{displayProduct.description}</h5>
            )}
            {tab === CurrentTabs.Addition && (
              <div>
                <div className="space-x-4 flex mt-[.375rem]">
                  <h5>Weight:</h5>
                  <h5 className="text-dark-gray">0.3 kg</h5>
                </div>
                <div className="space-x-4 flex mt-[.375rem]">
                  <h5>Dimension:</h5>
                  <h5 className="text-dark-gray">15 x 10 x 1 cm</h5>
                </div>
                <div className="space-x-4 flex mt-[.375rem]">
                  <h5>Colours:</h5>
                  <h5 className="text-dark-gray">Black, Browns, White</h5>
                </div>
                <div className="space-x-4 flex mt-[.375rem]">
                  <h5>Material:</h5>
                  <h5 className="text-dark-gray">Metal</h5>
                </div>
              </div>
            )}
            {tab === CurrentTabs.Review && (
              <h5 className="text-dark-gray">No Other Reviews</h5>
            )}
          </div>
        </div>

        <div className="mt-24">
          <h2>Similar Items</h2>
          {renderSimilarItems}
        </div>
      </div>
    </Layout>
  );
};

export async function getStaticPaths() {
  const ids = productList.map((product) => product.id);

  const pathWithParams = ids.map((id) => ({
    params: {
      pid: id,
    },
  }));

  return {
    paths: pathWithParams,
    fallback: false,
  };
}

export async function getStaticProps(context: any) {
  const { params } = context;
  const productId = params.pid;

  const preloadData = productList.find((product) => product.id === productId);

  const similarItmesList = productList.filter(
    (product) => product.id !== preloadData?.id
  );
  const randomList = shuffle(similarItmesList);
  const candidateList = randomList.slice(1, 4);

  return {
    props: {
      loadedProduct: preloadData,
      similarList: candidateList,
    },
  };
}

export default ProductDetail;
