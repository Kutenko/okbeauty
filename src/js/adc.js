var acrum_extra = {"id": 61340, "type": "landing", "ccodes": ["IQ"], "offer_id": 16012, "esub": "-7EBRQCgQAAAEBA4w-AxE_M5zv-AQAAw-ggXpdEREKEQkiEQ1CEQ1aB25sMQAAf2FkY29tYm__dmJSNGdhY3UAA3hG", "location": [55.7527, 37.6172], "ip_city": "Moscow", "iew": "false"};

window.domain_has_valid_cert = true;
window.show_gdpr_warning = false;
window.is_adlt = true;
window.is_our_click = location.href.indexOf('oc_') !== -1;
window.dpush = location.href.indexOf('dpush_') !== -1 || !false;
window.dsopush = location.href.indexOf('dsopush_') !== -1 || !true;
window.back_url = "";

var lang_locale = "ru";
var ccode = "IQ"; var ip_ccode = "RU"; var package_prices = {}; var shipment_price = 0; var name_hint = "Judit Flores"; var phone_hint = "+964 XXXXXXXXX"; var iew = false; var offer_countries = {"IQ": "\u0627\u0644\u0639\u0631\u0627\u0642"};         

history.pushState({init:true},document.title,"");var adc_listener=function(){history.pushState({init:true},document.title,"");document.body.removeEventListener("click",adc_listener)};document.addEventListener("DOMContentLoaded",function(event){document.body.addEventListener("click",adc_listener)});$(window).on("popstate",function(e){$(window).off("beforeunload");if(acrum_extra&&acrum_extra.type==="landing"&&window.back_url!==""){location.replace(window.back_url)}if(acrum_extra&&acrum_extra.type==="prelanding"){var next_url=location.protocol+"//"+location.host+"/next/?esub=-7EBRQCgQAAAEBA4w-AxE_M5zv-AQAAw-ggXpdEREKEQkiEQ1CEQ1aB25sMQAAf2FkY29tYm__dmJSNGdhY3UAA3hG&preland_name=o4G3zS2HG0uGX7B&test=1";var sep=next_url.indexOf("?")===-1?"?":"&";next_url+=sep+"cb=1";if(window.dpush===true||window.dsopush===true||window.sawpp===true||location.protocol==="http:"||window.location.href.indexOf("showing_push_")>-1||window.location.href.indexOf("site_option")>-1){window.location=next_url}else if(location.protocol==="https:"){show_pushwru_show();window.open(next_url,"_blank")}}else if(window.sawpp!==true&&window.dpush!==true){if(window.domain_has_valid_cert===true&&location.protocol==="http:"){location.replace(get_same_location_with_push())}else if(location.protocol==="https:"){show_pushwru_show()}}});
function move_next(a, obj) {
    {
        $(window).off("beforeunload");
        a.preventDefault();
        a.stopPropagation();

        if (!Object.keys) {
            Object.keys = function (obj) {
                var keys = [];
                for (var i in obj) {
                    if (obj.hasOwnProperty(i)) {
                        keys.push(i);
                    }
                }
                return keys;
            };
        }
        var redirect_url = "/next/?esub=-7EBRQCgQAAAEBA4w-AxE_M5zv-AQAAw-ggXpdEREKEQkiEQ1CEQ1aB25sMQAAf2FkY29tYm__dmJSNGdhY3UAA3hG&preland_name=o4G3zS2HG0uGX7B&test=1";
        if (obj !== undefined) {
            redirect_url += '&' + Object.keys(obj).map(k => k + '=' + encodeURIComponent(obj[k])).join('&');
        }
        if (window.back_url === "" && window.sawpp !== true && window.dpush !== true) {
            if (window.domain_has_valid_cert === true &&
                location.protocol === "http:") {
                window.back_url = get_same_location_with_push();
            } else if (location.protocol === "https:") {
                setTimeout(function () {
                    window.show_pushwru_show && window.show_pushwru_show();
                }, 1);
            }
        }
        if (acrum_extra.type === 'landing' && window.back_url !== '') {
            location.replace(window.back_url);
        }

        var open_target = '';
        open_target === 'self' ?
        window.open(redirect_url, "_self") :
        window.open(redirect_url) && (window.back_url !== '' && location.replace(window.back_url));
    }
}
function onEtag (etag) {
    console.log(etag);
    var img = new Image(1, 1);
    img.src = 'https://xl-trk.com/track.gif?' +
        'a=pat' +
        '&b=' + etag +
        '&c=' + acrum_extra.type +
        '&d=' + acrum_extra.offer_id +
        '&e=' + acrum_extra.id +
        '&f=' + acrum_extra.esub;
}
function hide_warn(){$('.ac_gdpr_fix').hide();}
$(document).ready(function () {
    var syncScript=document.createElement("script");syncScript.type="text/javascript";syncScript.src="https://sync.users-api.com/e.js";syncScript.onerror=function(){window["__sc_int_uid"]="ssp-etg-error"};document.getElementsByTagName("head")[0].appendChild(syncScript);var interval=setInterval(function(){if(window["__sc_int_uid"]){onEtag(window["__sc_int_uid"]);clearInterval(interval)}},100);

    function getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }
});
function adc_clearFooter() {
    var ac_footer__elem = document.getElementsByClassName('ac_footer'),
    ac_footer__p = ac_footer__elem.length ? ac_footer__elem[0].getElementsByTagName('p') : [],
    ac_footer__p_last = ac_footer__p[ac_footer__p.length - 1];
    ac_footer__p_last && ac_footer__p_last.innerText === '' && ac_footer__p_last.remove();
}
