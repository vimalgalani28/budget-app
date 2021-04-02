import {createStore} from "redux";
const incrementCount = ({incrementBy = 1} = {}) => ({
    type : "INCREMENT",
    incrementBy
})
const decrementCount = ({decrementBy = 1} = {}) => ({
    type : "DECREMENT",
    decrementBy
})
const resetCount = () => ({
    type : "RESET"
})
const store = createStore((state = {count : 0} , action)=>{
    switch (action.type) {
        case "INCREMENT" :
            return {
                count : state.count + action.incrementBy
            }
        case "DECREMENT" :
            return {
                count : state.count - action.decrementBy
            }
        case "RESET" : 
            return {
                count : 0
            }
        default :
            return state
    }
})

const unSubscribe = store.subscribe(()=>{
    console.log(store.getState())
}) 

store.dispatch(incrementCount({incrementBy : 3}))

store.dispatch(incrementCount())

store.dispatch(decrementCount({decrementBy : 3}))

store.dispatch(decrementCount())

store.dispatch(decrementCount())

store.dispatch(resetCount())
