---
published: true
name: zetr
description: nes emulator made in rust
thumbnail: zetr_nobg.png
images: [cpu.png]
github: https://github.com/grapefizz/zetr
website: 
date: 2025-07-30   
---

# zetr - nes emulator

A Nintendo Entertainment System (NES) emulator written in Rust. Currently supports basic ROM loading and CHR data visualization.

## features

- iNES ROM format support
- Full 6502 CPU emulation with 80+ instructions
- Advanced PPU with background rendering
- Authentic NES timing (CPU/PPU sync)
- Complete memory mapping system
- NMI and interrupt handling
- Controller input with all buttons
- 60 FPS rendering with SDL2
- Support for Donkey Kong and other NES games

## controls

- Arrow Keys: D-pad
- Z: A button
- X: B button
- A: Select
- S: Start
- ESC: Quit

## building

Requires SDL2 to be installed:

```bash
# macOS
brew install sdl2

# Build and run
cargo build
./target/debug/zetr <rom_file>
```

## example

```bash
./target/debug/zetr donkeykong.nes
```

## current status

This is a functional NES emulator capable of running Donkey Kong and other NES games. The emulator features:

- Complete 6502 CPU: All essential instructions for game logic
- Advanced PPU: Background tile rendering with authentic NES graphics
- Real-time Emulation: Proper CPU/PPU timing synchronization
- Game Controls: Full controller support for gameplay

## architecture

- `cartridge.rs` - iNES ROM loading and memory mapping
- `ppu.rs` - Picture Processing Unit with authentic rendering
- `nes.rs` - 6502 CPU emulation and system coordination
- `main.rs` - SDL2 windowing, input handling, and main loop

## future improvements

- Sprite rendering and animation
- Audio processing (APU)
- Support for more mappers (currently supports mapper 0)
- Save states and rewind functionality
- Game-specific optimizations
- Debugger and development tools
