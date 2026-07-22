---
published: true
name: 'sleeping on the numbers'
icon: 'paper'
description: my sleep over the last 6 months
date: 2026-07-20
---

<script>
import Sleep from '$lib/components/blog/Sleep.svelte';
</script>

<Sleep let:sleepData let:average let:avgWeekend let:avgWeek let:formatDate>
  <p>
    This is data from <strong>{sleepData.length}</strong> nights of sleep, tracked
    with my Apple Watch SE 3 and exported from Apple Health, from
    <strong>{formatDate(sleepData[0].bedtime)} to {formatDate(sleepData.at(-1).waketime)}</strong>.
  </p>
  <h2>
    On average, I slept for <strong>{Math.round((average * 100) / 60) / 100}</strong>
    minutes or <strong>{Math.round((average * 100) / 3600) / 100}</strong> hours each
    night.
  </h2>
  <p>
    On weekends, I average <strong>{Math.round((avgWeekend * 100) / 3600) / 100} hours</strong>
    of sleep; on weekdays, I average <strong>{Math.round((avgWeek * 100) / 3600) / 100} hours</strong>.
  </p>
  <p>
      I defenitely feel like I've slept for longer than I really have.
  </p>

  <p slot="afterHeatmap">Days with no data have been removed.</p>
  <p slot="afterTimeline">
    This shows the time I went to bed and how long I slept. Times are shown in
    Europe/Belgrade local time.
  </p>
</Sleep>
