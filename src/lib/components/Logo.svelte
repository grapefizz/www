<script>
    import { onMount } from 'svelte';
    let svgContainer;
    let animationReady = false;
    onMount(() => requestAnimationFrame(() => (animationReady = true)));
</script>

<div class="logo-container" class:ready={animationReady} bind:this={svgContainer} role="img" aria-label="Fizzy bubbles logo">
    <svg width="160" height="120" viewBox="0 0 200 150">
        <g class="bubble-group" style="--c:#bd63ee; --offset:0s;   --start:translate(60px,130px);  --mid:translate(64px,78px);  --top:translate(68px,45px);">
            <circle class="bubble-circle" r="12" />
            <!-- Particles -->
            <g class="particles">
                <circle class="particle" r="2" style="--dx:0;   --dy:-14; --pdelay:0s;    --vx:0;   --vy:-8; --drag:0.95;" />
                <circle class="particle" r="2" style="--dx:11;  --dy:-6;  --pdelay:0.015s; --vx:6;   --vy:-3; --drag:0.92;" />
                <circle class="particle" r="2" style="--dx:10;  --dy:8;   --pdelay:0.03s;  --vx:5;   --vy:4;  --drag:0.88;" />
                <circle class="particle" r="2" style="--dx:-7;  --dy:11;  --pdelay:0.045s; --vx:-4;  --vy:6;  --drag:0.90;" />
                <circle class="particle" r="2" style="--dx:-12; --dy:-3;  --pdelay:0.06s;  --vx:-7;  --vy:-2; --drag:0.93;" />
            </g>
        </g>
        <g class="bubble-group" style="--c:#6363ee; --offset:1.4s; --start:translate(100px,130px); --mid:translate(96px,78px); --top:translate(92px,45px);">
            <circle class="bubble-circle" r="12" />
            <g class="particles">
                <circle class="particle" r="2" style="--dx:0;   --dy:-14; --pdelay:0s;    --vx:0;   --vy:-9; --drag:0.94;" />
                <circle class="particle" r="2" style="--dx:12;  --dy:-8;  --pdelay:0.018s; --vx:7;   --vy:-4; --drag:0.91;" />
                <circle class="particle" r="2" style="--dx:13;  --dy:3;   --pdelay:0.036s; --vx:8;   --vy:2;  --drag:0.89;" />
                <circle class="particle" r="2" style="--dx:5;   --dy:12;  --pdelay:0.054s; --vx:3;   --vy:7;  --drag:0.87;" />
                <circle class="particle" r="2" style="--dx:-11; --dy:6;   --pdelay:0.072s; --vx:-6;  --vy:3;  --drag:0.92;" />
            </g>
        </g>
        <g class="bubble-group" style="--c:#26bbd9; --offset:2.8s; --start:translate(80px,130px);  --mid:translate(80px,68px);  --top:translate(80px,30px);">
            <circle class="bubble-circle" r="12" />
            <g class="particles">
                <circle class="particle" r="2" style="--dx:0;   --dy:-14; --pdelay:0s;    --vx:0;   --vy:-7; --drag:0.96;" />
                <circle class="particle" r="2" style="--dx:14;  --dy:0;   --pdelay:0.012s; --vx:8;   --vy:0;  --drag:0.90;" />
                <circle class="particle" r="2" style="--dx:9;   --dy:11;  --pdelay:0.024s; --vx:5;   --vy:6;  --drag:0.88;" />
                <circle class="particle" r="2" style="--dx:-9;  --dy:11;  --pdelay:0.036s; --vx:-5;  --vy:6;  --drag:0.91;" />
                <circle class="particle" r="2" style="--dx:-14; --dy:0;   --pdelay:0.048s; --vx:-8;  --vy:0;  --drag:0.89;" />
            </g>
        </g>
    </svg>
</div>

<style>
    .logo-container {
        width: var(--width, 4rem);
        height: var(--height, 4rem);
    }
    .logo-container svg {
        width: 100%;
        height: 100%;
        overflow: visible;
    }

    .logo-container:not(.ready) .bubble-group { transform:var(--start); }
    .logo-container:not(.ready) .bubble-circle,
    .logo-container:not(.ready) .particle {
        opacity:0;
        animation:none !important;
    }

    .logo-container.ready .bubble-group {
        transform:var(--start);
        animation: risePath 4.2s ease-out infinite;
        animation-delay: var(--offset);
        animation-fill-mode:both;
        will-change:transform;
    }
    .logo-container.ready .bubble-circle {
        stroke:var(--c);
        stroke-width:2;
        fill:none;
        filter:drop-shadow(0 0 4px color-mix(in srgb, var(--c) 40%, transparent));
        transform-box:fill-box;
        transform-origin:50% 50%;
        animation: bubblePop 4.2s linear infinite;
        animation-delay: var(--offset);
        animation-fill-mode:both;
        will-change:transform,opacity;
    }

    /* Particles */
    .particles { pointer-events:none; }
    .particle {
        fill:var(--c);
        opacity:0;
        animation: particleBurst 4.2s ease-out infinite;
        animation-delay: calc(var(--offset) + var(--pdelay, 0s));
        animation-fill-mode:both;
        will-change:transform,opacity;
    }

    /* Natural buoyant rise: fast start, slow to top, stay, quick sink */
    @keyframes risePath {
        0%   { transform:var(--start); }
        42%  { transform:var(--mid); }
        70%  { transform:var(--top); }
        85%  { transform:var(--top); }
        100% { transform:var(--start); }
    }

    /* Bubble stays stable longer, then builds pressure naturally before pop */
    @keyframes bubblePop {
        0%   { opacity:0; transform:scale(0.55); }
        8%   { opacity:1; transform:scale(0.88); }
        15%  { opacity:1; transform:scale(1); }
        70%  { opacity:1; transform:scale(1); }
        73%  { opacity:1; transform:scale(1.05); }
        76%  { opacity:1; transform:scale(1.12); }
        79%  { opacity:1; transform:scale(1.20); }
        81%  { opacity:1; transform:scale(1.28); }
        82%  { opacity:1; transform:scale(1.35); }
        82.5%{ opacity:0; transform:scale(1.38); }
        100% { opacity:0; transform:scale(0.55); }
    }

    /* Particles appear right after pop (82.5%) at ring (~14px), quick disperse + fade */
    @keyframes particleBurst {
        0%,82.4% { opacity:0; transform:translate(0,0) scale(.25); }
        
        /* Spawn at bubble edge with initial velocity */
        82.5% {
            opacity:1;
            transform:translate(calc(var(--dx)*1px), calc(var(--dy)*1px)) scale(.9);
        }
        
        /* Initial explosion velocity */
        84% {
            opacity:1;
            transform:translate(
                calc(var(--dx)*1px + var(--vx)*1.5px), 
                calc(var(--dy)*1px + var(--vy)*1.5px)
            ) scale(.8);
        }
        
        /* Velocity continues, slight gravity */
        86% {
            opacity:1;
            transform:translate(
                calc(var(--dx)*1px + var(--vx)*2.8px), 
                calc(var(--dy)*1px + var(--vy)*2.8px + 8px)
            ) scale(.7);
        }
        
        /* Air resistance slows horizontal, gravity accelerates vertical */
        88% {
            opacity:.8;
            transform:translate(
                calc(var(--dx)*1px + var(--vx)*3.8px * var(--drag)), 
                calc(var(--dy)*1px + var(--vy)*3.8px + 18px)
            ) scale(.6);
        }
        
        /* More air resistance, stronger gravity */
        91% {
            opacity:.55;
            transform:translate(
                calc(var(--dx)*1px + var(--vx)*4.5px * var(--drag) * var(--drag)), 
                calc(var(--dy)*1px + var(--vy)*4.5px + 30px)
            ) scale(.5);
        }
        
        /* Horizontal nearly stopped, gravity dominates */
        94% {
            opacity:.25;
            transform:translate(
                calc(var(--dx)*1px + var(--vx)*5px * var(--drag) * var(--drag) * var(--drag)), 
                calc(var(--dy)*1px + var(--vy)*5px + 45px)
            ) scale(.4);
        }
        
        /* Final fall */
        97% {
            opacity:.05;
            transform:translate(
                calc(var(--dx)*1px + var(--vx)*5.2px * var(--drag) * var(--drag) * var(--drag)), 
                calc(var(--dy)*1px + var(--vy)*5.2px + 62px)
            ) scale(.3);
        }
        
        100% { opacity:0; transform:translate(0,0) scale(.25); }
    }

    @media (prefers-reduced-motion: reduce) {
        .logo-container.ready .bubble-group,
        .logo-container.ready .bubble-circle,
        .logo-container.ready .particle {
            animation:none !important;
            opacity:1;
            transform:none;
        }
    }
</style>
