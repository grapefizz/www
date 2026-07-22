---
published: true
name: bmm-raycast
description: a macos raycast command that launches modded balatro 
thumbnail: bmm.png
images: [bmm.png]
github: https://github.com/grapefizz/bmm-raycast
website: 
date: 2026-07-22
---

# Balatro Mod Manager Launcher

A macOS Raycast command that launches Balatro with the Lovely injector installed by [Balatro Mod Manager](https://github.com/skyline69/balatro-mod-manager).

It reads Balatro Mod Manager's saved Balatro path from `~/Library/Application Support/Balatro/bmm_storage.db` and launches the bundled LOVE executable with `DYLD_INSERT_LIBRARIES` set to BMM's `bins/liblovely.dylib`.

If your installation is non-standard, configure either optional path override in Raycast's command preferences.

## Logs

Each launch attempt is recorded in Raycast's extension support directory as
`launch-modded-balatro.log`. A failed launch also displays the error in a Raycast toast.

## Development

```sh
npm install
npm run dev
```
