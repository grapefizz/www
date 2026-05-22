---
published: true
name: 'homekey esp32'
icon: 'globe'
description: a diy solution for using apple's homekey without a compatible smartlock
date: 2026-05-16
---

<script>
    import CaptionImage from '$lib/components/CaptionImage.svelte';
    import Icon from '~icons/ph/files';
</script>

A few months ago I got really invested in smart homes, specifically in Apple Homekit compatible devices.
But getting your hands on a Homekit supported lock isn't always easy, or cheap for that matter.
Thats when I discovered you can use an ESP32 to emulate a Homekit lock.

<CaptionImage image="esp32.png" alt="ESP32 chip." source="https://en.wikipedia.org/wiki/ESP32" sizes="50rem"/>

### how exactly does this work?
Well, the full setup would be something along the lines of an ESP32, and NFC reader like PN532 or RC522, and something like a servo to actually lock the door.
The actual *brains* of the setup is the ESP32 which will run [ESPHome](https://esphome.io/), a software that manages Wi-Fi, MQTT and all Home Assistant and sensor logic.

But what I'm actually here to talk about is the unlock method, the forged Homekey.
### what is homekey?
HomeKey is Apple's feature that lets you tap your iPhone or Apple Watch on a supported lock to unlock it, the same way you'd tap with Apple Pay (it even works with express mode!). The key is stored as a *card* in your Wallet app.
Commertially, Homekey locks usually retail for around €150-€300+. The DIY scene has made it accessible for only €20.

### how do we make our own homekey?
The project that makes this possible is [Homekey-ESP32](https://github.com/rednblkx/HomeKey-ESP32), a full self-contained firmware with a web interface that connects via WebSocket for real-time status updates as well as OTA updates. 
All settings including Wi-Fi, Homekit setup code and MQTT broker are all stored on the ESP32 and can be configured via the web interface.

<CaptionImage image="homekey.png" alt="Homekey in Apple Wallet." source="https://en.wikipedia.org/wiki/Apple_Home" sizes="50rem"/>

I'll give a few rough steps on how this is done just to get a simple idea.

- Wire your PN532 or RC522 to the ESP32. Don't forget to set the NFC reader to SPI mode by flipping the small DIP switches on the back of the board.
- Flash the ESP32 with the Homekey-ESP32 firmware.
- After flashing, the ESP32 will create its own Wi-Fi network where you'll have to join to configure the ESP32 to connect to your home network.
- After you've configured everything to your liking, you can link up the ESP32 with apple Home via the Homekit setup code seen on the web interface.

And thats about it... theres nothing more to it, looks a lot harder on paper than it actually is. With all of that said, I hope you enjoyed this small blog post. I look forward to seeing what everyone makes :)
