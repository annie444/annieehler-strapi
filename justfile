[default]
default:
  @just --list

[group("Workspace")]
install:
  npm run setup

[group("Workspace")]
add +packages:
  npm i {{ packages }}

[group("Workspace")]
add-dev +packages:
  npm i -D {{ packages }}

[group("Workspace")]
run cmd *args:
  npm run {{ cmd }} {{ if args != "" { '-- ' + args } else { '' } }}

[group("Workspace")]
dev: (run "dev")

[group("Frontend")]
frun cmd *args:
  npm --workspace=frontend run {{ cmd }} {{ if args != "" { '-- ' + args } else { '' } }}

[group("Frontend")]
fadd +packages:
  npm --workspace=frontend i {{ packages }}

[group("Frontend")]
fadd-dev +packages:
  npm --workspace=frontend i -D {{ packages }}

[group("Frontend")]
fdev: (frun "dev")

[group("Frontend")]
fbuild: (frun "build")

[group("Frontend")]
fpreview: (frun "preview")

[group("Workspace")]
astro +args:
  just frun "astro" {{ args }}

[group("Frontend")]
flint: (frun "lint")

[group("Frontend")]
ffmt: (frun "fmt")

[group("Frontend")]
fcheck: (frun "fmt:check")

[group("Backend")]
brun cmd *args:
  npm --workspace=backend run {{ cmd }} {{ if args != "" { '-- ' + args } else { '' } }}

[group("Backend")]
badd +packages:
  npm --workspace=backend i {{ packages }}

[group("Backend")]
badd-dev +packages:
  npm --workspace=backend i -D {{ packages }}

[group("Backend")]
bbuild: (brun "build")

[group("Backend")]
bconsole: (brun "console")

[group("Backend")]
bdeploy: (brun "deploy")

[group("Backend")]
bdev: (brun "dev")

[group("Backend")]
bdevelop: (brun "develop")

[group("Backend")]
bstart: (brun "start")

[group("Workspace")]
strapi +args:
  just brun "strapi" {{ args }}

[group("Backend")]
bupgrade: (brun "upgrade")

[group("Backend")]
bupgrade-dry: (brun "upgrade:dry")
