import type { NextPage } from "next";
import Link from "next/link";

import Layout from "../components/layout/Layout";

const Error: NextPage = () => {
  return (
    <Layout>
      <div className="flex flex-col text-center justify-center items-center h-screen -mb-[250px] max-w-[1248px] mx-auto desktop:max-w-[80%] pt-[107px]">
        <h1>404 ERROR</h1>
        <h3 className="text-dark-gray mt-6 inline-block">
          This page not found;
          <br />
          back to home and start again
        </h3>
        <Link href="/" passHref>
          <div className="rounded h-[54px] border border-black flex justify-center items-center px-12 cursor-pointer mt-16">
            HOMEPAGE
          </div>
        </Link>
      </div>
    </Layout>
  );
};

export default Error;
