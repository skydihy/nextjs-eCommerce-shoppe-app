import { NextPage } from "next";
import Image from "next/image";

import Layout from "../../components/layout/Layout";

const Story: NextPage = () => {
  return (
    <Layout>
      <div className="max-w-[670px] mx-auto story:max-w-[80%] pt-[107px]">
        <div className="mt-24 flex flex-col items-start">
          <h1 className="self-center">About</h1>
          <h3 className="inline-block mt-6 self-center">
            Who we are and why we do what we do!
          </h3>
          <h5 className="inline-block mt-11">
            Duis rutrum dictum libero quis rutrum. Etiam sed neque aliquam,
            sollicitudin ante a, gravida arcu. Nam fringilla molestie velit,
            eget pellentesque risus scelerisque a. Nam ac urna maximus, tempor
            magna et, placerat urna. Curabitur eu magna enim. Proin placerat
            tortor lacus, ac sodales lectus placerat quis.
          </h5>

          <h2 className="mt-10 inline-block">Top trends</h2>
          <div className="mt-6">
            <Image
              className="rounded-lg mt-6"
              src="/images/section/about/preview01.png"
              alt="Product with hand's model"
              width={670}
              height={300}
              layout="intrinsic"
              quality={90}
            />
          </div>

          <h5 className="inline-block mt-12">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
            placerat, augue a volutpat hendrerit, sapien tortor faucibus augue,
            a maximus elit ex vitae libero. Sed quis mauris eget arcu facilisis
            consequat sed eu felis.
          </h5>
          <div className="mt-4 flex flex-col gap-2">
            <h5>● consectetur adipiscing elit. Aliquam placerat</h5>
            <h5>● Lorem ipsum dolor sit amet consectetur</h5>
          </div>

          <h2 className="inline-block mt-10">Produced with care</h2>
          <div className="mt-6">
            <Image
              className="rounded-lg"
              src="/images/section/about/preview02.png"
              alt="Product with hand's model"
              width={670}
              height={300}
              layout="intrinsic"
              quality={90}
            />
          </div>
          <h5 className="inline-block mt-12">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
            placerat, augue a volutpat hendrerit, sapien tortor faucibus augue,
            a maximus elit ex vitae libero. Sed quis mauris eget arcu facilisis
            consequat sed eu felis. Nunc sed porta augue. Morbi porta tempor
            odio, in molestie diam bibendu.
          </h5>
        </div>
      </div>
    </Layout>
  );
};

export default Story;
