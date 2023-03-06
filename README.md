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
      with:
        token: secrets.GITHUB_TOKEN
```

## Action inputs and outputs
### Inputs
It work like arguments for function and should set via `with` keyword in your `<step-name>` that use this Action

| Name | Description | Required /<br />Default value |
| --- | --- | --- |
| `token` | Your `GITHUB_TOKEN` to provide access to GitHub REST API | ❗Required |
| `track-file` | Path to file used to track updates: some `package.json` file | ✅Optional<br />`package.json` |
| `notes-source` | Source type for release notes: `changelog` / `auto` | ✅Optional<br />`changelog` |
| `notes-file` | Path to changelog file used to provide release descriptions | ✅Optional<br />`CHANGELOG.md` |
| `tag-pattern` | Custom tag pattern for release title | ✅Optional<br />`v{major}.{minor}.{patch}` |

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
      with:
        token: secrets.GITHUB_TOKEN
```
