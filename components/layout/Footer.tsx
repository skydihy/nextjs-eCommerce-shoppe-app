import { FC } from "react";

import LinkinLogo from "../../assets/logo/linkedin.svg";
import FacebookLogo from "../../assets/logo/facebook.svg";
import InstagramLogo from "../../assets/logo/instagram.svg";
import TwitterLogo from "../../assets/logo/twitter.svg";
import RightArrow from "../../assets/icon/continue-arrow.svg";

const Footer: FC = () => {
  return (
    <footer className="w-full mt-[250px]">
      <div className="flex flex-wrap justify-between max-w-[1248px] mx-auto desktop:max-w-[90%] border-t border-light-gray pb-[106px]">
        <div className="mt-[3.375rem] w-fit ">
          <ul className="flex flex-row space-x-16 text-dark-gray ">
            <li className="cursor-pointer">
              <h5>CONTACT</h5>
            </li>
            <li className="cursor-pointer">
              <h5>TERMS OF SERVICES</h5>
            </li>
            <li className="cursor-pointer">
              <h5>SHIPPING AND RETURNS</h5>
            </li>
          </ul>
          <h5 className="inline-block mt-12">
            © 2021 Shelly. <span className="text-dark-gray">Terms of use</span>{" "}
            and <span className="text-dark-gray">privacy policy.</span>
          </h5>
        </div>

        <div className="w-fit  mt-[3.375rem]">
          <div className="flex flex-row items-center justify-between border-b border-black space-x-32 pb-[14px]">
            <p className="text-dark-gray">Give an email, get the newsletter.</p>
            <div className="cursor-pointer">
              <RightArrow />
            </div>
          </div>
          <ul className="flex flex-row justify-end space-x-8 mt-[3.125rem]">
            <li className="cursor-pointer w-[1.125rem] aspect-square">
              <LinkinLogo />
            </li>
            <li className="cursor-pointer w-[1.125rem] aspect-square">
              <FacebookLogo />
            </li>
            <li className="cursor-pointer w-[1.125rem] aspect-square">
              <InstagramLogo />
            </li>
            <li className="cursor-pointer w-[1.125rem] aspect-square">
              <TwitterLogo />
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
