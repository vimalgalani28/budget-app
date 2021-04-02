// SET_TEXT_FILTER action generator
export const setTextFilter = (text = "") => ({
    type : "SET_TEXT_FILTER" ,
    text

})

//SORT_BY_AMOUNT action generator
export const sortByAmount = () => ({
    type : "SORT_BY_AMOUNT"
})

// SORT_BY_DATE action generator 
export const sortByDate = () =>({
    type : "SORT_BY_DATE"
})

// SET_START_DATE action generator
export const setStartDate = (startDate) => ({
    type : "SET_START_DATE",
    startDate
})

// SET_END_DATE
export const setEndDate = (endDate) =>({
    type : "SET_END_DATE",
    endDate
})