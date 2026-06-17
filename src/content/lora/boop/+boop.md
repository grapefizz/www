---
published: true
name: 'boop scroboard'
icon: 'starfour'
description: a counter of our boops
date: 2026-06-17
---
<script>
 import HeartIcon from "~icons/ph/heart";
</script>


<style>
.content table.boop-table {
  width: auto;
}

.content table.boop-table th,
.content table.boop-table td {
  padding: 0.4rem 0.65rem;
  white-space: nowrap;
}
</style>

<table class="boop-table">
  <colgroup>
    <col style="width: 1%" />
    <col style="width: 5rem" />
    <col style="width: 5rem" />
  </colgroup>
  <thead>
    <tr>
      <th><HeartIcon class="icon" /></th>
      <th>Ari the Boopasaurus</th>
      <th>Lora the Yummysaurus</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Boops</td>
      <td>6</td>
      <td>6</td>
    </tr>
  </tbody>
</table>
