import database from '../firebase/firebase'

// ADD_EXPENSE action generator
export const addExpense = (expense) =>({
    type : "ADD_EXPENSE" ,
    expense
})

export const startAddExpense = (expenseData)=>{
    return (dispatch, getState)=>{
        const uid = getState().auth.uid
        const   {
            description = "",
            amount = 0,
            createdAt = 0,
            note = ""
        } = expenseData
        const expense = {description , amount , createdAt , note}
        return database.ref(`users/${uid}/expenses`).push(expense).then((ref)=>{
            dispatch(addExpense({
                id : ref.key,
                ...expense
            }))
        })
    }
}

// REMOVE_EXPENSE action generator
export const removeExpense = ({id} = {}) => ({
    type : "REMOVE_EXPENSE" , 
    id
})

export const startRemoveExpense =(expenseData) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid
        const {id} = expenseData
        return database.ref(`users/${uid}/expenses/${id}`).remove().then(()=>{
            dispatch(removeExpense({id}))
        })
    }
}

// EDIT_EXPENSE action generator
export const editExpense = (id , updates) =>({
    type : "EDIT_EXPENSE",
    id,
    updates
})

export const startEditExpense = (id , updates) =>{
    return (dispatch , getState) => {
        const uid = getState().auth.uid
        return database.ref(`users/${uid}/expenses/${id}`).set(updates).then(()=>{
            dispatch(editExpense(id , updates))
        })
    }
}

// SET_EXPENSES
export const setExpenses = (expenses) => ({
    type: 'SET_EXPENSES',
    expenses
  });
  
  export const startSetExpenses = () => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid
        return database.ref(`users/${uid}/expenses`).once('value').then((snapshot) => {
        const expenses = [];
  
        snapshot.forEach((childSnapshot) => {
          expenses.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
          });
        });
  
        dispatch(setExpenses(expenses));
      });
    };
  };