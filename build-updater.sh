#!/bin/bash

DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
source "$DIR/build-node-lib.sh"

TMPDIR=$(mktemp -d)
ULDIR="$TMPDIR/usr/local"
mkdir -p "$ULDIR/"{bin,lib}
cp -R node_modules "$ULDIR/lib/"
cp source3{,alt} "$ULDIR/bin/"
pushd "$TMPDIR"
cat <<'EOF' > ev3-source-update.sh
#!/bin/bash
cd /
rm -f /usr/local/bin/source3{,alt}
rm -rf /usr/local/lib/node_modules
sed -e '1,/^exit$/d' "$0" | base64 -d | tar -zxv
exit
EOF
tar --owner=0 --group=0 -zc usr | base64 >> ev3-source-update.sh
popd
cp "$TMPDIR/ev3-source-update.sh" .
rm -rf "$TMPDIR"
