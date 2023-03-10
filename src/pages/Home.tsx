import Categories from "../Components/Categories";
import Sort from "../Components/Sort";
import Skeleton from "../Components/PizzaBlock/Skeleton";
import PizzaBlock from "../Components/PizzaBlock";
import React, {useCallback, useEffect, useRef} from "react";
import Pagination from "../Components/Pagination";
import { useNavigate } from "react-router-dom"
import {useSelector} from "react-redux";
import {useAppDispatch} from "../redux/store";
import {selectFilter} from "../redux/filter/selectors";
import {selectPizzaData} from "../redux/pizza/selectors";
import {fetchPizzas} from "../redux/pizza/asyncActions";
import {setCategoryId, setCurrentPage} from "../redux/filter/slice";

const Home = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const isSearch = useRef(false)
    const isMounted = useRef(false)

    const {items, status} = useSelector(selectPizzaData)
    const {categoryId, sort, currentPage, searchValue} = useSelector(selectFilter)
    const sortType = sort.sortProperty

    const onChangeCategory = useCallback((id: number) => {
        dispatch(setCategoryId(id))
    }, [])

    const onChangePage = (page: number) => {
        dispatch(setCurrentPage(page));
    };

    const getPizzas = async () => {

        const category = categoryId > 0 ? `category=${categoryId}` : ''
        const sortBy = sortType.replace('-', '')
        const order = sortType.includes('-') ? 'asc' : 'desc'

        dispatch(
            fetchPizzas({
            sortBy,
            order,
            category,
            currentPage: String(currentPage)
        }))
    }

    // useEffect(() => {
    //     if (isMounted.current) {
    //         const queryString = qs.stringify({
    //             sortProperty: sortType,
    //             categoryId,
    //             currentPage
    //         })
    //         navigate(`?${queryString}`)
    //     }
    //     isMounted.current = true
    // }, [categoryId, sortType, currentPage])

    // useEffect(() => {
    //     if (window.location.search) {
    //         const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams;
    //
    //         const sort = sortList.find((obj) => obj.sortProperty === params.sortBy);
    //
    //         dispatch(
    //             setFilters({
    //                 categoryId: Number(params.category),
    //                 currentPage: Number(params.currentPage),
    //                 sort: sort || sortList[0]
    //             })
    //         )
    //         isSearch.current = true
    //     }
    // }, [])

    useEffect(() => {
        window.scrollTo(0,0)

        if  (!isSearch.current) {
            getPizzas()
        }

        isSearch.current = false

    }, [categoryId, sortType, searchValue, currentPage])


    const pizzas = items.filter((obj: any) => obj.title.toLowerCase().includes(searchValue.toLocaleString())).map((obj: any) => (
        <PizzaBlock key={obj.id} {...obj} />
    ))

    const skeleton = [...new Array(10)].map((_, index) => <Skeleton key={index} />)

    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId} onChangeCategory={onChangeCategory} />
                <Sort value={sort}/>
            </div>
            <h2 className="content__title">?????? ??????????</h2>
            {
                status === 'error' ? (<div className={'content__error-info'}>
                    <h2>?????????????????? ???????????? <span>????</span></h2>
                    <p>?? ?????????????????? ???? ?????????????? ???????????????? ?????????? :( ???????????????????? ?????????????????? ?????????????? ??????????</p>
                </div> ) : ( <div className="content__items">
                    {status === 'loading' ? skeleton : pizzas}
                </div> )
            }

            <Pagination currentPage={currentPage} onChangePage={onChangePage} />
        </div>
    )
}

export default Home