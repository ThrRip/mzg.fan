{
  pkgs ? import <nixpkgs> { },
  ...
}:

pkgs.mkShell {
  packages = with pkgs; [
    nodejs_24
    pnpm_12

    (pkgs.writeShellScriptBin "oxlint" /* bash */ ''
      pnpm exec oxlint "$@"
    '')

    (pkgs.writeShellScriptBin "oxfmt" /* bash */ ''
      pnpm exec oxfmt "$@"
    '')
  ];
}
