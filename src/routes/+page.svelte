<script>
    import { onMount } from 'svelte';
    let svgContainer;
    let animationReady = false;
    onMount(() => {
        requestAnimationFrame(() => (animationReady = true));
    });
</script>

<main>
    <div class="container">
        <div class="row">
            <h1>grapefizz</h1>
            <div class="svg-container" class:ready={animationReady} bind:this={svgContainer} role="img" aria-label="Fizzy bubbles logo">
                <svg width="160" height="120" viewBox="0 0 200 150">
                    <g class="bubble-group" style="--c:#bd63ee; --offset:0s;   --start:translate(60px,130px);  --mid:translate(68px,78px);  --top:translate(75px,45px);">
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
                    <g class="bubble-group" style="--c:#6363ee; --offset:1.4s; --start:translate(100px,130px); --mid:translate(92px,78px); --top:translate(85px,45px);">
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
        </div>
        <p>writting code 24/7 (it works <strong>sometimes</strong>)</p>
        <nav>
            <a class="nav" href="/about"><span class="arrow">-></span><span class="slash">/</span>about</a>
            <a class="nav" href="/projects"><span class="arrow">-></span><span class="slash">/</span>projects</a>
            <a class="nav" href="/blog"><span class="arrow">-></span><span class="slash">/</span>blog</a>
            <a class="nav" href="/pics"><span class="arrow">-></span><span class="slash">/</span>pics</a>
            <a class="nav" href="/contact"><span class="arrow">-></span><span class="slash">/</span>contact</a>
        </nav>
    </div>
</main>

<style>
    main {
        display:flex;
        justify-content:center;
        align-items:center;
        height:100%;
        max-height:calc(100vh - 12rem);
        margin:0 1.5rem;
    }
    .row { display:flex; align-items:center; gap:2rem; }
    .svg-container { width:10rem; height:7.5rem; }
    .svg-container svg { width:100%; height:100%; overflow:visible; }

    .svg-container:not(.ready) .bubble-group { transform:var(--start); }
    .svg-container:not(.ready) .bubble-circle,
    .svg-container:not(.ready) .particle {
        opacity:0;
        animation:none !important;
    }

    .svg-container.ready .bubble-group {
        transform:var(--start);
        animation: risePath 4.2s linear infinite;
        animation-delay: var(--offset);
        animation-fill-mode:both;
        will-change:transform;
    }
    .svg-container.ready .bubble-circle {
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

    @keyframes risePath {
        0%   { transform:var(--start); }
        55%  { transform:var(--mid); }
        68%  { transform:var(--top); }
        90%  { transform:var(--top); }
        100% { transform:var(--start); }
    }

    @keyframes bubblePop {
        0%   { opacity:0; transform:scale(0.55); }
        6%   { opacity:1; transform:scale(0.85); }
        10%  { opacity:1; transform:scale(1); }
        68%  { opacity:1; transform:scale(1); }
        74%  { opacity:1; transform:scale(1.10); }
        76%  { opacity:1; transform:scale(1.22); }
        78%  { opacity:1; transform:scale(1.34); }
        80%  { opacity:0; transform:scale(1.55); }
        100% { opacity:0; transform:scale(0.55); }
    }

    /* Particles appear right after pop (80%) at ring (~14px), quick disperse + fade */
    @keyframes particleBurst {
        0%,79.9% { opacity:0; transform:translate(0,0) scale(.25); }
        
        /* Spawn at bubble edge with initial velocity */
        80% {
            opacity:1;
            transform:translate(calc(var(--dx)*1px), calc(var(--dy)*1px)) scale(.9);
        }
        
        /* Initial explosion velocity */
        82% {
            opacity:1;
            transform:translate(
                calc(var(--dx)*1px + var(--vx)*1.5px), 
                calc(var(--dy)*1px + var(--vy)*1.5px)
            ) scale(.8);
        }
        
        /* Velocity continues, slight gravity */
        85% {
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

    h1 { font-size:3.2rem; margin:0; }
    nav { display:flex; gap:2rem; }
    nav a { font-size:1.5rem; font-family:'Space Mono', monospace; }
    p { font-size:1.2rem; margin:1.25rem 0; }

    @media (max-width:600px) {
        nav { flex-direction:column; gap:1rem; }
        .row { flex-direction:column-reverse; gap:0.5rem; align-items:flex-start; }
    }
</style>