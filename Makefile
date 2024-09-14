ASSET_PATHS := $(shell find ./assets/*)
CONFIGURATOR_SRC := $(shell find ./configurator -name target -prune -o -type f -print) configurator/Cargo.toml configurator/Cargo.lock
HEALTH_CHECK_SRC := $(shell find ./health-check -name target -prune -o -type f -print) health-check/Cargo.toml health-check/Cargo.lock
PKG_VERSION := $(shell yq e ".version" manifest.yaml)
PKG_ID := $(shell yq e ".id" manifest.yaml)
UID := $(shell id -u)
GID := $(shell id -g)
TS_FILES := $(shell find ./scripts -name \*.ts)

.DELETE_ON_ERROR:

all: verify

clean:
	rm -f $(PKG_ID).s9pk
	rm -f scripts/*.js
	rm -fr docker-images/

verify: $(PKG_ID).s9pk
	@start-sdk verify s9pk $(PKG_ID).s9pk
	@echo " Done!"
	@echo "   Filesize: $(shell du -h $(PKG_ID).s9pk) is ready"

install:
	@if [ ! -f ~/.embassy/config.yaml ]; then echo "You must define \"host: http://server-name.local\" in ~/.embassy/config.yaml config file first."; exit 1; fi
	@echo "\nInstalling to $$(grep -v '^#' ~/.embassy/config.yaml | cut -d'/' -f3) ...\n"
	@[ -f $(PKG_ID).s9pk ] || ( $(MAKE) && echo "\nInstalling to $$(grep -v '^#' ~/.embassy/config.yaml | cut -d'/' -f3) ...\n" )
	@start-cli package install $(PKG_ID).s9pk

arm:
	@rm -f docker-images/x86_64.tar
	@ARCH=aarch64 $(MAKE)

x86:
	@rm -f docker-images/aarch64.tar
	@ARCH=x86_64 $(MAKE)

$(PKG_ID).s9pk: manifest.yaml instructions.md LICENSE icon.png scripts/embassy.js docker-images/aarch64.tar docker-images/x86_64.tar actions/*.sh
ifeq ($(ARCH),aarch64)
	@echo "start-sdk: Preparing aarch64 package ..."
else ifeq ($(ARCH),x86_64)
	@echo "start-sdk: Preparing x86_64 package ..."
else
	@echo "start-sdk: Preparing Universal Package ..."
endif
	@start-sdk pack

docker-images/x86_64.tar: Dockerfile docker_entrypoint.sh configurator/target/x86_64-unknown-linux-musl/release/configurator health-check/target/x86_64-unknown-linux-musl/release/health-check actions/*
ifeq ($(ARCH),aarch64)
else
	mkdir -p docker-images
	docker buildx build --tag start9/$(PKG_ID)/main:$(PKG_VERSION) --platform=linux/amd64 --build-arg ARCH=x86_64 -o type=docker,dest=docker-images/x86_64.tar .
endif

docker-images/aarch64.tar: Dockerfile docker_entrypoint.sh configurator/target/aarch64-unknown-linux-musl/release/configurator health-check/target/aarch64-unknown-linux-musl/release/health-check actions/*
ifeq ($(ARCH),x86_64)
else
	mkdir -p docker-images
	docker buildx build --tag start9/$(PKG_ID)/main:$(PKG_VERSION) --platform=linux/arm64 --build-arg ARCH=aarch64 -o type=docker,dest=docker-images/aarch64.tar .
endif

configurator/target/aarch64-unknown-linux-musl/release/configurator: $(CONFIGURATOR_SRC)
	docker run --user $(UID):$(GID) --rm -v ~/.cargo/registry:/root/.cargo/registry -v "$(shell pwd)"/configurator:/home/rust/src messense/rust-musl-cross:aarch64-musl cargo build --release
	docker run --user $(UID):$(GID) --rm -v ~/.cargo/registry:/root/.cargo/registry -v "$(shell pwd)"/configurator:/home/rust/src messense/rust-musl-cross:aarch64-musl musl-strip target/aarch64-unknown-linux-musl/release/configurator
# Docker 26 + buildkit 0.13.2 seem to have issues with building a context that contains multiple hardlinked files, work-around that by breaking the hardlink
	cp configurator/target/aarch64-unknown-linux-musl/release/configurator configurator/target/aarch64-unknown-linux-musl/release/configurator.tmp
	mv configurator/target/aarch64-unknown-linux-musl/release/configurator.tmp configurator/target/aarch64-unknown-linux-musl/release/configurator

health-check/target/aarch64-unknown-linux-musl/release/health-check: $(HEALTH_CHECK_SRC)
	docker run --user $(UID):$(GID) --rm -v ~/.cargo/registry:/root/.cargo/registry -v "$(shell pwd)"/health-check:/home/rust/src messense/rust-musl-cross:aarch64-musl cargo build --release
	docker run --user $(UID):$(GID) --rm -v ~/.cargo/registry:/root/.cargo/registry -v "$(shell pwd)"/health-check:/home/rust/src messense/rust-musl-cross:aarch64-musl musl-strip target/aarch64-unknown-linux-musl/release/health-check
	cp health-check/target/aarch64-unknown-linux-musl/release/health-check health-check/target/aarch64-unknown-linux-musl/release/health-check.tmp
	mv health-check/target/aarch64-unknown-linux-musl/release/health-check.tmp health-check/target/aarch64-unknown-linux-musl/release/health-check

configurator/target/x86_64-unknown-linux-musl/release/configurator: $(CONFIGURATOR_SRC)
	docker run --user $(UID):$(GID) --rm -v ~/.cargo/registry:/root/.cargo/registry -v "$(shell pwd)"/configurator:/home/rust/src messense/rust-musl-cross:x86_64-musl cargo build --release
	docker run --user $(UID):$(GID) --rm -v ~/.cargo/registry:/root/.cargo/registry -v "$(shell pwd)"/configurator:/home/rust/src messense/rust-musl-cross:x86_64-musl musl-strip target/x86_64-unknown-linux-musl/release/configurator
	cp configurator/target/x86_64-unknown-linux-musl/release/configurator configurator/target/x86_64-unknown-linux-musl/release/configurator.tmp
	mv configurator/target/x86_64-unknown-linux-musl/release/configurator.tmp configurator/target/x86_64-unknown-linux-musl/release/configurator

health-check/target/x86_64-unknown-linux-musl/release/health-check: $(HEALTH_CHECK_SRC)
	docker run --user $(UID):$(GID) --rm -v ~/.cargo/registry:/root/.cargo/registry -v "$(shell pwd)"/health-check:/home/rust/src messense/rust-musl-cross:x86_64-musl cargo build --release
	docker run --user $(UID):$(GID) --rm -v ~/.cargo/registry:/root/.cargo/registry -v "$(shell pwd)"/health-check:/home/rust/src messense/rust-musl-cross:x86_64-musl musl-strip target/x86_64-unknown-linux-musl/release/health-check
	cp health-check/target/x86_64-unknown-linux-musl/release/health-check health-check/target/x86_64-unknown-linux-musl/release/health-check.tmp
	mv health-check/target/x86_64-unknown-linux-musl/release/health-check.tmp health-check/target/x86_64-unknown-linux-musl/release/health-check

scripts/embassy.js: $(TS_FILES)
	deno bundle scripts/embassy.ts scripts/embassy.js
