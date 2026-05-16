---
published: false
name: 'how pokemon calculates damage'
icon: 'paper'
description: how does pokemon calculte the damage of an attack?
date: 2026-04-10
---

A few months ago I started replaying every pokemon game from the start, and in every battle I thought to myself, how does pokemon actually calculate the damage I'm doing?

$$Damage = \left(\frac{\left(\frac{2 \times Level}{5} + 2\right) \times Power \times A/D}{50} + 2\right) \times Targets \times PB \times Weather \times GlaiveRush \times Critical \times random \times STAB \times Type \times Burn \times other \times ZMove \times TeraShield$$

But thats quite a lot, the main thing to focus on is 

$$Damage = \frac{\left(\frac{2 \times Level}{5} + 2\right) \times Power \times A/D}{50} + 2$$

That looks a lot more manageable. The main variables now are the atacker's level and atack stat (A), the defenders defense stat (D), and the base power of the move.
