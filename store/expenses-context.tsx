import {createContext, useReducer} from 'react';

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: () => {},
  setExpenses: () => {},
  deleteExpense: () => {},
  updateExpense: (id: any) => {},
});

function expensesReducer(
  state: any[],
  action: {type: any; payload: {reverse: () => any; id: any; data: any}},
) {
  switch (action.type) {
    case 'ADD':
      return [action.payload, ...state];
    case 'SET':
      const inverted = action.payload.reverse();
      return inverted;
    case 'UPDATE':
      const updatableExpenseIndex = state.findIndex(
        (expense: {id: any}) => expense.id === action.payload.id,
      );
      const updatableExpense = state[updatableExpenseIndex];
      const updatedItem = {...updatableExpense, ...action.payload.data};
      const updatedExpenses = [...state];
      updatedExpenses[updatableExpenseIndex] = updatedItem;
      return updatedExpenses;
    case 'DELETE':
      return state.filter(
        (expense: {id: any}) => expense.id !== action.payload,
      );
    default:
      return state;
  }
}

function ExpensesContextProvider({children}) {
  const [expensesState, dispatch] = useReducer(expensesReducer, []);

  function addExpense(expenseData: any) {
    dispatch({type: 'ADD', payload: expenseData});
  }

  function setExpenses(expenses: any) {
    dispatch({type: 'SET', payload: expenses});
  }

  function deleteExpense(id: any) {
    dispatch({type: 'DELETE', payload: id});
  }

  function updateExpense(id: any, expenseData: any) {
    dispatch({type: 'UPDATE', payload: {id: id, data: expenseData}});
  }

  const value = {
    expenses: expensesState,
    setExpenses: setExpenses,
    addExpense: addExpense,
    deleteExpense: deleteExpense,
    updateExpense: updateExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}

export default ExpensesContextProvider;
