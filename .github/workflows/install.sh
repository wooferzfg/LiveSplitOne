set -ex

main() {
    curl -sSf https://build.travis-ci.org/files/rustup-init.sh | sh -s -- --default-toolchain=nightly -y
    export PATH=$HOME/.cargo/bin:$PATH

    local target=
    if [ $TRAVIS_OS_NAME = linux ]; then
        target=x86_64-unknown-linux-musl
        sort=sort
    fi

    cd $HOME
    git -C binaryen pull || git clone https://github.com/WebAssembly/binaryen binaryen
    cd binaryen
    cmake .
    make wasm-opt

    rustup target install $TARGET

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
