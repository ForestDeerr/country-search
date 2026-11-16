(function () {
    let e = document.createElement(`link`).relList;
    if (e && e.supports && e.supports(`modulepreload`)) return;
    for (let e of document.querySelectorAll(`link[rel="modulepreload"]`)) n(e);
    new MutationObserver((e) => {
        for (let t of e)
            if (t.type === `childList`)
                for (let e of t.addedNodes) e.tagName === `LINK` && e.rel === `modulepreload` && n(e);
    }).observe(document, { childList: !0, subtree: !0 });
    function t(e) {
        let t = {};
        return (
            e.integrity && (t.integrity = e.integrity),
            e.referrerPolicy && (t.referrerPolicy = e.referrerPolicy),
            (t.credentials =
                e.crossOrigin === `use-credentials`
                    ? `include`
                    : e.crossOrigin === `anonymous`
                      ? `omit`
                      : `same-origin`),
            t
        );
    }
    function n(e) {
        if (e.ep) return;
        e.ep = !0;
        let n = t(e);
        fetch(e.href, n);
    }
})();
function e(e) {
    let t = document.createElement(`article`);
    t.className = `country-card`;
    let n = document.createElement(`div`);
    n.className = `country-flag-container`;
    let r = document.createElement(`img`);
    ((r.className = `country-flag`), (r.src = e.flag), (r.alt = `${e.name} flag`));
    let i = document.createElement(`div`);
    i.className = `country-info`;
    let a = document.createElement(`h2`);
    ((a.className = `country-name`), (a.textContent = e.name));
    let o = document.createElement(`p`);
    o.textContent = `Capital: ${e.capital}`;
    let s = document.createElement(`p`);
    s.textContent = `Region: ${e.region}`;
    let c = document.createElement(`p`);
    c.textContent = `Population: ${e.population.toLocaleString()}`;
    let l = document.createElement(`p`);
    return (
        (l.textContent = `Languages: ${e.languages.join(`, `)}`),
        n.append(r),
        i.append(a, o, s, c, l),
        t.append(n, i),
        t
    );
}
function t(e, t) {
    let n;
    return (...r) => {
        (clearTimeout(n), (n = setTimeout(() => e(...r), t)));
    };
}
function n(e) {
    return {
        name: e.name,
        flag: e.flags.svg,
        capital: e.capital,
        region: e.region,
        population: e.population,
        languages: e.languages.map((e) => e.name),
    };
}
function r(e) {
    let t = Error(`HTTP error: ${e}`);
    return ((t.name = `HttpError`), Object.assign(t, { status: e }));
}
var i = `https://countries.dev/name/`;
async function a(e, t) {
    let n = `${i}${encodeURIComponent(e)}`,
        a = await fetch(n, t ? { signal: t } : {});
    if (a.status === 404) return [];
    if (!a.ok) throw r(a.status);
    return await a.json();
}
var o = document.querySelector(`#app`);
if (!o) throw Error(`App element not found`);
var s = document.createElement(`div`);
s.className = `container`;
var c = document.createElement(`h1`);
((c.className = `title`), (c.textContent = `Country Search`));
var l = document.createElement(`p`);
((l.className = `description`), (l.textContent = `Find information about any country`));
var u = document.createElement(`div`);
u.className = `search-container`;
var d = document.createElement(`input`);
((d.className = `search-input`),
    (d.type = `search`),
    (d.placeholder = `Enter country name...`),
    (d.autocomplete = `off`));
var f = document.createElement(`section`);
((f.className = `results`), u.append(d), s.append(c, l, u, f), o.append(s), document.body.replaceChildren(o));
var p = null,
    m = t(async (t) => {
        if (!t) f.replaceChildren();
        else {
            p = new AbortController();
            try {
                let r = (await a(t, p.signal)).map(n).map(e);
                f.replaceChildren(...r);
            } catch (e) {
                if (e instanceof Error && e.name === `AbortError`) return;
                throw e;
            }
        }
    }, 500);
d.addEventListener(`input`, () => {
    m(d.value.trim());
});
