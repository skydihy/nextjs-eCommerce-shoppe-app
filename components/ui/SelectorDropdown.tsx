/* eslint-disable react/display-name */
import { forwardRef, RefObject } from "react";
import ChevDown from "../../assets/icon/chev-down.svg";

import { ShopSortings } from "../../pages/shop";

interface ISelectorDropdown {
  value?: string | null;
  show: boolean;
  optionList: any[];
  onShow: () => void;
  onSelect: (sort: ShopSortings | null) => void;
  placeholder?: string;
}

const SelectorDropdown = forwardRef((props: ISelectorDropdown, ref) => {
  const {
    value,
    show,
    optionList,
    onShow,
    onSelect,
    placeholder = "placeholder",
  } = props;

  return (
    <div
      className="relative rounded border border-gray z-50"
      ref={ref as RefObject<HTMLDivElement>}
    >
      <div
        className="flex justify-between items-center cursor-pointer px-3 py-4"
        onClick={onShow}
      >
        {value ? (
          <p className="text-sm">{value}</p>
        ) : (
          <p className="text-sm text-dark-gray">{placeholder}</p>
        )}

        <div>
          <ChevDown />
        </div>
      </div>
      {show && (
        <ul className="absolute left-0 top-0 mt-16 w-full border rounded border-dark-gray group group-open:h-max">
          <li
            className="w-full cursor-pointer px-3 py-4 text-sm text-dark-gray bg-white rounded-tl rounded-tr hover:bg-light-gray transition-colors"
            onClick={() => onSelect(null)}
          >
            Default
          </li>
          {optionList.map((option) => (
            <li
              key={option}
              className="w-full cursor-pointer px-3 py-4 text-sm bg-white  hover:bg-light-gray last:rounded-bl last:rounded-br transition-colors"
              onClick={() => onSelect(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
});

export default SelectorDropdown;
