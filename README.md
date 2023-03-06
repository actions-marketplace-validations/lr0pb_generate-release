# 🛠️ Automatic Release Creation `beta`
[![Latest release version](https://img.shields.io/github/v/release/lr0pb/generate-release?color=g&label=Version&logo=github)](https://github.com/lr0pb/generate-release/releases)

> This Action is in the `beta` right now

Automatically create release tags based on files updated in a commit for JavaScript/TypeScript projects.
If you are new into GitHub Actions read [this quick start guide](https://docs.github.com/en/actions/quickstart) first

## Usage

Add following entry into your `jobs` list
```yaml
<job-name>:
  runs-on: ubuntu-latest
  permissions:
    contents: write
  steps:
    - name: Automatic Release Creation
      uses: lr0pb/generate-release@v0.1.0
```

## Action inputs and outputs
### Inputs
It work like arguments for function and should set via `with` keyword in your `<step-name>` that use this Action

| Name | Description | Required / Default value |
| --- | --- | --- |
| `token` | Your token to provide access to GitHub REST API, usually its `secrets.GITHUB_TOKEN` | `true` |
| `track-file` | Path to file used to track updates: some `package.json` file | `false` /<br />`package.json` |
| `notes-source` | Source type for release notes: `changelog` / `auto` | `false` /<br />`changelog` |
| `notes-file` | Path to changelog file used to provide release descriptions | `false` /<br />`CHANGELOG.md` |
| `tag-pattern` | Custom tag pattern for release title | `false` /<br />`v{major}.{minor}.{patch}` |

## Ready-to-use workflow file
Full workflow file template for your automatic release creation process:
```yaml
name: Create release

on:
  push:
    branches: ['main']

jobs:
  deploy:
    runs-on: ubuntu-latest
  permissions:
    contents: write
  steps:
    - name: Automatic Release Creation
      uses: lr0pb/generate-release@v0.1.0
```
