## 0.2.0 (12-03-2023)

**Features:**
- specify fallback for release notes when no changelog file founded or when no description in this file for the new version with `notes-fallback` input: `fallbackText` | `auto`
- specify custom text that used for release notes fallback with `fallback-text` input

**Fixes:**
- fix #1: unable to read files from repo in which that action is running

## 0.1.0 (06-03-2023)

> `generate-release` now available to use as `beta`

**Features:**
- specify your own path to `package.json` file to track updates on with `track-file` input
- specify source of release notes with `notes-source` input: `changelog` | `auto`
- specify your own path to `CHANGELOG.md` file to get release notes from with `notes-file` input
- specify custom tag pattern with `tag-pattern` input
