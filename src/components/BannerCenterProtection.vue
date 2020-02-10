<template>
    <canvas id="protection" width="1280" height="840"></canvas>
</template>

<script>
import {TweenLite} from 'gsap';
import variables from '@/styles/setup/_variables.scss';
var getBrandColorString = function(opac = 1){
    return variables.primaryColorRgba.replace('0.6', opac);
}
export default {
    name: 'BannerCenterProtection',
    mounted(){
        function t() {
            u = window.innerWidth, c = window.innerHeight, g = {
                x: u / 2,
                y: c / 2
            }, p = document.getElementById("protection"), p.style.height = c + "px", f = document.getElementById("protection"), f.width = u, f.height = c, m = f.getContext("2d"), d = [];
            for (var t = 0; u > t; t += u / 20)
                for (var e = 0; c > e; e += c / 20) {
                    var i = t + Math.random() * u / 20,
                        n = e + Math.random() * c / 20,
                        s = {
                            x: i,
                            originX: i,
                            y: n,
                            originY: n
                        };
                    d.push(s)
                }
            for (var r = 0; r < d.length; r++) {
                for (var a = [], o = d[r], h = 0; h < d.length; h++) {
                    var v = d[h];
                    if (o != v) {
                        for (var w = !1, y = 0; 5 > y; y++) w || void 0 == a[y] && (a[y] = v, w = !0);
                        for (var py = 0; 5 > py; py++) w || _(o, v) < _(o, a[py]) && (a[py] = v, w = !0)
                    }
                }
                o.closest = a
            }
            for (var pr in d) {
                var T = new l(d[pr], 2 + 2 * Math.random(), getBrandColorString(0.3));
                d[pr].circle = T
            }
        }

        function e() {
            "ontouchstart" in window || window.addEventListener("mousemove", i), window.addEventListener("scroll", n), window.addEventListener("resize", s)
        }

        function i(t) {
            var posy;
            var e = posy = 0;
            t.pageX || t.pageY ? (e = t.pageX, posy = t.pageY) : (t.clientX || t.clientY) && (e = t.clientX + document.body.scrollLeft + document.documentElement.scrollLeft, posy = t.clientY + document.body.scrollTop + document.documentElement.scrollTop), g.x = e, g.y = posy
        }

        function n() {
            v = document.body.scrollTop > c ? !1 : !0
        }

        function s() {
            u = window.innerWidth, c = window.innerHeight, p.style.height = c + "px", f.width = u, f.height = c
        }

        function r() {
            a();
            for (var t in d) o(d[t])
        }

        function a() {
            if (v) {
                m.clearRect(0, 0, u, c);
                for (var t in d) Math.abs(_(g, d[t])) < 4e3 ? (d[t].active = .3, d[t].circle.active = .6) : Math.abs(_(g, d[t])) < 2e4 ? (d[t].active = .1, d[t].circle.active = .3) : Math.abs(_(g, d[t])) < 4e4 ? (d[t].active = .02, d[t].circle.active = .1) : (d[t].active = 0, d[t].circle.active = 0), h(d[t]), d[t].circle.draw()
            }
            requestAnimationFrame(a)
        }

        function o(t) {
            TweenLite.to(t, 1 + 1 * Math.random(), {
                x: t.originX - 50 + 100 * Math.random(),
                y: t.originY - 50 + 100 * Math.random(),
                onComplete: function() {
                    o(t)
                }
            })
        }
		
		// Strokestyle color change as you need ...:)
        function h(t) {
            if (t.active)
                for (var e in t.closest) m.beginPath(), m.moveTo(t.x, t.y), m.lineTo(t.closest[e].x, t.closest[e].y), m.strokeStyle = getBrandColorString(t.active), m.stroke()
        }

		// Strokestyle color change as you need ...:)
        function l(t, e, i) {
            var n = this;
            ! function() {
                n.pos = t || null, n.radius = e || null, n.color = i || null
            }(), this.draw = function() {
                n.active && (m.beginPath(), m.arc(n.pos.x, n.pos.y, n.radius, 0, 2 * Math.PI, !1), m.fillStyle = getBrandColorString(n.active), m.fill())
            }
        }

        function _(t, e) {
            return Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2)
        }
        var u, c, p, f, m, d, g, v = !0;
        t(), r(), e()
    
    }
}
</script>