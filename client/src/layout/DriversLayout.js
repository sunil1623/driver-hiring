import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate, useSearchParams } from 'react-router-dom';

export default function DriversLayout({ cookies }) {
  const [searchParams, setSearchParams] = useSearchParams({
    page: '1',
    limit: '6',
  });
  const [drivers, setDrivers] = useState('');
  const [submitPlace, setSubmitPlace] = useState('');
  const navigate = useNavigate();

  const place = searchParams.get('place')
    ? `place=${searchParams.get('place')}`
    : '';
  const price = searchParams.get('price')
    ? searchParams.get('price') === '2001'
      ? `price[gte]=${searchParams.get('price') * 1 - 1}`
      : `price[lte]=${searchParams.get('price')}`
    : '';
  const rating = searchParams.get('rating')
    ? `rating[gte]=${searchParams.get('rating')}`
    : '';
  const sort = searchParams.get('sort')
    ? `sort=${searchParams.get('sort')}`
    : '';

  const drives = searchParams.get('drives')
    ? `drives=${searchParams.get('drives')}`
    : '';

  const pricePerKm = searchParams.get('pricePerKm')
    ? searchParams.get('pricePerKm') === '16'
      ? `pricePerKm[gte]=${searchParams.get('pricePerKm') * 1 - 1}`
      : `pricePerKm[lte]=${searchParams.get('pricePerKm')}`
    : '';

  const page = searchParams.get('page');
  const limit = searchParams.get('limit');

  console.log(submitPlace, place, price, rating, sort);

  useEffect(() => {
    function fetchDrivers() {
      axios
        .get(
          `${process.env.REACT_APP_SERVER}/api/v1/user/hireDriver?${place}&${price}&${rating}&${sort}&${drives}&${pricePerKm}&page=${page}&limit=${limit}&fields=place,price,rating,drives,pricePerKm,photo,name,ratingsQuantity`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + cookies.jwt,
            },
          }
        )
        .then((res) => {
          setSubmitPlace('');
          setDrivers(res.data.data);
          console.log(res.data.data);
        })
        .catch((e) => console.error(e));
    }
    if (!cookies.jwt) {
      navigate('/login');
    }
    fetchDrivers();
  }, [
    cookies.jwt,
    place,
    price,
    rating,
    sort,
    drives,
    pricePerKm,
    page,
    limit,
    navigate,
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchParams(
      (prev) => {
        prev.set(
          'place',
          submitPlace[0]?.toUpperCase() + submitPlace?.slice(1).toLowerCase()
        );
        return prev;
      },
      { replace: true }
    );
  };

  const handleFilters = (e, type) => {
    setSearchParams(
      (prev) => {
        prev.set(
          `${type}`,
          e.target.value === 'next'
            ? parseInt(prev.get(`${type}`)) + 1
            : e.target.value === 'prev'
            ? parseInt(prev.get(`${type}`)) - 1
            : e.target.value
        );
        return prev;
      },
      { replace: true }
    );
  };

  return (
    <>
      <div className="driver-search">
        <form
          className="driver-filter"
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <input
            className="form__input driver-place"
            type="text"
            placeholder="User's Place"
            onChange={(e) => setSubmitPlace(e.target.value)}
            value={submitPlace}
            required
          />
          <button className="btn btn--green">Submit</button>
        </form>
        <div className="filters">
          <select
            onChange={(e) => handleFilters(e, 'price')}
            defaultValue={searchParams.get('price')}
          >
            <option value="">Price</option>
            <option value="100">{'<=₹100'}</option>
            <option value="500">{'<=₹500'}</option>
            <option value="1000">{'<=₹1000'}</option>
            <option value="1500">{'<=₹1500'}</option>
            <option value="2000">{'<=₹2000'}</option>
            <option value="2001">{'>=₹2000'}</option>
          </select>
          <select
            onChange={(e) => handleFilters(e, 'drives')}
            defaultValue={searchParams.get('drives')}
          >
            <option value="">Drives</option>
            <option value="Car">Car</option>
            <option value="Bus">Bus</option>
            <option value="Truck">Truck</option>
          </select>
          <select
            onChange={(e) => handleFilters(e, 'pricePerKm')}
            defaultValue={searchParams.get('pricePerKm')}
          >
            <option value="">Price/Km</option>
            <option value="5">{'<=₹5'}</option>
            <option value="8">{'<=₹8'}</option>
            <option value="10">{'<=₹10'}</option>
            <option value="12">{'<=₹12'}</option>
            <option value="15">{'<=₹15'}</option>
            <option value="16">{'>=₹15'}</option>
          </select>
          <select
            onChange={(e) => handleFilters(e, 'rating')}
            defaultValue={searchParams.get('rating')}
          >
            <option value="">Rating</option>
            <option value="4.5">{'>=4.5'}</option>
            <option value="4">{'>=4.0'}</option>
            <option value="3.5">{'>=3.5'}</option>
            <option value="3.0">{'>=3.0'}</option>
            <option value="2.0">{'>=2.0'}</option>
          </select>
        </div>
        <select
          onChange={(e) => handleFilters(e, 'sort')}
          defaultValue={searchParams.get('sort')}
          className="sort"
        >
          <option value="">Sort</option>
          <option value="price">Ascending Price</option>
          <option value="-price">Descending Price</option>
          <option value="price">Ascending Price/Km</option>
          <option value="-price">Descending Price/Km</option>
          <option value="rating">Ascending Rating</option>
          <option value="-rating">Descending Rating</option>
        </select>
      </div>
      <Outlet context={drivers.data} />
      <div className="driver-page">
        <p>Per Page</p>
        <select
          onChange={(e) => handleFilters(e, 'limit')}
          defaultValue={searchParams.get('limit')}
          className="sort"
        >
          <option value="6">6</option>
          <option
            value="9"
            disabled={
              drivers.total < 9 ||
              Math.ceil(drivers.total / 9) < searchParams.get('page') * 1
                ? true
                : false
            }
          >
            9
          </option>
          <option
            value="12"
            disabled={
              drivers.total < 12 ||
              Math.ceil(drivers.total / 12) < searchParams.get('page') * 1
                ? true
                : false
            }
          >
            12
          </option>
          <option
            value="15"
            disabled={
              drivers.total < 9 ||
              Math.ceil(drivers.total / 9) < searchParams.get('page') * 1
                ? true
                : false
            }
          >
            15
          </option>
        </select>
        <button
          value="prev"
          disabled={!drivers.prev ? true : false}
          onClick={(e) => handleFilters(e, 'page')}
          className={`btn ${
            !drivers.prev ? 'driver-page__inactive' : 'driver-page__active'
          }`}
        >{`< Prev`}</button>
        <span className="page-number">{searchParams.get('page')}</span>
        <button
          value="next"
          disabled={!drivers.next ? true : false}
          onClick={(e) => handleFilters(e, 'page')}
          className={`btn ${
            !drivers.next ? 'driver-page__inactive' : 'driver-page__active'
          }`}
        >{`Next >`}</button>
      </div>
    </>
  );
}
