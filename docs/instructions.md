# Lightning Network Daemon (LND)

### Dependencies

LND requires a full archival Bitcoin node to function. Since your Embassy Bitcoin node is pruned by default, an additional service, Bitcoin Proxy, is also required. Both Bitcoin and Bitcoin Proxy must be installed and running.

### Config

Your LND node is highly configurable. Many settings are considered _advanced_ and should be used with caution. For the vast majority of users and use-cases, we recommend using the defaults. Once configured, you may start your node!

### Configuring Bitcoin Proxy

Go to `Services > Lightning Network Daemon`, find the Bitcoin Proxy dependency, and click `Configure`. This will automatically configure Bitcoin Proxy to satisfy LND.

### Using a Wallet

For a list of compatible wallets, see <a href="https://github.com/start9labs/lnd-wrapper/blob/master/docs/wallets.md" target="_blank">https://github.com/start9labs/lnd-wrapper/blob/master/docs/wallets.md</a> (this link will not work in the Consulate).