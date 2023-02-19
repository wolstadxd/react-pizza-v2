import Categories from "../Components/Categories";
import Sort from "../Components/Sort";
import Skeleton from "../Components/PizzaBlock/Skeleton";
import PizzaBlock from "../Components/PizzaBlock";
import React, {useCallback, useContext, useEffect, useRef} from "react";
import Pagination from "../Components/Pagination";
import { Link, useNavigate } from "react-router-dom"
import qs from 'qs'
import {sortList} from "../Components/Sort";
import {useDispatch, useSelector} from "react-redux";
import {selectFilter, setCategoryId, setCurrentPage, setFilters} from "../redux/slices/filterSlice";
import {fetchPizzas, selectPizzaData} from "../redux/slices/pizzasSlice";

const Home = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const isSearch = useRef(false)
    const isMounted = useRef(false)

    const {items, status} = useSelector(selectPizzaData)
    const {categoryId, sort, currentPage, searchValue} = useSelector(selectFilter)
    const sortType = sort.sortProperty

    const onChangeCategory = useCallback((id: number) => {
        dispatch(setCategoryId(id))
    }, [])

    const onChangePage = (page: number) => {
        dispatch(setCurrentPage(page))
    }

    const getPizzas = async () => {

        const category = categoryId > 0 ? `category=${categoryId}` : ''
        const sortBy = sortType.replace('-', '')
        const order = sortType.includes('-') ? 'asc' : 'desc'

        dispatch(
            // @ts-ignore
            fetchPizzas({
            sortBy,
            order,
            category,
            currentPage
        }))
    }

    useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                sortProperty: sortType,
                categoryId,
                currentPage
            })
            navigate(`?${queryString}`)
        }
        isMounted.current = true
    }, [categoryId, sortType, currentPage])

    useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1))

            const sort = sortList.find((obj) => obj.sortProperty === params.sortProperty)

            dispatch(
                setFilters({
                    ...params,
                    sort
                })
            )
            isSearch.current = true
        }
    }, [])

    useEffect(() => {
        window.scrollTo(0,0)

        if  (!isSearch.current) {
            getPizzas()
        }

        isSearch.current = false

    }, [categoryId, sortType, searchValue, currentPage])


    const pizzas = items.filter((obj: any) => obj.title.toLowerCase().includes(searchValue.toLocaleString())).map((obj: any) => (
        <Link key={obj.id} to={`/pizza/${obj.id}`}><PizzaBlock {...obj} /></Link>))

    const skeleton = [...new Array(10)].map((_, index) => <Skeleton key={index} />)

    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId} onChangeCategory={onChangeCategory} />
                <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            {
                status === 'error' ? (<div className={'content__error-info'}>
                    <h2>Произошла ошибка <span>😕</span></h2>
                    <p>К сожалению не удалось получить питсы :( Попробуйте повторить попытку позже</p>
                </div> ) : ( <div className="content__items">
                    {status === 'loading' ? skeleton : pizzas}
                </div> )
            }

            <Pagination currentPage={currentPage} onChangePage={onChangePage} />
        </div>
    )
}

export default Home