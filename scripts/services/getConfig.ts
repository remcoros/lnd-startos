import { compat, types as T } from "../deps.ts";

export const getConfig: T.ExpectedExports.getConfig = compat.getConfig({
  "control-tor-address": {
    "name": "Control Tor Address",
    "description": "The Tor address for the control interface.",
    "type": "pointer",
    "subtype": "package",
    "package-id": "lnd",
    "target": "tor-address",
    "interface": "control",
  },
  "peer-tor-address": {
    "name": "Peer Tor Address",
    "description": "The Tor address for the peer interface.",
    "type": "pointer",
    "subtype": "package",
    "package-id": "lnd",
    "target": "tor-address",
    "interface": "peer",
  },
  "watchtower-tor-address": {
    "name": "Watchtower Tor Address",
    "description": "The Tor address for the watchtower interface.",
    "type": "pointer",
    "subtype": "package",
    "package-id": "lnd",
    "target": "tor-address",
    "interface": "watchtower",
  },
  "alias": {
    "type": "string",
    "name": "Alias",
    "description": "The public, human-readable name of your Lightning node",
    "nullable": true,
    "pattern": ".{1,32}",
    "pattern-description":
      "Must be at least 1 character and no more than 32 characters",
  },
  "color": {
    "type": "string",
    "name": "Color",
    "description": "The public color dot of your Lightning node",
    "nullable": false,
    "pattern": "[0-9a-fA-F]{6}",
    "pattern-description":
      "Must be a valid 6 digit hexadecimal RGB value. The first two digits are red, middle two are green, and final two are\nblue\n",
    "default": {
      "charset": "a-f,0-9",
      "len": 6,
    },
  },
  "accept-keysend": {
    "type": "boolean",
    "name": "Accept Keysend",
    "description":
      "Allow others to send payments directly to your public key through keysend instead of having to get a new invoice\n",
    "default": true,
  },
  "accept-amp": {
    "type": "boolean",
    "name": "Accept Spontaneous AMPs",
    "description":
      "If enabled, spontaneous payments through AMP will be accepted. Payments to AMP\ninvoices will be accepted regardless of this setting.\n",
    "default": false,
  },
  "reject-htlc": {
    "type": "boolean",
    "name": "Reject Routing Requests",
    "description":
      "If true, LND will not forward any HTLCs that are meant as onward payments. This option will still allow LND to send\nHTLCs and receive HTLCs but lnd won't be used as a hop.\n",
    "default": false,
  },
  "min-chan-size": {
    "type": "number",
    "name": "Minimum Channel Size",
    "description":
      "The smallest channel size that we should accept. Incoming channels smaller than this will be rejected.\n",
    "nullable": true,
    "range": "[1,16777215]",
    "integral": true,
    "units": "satoshis",
  },
  "max-chan-size": {
    "type": "number",
    "name": "Maximum Channel Size",
    "description":
      "The largest channel size that we should accept. Incoming channels larger than this will be rejected.\nFor non-Wumbo channels this limit remains 16777215 satoshis by default as specified in BOLT-0002. For wumbo\nchannels this limit is 1,000,000,000 satoshis (10 BTC). Set this config option explicitly to restrict your maximum\nchannel size to better align with your risk tolerance.  Don't forget to enable Wumbo channels under 'Advanced,' if desired.\n",
    "nullable": true,
    "range": "[1,1000000000]",
    "integral": true,
    "units": "satoshis",
  },
  "tor": {
    "type": "object",
    "name": "Tor Config",
    "description":
      "Advanced options for increasing privacy (at the cost of performance) using Tor\n",
    "spec": {
      "use-tor-only": {
        "type": "boolean",
        "name": "Use Tor for all traffic",
        "description":
          "Use the tor proxy even for connections that are reachable on clearnet. This will hide your node's public IP address, but will slow down your node's performance",
        "default": false,
      },
      "stream-isolation": {
        "type": "boolean",
        "name": "Stream Isolation",
        "description":
          "Enable Tor stream isolation by randomizing user credentials for each connection. With this mode active, each connection will use a new circuit. This means that multiple applications (other than lnd) using Tor won't be mixed in with lnd's traffic.\nThis option may not be used when 'Use Tor for all traffic' is disabled, since direct connections compromise source IP privacy by default.",
        "default": false,
      },
    },
  },
  "bitcoind": {
    "type": "union",
    "name": "Bitcoin Core",
    "description":
      "<p>The Bitcoin Core node to connect to:</p><ul><li><strong>None</strong>: Use the light bitcoin backend built into LND, Neutrino. If using Neutrino, please switch to using Bitcoin Core as soon as possible. Neutrino uses the BIP157/8 light client protocol, which has security risks.</li><br><li><strong>Bitcoin Core</strong>: service installed on your server. Neutrino will also be used during IBD.</li></ul>",
    "tag": {
      "id": "type",
      "name": "Bitcoin Node Type",
      "variant-names": {
        "none": "None (Built-in LND Neutrino)",
        "internal": "Bitcoin Core",
      },
      "description":
        "<p>The Bitcoin Core node to connect to:</p><ul><li><strong>None</strong>: Use the light bitcoin backend built into LND, Neutrino. If using Neutrino, please switch to using Bitcoin Core as soon as possible. Neutrino uses the BIP157/8 light client protocol, which has security risks.</li><br><li><strong>Bitcoin Core</strong>: service installed on your server. Neutrino will also be used during IBD.</li></ul>",
    },
    "warning":
      "If using Neutrino, please switch to using Bitcoin Core as soon as possible. Neutrino uses the BIP157/8 light client protocol, which has security risks.",
    "default": "internal",
    "variants": {
      "none": {},
      "internal": {
        "user": {
          "type": "pointer",
          "name": "RPC Username",
          "description": "The username for Bitcoin Core's RPC interface",
          "subtype": "package",
          "package-id": "bitcoind",
          "target": "config",
          "multi": false,
          "selector": "$.rpc.username",
        },
        "password": {
          "type": "pointer",
          "name": "RPC Password",
          "description": "The password for Bitcoin Core's RPC interface",
          "subtype": "package",
          "package-id": "bitcoind",
          "target": "config",
          "multi": false,
          "selector": "$.rpc.password",
        },
      },
    },
  },
  "autopilot": {
    "type": "object",
    "name": "Autopilot",
    "description": "Autopilot Settings",
    "spec": {
      "enabled": {
        "type": "boolean",
        "name": "Enabled",
        "description":
          "If the autopilot agent should be active or not. The autopilot agent will attempt to AUTOMATICALLY OPEN CHANNELS to put your node in an advantageous position within the network graph.",
        "warning": "DO NOT ENABLE AUTOPILOT IF YOU WANT TO MANAGE CHANNELS MANUALLY OR IF YOU DO NOT UNDERSTAND THIS FEATURE.",
        "default": false,
      },
      "private": {
        "type": "boolean",
        "name": "Private",
        "description":
          "Whether the channels created by the autopilot agent should be private or not.\nPrivate channels won't be announced to the network.\n",
        "default": false,
      },
      "maxchannels": {
        "type": "number",
        "name": "Maximum Channels",
        "description": "The maximum number of channels that should be created.",
        "nullable": false,
        "range": "[1,*)",
        "integral": true,
        "default": 5,
      },
      "allocation": {
        "type": "number",
        "name": "Allocation",
        "description":
          'The fraction of total funds that should be committed to automatic channel\nestablishment. For example 60% means that 60% of the total funds available\nwithin the wallet should be used to automatically establish channels. The total\namount of attempted channels will still respect the "Maximum Channels" parameter.\n',
        "nullable": false,
        "range": "[0,100]",
        "integral": false,
        "default": 60,
        "units": "%",
      },
      "min-channel-size": {
        "type": "number",
        "name": "Minimum Channel Size",
        "description":
          "The smallest channel that the autopilot agent should create.",
        "nullable": false,
        "range": "[0,*)",
        "integral": true,
        "default": 20000,
        "units": "satoshis",
      },
      "max-channel-size": {
        "type": "number",
        "name": "Maximum Channel Size",
        "description":
          "The largest channel that the autopilot agent should create.",
        "nullable": false,
        "range": "[0,*)",
        "integral": true,
        "default": 16777215,
        "units": "satoshis",
      },
      "advanced": {
        "type": "object",
        "name": "Advanced",
        "description": "Advanced Options",
        "spec": {
          "min-confirmations": {
            "type": "number",
            "name": "Minimum Confirmations",
            "description":
              "The minimum number of confirmations each of your inputs in funding transactions\ncreated by the autopilot agent must have.\n",
            "nullable": false,
            "range": "[0,*)",
            "integral": true,
            "default": 1,
            "units": "blocks",
          },
          "confirmation-target": {
            "type": "number",
            "name": "Confirmation Target",
            "description":
              "The confirmation target (in blocks) for channels opened by autopilot.",
            "nullable": false,
            "range": "[0,*)",
            "integral": true,
            "default": 1,
            "units": "blocks",
          },
        },
      },
    },
  },
  "watchtowers": {
    "type": "object",
    "name": "Watchtowers",
    "description": "Watchtower Settings: A watchtower is a feature of a Lightning node that allows you to watch a node for potential channel breaches (the watchtower server). This functionality comes bundled in LND, but needs to be specifically enabled. Two nodes can act as each other’s watchtowers, meaning they simultaneously operate in server and client mode.",
    "spec": {
      "wt-server": {
        "type": "boolean",
        "name": "Enable Watchtower Server",
        "description":
          "Allow other nodes to find your watchtower server on the network.",
        "default": false,
      },
      "wt-client": {
        "type": "union",
        "name": "Enable Watchtower Client",
        "description":
          "Allow your node to find other watchtower servers on the network.",
        // "nullable": true,
        tag: {
          id: "enabled",
          name: "Watchtower Client Enabled",
          description: "Enable or disable Watchtower Client",
          "variant-names": {
            disabled: "Disabled",
            enabled: "Enabled",
          },
        },
        "default": "disabled",
        variants: {
          disabled: {},
          enabled: {
            "add-watchtowers": {
              "type": "list",
              "name": "Add Watchtowers",
              "description":
                "Add URIs of Watchtowers to connect to.",
              "range": "[1,*)",
              "subtype": "string",
              "spec": {
                "masked": false,
                "copyable": true,
                "placeholder":
                  "pubkey@host:9911",
              },
              "default": Array<string>(),
            },
          }
        }
      },
    },
  },
  "advanced": {
    "type": "object",
    "name": "Advanced",
    "description": "Advanced Options",
    "spec": {
      "debug-level": {
        "type": "enum",
        "name": "Log Verbosity",
        "values": [
          "trace",
          "debug",
          "info",
          "warn",
          "error",
          "critical",
        ],
        "value-names": {},
        "description":
          "Sets the level of log filtration. Trace is the most verbose, Critical is the least.\n",
        "default": "info",
      },
      "db-bolt-no-freelist-sync": {
        "type": "boolean",
        "name": "Disallow Bolt DB Freelist Sync",
        "description":
          "If true, prevents the database from syncing its freelist to disk.\n",
        "default": false,
      },
      "db-bolt-auto-compact": {
        "type": "boolean",
        "name": "Compact Database on Startup",
        "description":
          "Performs database compaction on startup. This is necessary to keep disk usage down over time at the cost of\nhaving longer startup times.\n",
        "default": true,
      },
      "db-bolt-auto-compact-min-age": {
        "type": "number",
        "name": "Minimum Autocompaction Age for Bolt DB",
        "description":
          "How long ago (in hours) the last compaction of a database file must be for it to be considered for auto\ncompaction again. Can be set to 0 to compact on every startup.\n",
        "nullable": false,
        "range": "[0, *)",
        "integral": true,
        "default": 168,
        "units": "hours",
      },
      "db-bolt-db-timeout": {
        "type": "number",
        "name": "Bolt DB Timeout",
        "description":
          "How long should LND try to open the database before giving up?",
        "nullable": false,
        "range": "[1, 86400]",
        "integral": true,
        "default": 60,
        "units": "seconds",
      },
      "recovery-window": {
        "type": "number",
        "name": "Recovery Window",
        "description":
          "Optional address 'look-ahead' when scanning for used keys during an on-chain recovery.  For example, a value of 2 would mean LND would stop looking for funds after finding 2 consecutive addresses that were generated but never used.  If an LND on-chain wallet was extensively used, then users may want to increase this value.  2500 is the default.",
        "nullable": true,
        "range": "[1,*)",
        "integral": true,
        "units": "addresses",
      },
      "payments-expiration-grace-period": {
        "type": "number",
        "name": "Payments Expiration Grace Period",
        "description":
          "A period to wait before for closing channels with outgoing htlcs that have timed out and are a result of this\nnodes instead payment. In addition to our current block based deadline, is specified this grace period will\nalso be taken into account.\n",
        "nullable": false,
        "range": "[1,*)",
        "integral": true,
        "default": 30,
        "units": "seconds",
      },
      "default-remote-max-htlcs": {
        "type": "number",
        "name": "Maximum Remote HTLCs",
        "description":
          "The default max_htlc applied when opening or accepting channels. This value limits the number of concurrent\nHTLCs that the remote party can add to the commitment. The maximum possible value is 483.\n",
        "nullable": false,
        "range": "[1,483]",
        "integral": true,
        "default": 483,
        "units": "htlcs",
      },
      "max-channel-fee-allocation": {
        "type": "number",
        "name": "Maximum Channel Fee Allocation",
        "description":
          "The maximum percentage of total funds that can be allocated to a channel's commitment fee. This only applies for\nthe initiator of the channel.\n",
        "nullable": false,
        "range": "[0.1, 1]",
        "integral": false,
        "default": 0.5,
      },
      "max-pending-channels": {
        "type": "number",
        "name": "Maximum Pending Channels",
        "description":
          "The maximum number of incoming pending channels permitted per peer.",
        "nullable": false,
        "range": "[0,*)",
        "integral": true,
        "default": 5,
      },
      "max-commit-fee-rate-anchors": {
        "type": "number",
        "name": "Maximum Commitment Fee for Anchor Channels",
        "description":
          "The maximum fee rate in sat/vbyte that will be used for commitments of channels of the anchors type. Must be\nlarge enough to ensure transaction propagation.\n",
        "nullable": false,
        "range": "[1,*)",
        "integral": true,
        "default": 100,
      },
      "protocol-wumbo-channels": {
        "type": "boolean",
        "name": "Enable Wumbo Channels",
        "description":
          "If set, then lnd will create and accept requests for channels larger than 0.16 BTC\n",
        "default": false,
      },
      "protocol-zero-conf": {
        "type": "boolean",
        "name": "Enable zero-conf Channels",
        "description":
          "Set to enable support for zero-conf channels. This requires the option-scid-alias flag to also be set.\n",
        "warning": 
          "Zero-conf channels are channels that do not require confirmations to be used. Because of this, the fundee must trust the funder to not double-spend the channel and steal the balance of the channel.",
        "default": false,
      },
      "protocol-option-scid-alias": {
        "type": "boolean",
        "name": "Enable option-scid-alias Channels",
        "description":
          "Set to enable support for option_scid_alias channels, which can be referred to by an alias instead of the confirmed ShortChannelID. Additionally, is needed to open zero-conf channels.\n",
        "default": false,
      },
      "protocol-no-anchors": {
        "type": "boolean",
        "name": "Disable Anchor Channels",
        "description":
          "Set to disable support for anchor commitments. Anchor channels allow you to determine your fees at close time by\nusing a Child Pays For Parent transaction.\n",
        "default": false,
      },
      "protocol-disable-script-enforced-lease": {
        "type": "boolean",
        "name": "Disable Script Enforced Channel Leases",
        "description":
          "Set to disable support for script enforced lease channel commitments. If not set, lnd will accept these channels by default if the remote channel party proposes them. Note that lnd will require 1 UTXO to be reserved for this channel type if it is enabled.\nNote: This may cause you to be unable to close a channel and your wallets may not understand why",
        "default": false,
      },
      "protocol-simple-taproot-chans": {
        "type": "boolean",
        "name": "Experimental Taproot Channels",
        "description":
          "Taproot Channels improve both privacy and cost efficiency of on-chain transactions. Note: Taproot Channels are experimental and only available for unannounced (private) channels at this time.",
        "default": false,
      },
      "gc-canceled-invoices-on-startup": {
        "type": "boolean",
        "name": "Cleanup Canceled Invoices on Startup",
        "description":
          "If true, LND will attempt to garbage collect canceled invoices upon start.\n",
        "default": false,
      },
      "allow-circular-route": {
        "type": "boolean",
        "name": "Allow Circular Route",
        "description":
          "If true, LND will allow htlc forwards that arrive and depart on the same channel.\n",
        "default": false,
      },
      "bitcoin": {
        "type": "object",
        "name": "Bitcoin Channel Configuration",
        "description":
          "Configuration options for lightning network channel management operating over the Bitcoin network",
        "spec": {
          "default-channel-confirmations": {
            "type": "number",
            "name": "Default Channel Confirmations",
            "description":
              "The default number of confirmations a channel must have before it's considered\nopen. LND will require any incoming channel requests to wait this many\nconfirmations before it considers the channel active.\n",
            "nullable": false,
            "range": "[1,6]",
            "integral": true,
            "default": 3,
            "units": "blocks",
          },
          "min-htlc": {
            "type": "number",
            "name": "Minimum Incoming HTLC Size",
            "description":
              "The smallest HTLC LND will to accept on your channels, in millisatoshis.\n",
            "nullable": false,
            "range": "[1,*)",
            "integral": true,
            "default": 1,
            "units": "millisatoshis",
          },
          "min-htlc-out": {
            "type": "number",
            "name": "Minimum Outgoing HTLC Size",
            "description":
              "The smallest HTLC LND will send out on your channels, in millisatoshis.\n",
            "nullable": false,
            "range": "[1,*)",
            "integral": true,
            "default": 1000,
            "units": "millisatoshis",
          },
          "base-fee": {
            "type": "number",
            "name": "Routing Base Fee",
            "description":
              "The base fee in millisatoshi you will charge for forwarding payments on your\nchannels.\n",
            "nullable": false,
            "range": "[0,*)",
            "integral": true,
            "default": 1000,
            "units": "millisatoshi",
          },
          "fee-rate": {
            "type": "number",
            "name": "Routing Fee Rate",
            "description":
              "The fee rate used when forwarding payments on your channels. The total fee\ncharged is the Base Fee + (amount * Fee Rate / 1000000), where amount is the\nforwarded amount. Measured in sats per million\n",
            "nullable": false,
            "range": "[1,1000000)",
            "integral": true,
            "default": 1,
            "units": "sats per million",
          },
          "time-lock-delta": {
            "type": "number",
            "name": "Time Lock Delta",
            "description":
              "The CLTV delta we will subtract from a forwarded HTLC's timelock value.",
            "nullable": false,
            "range": "[6, 144]",
            "integral": true,
            "default": 40,
            "units": "blocks",
          },
        },
      },
      "sweeper": {
        "type": "object",
        "name": "Sweeper Options",
        "description":
          "'Sweep' is a LND subservice that handles funds sent from dispute resolution contracts to the internal wallet.\nThese config values help inform the sweeper to make decisions regarding how much it burns in on-chain fees in order to recover possibly contested outputs (HTLCs and Breach outputs).\n<b>WARNING: These settings can result in loss of funds if poorly congifured. Refer to the LND documentation for more information: https://docs.lightning.engineering/lightning-network-tools/lnd/sweeper</b>",
        "spec": {
          "sweeper-maxfeerate": {
            "type": "number",
            "name": "Max Fee Rate",
            "description":
              "The max fee rate in sat/vb which can be used when sweeping funds. Setting this value too low can result in transactions not being confirmed in time, causing HTLCs to expire hence potentially losing funds.",
            "nullable": false,
            "range": "[1,*)",
            "integral": true,
            "default": 1000,
            "units": "Sats/vb"
          },
          "sweeper-nodeadlineconftarget": {
            "type": "number",
            "name": "Non-time-sensitive Sweep Confirmation Target",
            "description":
              "The conf target to use when sweeping non-time-sensitive outputs. This is useful for sweeping outputs that are not time-sensitive, and can be swept at a lower fee rate.",
            "nullable": false,
            "range": "[1,*)",
            "integral": true,
            "default": 1008,
            "units": "Confirmations"
          },
          "sweeper-budget-tolocalratio": {
            "type": "number",
            "name": "Budget to Local Ratio",
            "description":
              "The ratio (expressed as a decimal) of the value in to_local output to allocate as the budget to pay fees when sweeping it.",
            "nullable": false,
            "range": "[0,1)",
            "integral": false,
            "default": 0.5,
          },
          "sweeper-budget-anchorcpfpratio": {
            "type": "number",
            "name": "Anchor CPFP Ratio",
            "description":
              "The ratio of a special value to allocate as the budget to pay fees when CPFPing a force close tx using the anchor output. The special value is the sum of all time-sensitive HTLCs on this commitment subtracted by their budgets.",
            "nullable": false,
            "range": "[0,1)",
            "integral": false,
            "default": 0.5,
          },
          "sweeper-budget-deadlinehtlcratio": {
            "type": "number",
            "name": "Time-Sensitive HTLC Budget Ratio",
            "description":
              "The ratio of the value in a time-sensitive (first-level) HTLC to allocate as the budget to pay fees when sweeping it.",
            "nullable": false,
            "range": "[0,1)",
            "integral": false,
            "default": 0.5,
          },
          "sweeper-budget-nodeadlinehtlcratio": {
            "type": "number",
            "name": "Non-Time-Sensitive HTLC Budget Ratio",
            "description":
              "The ratio of the value in a non-time-sensitive (second-level) HTLC to allocate as the budget to pay fees when sweeping it.",
            "nullable": false,
            "range": "[0,1)",
            "integral": false,
            "default": 0.5,
          },
        }
      },
      "extra-addresses": {
        name: "Extra Addresses",
        description:
          "Additional addresses that resolve to this lnd node",
        type: "list",
        subtype: "string",
        range: "[0,*)",
        default: [],
        spec: {
          type: "string",
          placeholder: "lightning.example.com",
          textarea: false,
          copyable: false,
          masked: false,
        },
      } as T.ValueSpecList as T.ValueSpecAny,
    },
  },
});
