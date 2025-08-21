export function TransactionDetails({
  token,
  amount,
}: {
  token?: { name: string; symbol: string; decimals: number };
  amount: number;
}) {
  if (!token) return null;
  const { name, decimals, symbol } = token;
  const tokenAmount = (
    decimals > 0 ? amount / 10 ** decimals : amount
  ).toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals,
    useGrouping: false,
  });
  const weiAmount = amount.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals,
    useGrouping: true,
  });
  return (
    <div className="space-y-6 w-full p-4 text-base bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white transition-all duration-200 hover:border-gray-400 dark:hover:border-gray-500">
      <h3 className="font-semibold">Transaction details</h3>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <span className="font-semibold text-gray-500 dark:text-grey-400">
            Token name:
          </span>
          <span>{name}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-semibold text-gray-500 dark:text-grey-400">
            Amount (wei):
          </span>
          <span>{`${weiAmount} wei`}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-semibold text-gray-500 dark:text-grey-400">
            Amount (token):
          </span>
          <span>{`${tokenAmount} ${symbol}`}</span>
        </div>
      </div>
    </div>
  );
}
