set -ex

main() {
    local target=
    if [ "$OS_NAME" = "ubuntu-latest" ]; then
        target=x86_64-unknown-linux-musl
        sort=sort
    else
        target=x86_64-apple-darwin
        sort=gsort
    fi

    cd $HOME
    git -C binaryen pull || git clone https://github.com/WebAssembly/binaryen binaryen
    cd binaryen
    cmake .
    make wasm-opt

    cargo install -f wasm-gc
    cargo install -f wasm-bindgen-cli

    # This fetches latest stable release
    local tag=$(git ls-remote --tags --refs --exit-code https://github.com/japaric/cross \
                       | cut -d/ -f3 \
                       | grep -E '^v[0.1.0-9.]+$' \
                       | $sort --version-sort \
                       | tail -n1)

    curl -LSfs https://japaric.github.io/trust/install.sh | \
        sh -s -- \
           --force \
           --git japaric/cross \
           --tag $tag \
           --target $target
}

main
