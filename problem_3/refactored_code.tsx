import React, { useEffect, useMemo, useState } from 'react';
import { BoxProps } from '@mui/material';

interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: string; // Add blockchain type
}
interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
}

class Datasource {
  private url: string;
  constructor(url: string) {
    this.url = url;
  }

  async getPrices(): Promise<{ [key: string]: number }> {
    const response = await fetch(this.url);
    if (!response.ok) {
      throw new Error('Failed to fetch prices');
    }
    return response.json();
  }
}

interface Props extends BoxProps {}

const WalletPage: React.FC<Props> = (props: Props) => {
  const { ...rest } = props;
  const balances = useWalletBalances();
  const [prices, setPrices] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const datasource = new Datasource('https://interview.switcheo.com/prices.json');
    datasource.getPrices()
      .then(setPrices)
      .catch(console.error);
  }, []);

  const getPriority = (blockchain: string): number => {
    switch (blockchain) {
      case 'Osmosis':
        return 100;
      case 'Ethereum':
        return 50;
      case 'Arbitrum':
        return 30;
      case 'Zilliqa':
        return 20;
      case 'Neo':
        return 20;
      default:
        return -99;
    }
  };

  const sortedBalances = useMemo(() => {
    return balances
      .filter((balance: WalletBalance) => getPriority(balance.blockchain) > -99 && balance.amount <= 0)
      .sort((lhs: WalletBalance, rhs: WalletBalance) => {
        const leftPriority = getPriority(lhs.blockchain);
        const rightPriority = getPriority(rhs.blockchain);
        return rightPriority - leftPriority;
      });
  }, [balances, prices]);

  const formattedBalances = sortedBalances.map((balance: WalletBalance) => ({
    ...balance,
    formatted: balance.amount.toFixed(2),
  }));

  const rows = formattedBalances.map((balance: FormattedWalletBalance, index: number) => {
    const usdValue = prices[balance.currency] * balance.amount;
    return (
      <WalletRow
        className={classes.row}
        key={index}
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={balance.formatted}
      />
    );
  });

  return (
    <div {...rest}>
      {rows}
    </div>
  );
};
