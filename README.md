<h2 align="center">vt-cli</h2>
<p>This is a cli tool based on the vue + typescript project.Use it to quickly create components、views、directive、.vue and mixin;
</p>

## Install

```
  // npm
  npm install vt-cli -g
```

## Usage

> Usage: vt [options] [command]
>
> Options:
  -V, --version            output the version number
  -B, --basePath [path]    set BasePath, default src
  -h, --help               output usage information

## Commands:
  ### component|c \<component>  create a component directory with typescript
  ### view|v \<view>            create a view directory with typescript
  ### vue \<name>               create a .vue component with typescript
  ### directive|d \<name>       create a directive with typescript

## Examples:

  ### show usage information
  \$  vt --help

  ### show version information
  \$  vt --version

  ### create a view directory with typescript
  \$  vt view view-name
  \$  vt v path/to/view-name

  ### create a component directory with typescript
  \$  vt component component-name
  \$  vt c path/to/component-name

  ### create a .vue component with typescript
  \$  vt vue vue-name
  \$  vt vue path/to/vue-name

  ### create a directive with typescript
  \$  vt directive directive-name
  \$  vt d path/to/directive-name