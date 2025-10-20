---
published: true
name: 'pseudo shuffling'
icon: 'paper'
description: 'the randomness that fools us'
date: 2025-08-10
---

<script>
  import CaptionImage from '$lib/components/CaptionImage.svelte';
  import Icon from '~icons/ph/files';
  // Icons can be paper, globe, or code
</script>

Its been a long day at work, you come back home and open Spotify to play some music, you hit shuffle and you listen to your music.
You listen to each song, each one played by a different artist, each one in a different genre. Thats not randomness, quite the oposite actually.

## a true random shuffle
Lets say you have a playlist as follows. Each song is represented by a number and it's artist it represented by a letter:
```json
{
  "songs": {
    "1":  { "artist": "A", "genre": "🎸" },
    "2":  { "artist": "B", "genre": "🎹" },
    "3":  { "artist": "A", "genre": "🎸" },
    "4":  { "artist": "C", "genre": "🎤" },
    "5":  { "artist": "D", "genre": "🎻" },
    "6":  { "artist": "B", "genre": "🎹" },
    "7":  { "artist": "E", "genre": "🥁" },
    "8":  { "artist": "C", "genre": "🎤" },
    "9":  { "artist": "F", "genre": "🎧" },
    "10": { "artist": "E", "genre": "🥁" }
  }
}
```
and if I suffle them randomly like this:
```json
[4, 8, 1, 7, 5, 9, 2, 6, 10, 3]
```
You'll get songs by the same artists lined up, like 4 and 8 or 2 and 6, leading the user to leave the platform.
To counteract this, services like Spotify and Apple Music use something called:

## pseudo shuffling

The trick used here is adding constraints on top of randomness some of the more common ones are
- 1. Spacing rules, make sure that some artists "A" doesn't show up for N songs.
- 2. Bucketing, splitting your playlist into buckets and making sure songs by the same artist fall into different buckets.
- 3. Weighted randomness, ajusts probabilities so underplayed songs get a *boost* and overplayed songs get suppressed.

The simplest way of doing this is by grouping your songs by artist, picking a song randomly, and then *banning* that artist for the next few slots. This gives you a sequence that still feels random, but avoids “ugh, two Drake songs back-to-back.”
