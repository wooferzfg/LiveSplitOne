# This script takes care of testing your crate

set -ex

SOURCE_BRANCH="master"
TARGET_BRANCH="gh-pages"

doCompile() {
    npm install
    npm run build:core
    npm run publish

    WASM_FILE=$(ls dist/*.wasm)
    $HOME/binaryen/bin/wasm-opt -O4 "$WASM_FILE" -o "$WASM_FILE"
    wasm-gc "$WASM_FILE"
}

if [ "$TRAVIS_PULL_REQUEST" != "false" -o "$TRAVIS_BRANCH" != "$SOURCE_BRANCH" ]; then
    echo "Skipping deploy; just doing a build."
    doCompile
    exit 0
fi

doCompile

git config --global user.email "christopher.serr@gmail.com"
git config --global user.name "Travis CI"
git checkout -b gh-pages
mv dist/* .
git add :/
git commit -m "gh pages"

ENCRYPTED_KEY_VAR="encrypted_${ENCRYPTION_LABEL}_key"
ENCRYPTED_IV_VAR="encrypted_${ENCRYPTION_LABEL}_iv"
ENCRYPTED_KEY=${!ENCRYPTED_KEY_VAR}
ENCRYPTED_IV=${!ENCRYPTED_IV_VAR}
openssl aes-256-cbc -K $ENCRYPTED_KEY -iv $ENCRYPTED_IV -in ci/deploy_key.enc -out deploy_key -d
chmod 600 deploy_key
eval `ssh-agent -s`
ssh-add deploy_key

git remote set-url origin git@github.com:LiveSplit/LiveSplitOne.git

git push origin gh-pages -f
