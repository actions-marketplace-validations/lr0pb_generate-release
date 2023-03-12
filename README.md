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
      uses: lr0pb/generate-release@v0.2.0
      with:
        token: ${{ secrets.GITHUB_TOKEN }}
```

## Action inputs and outputs
### Inputs
Inputs are like arguments for functions and must be set by the `with` keyword in your `<step-name>` that uses this Action

| Name | Description | Required? | Default value |
| --- | --- | --- | --- |
| `token` | Your `GITHUB_TOKEN` to provide access to GitHub REST API | ❗ Yes |
| `track-file` | Path to file used to track updates:<br />`package.json` file in whatever directory | ✅ No | `package.json` |
| `notes-source` | Source type for release notes:<br />`changelog` \| `auto` | ✅ No | `changelog` |
| `notes-file` | Path to changelog file used to provide release descriptions | ✅ No | `CHANGELOG.md` |
| `notes-fallback` | Fallback for release notes when no changelog file founded or when no description in this file for the new version:<br />`fallbackText` \| `auto` | ✅ No | `fallbackText`<br />`fallback-text` input value |
| `fallback-text` | Text used for `fallbackText` release notes fallback | ✅ No | "*No description 💭*" |
| `tag-pattern` | Custom tag pattern for release title | ✅ No | `v{major}.{minor}.{patch}` |

## Ready-to-use workflow file
Full workflow file template for your automatic release creation process:
```yaml
name: Create release

on:
  push:
    branches: ['main']

jobs:
  release:
    runs-on: ubuntu-latest
    permissions:
      contents: write
    steps:
      - name: Automatic Release Creation
        uses: lr0pb/generate-release@v0.2.0
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
```
