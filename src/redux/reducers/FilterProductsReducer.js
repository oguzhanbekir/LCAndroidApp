const FilterProductReducer = (state = {
        index:0,
        routes: [
            {key: 'campaigns', title: 'KAMPANYALAR'},
            {key: 'pizzas', title: 'PIZZALAR'},
            {key: 'byproducts', title: 'YAN ÜRÜNLER'},
        ]
    }, action) => {
    if (action.type === 'SWIPE_TVIEW') {
        return {
            index:action.payload,
            routes: [
            {key: 'campaigns', title: 'KAMPANYALAR'},
            {key: 'pizzas', title: 'PIZZALAR'},
            {key: 'byproducts', title: 'YAN ÜRÜNLER'},
        ],
        }
    } else {
        return state;
    }

};

export default FilterProductReducer;
