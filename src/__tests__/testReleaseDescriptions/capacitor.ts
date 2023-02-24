import { TestReleaseNotes } from "./types";

// https://github.com/ionic-team/capacitor/blob/main/CHANGELOG.md#470-2023-02-22

const version = '4.7.0';

export default {
  version,
  title: `# Change Log

  All notable changes to this project will be documented in this file.
  See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.
  
# [${version}](https://github.com/ionic-team/capacitor/compare/4.6.3...4.7.0) (2023-02-22)\n\n\n\n`,

  description: `### Bug Fixes
  
  * handle fetch headers that are Headers objects ([#6320](https://github.com/ionic-team/capacitor/issues/6320)) ([cb00e49](https://github.com/ionic-team/capacitor/commit/cb00e4952acca8e877555f30b2190f6685d25934))
  * **cli:** prevent error on manifest element without children ([#6278](https://github.com/ionic-team/capacitor/issues/6278)) ([a7e374f](https://github.com/ionic-team/capacitor/commit/a7e374fc4d834ded437edb4c8a0be98b6691be4c))
  * **cli:** Remove buildOptions from platform capacitor.config.json ([#6292](https://github.com/ionic-team/capacitor/issues/6292)) ([acddcd9](https://github.com/ionic-team/capacitor/commit/acddcd95b40a7d4cc6c7682d2d1019f96dacf68d))
  * **ios:** Avoid double encoding on http urls ([#6288](https://github.com/ionic-team/capacitor/issues/6288)) ([4768085](https://github.com/ionic-team/capacitor/commit/4768085414768bb2c013afcc6c645664893cd297))
  * **ios:** Correctly Attach Headers to Request ([#6303](https://github.com/ionic-team/capacitor/issues/6303)) ([a3f875c](https://github.com/ionic-team/capacitor/commit/a3f875cf42e111fde07d6e87643264b19ed77573))
  
  
  ### Features
  
  * **android:** add ability to create config from a custom file path ([#6264](https://github.com/ionic-team/capacitor/issues/6264)) ([42b4f0f](https://github.com/ionic-team/capacitor/commit/42b4f0f416c8038ae368860007910bb09c8ec84e))
  * **android:** Add SSL Pinning logic ([#6314](https://github.com/ionic-team/capacitor/issues/6314)) ([07f113e](https://github.com/ionic-team/capacitor/commit/07f113e6933e15c45d772f69f7128cbb3706f7b9))
  * **android:** enable loading of assets outside of the content web asset directory ([#6301](https://github.com/ionic-team/capacitor/issues/6301)) ([364497d](https://github.com/ionic-team/capacitor/commit/364497d4aca93fc716a0673ef9103479aed791ec))
  * **cli:** add ssl pinning copy logic ([#6312](https://github.com/ionic-team/capacitor/issues/6312)) ([cce66c1](https://github.com/ionic-team/capacitor/commit/cce66c1d59370ba35db879f4d7a3620d22175ab0))`,

  nextVersion: `\n\n\n\n\n\n## [4.6.3](https://github.com/ionic-team/capacitor/compare/4.6.2...4.6.3) (2023-02-03)
  
  
  ### Bug Fixes`
} as TestReleaseNotes;