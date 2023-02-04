import Categories from "../Components/Categories";
import Sort from "../Components/Sort";
import Skeleton from "../Components/PizzaBlock/Skeleton";
import PizzaBlock from "../Components/PizzaBlock";
import {useContext, useEffect, useState} from "react";
import Pagination from "../Components/Pagination";
import {SearchContext} from "../App";

const Home = () => {
    const [items, setItems] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [categoryId, setCategoryId] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const [sortType, setSortType] = useState({
        name: 'популярности',
        sortProperty: 'rating'
    })

    const {searchValue} = useContext(SearchContext)

    useEffect(() => {
        setIsLoading(true)

        const category = categoryId > 0 ? `category=${categoryId}` : ''
        const sortBy = sortType.sortProperty.replace('-', '')
        const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc'

        fetch(`https://63c6ed58d307b7696743f513.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}`)
            .then((res) => {
                return res.json()
            })
            .then((arr) => {
                setItems(arr)
                setIsLoading(false)
            })
        window.scrollTo(0,0)
    }, [categoryId, sortType, searchValue, currentPage])

    const pizzas = items.filter(obj => obj.title.toLowerCase().includes(searchValue.toLocaleString())).map((obj) => <PizzaBlock key={obj.id} {...obj} />)

    const skeleton = [...new Array(10)].map((_, index) => <Skeleton key={index} />)

    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId} onChangeCategory={(i) => setCategoryId(i)}/>
                <Sort value={sortType} onChangeSort={(i) => setSortType(i)}/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {
                    isLoading ? skeleton : pizzas
                }
            </div>
            <Pagination onChangePage={(number) => setCurrentPage(number)} />
        </div>
    )
}

export default Home