import {createStore , combineReducers } from "redux"
import { v4 as uuidv4 } from "uuid"

// ADD_EXPENSE action generator
const addExpense = (
    {
        description = "",
        amount = 0,
        createdAt = 0,
        note = ""
    } = {}
) =>({
    type : "ADD_EXPENSE" ,
    expense : {
        id :uuidv4(),
        description,
        amount,
        note,
        createdAt
    }
})

// REMOVE_EXPENSE action generator
const removeExpense = ({id} = {}) => ({
    type : "REMOVE_EXPENSE" , 
    id
})

// EDIT_EXPENSE action generator
const editExpense = (id , updates) =>({
    type : "EDIT_EXPENSE",
    id,
    updates
})

// SET_TEXT_FILTER action generator
const setTextFilter = (text = "") => ({
    type : "SET_TEXT_FILTER" ,
    text

})

//SORT_BY_AMOUNT action generator
const sortByAmount = () => ({
    type : "SORT_BY_AMOUNT"
})

// SORT_BY_DATE action generator 
const sortByDate = () =>({
    type : "SORT_BY_DATE"
})

// SET_START_DATE action generator
const setStartDate = (startDate) => ({
    type : "SET_START_DATE",
    startDate
})

// SET_END_DATE
const setEndDate = (endDate) =>({
    type : "SET_END_DATE",
    endDate
})

// Sorting and Filtering expenses
const getVisibleExpenses = (expenses , {text , sortBy , startDate , endDate}) => {
    return expenses.filter((expense)=>{
        const startDateMatch = typeof startDate !== "number" || expense.createdAt >= startDate
        const endDateMatch = typeof endDate !== "number" || expense.createdAt <= endDate
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase())
        return startDateMatch && endDateMatch && textMatch
    }).sort((a , b)=>{
        if(sortBy === "date") {
            return a.createdAt < b.createdAt ? 1 : -1
        } else {
            return a.amount < b.amount ? 1 : -1
        }
    })
}

// Expense Reducer 
const expenseReducerDefault = []
const expenseReducer = (state = expenseReducerDefault , action) =>{
    switch(action.type) {
        case "ADD_EXPENSE" :
            return [...state , action.expense]
        case "REMOVE_EXPENSE" :
            return state.filter(({id})=> id !== action.id)
        case "EDIT_EXPENSE" :
            return state.map((expense)=>{
                if(expense.id === action.id) {
                    return {
                        ...expense ,
                        ...action.updates
                    }
                } else {
                    return expense
                }
            })
        default :
            return state
    }
}

// Filter Reducer
const filterReducerDefault = {
    text : "",
    sortBy : "date",
    startDate : undefined,
    endDate : undefined
}
const filterReducer = (state=filterReducerDefault , action) => {
    switch(action.type) {
        case "SET_TEXT_FILTER":
            return {
                ...state ,
                text : action.text
            }
        case "SORT_BY_AMOUNT":
            return {
                ...state ,
                sortBy : "amount"
            }
        case "SORT_BY_DATE":
            return {
                ...state ,
                sortBy : "date"
            }
        case "SET_START_DATE":
            return {
                ...state ,
                startDate : action.startDate
            }
        case "SET_END_DATE":
            return {
                ...state,
                endDate : action.endDate
            }
        default :
            return state
    }
}

//Creating store and combining reducer
const store = createStore(
    combineReducers({
        expenses : expenseReducer,
        filters : filterReducer
    })
)

const unSubscribe = store.subscribe(()=>{
    const state = store.getState()
    const visibleExpenses = getVisibleExpenses(state.expenses , state.filters)
    console.log(visibleExpenses)
})

const expenseOne = store.dispatch(addExpense({description : "Rent" , amount : 3400 , createdAt : 1000}))
const expenseTwo = store.dispatch(addExpense({description : "Coffee" , amount : 30 , createdAt : 2000}))
// store.dispatch(removeExpense({id : expenseOne.expense.id}))
// store.dispatch(editExpense(expenseTwo.expense.id , {amount : 50}))
// store.dispatch(setTextFilter("c"))
// store.dispatch(setTextFilter())
store.dispatch(sortByAmount())
// store.dispatch(sortByDate())
// store.dispatch(setStartDate(125))
// store.dispatch(setStartDate())
// store.dispatch(setEndDate(-1999))
// store.dispatch(setEndDate())