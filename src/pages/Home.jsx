import axios from 'axios'
import Categories from "../Components/Categories";
import Sort from "../Components/Sort";
import Skeleton from "../Components/PizzaBlock/Skeleton";
import PizzaBlock from "../Components/PizzaBlock";
import {useContext, useEffect, useState} from "react";
import Pagination from "../Components/Pagination";
import {SearchContext} from "../App";
import {useDispatch, useSelector} from "react-redux";
import {setCategoryId, setCurrentPage} from "../redux/slices/filterSlice";

const Home = () => {
    const dispatch = useDispatch()
    const {categoryId, sort, currentPage} = useSelector(state => state.filter)
    const sortType = sort.sortProperty


    const [items, setItems] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const {searchValue} = useContext(SearchContext)

    const onChangeCategory = (id) => {
        dispatch(setCategoryId(id))
    }

    const onChangePage = number => {
        dispatch(setCurrentPage(number))
    }


    useEffect(() => {
        setIsLoading(true)

        const category = categoryId > 0 ? `category=${categoryId}` : ''
        const sortBy = sortType.replace('-', '')
        const order = sortType.includes('-') ? 'asc' : 'desc'


        axios.get(`https://63c6ed58d307b7696743f513.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}`)
            .then(res => {
                setItems(res.data)
                setIsLoading(false)
            })

        window.scrollTo(0,0)
    }, [categoryId, sortType, currentPage])

    const pizzas = items.filter(obj => obj.title.toLowerCase().includes(searchValue.toLocaleString())).map((obj) => <PizzaBlock key={obj.id} {...obj} />)

    const skeleton = [...new Array(10)].map((_, index) => <Skeleton key={index} />)

    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId} onChangeCategory={onChangeCategory}/>
                <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {
                    isLoading ? skeleton : pizzas
                }
            </div>
            <Pagination currentPage={currentPage} onChangePage={onChangePage} />
        </div>
    )
}

export default Home