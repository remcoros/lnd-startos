# Zap Wallet

Zap is designed to work with a remote LND node but currently has issues when connecting over Tor. If you experience these issues, please reach out to the Zap team and report it.
## Android

1. Download Orbot
1. In Orbot
    1. Turn on VPN Mode
    1. Under Tor-Enabled Apps, click the gear icon
    1. Add Zap and press the back arrow
    1. In the big onion at the top, click `Start`
1. In your phone settings, navigate to `Network & Internet > Advanced > Private DNS` and toggle Private DNS Mode off. 
1. In Zap
    1. Click `Setup Wallet`
    1. Click `Connect to Remote Node`
    1. Enter you LND Quick Connect URL into Zap. You can do this by scanning the QR code or copy/pasting the URL, both of which are located in your Embassy at `Services > Lightning Network Daemon > properties`.

* If Orbot is misbehaving try stopping other VPN services on the phone and/or restart Orbot.

## iOS

1. In Zap - When prompted, enter you LND Quick Connect URL into Zap. You can do this by scanning the QR code or copy/pasting the URL, both of which are located in your Embassy at `Services > Lightning Network Daemon > properties`.
