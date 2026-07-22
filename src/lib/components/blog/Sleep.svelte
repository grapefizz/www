<script lang="ts">
  import sleepExport from "../../../content/blog/sleep/sleep.json";

  const { meta } = sleepExport;
  const rangeStart = new Date(meta.rangeStart);
  const rangeStartMonth = rangeStart.getUTCMonth() + 1;
  const rangeStartDay = rangeStart.getUTCDate();
  const rangeStartYear = rangeStart.getUTCFullYear();

  function parseTimestamp(timestamp: string) {
    const [date, time] = timestamp.split(" ");
    const [month, day] = date.split("-").map(Number);
    const [hours, minutes, seconds] = time.split(":").map(Number);
    const year =
      month < rangeStartMonth ||
      (month === rangeStartMonth && day < rangeStartDay)
        ? rangeStartYear + 1
        : rangeStartYear;

    return new Date(Date.UTC(year, month - 1, day, hours, minutes, seconds));
  }

  function formatDate(date: Date) {
    return new Intl.DateTimeFormat("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "UTC"
    }).format(date);
  }

  function formatTime(date: Date) {
    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
      timeZone: "UTC"
    }).format(date);
  }

  function positionTooltip(event: PointerEvent) {
    const cell = event.currentTarget as HTMLElement;
    const tooltip = cell.querySelector<HTMLElement>(".sleep-heatmap-tooltip");
    if (!tooltip) return;

    cell.classList.add("tooltip-active");

    const cellBounds = cell.getBoundingClientRect();
    const contentBounds = cell.closest("article")?.getBoundingClientRect();
    const minimum = contentBounds?.left ?? 8;
    const maximum = contentBounds?.right ?? window.innerWidth - 8;
    const tooltipWidth = tooltip.getBoundingClientRect().width;
    const preferredLeft = cellBounds.left + cellBounds.width / 2 - tooltipWidth / 2;
    const left = Math.min(
      Math.max(preferredLeft, minimum + 8),
      maximum - tooltipWidth - 8
    );

    tooltip.style.left = `${left - cellBounds.left}px`;
    tooltip.style.right = "auto";
    tooltip.style.transform = "none";
  }

  function hideTooltip(event: PointerEvent) {
    const cell = event.currentTarget as HTMLElement;
    const tooltip = cell.querySelector<HTMLElement>(".sleep-heatmap-tooltip");
    cell.classList.remove("tooltip-active");
    tooltip?.style.removeProperty("left");
    tooltip?.style.removeProperty("right");
    tooltip?.style.removeProperty("transform");
  }

  const sleepData = sleepExport.sleep.sessions.map((session) => {
    const bedtime = parseTimestamp(session.start);
    const waketime = parseTimestamp(session.end);

    return {
      asleep: session.asleepSec,
      bedtime,
      waketime
    };
  });
  const average =
    sleepData.reduce((acc, sleep) => acc + sleep.asleep, 0) / sleepData.length;
  const arrAsleep = sleepData.map((sleep) => sleep.asleep).sort((a, b) => a - b);
  const p = arrAsleep[Math.floor(arrAsleep.length * 0.93)];
  const z = sleepData.map((sleep) => ({
    offsetToBed: sleep.bedtime.getUTCHours() * 60 + sleep.bedtime.getUTCMinutes(),
    asleep: sleep.asleep
  }));
  const weekend = sleepData.filter((sleep) => {
    const day = sleep.waketime.getUTCDay();
    return day === 0 || day === 6;
  });
  const weekday = sleepData.filter((sleep) => {
    const day = sleep.waketime.getUTCDay();
    return day !== 0 && day !== 6;
  });
  const avgWeek =
    weekday.reduce((acc, sleep) => acc + sleep.asleep, 0) / weekday.length;
  const avgWeekend =
    weekend.reduce((acc, sleep) => acc + sleep.asleep, 0) / weekend.length;
</script>

<slot {sleepData} {average} {avgWeekend} {avgWeek} {formatDate} />
<div
  class="sleep-heatmap"
>
  {#each sleepData as sleep, index}
    <div
      class:first-column={index < 7}
      class:last-column={index >= sleepData.length - 7}
      class="sleep-heatmap-cell group rounded-sm border border-black/10"
      onpointerenter={positionTooltip}
      onpointerleave={hideTooltip}
      style={`background-color: color-mix(in srgb, var(--purple) ${Math.min(1, sleep.asleep / p) * 100}%, transparent)`}
    >
      <div
        class="sleep-heatmap-tooltip pointer-events-none select-none rounded-sm border border-black/10 bg-stone-100/70 px-1 shadow-md backdrop-blur-sm"
      >
        <code class="block">{Math.round((sleep.asleep / 3600) * 100) / 100} Hours</code>
        <span class="block text-sm opacity-60">
          From {formatTime(sleep.bedtime)} to <br />{formatTime(sleep.waketime)}
        </span>
      </div>
    </div>
  {/each}
</div>
<slot name="afterHeatmap" />

<style>
  .sleep-heatmap {
    display: grid;
    grid-auto-flow: row dense;
    grid-template-columns: repeat(7, minmax(0, 1fr));
    grid-auto-rows: auto;
    width: 100%;
    margin-inline: auto;
    gap: 0.125rem;
    padding-block: 2.5rem;
  }

  @media (min-width: 768px) {
    .sleep-heatmap {
      grid-auto-flow: column dense;
      grid-template-columns: none;
      grid-template-rows: repeat(7, 1rem);
      grid-auto-columns: 1rem;
      grid-auto-rows: auto;
      width: max-content;
    }
  }

  .sleep-heatmap-cell {
    position: relative;
    width: 100%;
    aspect-ratio: 1;
  }

  @media (min-width: 768px) {
    .sleep-heatmap-cell {
      width: 1rem;
      height: 1rem;
      aspect-ratio: auto;
    }
  }

  .sleep-heatmap-tooltip {
    position: absolute;
    bottom: 100%;
    left: 0;
    z-index: 50;
    display: none;
    width: max-content;
    max-width: calc(100vw - 2rem);
    margin-bottom: 0.25rem;
    background: var(--bg);
    transform: translateY(0);
    white-space: normal;
  }

  .sleep-heatmap-cell:hover .sleep-heatmap-tooltip,
  .sleep-heatmap-cell.tooltip-active .sleep-heatmap-tooltip {
    display: block;
  }

  .sleep-heatmap-cell:nth-child(7n + 4) .sleep-heatmap-tooltip,
  .sleep-heatmap-cell:nth-child(7n + 5) .sleep-heatmap-tooltip {
    left: 50%;
    transform: translateX(-50%);
  }

  .sleep-heatmap-cell:nth-child(7n + 6) .sleep-heatmap-tooltip,
  .sleep-heatmap-cell:nth-child(7n) .sleep-heatmap-tooltip {
    right: 0;
    left: auto;
  }

  @media (min-width: 768px) {
    .sleep-heatmap-tooltip {
      top: 100%;
      bottom: auto;
      right: auto;
      left: 50%;
      margin-top: 0.25rem;
      margin-bottom: 0;
      transform: translateX(-50%);
    }

    .sleep-heatmap-cell.first-column .sleep-heatmap-tooltip {
      left: 0;
      transform: none;
    }

    .sleep-heatmap-cell.last-column .sleep-heatmap-tooltip {
      right: 0;
      left: auto;
      transform: none;
    }
  }

  .sleep-timeline {
    display: flex;
    overflow: hidden;
    padding: 0.25rem;
  }

  .sleep-timeline-session {
    display: flex;
    min-width: 1px;
    flex: 1 1 0;
    flex-direction: column;
    padding-top: 2.5rem;
    background: var(--bg);
  }

  .sleep-timeline-offset,
  .sleep-timeline-asleep {
    width: 100%;
  }

  .sleep-timeline-offset {
    background: var(--bg);
  }

  @media (min-width: 1024px) {
    .sleep-heatmap {
      transform: scale(1.25);
    }
  }
</style>
