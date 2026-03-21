(function () {

  const LANGS = {
    en: { label: "EN", name: "English", flag: "https://flagcdn.com/w40/gb.png",  dir: "ltr", rtl: false },
    ar: { label: "AR", name: "العربية", flag: "https://flagcdn.com/w40/iq.png",  dir: "rtl", rtl: true  },
    ku: { label: "KU", name: "کوردی",   flag: "images/flag-kurdistan.png", dir: "rtl", rtl: true },
  };

  /* Keys with data-i18n-html use innerHTML (safe for colored spans) */
  const TRANSLATIONS_HTML = {
    hero_title: {
      en: '<span style="color:red;">Laser </span><span style="color:yellow;">Engraving</span><span style="color:blue;"> Machine</span>',
      ar: '<span style="color:red;">آلة </span><span style="color:yellow;">الحفر</span><span style="color:blue;"> بالليزر</span>',
      ku: '<span style="color:red;">ئامێری </span><span style="color:yellow;">حەکپێکردنی</span><span style="color:blue;"> لەیزەر</span>',
    },
  };

  /* Keys with data-i18n use textContent (plain text only) */
  const TRANSLATIONS = {
    nav_home:      { en: "HOME",              ar: "الرئيسية",           ku: "ماڵپەڕ" },
    nav_about:     { en: "ABOUT",             ar: "من نحن",             ku: "دەربارە" },
    nav_materials: { en: "MATERIALS",         ar: "المواد",             ku: "کەرەستەکان" },
    nav_software:  { en: "CLE Laser Control", ar: "برنامج CLE",         ku: "CLE کۆنترۆڵ" },

    hero_sub: {
      en: "Is A Laser Engraving Machine That Works To Engrave Information Into Surfaces This Website Will Show You How It Works And How You Can Build One Yourself While Also Giving Some Additional Information One The Way",
      ar: "هي آلة حفر ليزرية تعمل على نقش المعلومات على الأسطح. سيوضح لك هذا الموقع كيفية عملها وكيف يمكنك بناء واحدة بنفسك مع تقديم بعض المعلومات الإضافية.",
      ku: "ئامێرێکی حەکپێکردنی لەیزەرە کە زانیاری لەسەر ڕووکەشەکان دەکەنێت. ئەم ماڵپەڕە پیشانت دەدات چۆن کار دەکات و چۆن دەتوانیت خۆت یەکێکی بچێشتت.",
    },
    hero_btn:  { en: "Click Here To Know More About Us!", ar: "اضغط هنا لمعرفة المزيد عنا!", ku: "ئێرە کلیک بکە بۆ زانیاری زیاتر!" },

    about_title: { en: "About Us",        ar: "من نحن",                    ku: "دەربارەی ئێمە" },
    about_p1: {
      en: "The idea for our project began when we realized that most commercial CNC machines are very expensive, making them hard to access for students, small workshops, or hobbyists. Our goal is to show that with the right knowledge and teamwork, it's possible to build a fully functional CNC machine at a much lower cost — using simple, locally available components.",
      ar: "بدأت فكرة مشروعنا حين أدركنا أن معظم آلات CNC التجارية باهظة الثمن، مما يجعل الوصول إليها صعباً للطلاب والورش الصغيرة والهواة. هدفنا إثبات أنه بالمعرفة الصحيحة والعمل الجماعي، يمكن بناء آلة CNC كاملة بتكلفة أقل بكثير باستخدام مكونات بسيطة متوفرة محلياً.",
      ku: "ئیدیای پرۆژەکەمان دەستپێکرد کاتێک تێگەیشتین کە زۆرینەی ئامێرەکانی CNC گرانن. ئامانجمان نیشاندانە کە بە زانست و تیمەلێکارییەوە دەکرێت ئامێرێکی CNC بە تێچووی کەمتر دروست بکرێت.",
    },
    about_p2: {
      en: "By creating our own CNC machine, we aim to promote hands-on engineering, creativity, and the spirit of innovation. This project demonstrates that complex technology doesn't always require expensive equipment — just the right approach and determination.",
      ar: "من خلال بناء آلة CNC الخاصة بنا، نهدف إلى تعزيز الهندسة العملية والإبداع وروح الابتكار. يُثبت هذا المشروع أن التكنولوجيا المعقدة لا تتطلب دائماً معدات باهظة الثمن.",
      ku: "بە دروستکردنی ئامێری CNC خۆمان، ئامانجمان پرۆموتکردنی ئەندازیاری دەستکارانە و داهێنانییە. ئەم پرۆژەیە دەیپیشاندات کە تەکنەلۆژیای ئاڵۆز هەمیشە پێویستی بە ئامێری گرانبەها نییە.",
    },
    overview_title: { en: "Project Overview", ar: "نظرة عامة على المشروع", ku: "پوختەی پرۆژە" },
    overview_p1: {
      en: "The CLE Machine is a computer-controlled laser engraving system designed for precision and low cost. It combines mechanical design, control electronics, and software to create a fully functional CNC system that can engrave patterns, text, or shapes on various materials.",
      ar: "آلة CLE هي نظام حفر ليزري يتحكم فيه الحاسوب، مصمم للدقة وانخفاض التكلفة. تجمع بين التصميم الميكانيكي والإلكترونيات وبرامج التحكم لإنشاء نظام CNC متكامل.",
      ku: "ئامێری CLE سیستەمێکی حەکپێکردنی لەیزەری کۆمپیوتەرکراوە کە بۆ تیزی و تێچووی کەم دیزاین کراوە.",
    },
    overview_p2: {
      en: "The machine uses stepper motors for accurate movement, a laser diode for marking surfaces, and an Arduino-based controller that interprets G-code instructions. Its lightweight frame and modular structure make it easy to assemble, modify, and repair.",
      ar: "تستخدم الآلة محركات خطوية للحركة الدقيقة، وثنائي ليزري لتحديد الأسطح، ومتحكم قائم على Arduino يفسر تعليمات G-code. إطارها الخفيف وهيكلها النمطي يجعلانها سهلة التجميع والتعديل.",
      ku: "ئامێرەکە موتەری ستیپەر بەکاردێنێت بۆ جووڵەی تیز، لەیزەر دایۆد بۆ نیشانەکردنی ڕووکەشەکان، و کۆنترۆڵکەرێکی بنەچەی Arduino.",
    },
    materials_btn: { en: "To Know About The Materials Click Here!", ar: "اضغط هنا لمعرفة المزيد عن المواد!", ku: "ئێرە کلیک بکە بۆ زانیاری دەربارەی کەرەستەکان!" },
    team_title:    { en: "Our Team",       ar: "فريقنا",             ku: "تیمەکەمان" },
    advisor_title: { en: "Project Advisor",ar: "مستشار المشروع",     ku: "ڕاوێژکاری پرۆژە" },

    member1_name: { en: "Yousif Saad",  ar: "يوسف سعد",   ku: "یوسف سەعد" },
    member1_role: {
      en: "The team leader - Will handle the programing side of the project and getting the parts for the assembly.",
      ar: "قائد الفريق - سيتولى الجانب البرمجي للمشروع وتوفير القطع اللازمة للتجميع.",
      ku: "سەرۆکی تیم - لاپەڕەی پرۆگرامینگی پرۆژەکە و دامەزراندنی پارچەکان دەگرێتەوە.",
    },
    member2_name: { en: "Ahmed Neshat", ar: "أحمد نشأت",  ku: "ئەحمەد نەشئەت" },
    member2_role: {
      en: "Member - Will handle the structural design and the assembly.",
      ar: "عضو - سيتولى التصميم الهيكلي والتجميع.",
      ku: "ئەندام - دیزاینی پێکهاتەیی و ئامادەکردنەکە دەگرێتەوە.",
    },
    member3_name: { en: "Ahmed Mahdi",  ar: "أحمد مهدي",  ku: "ئەحمەد مەهدی" },
    member3_role: {
      en: "Member - Will handle the artistic side and the assembly.",
      ar: "عضو - سيتولى الجانب الفني والتجميع.",
      ku: "ئەندام - لاپەڕەی هونەری و ئامادەکردنەکە دەگرێتەوە.",
    },
    member4_name: { en: "Ahmed Talib",  ar: "أحمد طالب",  ku: "ئەحمەد تالیب" },
    member4_role: {
      en: "Member - Will handle the website design and the assembly.",
      ar: "عضو - سيتولى تصميم الموقع والتجميع.",
      ku: "ئەندام - دیزاینی ماڵپەڕ و ئامادەکردنەکە دەگرێتەوە.",
    },
    advisor_desc: {
      en: "Dr. Haithem Kareem - Will oversee and guide the project technically and ensured safety standards.",
      ar: "د. هيثم كريم - سيشرف على المشروع ويوجهه تقنياً ويضمن معايير السلامة.",
      ku: "د. هەیثەم کەریم - پرۆژەکە تەکنیکی دەگرێتەوە و ستانداردەکانی سەلامەتی دەپارێزێت.",
    },

    ng_badge:    { en: "NEXT GENERATION SOFTWARE", ar: "برمجيات الجيل القادم", ku: "سۆفتوێری نەوەی داهاتوو" },
    ng_hero_p: {
      en: "The most complete open-source laser engraver control platform ever built — engineered for professionals, designed for everyone, powered by .NET Framework 4.8.",
      ar: "أكمل منصة مفتوحة المصدر للتحكم في نقش الليزر — مهندسة للمحترفين، مصممة للجميع، مدعومة بـ .NET Framework 4.8.",
      ku: "تەواوترین پلاتفۆرمی سەرچاوە-کراوەی کۆنترۆڵی حەکپێکردنی لەیزەر — بۆ پیشەکاران ئەندازیاری کراوە، بۆ هەمووان دیزاین کراوە.",
    },
    ng_free:     { en: "Free. Open Source. Ready to engrave.", ar: "مجاني. مفتوح المصدر. جاهز للحفر.", ku: "بەخۆراییە. سەرچاوە-کراوەیە. ئامادەی حەکپێکردنە." },
    dl_windows:  { en: "Download for Windows", ar: "تحميل لـ Windows", ku: "داگرتن بۆ Windows" },
    dl_linux:    { en: "Download for Linux",   ar: "تحميل لـ Linux",   ku: "داگرتن بۆ Linux" },
    dl_source:   { en: "Download Source Code", ar: "تحميل كود المصدر", ku: "داگرتنی کۆدی سەرچاوە" },

    solve_1: { en: "No switching between apps",    ar: "لا تبديل بين التطبيقات",          ku: "گۆڕینی نێوان ئەپلیکەیشنەکان نییە" },
    solve_2: { en: "Full Arabic language support", ar: "دعم كامل للغة العربية",            ku: "پشتگیری تەواوی زمانی عەرەبی" },
    solve_3: { en: "Works on Windows and Linux",   ar: "يعمل على ويندوز ولينكس",           ku: "لەسەر Windows و Linux کار دەکات" },
    solve_4: { en: "Professional tools built in",  ar: "أدوات احترافية مدمجة",             ku: "ئامرازی پیشەیی تێکراوە" },
    solve_5: { en: "Smart material presets",       ar: "إعدادات مواد ذكية",                ku: "پێشتانەی کەرەستەی زیرەک" },
    solve_6: { en: "Real-time GCode preview",      ar: "معاينة GCode في الوقت الفعلي",     ku: "پێشبینی GCode بە کاتی ڕاستەقینە" },

    feat_main:   { en: "Main Interface",          ar: "الواجهة الرئيسية",   ku: "ڕووکارە سەرەکیەکە" },
    feat_photo:  { en: "Photo Editor",            ar: "محرر الصور",          ku: "دەستکاریکەری وێنە" },
    feat_design: { en: "Design Canvas",           ar: "لوحة التصميم",        ku: "کانڤاسی دیزاین" },
    feat_wood:   { en: "Wood Preview Simulation", ar: "محاكاة معاينة الخشب", ku: "شێوازکردنی پێشبینی دار" },
    feat_layer:  { en: "Layer Manager",           ar: "مدير الطبقات",         ku: "بەڕێوەبەری چینەکان" },
    feat_path:   { en: "Path Optimizer",          ar: "محسّن المسار",         ku: "باشکردنی ڕێگا" },

    cmp_arabic: { en: "Arabic Language Support", ar: "دعم اللغة العربية",    ku: "پشتگیری زمانی عەرەبی" },
    cmp_linux:  { en: "Linux Support",           ar: "دعم لينكس",             ku: "پشتگیری Linux" },
    cmp_photo:  { en: "Photo Editor Built In",   ar: "محرر الصور مدمج",       ku: "دەستکاریکەری وێنە تێکراوە" },
    cmp_canvas: { en: "Design Canvas Built In",  ar: "لوحة التصميم مدمجة",    ku: "کانڤاسی دیزاین تێکراوە" },
    cmp_wood:   { en: "Wood Engraving Preview",  ar: "معاينة الحفر على الخشب",ku: "پێشبینی حەکپێکردنی دار" },
    cmp_free:   { en: "Free & Open Source",      ar: "مجاني ومفتوح المصدر",   ku: "بەخۆرایی و سەرچاوە-کراوە" },
    cmp_layer:  { en: "Layer Manager",           ar: "مدير الطبقات",           ku: "بەڕێوەبەری چینەکان" },
    cmp_path:   { en: "Path Optimizer",          ar: "محسّن المسار",           ku: "باشکردنی ڕێگا" },
  };

  const STORAGE_KEY = "cle_lang";
  let currentLang = localStorage.getItem(STORAGE_KEY) || "en";

  function buildWidget() {
    const old = document.getElementById("lang-switcher");
    if (old) old.remove();

    const container = document.createElement("div");
    container.id = "lang-switcher";

    const optionsEl = document.createElement("div");
    optionsEl.id = "lang-options";

    Object.keys(LANGS).forEach(function(code) {
      if (code === currentLang) return;
      const btn = document.createElement("button");
      btn.className = "lang-option-btn";
      btn.innerHTML = '<img src="' + LANGS[code].flag + '" alt="' + LANGS[code].name + '"> ' + LANGS[code].label + ' \u2013 ' + LANGS[code].name;
      btn.addEventListener("click", function() {
        setLang(code);
        container.classList.remove("open");
      });
      optionsEl.appendChild(btn);
    });

    const currentBtn = document.createElement("button");
    currentBtn.id = "lang-current-btn";
    currentBtn.innerHTML = '<img src="' + LANGS[currentLang].flag + '" alt="' + LANGS[currentLang].name + '"> ' + LANGS[currentLang].label + ' <span class="lang-chevron">\u25b2</span>';
    currentBtn.addEventListener("click", function() {
      container.classList.toggle("open");
    });

    document.addEventListener("click", function(e) {
      if (!container.contains(e.target)) container.classList.remove("open");
    });

    container.appendChild(optionsEl);
    container.appendChild(currentBtn);
    document.body.appendChild(container);
  }

  function applyLang(code) {
    const lang = LANGS[code];
    document.documentElement.dir = lang.dir;
    document.documentElement.lang = code;
    if (lang.rtl) {
      document.body.classList.add("lang-rtl");
    } else {
      document.body.classList.remove("lang-rtl");
    }

    /* innerHTML translations (elements with colored spans) */
    document.querySelectorAll("[data-i18n-html]").forEach(function(el) {
      var key = el.getAttribute("data-i18n-html");
      if (TRANSLATIONS_HTML[key] && TRANSLATIONS_HTML[key][code]) {
        el.innerHTML = TRANSLATIONS_HTML[key][code];
      }
    });

    /* textContent translations (plain text elements) */
    document.querySelectorAll("[data-i18n]").forEach(function(el) {
      var key = el.getAttribute("data-i18n");
      if (TRANSLATIONS[key] && TRANSLATIONS[key][code]) {
        el.textContent = TRANSLATIONS[key][code];
      }
    });
  }

  function setLang(code) {
    currentLang = code;
    localStorage.setItem(STORAGE_KEY, code);
    applyLang(code);
    buildWidget();
  }

  document.addEventListener("DOMContentLoaded", function() {
    buildWidget();
    applyLang(currentLang);
  });

})();
