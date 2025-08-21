1. Create a basic react/nextjs application (static) ✅
2. Use Rainbow kit for wallet connection ✅
3. Implement this function ✅

```javascript
    function airdropERC20(
        address tokenAddress, // Token Address
        address[] calldata recipients,
        uint256[] calldata amounts,
        uint256 totalAmount
    )
```

4. e2e testing
5. Deploy to fleek

## tsender-deployed.json

The `tsender-deployed.json` object is a starting state for testing and working with the UI.

- TSender: `0x5FbDB2315678afecb367f032d93F642f64180aa3`
- Mock token address: `0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512` (can use the `mint` or `mintTo` function)
- The anvil1 default address (`0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266`) with private key `0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80` has some tokens already minted.

```solidity
    uint256 MINT_AMOUNT = 1e18;

    function mint() external {
        _mint(msg.sender, MINT_AMOUNT);
    }

    function mintTo(address to, uint256 amount) external {
        _mint(to, amount);
    }
```
