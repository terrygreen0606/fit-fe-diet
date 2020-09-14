import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import classnames from 'classnames';
import Helmet from 'react-helmet';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';

import { getTranslate } from 'utils';
import {
  getShoppingList,
  setShoppingRowBought,
  searchIngredients,
  addIngredientInShoppingList,
  deleteFromShoppingList,
  getPublicShopListUrl,
} from 'api';

import WithTranslate from 'components/hoc/WithTranslate';
import CustomCheckbox from 'components/common/Forms/CustomCheckbox';
import SelectInput from 'components/common/Forms/SelectInput';
import Spinner from 'components/common/Spinner';
import SiteTour from 'components/SiteTour/SiteTour';
import Button from 'components/common/Forms/Button';
import Breadcrumb from 'components/Breadcrumb';
import ShareButtons from 'components/ShareButtons';
import { routes } from 'constants/routes';

import { ReactComponent as FileDyskIcon } from 'assets/img/icons/file-dysk-icon.svg';
import { ReactComponent as PrintIcon } from 'assets/img/icons/print-icon.svg';
import { ReactComponent as ShareIcon } from 'assets/img/icons/share-icon.svg';
import { ReactComponent as TrashIcon } from 'assets/img/icons/trash-icon.svg';

import './ShoppingListView.sass';

import { colourStylesSelect, mockData } from './dataForShoppingList';

const ShoppingListView: React.FC = (props: any) => {
  const { localePhrases, settings } = props;
  const [measurement, setMeasurement] = useState(null);
  const [publicShopListUrl, setPublicShopListUrl] = useState(null);
  const [items, setItems] = useState(null);
  const [ingredientId, setIngredientId] = useState<string>('');
  const [ingredientWeight, setIngredientWeight] = useState('');
  const [quantity, setQuantity] = useState(null);
  const [slideStep, setSlideStep] = useState(1);
  const [shareListPopup, setShareListPopup] = useState(false);
  const [ingredientsArray, setIngredientsArray] = useState([]);

  const t = (code: string, placeholders?: any) => getTranslate(
    localePhrases,
    code,
    placeholders,
  );

  const quantityOptions = (measure) => (
    measure === 'si'
      ? [{ value: t('common.gr_label'), label: t('common.gr_label') }]
      : [{ value: t('common.oz_label'), label: t('common.oz_label') }]
  );

  const onAction = () => {
    setSlideStep(0);
  };

  const filterIngredients = async (inputValue: string) => {
    if (inputValue.length < 2) return;
    const filteredListOfIngredients: Array<any> = [];
    try {
      const response = await searchIngredients(inputValue);
      const listOfIngredients = response.data.data;
      Object.entries(listOfIngredients).forEach(([value, label]) => {
        filteredListOfIngredients.push({
          value,
          label,
        });
      });
      return filteredListOfIngredients;
    } catch {
      return filteredListOfIngredients;
    }
  };

  const inputValueIngredient = (ingredientValue: string) => new Promise((resolve) => {
    resolve(filterIngredients(ingredientValue));
  });

  const changeHandler = (ingredient, { action }) => {
    if (action === 'select-option') {
      setIngredientId(ingredient.value);
    }
  };

  const inputChangeHandler = (inputValue, { action }) => {
    if ((action === 'set-value' || action === 'input-change') && inputValue.length !== 0) {
      inputValueIngredient(inputValue).then((res: Array<any>) =>
        res && res.length !== 0 && setIngredientsArray([...res]));
    }
  };

  const addIngredient = async () => {
    if (!ingredientWeight || !ingredientId) toast.warn('Product name and quantity should be filled');
    else {
      await addIngredientInShoppingList(
        ingredientId,
        ingredientWeight ? +ingredientWeight : undefined,
      );
      await getShoppingList(2)
        .then((res) => setItems(res.data.data.list));
    }
  };

  const deleteIngredient = (item) => {
    setItems((prev) => [
      ...prev.splice(0, prev.indexOf(item)),
      ...prev.splice(prev.indexOf(item) + 1),
    ]);

    deleteFromShoppingList(item.id)
      .catch((error) => toast.error(error.message));
  };

  const onChangeHandler = (e, item) => {
    if (e.target.checked) {
      e.target.parentElement.parentElement.classList.add('active');
    } else {
      e.target.parentElement.parentElement.classList.remove('active');
    }

    setShoppingRowBought(item.id, e.target.checked)
      .catch((error) => toast.error(error.message));
  };

  const namingEditor = (item) => {
    const weight = measurement === 'si'
      ? `${item.weight} ${t('common.gr_label')}`
      : `${item.weight} ${t('common.oz_label')}`;

    return `${item.name_i18n} (${weight})`;
  };

  const saveShopList = async () => {
    await getPublicShopListUrl(1)
      .then((res) => window.location.assign(res.data.data.url));
  };

  const renderItems = () => {
    const firstColumn = [];
    const secondColumn = [];
    const categories = [];

    const filterCategories = (category) => {
      if (!categories.includes(category)) {
        categories.push(category);
        return category;
      } return null;
    };

    items.forEach((item) => {
      if (item.column === 1) {
        firstColumn.push(
          <React.Fragment key={item.id}>
            {
              filterCategories(item.cuisine_name_i18n) && (
                <div className='shopping_list_body_sect_category'>
                  {item.cuisine_name_i18n}
                </div>
              )
            }
            <div
              className={classnames('shopping_list_body_sect_item', {
                active: item.is_bought,
              })}
            >
              <CustomCheckbox
                label={namingEditor(item)}
                defaultChecked={item.is_bought}
                onChange={(e) => onChangeHandler(e, item)}
                className='shopping_list_body_sect_item_checkbox'
                inline
              />
              <span
                role='presentation'
                className='shopping_list_body_sect_item_trash'
                onClick={() => deleteIngredient(item)}
              >
                <TrashIcon />
              </span>
            </div>
          </React.Fragment>,
        );
      } else {
        secondColumn.push(
          <React.Fragment key={item.id}>
            {
              filterCategories(item.cuisine_name_i18n) && (
                <div className='shopping_list_body_sect_category'>
                  {item.cuisine_name_i18n}
                </div>
              )
            }
            <div
              className={classnames('shopping_list_body_sect_item', {
                active: item.is_bought,
              })}
              key={item.id}
            >
              <CustomCheckbox
                label={namingEditor(item)}
                defaultChecked={item.is_bought}
                onChange={(e) => onChangeHandler(e, item)}
                className='shopping_list_body_sect_item_checkbox'
                inline
              />
              <span
                role='presentation'
                className='shopping_list_body_sect_item_trash'
                onClick={() => deleteIngredient(item)}
              >
                <TrashIcon />
              </span>
            </div>
          </React.Fragment>,
        );
      }
    });

    return (
      <div className='shopping_list_body_sect'>
        <div className='shopping_list_body_sect_1'>
          {firstColumn.map((item) => item)}
        </div>
        <div className='shopping_list_body_sect_2'>
          {secondColumn.map((item) => item)}
        </div>
      </div>
    );
  };

  useEffect(() => {
    getShoppingList(2)
      .then((res) => setItems(res.data.data.list));
    setMeasurement(settings.measurement);
    setQuantity(quantityOptions(settings.measurement)[0]);
    getPublicShopListUrl()
      .then((res) => setPublicShopListUrl(res.data.data.url));
  }, []);

  useEffect(() => {
    const actives = document.querySelectorAll('.shopping_list_body_sect_item.active');

    actives.forEach((item) => {
      item.querySelector('input').setAttribute('checked', 'checked');
    });
  });

  // if (document.querySelector('.shopping_list_body_title_sect_text')) {
  //   document.querySelector('.shopping_list_body_title_sect_text').innerHTML = document
  //     .querySelector('.shopping_list_body_title_sect_text').innerHTML
  //     .replace(/(\d+)/, `${
  //       document.querySelectorAll('input[type="checkbox"]:not(:checked)').length
  //     }`);
  // }

  if (!items) return <Spinner color='#0FC1A1' />;

  return (
    <>
      <section>
        <Helmet>
          <title>{t('recipe.saved.shopping_list')}</title>
        </Helmet>
        <div className='container'>
          <Breadcrumb
            routes={[
              {
                url: routes.main,
                name: t('breadcrumb.main'),
              },
            ]}
            currentPage={t('app.title.shopping_list')}
          />

          <h1 className='training-plan-title'>
            <span className='training-plan-title-text'>
              {t('recipe.saved.shopping_list')}
            </span>
          </h1>
          <div className='row px-3 px-md-0'>
            <div className='shopping_list_container'>
              <div className='shopping_list_body_title_sect'>
                <h4 className='shopping_list_body_title_sect_text'>
                  {t('shop_list.to_buy', { number: items.filter((item) => !item.is_bought).length })}
                </h4>
                <div className='shopping_list_body_title_sect_icons'>
                  <FileDyskIcon
                    className='page-sub-tabs-controls-icon'
                    onClick={saveShopList}
                  />
                  <PrintIcon
                    className='page-sub-tabs-controls-icon'
                    onClick={() => window.print()}
                  />
                  <ShareIcon
                    className='page-sub-tabs-controls-icon'
                    onClick={() => setShareListPopup(!shareListPopup)}
                  />
                  {
                    shareListPopup && (
                      <ShareButtons shareLink={publicShopListUrl} classes='sharing_socials' />
                    )
                  }
                </div>
              </div>

              <div className='shopping_list_body'>
                {items.length ? renderItems() : t('shopping_list.empty')}
              </div>

              <div className='shopping_list_footer'>
                <div className='shopping_list_footer_ingredient'>
                  <span className='shopping_list_footer_ingredient_text'>
                    {t('ingr.add')}
                  </span>
                  <div className='shopping_list_footer_ingredient_input_sect'>
                    <Select
                      isClearable
                      placeholder={t('common.product_name')}
                      options={ingredientsArray}
                      onInputChange={inputChangeHandler}
                      onChange={changeHandler}
                      styles={colourStylesSelect}
                      noOptionsMessage={
                        ingredientsArray.length > 0
                          ? () => t('shop_list.no_ingredient')
                          : () => t('shop_list.emty_field')
                      }
                    />
                  </div>
                </div>
                <div className='shopping_list_footer_quantity'>
                  <span className='shopping_list_footer_quantity_text'>
                    {t('common.quantity')}
                  </span>
                  <div className='shopping_list_footer_quantity_input_sect'>
                    <input
                      className='shopping_list_footer_quantity_input'
                      type='number'
                      min={1}
                      value={ingredientWeight}
                      onChange={(e) => setIngredientWeight(e.target.value)}
                    />
                    <SelectInput
                      value={quantity}
                      options={quantityOptions(measurement)}
                      onChange={setQuantity}
                      width={100}
                    />
                    <Button
                      className='shopping_list_footer_quantity_button'
                      type='button'
                      color='primary'
                      onClick={addIngredient}
                    >
                      {t('common.add')}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {
        slideStep ? (
          <SiteTour
            className='shopping_tour'
            data={mockData}
            localePhrases={localePhrases}
            onAction={onAction}
          />
        ) : null
      }
    </>
  );
};

export default WithTranslate(
  connect(
    (state: any) => ({
      settings: state.settings,
    }),
  )(ShoppingListView),
);
