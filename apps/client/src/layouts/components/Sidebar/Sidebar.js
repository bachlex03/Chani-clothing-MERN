import style from './Sidebar.module.scss';
import classNames from 'classnames/bind';
import { Category, PriceFilter, SizeVariation, ColorVariation, SideProduct } from '~/components';
import { sizesArr, ColorsHash, ColorsString } from '~/common/constants';
import { useEffect, useState } from 'react';
import { getCategories } from '~/services/api/categoryService';
import { renderCategories } from '~/utils/render-category';
import { useMutation } from '@tanstack/react-query'; // Ensure correct import
import { toast } from 'sonner';
import { AxiosError } from 'axios';
import * as productService from '~/services/api/productService';

const cx = classNames.bind(style);

function Sidebar({ categories, setColors, setSizes, onPriceRangeChange }) {
  const [sizesArray, setSizesArray] = useState(sizesArr);
  const [colorsArray, setColorsArray] = useState([]);
  const [checkedColors, setCheckedColors] = useState([]);
  const [checkedSizes, setCheckedSizes] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);

  const fetchingBestSellers = useMutation({
    mutationFn: async () => {
      return await productService.getBestSellers();
    },
    onSuccess: (data) => {
      setBestSellers(data);
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(`Error ${error.response?.status}`, {
          description: `${error.response?.data?.message}`,
        });
      }
    },
  });

  useEffect(() => {
    fetchingBestSellers.mutate();
  }, []);

  useEffect(() => {
    const objColorKeys = Object.keys(ColorsHash);

    setColorsArray(objColorKeys);
  }, []);

  const handleColorChecked = (color) => {
    const newCheckedColors = checkedColors.includes(color)
      ? checkedColors.filter((checkedColor) => checkedColor !== color)
      : [...checkedColors, color];

    setCheckedColors(newCheckedColors);
  };

  const handleSizeChecked = (size) => {
    const newCheckedSizes = checkedSizes.includes(size)
      ? checkedSizes.filter((checkedSize) => checkedSize !== size)
      : [...checkedSizes, size];

    setCheckedSizes(newCheckedSizes);
  };

  useEffect(() => {
    setColors(checkedColors);
  }, [checkedColors]);

  useEffect(() => {
    setSizes(checkedSizes);
  }, [checkedSizes]);

  return (
    <aside className={cx('sidebar')}>
      <div className="mt-50px">
        <h3 className={cx('heading')}>Product Categories</h3>
        {categories.map((category, index) => {
          return (
            <div className={cx('category-components-wrapper')}>
              <Category category={category} />
            </div>
          );
        })}

        <span className={cx('separate')}></span>
      </div>

      <div>
        <h3 className={cx('heading')}>Filter By Color</h3>
        {colorsArray.map((color, index) => {
          return <ColorVariation valueStr={color} key={index} onCheck={handleColorChecked} />;
        })}

        <span className={cx('separate')}></span>
      </div>

      <div>
        <h3 className={cx('heading')}>Filter By Size</h3>
        {sizesArray.map((size, index) => {
          return <SizeVariation valueStr={size} key={index} onCheck={handleSizeChecked} />;
        })}

        <span className={cx('separate')}></span>
      </div>

      <div>
        <h3 className={cx('heading')}>Filter By Price</h3>
        <PriceFilter onPriceRangeChange={onPriceRangeChange} />
        <span className={cx('separate')}></span>
      </div>

      <div>
        <h3 className={cx('heading')}>Best Selling Products</h3>
        {bestSellers.length > 0 ? (
          bestSellers.slice(0, 4).map((product) => (
            <div key={product._id} className={cx('side-product-component')}>
              <SideProduct product={product} sale={product.product_promotion} />
            </div>
          ))
        ) : (
          <div className={cx('no-products')}>
            <p>No products found</p>
          </div>
        )}
        <span className={cx('separate')}></span>
      </div>
    </aside>
  );
}

export default Sidebar;
