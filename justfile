[private]
@default:
    just --list

[private]
alias run-w := run-web

run-web:
    yarn run dev --open http://localhost:1420

[private]
alias run-d := run-desktop

run-desktop:
    yarn tauri dev

[private]
alias build-w := build-web

build-web:
    yarn run build

[private]
alias build-d := build-desktop

build-desktop:
    yarn tauri build

serve-dist: build-web
    static-web-server.exe --host 127.0.0.1 --port 8000 --root dist/
