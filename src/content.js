function getHostName(url) {
    if (!url) {
        return null;
    }

    var match = url.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i);
    if (match != null && match.length > 2 && typeof match[2] === 'string' && match[2].length > 0) {
        return match[2];
    }
    else {
        return null;
    }
}

function log(text) {
    // console.log(text);
}

log("AAA");

let wasShown = false;

showInfo = function (e) {

    log("AA");
    log(e);

    const divId = "div9a3fc58785cd49a0aeb0e0ff4b9eb0a5";

    log("parent refr: " + window.parent.referrer);
    log("parent href: " + window.parent.location.href);
    log("refr: " + document.referrer);
    log("href: " + document.location.href);

    var previousHostName = getHostName(document.referrer);
    var originalHostName = getHostName(document.location.href);

    log("prev: " + previousHostName);
    log("this: " + originalHostName);
    log("wasShown: " + wasShown);
    log("hasFocus " + document.hasFocus());
    log("activeElement: " + document.activeElement);

    if (((!previousHostName) || (originalHostName != previousHostName)) && !wasShown && document.hasFocus() && document.body) {

        log("Showing now.");

        var hostName = originalHostName.toLowerCase();
        var parts = hostName.split('.');
        var reversedParts = parts.slice().reverse();
        var pre = "";
        var main = "";
        var post = "";
        // var output = "";

        if (hostName.startsWith("www")) {
            hostName = hostName.replace("www.", "");
        }

        log(parts.length)

        switch (parts.length) {
            case 1: {
                log("A");
                main = reversedParts[0];
                break;
            }
            case 2: {
                log("B");
                // example.org
                pre = "";
                main = reversedParts[1];
                post = "." + reversedParts[0];
                break;
            }
            case 3: {
                switch (reversedParts[1]) {
                    case "ac":
                    case "co":
                    case "or":
                    case "gv": {
                        log("C");
                        // example.or.at
                        pre = "";
                        main = reversedParts[2];
                        post = "." + reversedParts[1] + "." + reversedParts[0];
                        break;
                    }
                    default: {
                        log("D");
                        pre = reversedParts[2] + ".";
                        main = reversedParts[1];
                        post = "." + reversedParts[0];
                    }
                }
                break;
            }
            default: {
                log("E");
                // host1.example.co.us
                pre = parts.slice(0,-2).join(".") + ".";
                main = reversedParts[1];
                post = "." + reversedParts[0];
            }
        }

        var d = document.getElementById(divId);
        if (!d) {
            log("H");
            d = document.createElement("div");
            d.id = divId;
            d.style= "position: fixed; left: 0px; top: 0px; height: 100%; width: 100%; margin: 0px 0px 0px 0px; padding: 0px 0px 0px 0px; z-index: 2147483600; pointer-events: none;";
            document.body.appendChild(d);
        }

        if (!d.shadowRoot) {
            d.attachShadow({ mode: "open" });
        }
        extRoot = d.shadowRoot;

        extRoot.innerHTML = "";
        extRoot.stlye = "filter: blur(1px);";

        var div = document.createElement("div");
        extRoot.appendChild(div);

        var style = document.createElement("style");
        style.innerHTML = "@keyframes blip { 0% { opacity: 90%; } 100% { opacity: 0%; }}"
        div.appendChild(style);

        var p = document.createElement("p");
        p.style = "font-family: Consolas, monospace; font-size: 2vw; line-height: normal; margin-right: 50%; margin-top: -20px; padding: 20px 100px 20px 100px; color: gray; animation: blip 2s ease-in-out; background-color: #FFFFFF; pointer-events: none; float: right; border-radius: 20px; box-shadow: 5px 5px; opacity: 0%;";
        div.appendChild(p);

        var prespan = document.createElement("span");
        prespan.textContent = pre;
        p.appendChild(prespan);

        var mainspan = document.createElement("span");
        mainspan.style.textDecoration = "underline";
        mainspan.style.fontWeight = "bold";
        mainspan.textContent = main;
        p.appendChild(mainspan);

        var postspan = document.createElement("span");
        postspan.style.textDecoration = "underline";
        postspan.textContent = post;
        p.appendChild(postspan);

        wasShown = true;
    }

    log("ZZ");
};

trackNavigation = function (e) {
    log(e);
    log("# parent refr: " + window.parent.referrer);
    log("# parent href: " + window.parent.location.href);
    log("# refr: " + document.referrer);
    log("# href: " + document.location.href);
}

window.addEventListener("DOMContentLoaded", showInfo);
window.addEventListener("load", showInfo);
window.addEventListener("focus", showInfo);    
window.addEventListener("navigate", trackNavigation);
window.addEventListener("hashchange", trackNavigation);

log("ZZZ");
