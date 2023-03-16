import {FlatList} from 'react-native';

import ExpenseItem from './ExpenseItem';

function renderExpenseItem(itemData: {
  item: JSX.IntrinsicAttributes & {
    id: any;
    description: any;
    amount: any;
    date: any;
  };
}) {
  return <ExpenseItem {...itemData.item} />;
}

function ExpensesList({expenses}) {
  return (
    <FlatList
      data={expenses}
      renderItem={renderExpenseItem}
      keyExtractor={item => item.id}
    />
  );
}

export default ExpensesList;
