# Problem 3: Messy React

## err() vs error():
**Problem:** The error logging uses console.err, which is incorrect and may lead to issues. <br/>

**Improvements:** Use console.error for proper error logging.

```
useEffect(() => {
  const datasource = new Datasource('https://interview.switcheo.com/prices.json');
  datasource.getPrices()
    .then(setPrices)
    .catch(console.error); // Corrected to console.error
}, []);
```

## React Hook used incorrectly:
**Problem:** The useMemo hook for filtering and sorting balances should depend on both balances and prices to ensure it recalculates when either changes. <br/>

**Improvements:** Ensure the dependencies array for useMemo includes both balances and prices.

```
const sortedBalances = useMemo(() => {
  return balances
    .filter((balance: WalletBalance) => getPriority(balance.blockchain) > -99 && balance.amount <= 0)
    .sort((lhs: WalletBalance, rhs: WalletBalance) => getPriority(rhs.blockchain) - getPriority(lhs.blockchain));
}, [balances, prices]); // Added `prices` to dependencies
```

## Fetching Data Inside useEffect Without Dependencies:
**Problem:** The useEffect hook is employed to fetch prices but lacks dependencies, causing it to run only once upon component mounting. However, if there were dependencies, it would not re-run upon their changes. <br/>

**Improvements:** Verify that the dependencies array is accurate. If the intent is to run it once, it's correct as is. If it should run when dependencies change, include them in the array.

```
useEffect(() => {
  const datasource = new Datasource('https://interview.switcheo.com/prices.json');
  datasource.getPrices()
    .then(setPrices)
    .catch(console.error);
}, []); // An empty array signifies a single run
```

## Incorrect Handling of Negative and Zero Balances:
**Problem:** The filtering logic for handling balances with amounts <= 0 is embedded within a nested condition, which can be confusing. <br/>

**Improvements:** Simplify the logic to make it more straightforward.
```
const sortedBalances = useMemo(() => {
  return balances
    .filter((balance: WalletBalance) => getPriority(balance.blockchain) > -99 && balance.amount <= 0)
    .sort((lhs: WalletBalance, rhs: WalletBalance) => getPriority(rhs.blockchain) - getPriority(lhs.blockchain));
}, [balances, prices]);
```