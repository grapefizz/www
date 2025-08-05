---
published: true
name: dotfiles
description: macos dotfiles managed with nix, nix-darwin and nix-homebrew
thumbnail: ss1.png
images: [ss1.png, ss2.png, ss3.png]
github: https://github.com/grapefizz/dotfiles
website: 
date: 2025-08-05
---

# dots

Simple yet powerful macOS dots managed fully with nix, nix-darwin and nix-homebrew.

## apps

- window manager: **yabai**
- hotkey daemon: **skhd**
- status bar: **sketchybar**
- terminal: **ghostty**
- editor: **neovim**


## structure

File structure is absolute shit right now, will def fix it later
```
.
├── flake.lock
├── flake.nix
├── modules
│   ├── config
│   │   ├── bat
│   │   │   ├── config
│   │   │   └── themes
│   │   │       └── Catppuccin Mocha.tmTheme
│   │   ├── borders
│   │   │   └── bordersrc
│   │   ├── btop
│   │   │   ├── btop.conf
│   │   │   └── themes
│   │   │       ├── catppuccin_frappe.theme
│   │   │       ├── catppuccin_latte.theme
│   │   │       ├── catppuccin_macchiato.theme
│   │   │       ├── catppuccin_mocha.theme
│   │   │       ├── oxocarbon_dark.theme
│   │   │       ├── rose-pine-moon.theme
│   │   │       └── tokyo-night.theme
│   │   ├── fastfetch
│   │   │   └── config.jsonc
│   │   ├── ghostty
│   │   │   └── config
│   │   ├── lvim
│   │   │   ├── config.lua
│   │   │   ├── lazy-lock.json
│   │   │   └── lv-settings.lua
│   │   ├── skhd
│   │   │   └── skhdrc
│   │   ├── starship
│   │   │   └── starship.toml
│   │   ├── wallpapers
│   │   │   ├── city.png
│   │   │   ├── cyberpunk.png
│   │   │   ├── dark-forest.jpg
│   │   │   ├── japan-city.png
│   │   │   ├── nix.png
│   │   │   ├── venice-market.png
│   │   │   └── voxel-city.jpg
│   │   ├── yabai
│   │   │   └── yabairc
│   │   └── zsh
│   ├── darwin.nix
│   ├── home.nix
│   ├── homebrew.nix
│   ├── stylix.nix
│   └── zsh.nix
├── README.md
└── screenshots
    ├── 1.png
    ├── 2.png
    └── 3.png
```

## how it works

- Nix manages all nixpkgs
- Nix-darwin manages all macOS system settings
- Nix-homebrew manages all homebrew brews, casks and taps