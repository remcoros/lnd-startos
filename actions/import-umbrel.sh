#!/bin/sh

set -e

cat > input.json
UMBREL_HOST=$(jq -r '.["umbrel-host"]' input.json)
UMBREL_PASS=$(jq -r '.["umbrel-password"]' input.json)
rm input.json

if [ ! -e "/root/.lnd/pwd.dat" ]; then
  >&2 echo "Stopping Umbrel Services"
  echo "$UMBREL_PASS" | sshpass -p"$UMBREL_PASS" ssh -o StrictHostKeyChecking=no -T umbrel@$UMBREL_HOST "echo '$UMBREL_PASS' | sudo -S systemctl stop umbrel" < /dev/null
  >&2 echo "Copying LND Data"
  sshpass -p "$UMBREL_PASS" scp -o StrictHostKeyChecking=no -r -v umbrel@$UMBREL_HOST:/home/umbrel/umbrel/app-data/lightning/data/lnd/* /root/.lnd
  echo -n 'moneyprintergobrrr' > /root/.lnd/pwd.dat
  echo '{"version":"0","message":"Successfully Imported Umbrel Data. WARNING!!! With the Migration of LND complete, be sure to NEVER re-start your Umbrel using the same LND seed! You should never run two different lnd nodes with the same seed! This will lead to strange/unpredictable behavior or even loss of funds.","value":null,"copyable":false,"qr":false}'
else
  echo "Error: Existing LND data found on StartOS. Umbrel LND Data has not been migrated to StartOS. If you are CERTAIN there are no LND funds on StartOS and you would like to migrate data from another node, you will need to uninstall LND from StartOS and re-run this action on a fresh install of LND BEFORE ever starting the LND service on StartOS." >&2
  exit 1
fi