# Lightning Network Daemon (LND)

## Dependencies

LND on the Embassy requires a full archival Bitcoin node to function. Since your Embassy Bitcoin node is pruned by default, an additional service, Bitcoin Proxy, is also required.

## LND Config

Your LND node is highly configurable. Many settings are considered _advanced_ and should be used with caution. For the vast majority of users and use-cases, we recommend using the defaults. Once configured, you may start your node!

## Bitcoin Proxy Config

On the LND page, scroll down to find the Bitcoin Proxy dependency. Click `Configure`. This will automatically configure Bitcoin Proxy to satisfy LND.

## Using a Wallet

Enter your LND-Connect QR code (located in `properties`) into any wallet that supports connecting to a remote LND node over Tor. For a list of compatible wallets, see <a href="https://github.com/start9labs/lnd-wrapper/blob/master/docs/wallets.md" target="_blank">https://github.com/start9labs/lnd-wrapper/blob/master/docs/wallets.md</a>.

## Depositing to LND

When using LND or any wallet that is connected to LND it is important to note that until "Synced to Chain" in the Properties page is reporting ✅, your deposits to your LND on-chain wallet may not appear.

## Sending payments over Lightning

Once you have open channels and are ready to transact on the Lightning Network, it is important to note that until "Synced to Graph" in the Properties page is reporting ✅, you may experience problems finding routes to your destination.
