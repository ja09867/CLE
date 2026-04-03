(function () {

  const LANGS = {
    en: { label: "EN", name: "English", flag: "https://flagcdn.com/w40/gb.png",  dir: "ltr", rtl: false },
    ar: { label: "AR", name: "العربية", flag: "https://flagcdn.com/w40/iq.png",  dir: "rtl", rtl: true  },
    ku: { label: "KU", name: "کوردی",   flag: (function(){ var s=document.currentScript||Array.from(document.getElementsByTagName("script")).find(function(x){return x.src&&x.src.indexOf("lang.js")!==-1;}); return s?s.src.replace(/lang\.js.*$/,"")+"images/flag-kurdistan.png":"images/flag-kurdistan.png"; })(), dir: "rtl", rtl: true },
  };

  /* Keys with data-i18n-html use innerHTML (safe for colored spans) */
  const TRANSLATIONS_HTML = {
    hero_title: {
      en: '<span style="color:red;">Laser </span><span style="color:yellow;">Engraving</span><span style="color:blue;"> Machine</span>',
      ar: '<span style="color:red;">آلة </span><span style="color:yellow;">الحفر</span><span style="color:blue;"> بالليزر</span>',
      ku: '<span style="color:red;">ئامێری </span><span style="color:yellow;">حەکپێکردنی</span><span style="color:blue;"> لەیزەر</span>',
    },
    about_title: {
      en: '<span style="color:red;">About </span><span style="color:yellow;">Us</span>',
      ar: '<span style="color:red;">من </span><span style="color:yellow;">نحن</span>',
      ku: '<span style="color:red;">دەربارەی </span><span style="color:yellow;">ئێمە</span>',
    },
    overview_title: {
      en: '<span style="color:red;">Project </span><span style="color:yellow;">Overview</span>',
      ar: '<span style="color:red;">نظرة عامة </span><span style="color:yellow;">على المشروع</span>',
      ku: '<span style="color:red;">پوختەی </span><span style="color:yellow;">پرۆژە</span>',
    },
    team_title: {
      en: '<span style="color:red;">Our </span><span style="color:yellow;">Team</span>',
      ar: '<span style="color:red;">فريق</span><span style="color:yellow;">نا</span>',
      ku: '<span style="color:red;">تیمە</span><span style="color:yellow;">کەمان</span>',
    },
    advisor_title: {
      en: '<span style="color:red;">Project </span><span style="color:yellow;">Advisor</span>',
      ar: '<span style="color:red;">مستشار </span><span style="color:yellow;">المشروع</span>',
      ku: '<span style="color:red;">ڕاوێژکاری </span><span style="color:yellow;">پرۆژە</span>',
    },

    /* ── Materials page HTML keys ── */
    mat_title: {
      en: '<span style="color:red;">CNC Laser</span> <span style="color:yellow;">Engraver</span>',
      ar: '<span style="color:red;">حافر الليزر</span> <span style="color:yellow;">CNC</span>',
      ku: '<span style="color:red;">حەکپێکەری لەیزەری</span> <span style="color:yellow;">CNC</span>',
    },
    mat_voltage_warning_top: {
      en: '<strong>⚠️ ARDUINO VOLTAGE WARNING — READ THIS:</strong> Arduino Uno accepts 7-12V on DC jack or 5V via USB.<br><strong>DO NOT</strong> power Arduino through the CNC Shield\'s 12-36V input — it will bypass the regulator and DESTROY your board!<br><span style="color:#ffcc66;">✅ SOLUTION: Use a dedicated 5V PSU OR add a buck converter to step down 12V/24V to 5V.</span>',
      ar: '<strong>⚠️ تحذير جهد أردوينو — اقرأ هذا:</strong> يقبل Arduino Uno من 7-12 فولت على مقبس DC أو 5 فولت عبر USB.<br><strong>لا تُشغّل</strong> الأردوينو عبر مدخل 12-36 فولت في CNC Shield — سيتجاوز المنظم ويُتلف اللوحة!<br><span style="color:#ffcc66;">✅ الحل: استخدم مصدر 5 فولت مخصص أو محول باك لتخفيض 12/24 فولت إلى 5 فولت.</span>',
      ku: '<strong>⚠️ ئاگاداری هەڵتاوی ئاردوینۆ — ئەمە بخوێنەوە:</strong> Arduino Uno لە 7-12V لەسەر DC jack یان 5V لەڕێگای USB قبوڵ دەکات.<br><strong>مەکە</strong> ئاردوینۆ لەڕێگای کاتەبرەشکی 12-36V ی CNC Shield وزەی پێبدەیت — ڕێنوێنەکە دەبڕێت و تەختەکەت دەخەرابێت!<br><span style="color:#ffcc66;">✅ چارەسەر: PSU-ی 5V-ی تایبەت بەکاربهێنە یان باک کۆنڤێرتەر زیاد بکە بۆ دابەزاندنی 12/24V بۆ 5V.</span>',
    },
    mat_our_h2: {
      en: '⭐ OUR CURRENT BUILD <span class="budget-badge our">CLE PROJECT</span>',
      ar: '⭐ بناؤنا الحالي <span class="budget-badge our">مشروع CLE</span>',
      ku: '⭐ بینای ئێستامان <span class="budget-badge our">پرۆژەی CLE</span>',
    },
    mat_b0_h3: {
      en: '⭐ OUR BUILD: CLE GRADUATION PROJECT <span class="voltage-badge">12V SYSTEM</span> <span class="budget-badge our">CLE PROJECT</span>',
      ar: '⭐ بناؤنا: مشروع تخرج CLE <span class="voltage-badge">نظام 12V</span> <span class="budget-badge our">مشروع CLE</span>',
      ku: '⭐ بینامان: پرۆژەی مەزوونبوونی CLE <span class="voltage-badge">سیستەمی 12V</span> <span class="budget-badge our">پرۆژەی CLE</span>',
    },
    mat_b0_tip: {
      en: '<strong>💡 WHAT MAKES OUR BUILD UNIQUE:</strong> Unlike other builds that rely on an external PC connected via USB, our CLE system embeds a <strong>BMAX Mini PC (8GB RAM / 128GB)</strong> directly into the machine, paired with a <strong>7-inch capacitive touch screen</strong>. This makes the engraver fully standalone — no external computer needed during operation. Control is handled entirely through our custom <strong>CLE Laser Control software</strong>.',
      ar: '<strong>💡 ما يميز بناءنا:</strong> على عكس البناءات الأخرى التي تعتمد على حاسوب خارجي متصل عبر USB، يدمج نظام CLE لدينا <strong>حاسوب BMAX Mini PC (ذاكرة 8 جيجا / تخزين 128 جيجا)</strong> مباشرة داخل الجهاز، مقترنًا بـ<strong>شاشة لمس 7 بوصة</strong>. هذا يجعل الحافر مستقلًا تمامًا — لا حاجة لحاسوب خارجي أثناء التشغيل. يتم التحكم بالكامل عبر برنامج <strong>CLE Laser Control</strong> الخاص بنا.',
      ku: '<strong>💡 چی بینامانی بێهاوتا دەکات:</strong> بەخلاف بینەکانی تر کە پشت بە کۆمپیوتەری دەرەکی تایبەت بە USB دەبەستن، سیستەمی CLE مان <strong>BMAX Mini PC (8GB RAM / 128GB)</strong> ڕاستەوخۆ ناو ئامێرەکەدا جێدەگیرێت، بە <strong>شاشەی تاچی 7 ئینچ</strong>. ئەمەش حەکپێکەرەکە بە تەواوی سەربەخۆ دەکات — هیچ کۆمپیوتەری دەرەکی پێویست نییە کاتی کارکردن. کۆنترۆڵ بە تەواوی لەڕێگای نەرمەکالای تایبەتمانی <strong>CLE Laser Control</strong>.',
    },
    mat_budget_h2: {
      en: '<span class="budget-icon">💰</span> BUDGET BUILDS <span class="budget-badge budget">$100-200</span>',
      ar: '<span class="budget-icon">💰</span> بناءات اقتصادية <span class="budget-badge budget">100-200$</span>',
      ku: '<span class="budget-icon">💰</span> بینەکانی بودجەیی <span class="budget-badge budget">100-200$</span>',
    },
    mat_b1_h3: {
      en: '💰 BUILD 1: BUDGET STARTER KIT <span class="voltage-badge">12V SYSTEM</span> <span class="budget-badge budget">BUDGET</span>',
      ar: '💰 البناء 1: طقم بداية اقتصادي <span class="voltage-badge">نظام 12V</span> <span class="budget-badge budget">اقتصادي</span>',
      ku: '💰 بینای 1: کیتی دەستپێکردنی بودجەیی <span class="voltage-badge">سیستەمی 12V</span> <span class="budget-badge budget">بودجەیی</span>',
    },
    mat_b1_warning: {
      en: '<strong>⚠️ NOTE:</strong> Budget build uses smaller power supply (5A vs 10A). Good for learning, but upgrade PSU if doing longer engravings.',
      ar: '<strong>⚠️ ملاحظة:</strong> البناء الاقتصادي يستخدم مصدر طاقة أصغر (5A مقابل 10A). جيد للتعلم، لكن قم بترقية PSU للحفر لفترات أطول.',
      ku: '<strong>⚠️ تێبینی:</strong> بینەی بودجەیی PSU-ێکی بچووکتر بەکاردێنێت (5A دژ بە 10A). باشە بۆ فێربوون، بەلام PSU بگۆڕە ئەگەر حەکپێکردنی درێژتر دەکەیت.',
    },
    mat_b2_h3: {
      en: '🖥️ BUILD 2: DIY DESKTOP LASER ENGRAVER <span class="voltage-badge">12V SYSTEM</span> <span class="budget-badge budget">BUDGET</span>',
      ar: '🖥️ البناء 2: محفر ليزر مكتبي DIY <span class="voltage-badge">نظام 12V</span> <span class="budget-badge budget">اقتصادي</span>',
      ku: '🖥️ بینای 2: حەکپێکەری لەیزەری مێزەکتەبی DIY <span class="voltage-badge">سیستەمی 12V</span> <span class="budget-badge budget">بودجەیی</span>',
    },
    mat_b2_warning: {
      en: '<strong>⚠️ CRITICAL:</strong> This combo uses ONE 12V PSU. You MUST use the buck converter to power Arduino (5V).',
      ar: '<strong>⚠️ مهم جداً:</strong> هذا التركيب يستخدم مصدر طاقة 12V واحد. يجب استخدام محول باك لتشغيل الأردوينو (5V).',
      ku: '<strong>⚠️ گرنگ:</strong> ئەم تێکەڵکردنە PSU-ێکی 12V بەکاردێنێت. پێویستە باک کۆنڤێرتەر بەکاربهێنی بۆ وزەدانی ئاردوینۆ (5V).',
    },
    mat_mid_h2: {
      en: '<span class="budget-icon">⚡</span> MID-RANGE BUILDS <span class="budget-badge mid">$200-400</span>',
      ar: '<span class="budget-icon">⚡</span> بناءات متوسطة <span class="budget-badge mid">200-400$</span>',
      ku: '<span class="budget-icon">⚡</span> بینەکانی ناوەڕاست <span class="budget-badge mid">200-400$</span>',
    },
    mat_b3_h3: {
      en: '🔋 BUILD 3: DUAL PSU SAFE SETUP <span class="voltage-badge">5V + 12V</span> <span class="budget-badge mid">MID-RANGE</span>',
      ar: '🔋 البناء 3: إعداد آمن بمصدرين للطاقة <span class="voltage-badge">5V + 12V</span> <span class="budget-badge mid">متوسط</span>',
      ku: '🔋 بینای 3: دامەزراندنی دوو PSU پارێزراو <span class="voltage-badge">5V + 12V</span> <span class="budget-badge mid">ناوەڕاست</span>',
    },
    mat_b3_tip: {
      en: '<strong>💡 TIP:</strong> This is the SAFEST setup. Two separate PSUs: 5V for Arduino, 12V for motors/laser. Connect the grounds together.',
      ar: '<strong>💡 نصيحة:</strong> هذا هو الإعداد الأكثر أمانًا. مصدرا طاقة منفصلان: 5V للأردوينو، و12V للمحركات/الليزر. وصّل الأرضيات معًا.',
      ku: '<strong>💡 ئامۆژگاری:</strong> ئەمە پارێزراوترین دامەزراندنەکەیە. دوو PSU-ی جیاواز: 5V بۆ ئاردوینۆ، 12V بۆ موتەر/لەیزەر. زەوییەکان پێکەوە بکەوە.',
    },
    mat_b4_h3: {
      en: '📦 BUILD 4: COMPACT DESKTOP ENGRAVER <span class="voltage-badge">12V SYSTEM</span> <span class="budget-badge mid">MID-RANGE</span>',
      ar: '📦 البناء 4: محفر مكتبي مدمج <span class="voltage-badge">نظام 12V</span> <span class="budget-badge mid">متوسط</span>',
      ku: '📦 بینای 4: حەکپێکەری مێزەکتەبی کۆمپاکت <span class="voltage-badge">سیستەمی 12V</span> <span class="budget-badge mid">ناوەڕاست</span>',
    },
    mat_b5_h3: {
      en: '⚡ BUILD 5: HIGH SPEED BELT DRIVEN LASER <span class="voltage-badge">24V SYSTEM</span> <span class="budget-badge mid">MID-RANGE</span>',
      ar: '⚡ البناء 5: ليزر عالي السرعة بالحزام <span class="voltage-badge">نظام 24V</span> <span class="budget-badge mid">متوسط</span>',
      ku: '⚡ بینای 5: لەیزەری تیزی بالا بە بەلت <span class="voltage-badge">سیستەمی 24V</span> <span class="budget-badge mid">ناوەڕاست</span>',
    },
    mat_b5_tip: {
      en: '<strong>⚡ HIGH SPEED SETUP:</strong> CoreXY belt configuration allows faster acceleration than leadscrew systems. 24V gives better torque at high speeds.',
      ar: '<strong>⚡ إعداد عالي السرعة:</strong> تكوين حزام CoreXY يتيح تسارعًا أسرع من أنظمة اللولب. يمنح 24V عزمًا أفضل بالسرعات العالية.',
      ku: '<strong>⚡ دامەزراندنی تیزی بالا:</strong> ڕێکخستنی بەلتی CoreXY خێرایی چوونی باشتر لە سیستەمەکانی leadscrew دەدات. 24V گەردوونی باشتر بە خێراییی بالا دەدات.',
    },
    mat_high_h2: {
      en: '<span class="budget-icon">🔥</span> HIGH-END BUILDS <span class="budget-badge high">$500+</span>',
      ar: '<span class="budget-icon">🔥</span> بناءات احترافية <span class="budget-badge high">500$+</span>',
      ku: '<span class="budget-icon">🔥</span> بینەکانی بالا <span class="budget-badge high">500$+</span>',
    },
    mat_b6_h3: {
      en: '📱 BUILD 6: WIFI LASER ENGRAVER <span class="voltage-badge">24V SYSTEM</span> <span class="budget-badge high">HIGH-END</span>',
      ar: '📱 البناء 6: محفر ليزر WiFi <span class="voltage-badge">نظام 24V</span> <span class="budget-badge high">احترافي</span>',
      ku: '📱 بینای 6: حەکپێکەری لەیزەری WiFi <span class="voltage-badge">سیستەمی 24V</span> <span class="budget-badge high">بالا</span>',
    },
    mat_b6_tip: {
      en: '<strong>📱 WIFI + TOUCHSCREEN:</strong> Control your laser from phone or computer. No PC needed!',
      ar: '<strong>📱 WiFi + شاشة لمس:</strong> تحكم في الليزر من هاتفك أو حاسوبك. لا حاجة لحاسوب!',
      ku: '<strong>📱 WiFi + شاشەی تاچ:</strong> لەیزەرەکەت لە مۆبایل یان کۆمپیوتەرەوە کۆنترۆڵ بکە. هیچ کۆمپیوتەرێک پێویست نییە!',
    },
    mat_b7_h3: {
      en: '📐 BUILD 7: LARGE FORMAT LASER <span class="voltage-badge">24V SYSTEM</span> <span class="budget-badge high">HIGH-END</span>',
      ar: '📐 البناء 7: ليزر حجم كبير <span class="voltage-badge">نظام 24V</span> <span class="budget-badge high">احترافي</span>',
      ku: '📐 بینای 7: لەیزەری فۆرماتی گەورە <span class="voltage-badge">سیستەمی 24V</span> <span class="budget-badge high">بالا</span>',
    },
    mat_b8_h3: {
      en: '🥃 BUILD 8: ROTARY ENGRAVING SYSTEM <span class="voltage-badge">24V SYSTEM</span> <span class="budget-badge high">HIGH-END</span>',
      ar: '🥃 البناء 8: نظام حفر دوار <span class="voltage-badge">نظام 24V</span> <span class="budget-badge high">احترافي</span>',
      ku: '🥃 بینای 8: سیستەمی حەکپێکردنی خولاندنی <span class="voltage-badge">سیستەمی 24V</span> <span class="budget-badge high">بالا</span>',
    },
    mat_b8_tip: {
      en: '<strong>🔄 4TH AXIS:</strong> This build includes a rotary attachment for engraving cylindrical objects. Perfect for personalized cups and bottles.',
      ar: '<strong>🔄 المحور الرابع:</strong> يتضمن هذا البناء ملحق دوارًا لحفر الأشياء الأسطوانية. مثالي للأكواب والزجاجات المخصصة.',
      ku: '<strong>🔄 ئەکسی چوارەم:</strong> ئەم بینایە خولاندنێکی پێوەستکراوی تێدایە بۆ حەکپێکردنی شتەکانی سیلیندەری. گونجاوی کووپ و بووتڵی کەسیانە.',
    },
    mat_voltage_summary: {
      en: '<strong>🔋 VOLTAGE COMPATIBILITY SUMMARY:</strong><br>• <span style="color:#ff8888;">Arduino Uno + CNC Shield:</span> NEVER power Arduino through CNC Shield! Use buck converter (12V/24V → 5V) OR separate 5V PSU.<br>• <span style="color:#00ff00;">Makerbase MKS DLC32 V2.1:</span> Safe 24V input, built-in 5V/3.3V regulation. Dedicated laser controller!<br>• <span style="color:#ffcc66;">A4988:</span> 12V recommended | <span style="color:#ffcc66;">DRV8825/TMC2209:</span> 12-24V | <span style="color:#ffcc66;">NEMA23:</span> Needs 24V<br>• <span style="color:#ffcc66;">Laser Power:</span> 2.5W-5W (12V) | 7W-10W (12V or 24V) | 20W (24V)<br><strong style="color:white;">👉 Start with Budget builds to learn, move to Mid-Range for quality, go High-End for professional results!</strong>',
      ar: '<strong>🔋 ملخص توافق الجهد:</strong><br>• <span style="color:#ff8888;">Arduino Uno + CNC Shield:</span> لا تُشغّل الأردوينو أبدًا عبر CNC Shield! استخدم محول باك (12V/24V → 5V) أو مصدر 5V منفصل.<br>• <span style="color:#00ff00;">MKS DLC32 V2.1:</span> يقبل 24V بأمان، تنظيم مدمج 5V/3.3V. متحكم ليزر مخصص!<br>• <span style="color:#ffcc66;">A4988:</span> يُنصح بـ 12V | <span style="color:#ffcc66;">DRV8825/TMC2209:</span> 12-24V | <span style="color:#ffcc66;">NEMA23:</span> يحتاج 24V<br>• <span style="color:#ffcc66;">طاقة الليزر:</span> 2.5W-5W (12V) | 7W-10W (12V أو 24V) | 20W (24V)<br><strong style="color:white;">👉 ابدأ بالبناءات الاقتصادية للتعلم، انتقل للمتوسطة للجودة، واختر الاحترافية للنتائج المهنية!</strong>',
      ku: '<strong>🔋 کورتەی گونجاوی هەڵتاو:</strong><br>• <span style="color:#ff8888;">Arduino Uno + CNC Shield:</span> هەرگیز ئاردوینۆ لەڕێگای CNC Shield وزەی پێمەدە! باک کۆنڤێرتەر بەکاربهێنە (12V/24V → 5V) یان PSU-ی جیاوازی 5V.<br>• <span style="color:#00ff00;">MKS DLC32 V2.1:</span> 24V-ی پارێزراو قبوڵ دەکات، ڕێنوێنی ناوخۆیی 5V/3.3V. کۆنترۆڵکەری لەیزەری تایبەت!<br>• <span style="color:#ffcc66;">A4988:</span> 12V پێشنیار دەکرێت | <span style="color:#ffcc66;">DRV8825/TMC2209:</span> 12-24V | <span style="color:#ffcc66;">NEMA23:</span> 24V پێویستە<br>• <span style="color:#ffcc66;">هێزی لەیزەر:</span> 2.5W-5W (12V) | 7W-10W (12V یان 24V) | 20W (24V)<br><strong style="color:white;">👉 لەگەڵ بینەکانی بودجەیی دەست بکە بۆ فێربوون، بچۆ ناوەڕاست بۆ کوالیتی، بینەی بالا بۆ ئەنجامی پیشەیی!</strong>',
    },
    mat_how_title: {
      en: '<span style="color:red;">How</span> <span style="color:yellow;">It</span> <span style="color:blue;">Works</span>',
      ar: '<span style="color:red;">كيف</span> <span style="color:yellow;">يعمل</span>',
      ku: '<span style="color:red;">چۆن</span> <span style="color:yellow;">کار</span> <span style="color:blue;">دەکات</span>',
    },

    /* ── NovaGrave / CLE Laser Control page HTML keys ── */
    ng_h2_trailer: {
      en: '<span style="color: red;">See It </span><span style="color: yellow;">In Action</span>',
      ar: '<span style="color: red;">شاهده </span><span style="color: yellow;">في العمل</span>',
      ku: '<span style="color: red;">ببینە </span><span style="color: yellow;">لە کاردا</span>',
    },
    ng_h2_solves: {
      en: 'What <span style="color: red;">CLE</span> <span style="color: yellow;">Solves</span>',
      ar: 'ما الذي يحله <span style="color: red;">CLE</span>',
      ku: '<span style="color: red;">CLE</span> <span style="color: yellow;">چی چارەسەر دەکات</span>',
    },
    ng_h2_features: {
      en: '<span style="color: red;">Key </span><span style="color: yellow;">Features</span>',
      ar: '<span style="color: red;">الميزات </span><span style="color: yellow;">الرئيسية</span>',
      ku: '<span style="color: red;">تایبەتمەندییە </span><span style="color: yellow;">سەرەکیەکان</span>',
    },
    ng_h2_better: {
      en: '<span style="color: red;">Why CLE Is </span><span style="color: yellow;">Better</span>',
      ar: '<span style="color: red;">لماذا CLE </span><span style="color: yellow;">أفضل</span>',
      ku: '<span style="color: red;">بۆچی CLE </span><span style="color: yellow;">باشتره</span>',
    },
    ng_h2_tech: {
      en: '<span style="color: red;">Technology </span><span style="color: yellow;">Stack</span>',
      ar: '<span style="color: red;">مكدس </span><span style="color: yellow;">التقنيات</span>',
      ku: '<span style="color: red;">ستاکی </span><span style="color: yellow;">تەکنەلۆژیا</span>',
    },
    ng_h2_sysreq: {
      en: '<span style="color: red;">System </span><span style="color: yellow;">Requirements</span>',
      ar: '<span style="color: red;">متطلبات </span><span style="color: yellow;">النظام</span>',
      ku: '<span style="color: red;">پێداویستییەکانی </span><span style="color: yellow;">سیستەم</span>',
    },
    ng_h2_download: {
      en: '<span style="color: red;">Download </span><span style="color: yellow;">CLE Laser Control</span>',
      ar: '<span style="color: red;">تحميل </span><span style="color: yellow;">CLE Laser Control</span>',
      ku: '<span style="color: red;">داگرتنی </span><span style="color: yellow;">CLE Laser Control</span>',
    },

    /* ═══════════════════════════════════════════
       DETAIL PAGES — HTML keys (data-i18n-html)
    ═══════════════════════════════════════════ */

    /* — Power — */
    pow_li_linear: {
      en: '<strong>Linear Power Supplies:</strong> Provide clean DC output using a transformer and regulator; simple but bulky and less efficient.',
      ar: '<strong>مصادر الطاقة الخطية:</strong> توفر مخرجات DC نظيفة باستخدام محول وجهاز تنظيم؛ بسيطة لكنها ضخمة وأقل كفاءة.',
      ku: '<strong>سەرچاوەکانی وزەی خەتی:</strong> دەرچووی DC-ی پاک دەدات بە بەکارهێنانی ترانسفۆرمەر و ڕێنوێنەر؛ سادەیە بەلام گەورە و کارایی کەمتر.',
    },
    pow_li_smps: {
      en: '<strong>Switching Power Supplies (SMPS):</strong> High-efficiency, compact, and widely used in modern CNC and laser systems.',
      ar: '<strong>مصادر الطاقة المتحولة (SMPS):</strong> كفاءة عالية، مدمجة، وتُستخدم على نطاق واسع في أنظمة CNC والليزر الحديثة.',
      ku: '<strong>سەرچاوەکانی وزەی گۆڕاو (SMPS):</strong> کارایی بالا، کۆمپاکت، و بە فراوانی لە سیستەمەکانی CNC و لەیزەری مۆدێرن بەکاردێت.',
    },
    pow_li_laser_drv: {
      en: '<strong>Dedicated Laser Drivers:</strong> Integrated driver and power control for laser modules.',
      ar: '<strong>مشغلات الليزر المخصصة:</strong> مشغّل مدمج وتحكم في الطاقة لوحدات الليزر.',
      ku: '<strong>درایڤەرەکانی لەیزەری تایبەت:</strong> درایڤەری تێکراو و کۆنترۆڵی وزە بۆ یەکەکانی لەیزەر.',
    },
    pow_li_buck: {
      en: '<strong>Buck Converters:</strong> Step-down DC-DC converters used to supply 5V or other lower voltages from 12V/24V rails.',
      ar: '<strong>محولات باك:</strong> محولات DC-DC خافضة تُستخدم لتوفير 5 فولت أو جهود أخرى أقل من قضبان 12/24 فولت.',
      ku: '<strong>باک کۆنڤێرتەرەکان:</strong> گۆڕانکارەکانی DC-DC دابەزاندنی بەکاردێت بۆ دابینکردنی 5V یان هەڵتاوی کەمتر لە ریلەکانی 12V/24V.',
    },
    pow_li_input: {
      en: '<strong>Input Voltage:</strong> Typically 110–240V AC for mains or 12–24V DC for specific modules.',
      ar: '<strong>جهد الدخل:</strong> عادةً 110-240 فولت AC للشبكة أو 12-24 فولت DC لوحدات معينة.',
      ku: '<strong>هەڵتاوی کاتەبرەشک:</strong> زۆرجار 110-240V AC بۆ شەبەکە یان 12-24V DC بۆ یەکەکانی تایبەت.',
    },
    pow_li_output: {
      en: '<strong>Output Voltage:</strong> 12V for MKS board and stepper motors, 5V for controllers or sensors.',
      ar: '<strong>جهد الخرج:</strong> 12 فولت للوحة MKS ومحركات السائر، 5 فولت للمتحكمات أو المستشعرات.',
      ku: '<strong>هەڵتاوی دەرچوو:</strong> 12V بۆ تەختەی MKS و موتەرەکانی سایتەپەر، 5V بۆ کۆنترۆڵکەرەکان یان حەساسەکان.',
    },
    pow_li_current: {
      en: '<strong>Current Rating:</strong> Must support all connected components; e.g., 12V 10A for a medium laser/CNC setup.',
      ar: '<strong>تقدير التيار:</strong> يجب أن يدعم جميع المكونات المتصلة؛ مثلاً، 12 فولت 10 أمبير لإعداد متوسط.',
      ku: '<strong>نرخی جریان:</strong> پێویستە هەموو پێکهاتەکانی پەیوەستکراو پشتگیری بکات؛ بۆ نموونە، 12V 10A بۆ دامەزراندنی مامناوەند.',
    },
    pow_li_ripple: {
      en: '<strong>Ripple & Noise:</strong> Lower ripple ensures stable motor and laser operation.',
      ar: '<strong>التموج والضوضاء:</strong> التموج المنخفض يضمن تشغيلاً مستقراً للمحرك والليزر.',
      ku: '<strong>ڕیپڵ و دەنگەگێژ:</strong> ڕیپڵی کەمتر کارکردنی جێگیری موتەر و لەیزەر دڵنیا دەکاتەوە.',
    },
    pow_li_protect: {
      en: '<strong>Protection Features:</strong> Overcurrent, overvoltage, short-circuit, thermal shutdown.',
      ar: '<strong>ميزات الحماية:</strong> زيادة التيار، زيادة الجهد، الدائرة القصيرة، الإغلاق الحراري.',
      ku: '<strong>تایبەتمەندییەکانی پاراستن:</strong> جریانی زیادە، هەڵتاوی زیادە، کورت-سیرکت، گرتنی گەرمی.',
    },
    pow_li_c1: {
      en: '<strong>12V DC input:</strong> Powers the board, stepper drivers, and motors.',
      ar: '<strong>مدخل 12 فولت DC:</strong> يشغّل اللوحة ومشغلات السائر والمحركات.',
      ku: '<strong>کاتەبرەشکی 12V DC:</strong> تەختە، درایڤەرەکانی سایتەپەر، و موتەرەکان وزەی پێدەدات.',
    },
    pow_li_c2: {
      en: '<strong>5V output (optional):</strong> Can power controllers, sensors, or a Raspberry Pi.',
      ar: '<strong>مخرج 5 فولت (اختياري):</strong> يمكنه تشغيل المتحكمات أو المستشعرات أو Raspberry Pi.',
      ku: '<strong>دەرچووی 5V (ئارەزووانە):</strong> دەتوانێت کۆنترۆڵکەرەکان، حەساسەکان، یان Raspberry Pi وزەی پێبدات.',
    },
    pow_li_c3: {
      en: '<strong>GND:</strong> Common ground for all components.',
      ar: '<strong>الأرضي (GND):</strong> أرضي مشترك لجميع المكونات.',
      ku: '<strong>زەوی (GND):</strong> زەوی هاوبەش بۆ هەموو پێکهاتەکان.',
    },
    pow_li_c4: {
      en: '<strong>Optional Buck Converters:</strong> Step-down voltages for modules that require lower voltage, ensuring stable operation.',
      ar: '<strong>محولات باك اختيارية:</strong> تخفض الجهد للوحدات التي تحتاج جهداً أقل، مما يضمن تشغيلاً مستقراً.',
      ku: '<strong>باک کۆنڤێرتەرەکانی ئارەزووانە:</strong> هەڵتاو دابەزێنێت بۆ یەکەکانی کە هەڵتاوی کەمتر پێویستیانە، کارکردنی جێگیر دڵنیا دەکاتەوە.',
    },

    /* — Stepper — */
    step_p_intro: {
      en: 'A <strong>stepper motor</strong> is an electromechanical device that converts electrical pulses into discrete mechanical movements. Unlike conventional DC motors, stepper motors move in <strong>precise steps</strong>, allowing exact control of position and speed without feedback in many cases. They are widely used in CNC machines, 3D printers, robotics, and automation systems for high-precision tasks.',
      ar: 'المحرك الخطوي <strong>stepper motor</strong> جهاز كهروميكانيكي يحوّل نبضات كهربائية إلى حركات ميكانيكية منفصلة. على عكس محركات DC التقليدية، يتحرك في <strong>خطوات دقيقة</strong>، مما يتيح التحكم الدقيق في الموضع والسرعة. يُستخدم على نطاق واسع في آلات CNC والطابعات ثلاثية الأبعاد والروبوتات.',
      ku: '<strong>موتەری سایتەپەر</strong> ئامێرێکی کارەبامیکانیکیەتیە کە پاڵسەکانی کارەبایی دەگۆڕێت بۆ جووڵەکانی میکانیکی جیاوازراو. بەخلاف موتەرەکانی DC-ی ئاسایی، بە <strong>هەنگاوی تیز</strong> دەجووڵێت، بە فراوانی لە ئامێرەکانی CNC و چاپەرەکانی سێ ئەندازەیی بەکاردێت.',
    },
    step_p_work1: {
      en: 'Stepper motors operate using a sequence of electrical pulses applied to their coils. Each pulse moves the rotor a fixed angle, called the <strong>step angle</strong>. By controlling the number and frequency of pulses, you can control <strong>position, speed, and direction</strong> precisely.',
      ar: 'تعمل المحركات الخطوية باستخدام تسلسل من النبضات الكهربائية المطبقة على ملفاتها. كل نبضة تحرك الروتور بزاوية ثابتة تسمى <strong>زاوية الخطوة</strong>. من خلال التحكم في عدد النبضات وتردداتها، يمكنك التحكم في <strong>الموضع والسرعة والاتجاه</strong> بدقة.',
      ku: 'موتەرەکانی سایتەپەر بە بەکارهێنانی زنجیرەیەک لە پاڵسەکانی کارەبایی کار دەکەن. هەر پاڵسێک رۆتۆر بە گۆشەی جێگیر دەجووڵێنێت، بەناوی <strong>گۆشەی هەنگاو</strong>. بە کۆنترۆڵکردنی پاڵسەکان، دەتوانیت <strong>شوێن، خێرایی، و ئاراستە</strong> بە تیزی کۆنترۆڵ بکەیت.',
    },
    step_p_conn: {
      en: 'Stepper motors connect to stepper driver modules, which are then connected to the MKS board. The MKS board sends <strong>STEP</strong> and <strong>DIR</strong> pulses:',
      ar: 'تتصل المحركات الخطوية بوحدات مشغل السائر، التي تتصل بلوحة MKS. ترسل لوحة MKS نبضات <strong>STEP</strong> و<strong>DIR</strong>:',
      ku: 'موتەرەکانی سایتەپەر بە مۆدیولەکانی درایڤەری سایتەپەر دەپەیوەندێن. تەختەی MKS پاڵسەکانی <strong>STEP</strong> و <strong>DIR</strong> دەنێرێت:',
    },
    step_li_bipolar: {
      en: '<strong>Bipolar Stepper Motors:</strong> Two coils, require H-bridge drivers, offer higher torque and better efficiency.',
      ar: '<strong>المحركات ثنائية القطب:</strong> ملفان، تتطلب مشغلات H-bridge، تقدم عزماً أعلى وكفاءة أفضل.',
      ku: '<strong>موتەرەکانی سایتەپەری دوو-قوتوبی:</strong> دوو کۆیل، پێویستی بە درایڤەرەکانی H-bridge هەیە، گەردوونی بالاتر و کارایی باشتر.',
    },
    step_li_unipolar: {
      en: '<strong>Unipolar Stepper Motors:</strong> Usually have center-tapped coils, simpler drivers, slightly lower torque.',
      ar: '<strong>المحركات أحادية القطب:</strong> عادةً ما تحتوي على ملفات ذات نقطة وسطية، مشغلات أبسط، عزم أقل قليلاً.',
      ku: '<strong>موتەرەکانی سایتەپەری تاک-قوتوبی:</strong> زۆرجار کۆیلی ناوەندی-تاپکراوی هەیە، درایڤەری سادەتر، گەردوونی کەمێک کەمتر.',
    },
    step_li_hybrid: {
      en: '<strong>Hybrid Stepper Motors:</strong> Combine features of permanent magnet and variable reluctance motors for higher precision.',
      ar: '<strong>المحركات الهجينة:</strong> تجمع ميزات المغناطيس الدائم ومحركات المقاومة المتغيرة لدقة أعلى.',
      ku: '<strong>موتەرەکانی سایتەپەری هەڵکێشی:</strong> تایبەتمەندییەکانی ئایرەباری ماندەوبوو و موتەرەکانی بەرگریی گۆڕاو تێکدەهێنێت.',
    },
    step_li_linear: {
      en: '<strong>Linear Stepper Motors:</strong> Convert rotational motion to linear motion directly.',
      ar: '<strong>المحركات الخطوية الخطية:</strong> تحوّل الحركة الدورانية إلى حركة خطية مباشرةً.',
      ku: '<strong>موتەرەکانی سایتەپەری خەتی:</strong> جووڵەی خولاندن ڕاستەوخۆ دەگۆڕێت بۆ جووڵەی خەتی.',
    },
    step_li_rotor: {
      en: '<strong>Rotor:</strong> Rotating part, often contains permanent magnets or teeth for magnetic interaction.',
      ar: '<strong>الروتور:</strong> الجزء الدوار، غالباً يحتوي على مغناطيس دائمة أو أسنان للتفاعل المغناطيسي.',
      ku: '<strong>رۆتۆر:</strong> بەشی خولاو، زۆرجار ئایرەباری ماندەوبوو یان دندانەکان تێداهەیە.',
    },
    step_li_stator: {
      en: '<strong>Stator:</strong> Stationary coils energized in sequence to move the rotor.',
      ar: '<strong>ستاتور:</strong> ملفات ثابتة تُزود بالطاقة بالتسلسل لتحريك الروتور.',
      ku: '<strong>ستاتۆر:</strong> کۆیلەکانی جێگیر کە بە زنجیرە وزەی پێدەدرێت بۆ جووڵاندنی رۆتۆر.',
    },
    step_li_shaft: {
      en: '<strong>Shaft:</strong> Connects rotor to mechanical system.',
      ar: '<strong>العمود:</strong> يربط الروتور بالنظام الميكانيكي.',
      ku: '<strong>میل:</strong> رۆتۆر بە سیستەمی میکانیکی دەبەستێتەوە.',
    },
    step_li_bearing: {
      en: '<strong>Bearings:</strong> Reduce friction and support smooth rotation.',
      ar: '<strong>المحامل:</strong> تقلل الاحتكاك وتدعم الدوران السلس.',
      ku: '<strong>بەیرینگەکان:</strong> ئاوردەشانی کەم دەکاتەوە و خولاندنی مرۆک پشتگیری دەکات.',
    },
    step_li_housing: {
      en: '<strong>Housing:</strong> Metal frame that protects motor and helps dissipate heat.',
      ar: '<strong>الغلاف:</strong> إطار معدني يحمي المحرك ويساعد في تبديد الحرارة.',
      ku: '<strong>خانەکە:</strong> چارچۆی مەتاڵی کە موتەر دەپارێزێت و یارمەتی پەراکەندەکردنی گەرما دەدات.',
    },
    step_li_c1: {
      en: '<strong>STEP Pin:</strong> Each pulse moves the motor one step (or microstep).',
      ar: '<strong>دبوس STEP:</strong> كل نبضة تحرك المحرك خطوة واحدة (أو خطوة دقيقة).',
      ku: '<strong>پینی STEP:</strong> هەر پاڵسێک موتەر یەک هەنگاو (یان مایکرۆستیپ) دەجووڵێنێت.',
    },
    step_li_c2: {
      en: '<strong>DIR Pin:</strong> Determines rotation direction.',
      ar: '<strong>دبوس DIR:</strong> يحدد اتجاه الدوران.',
      ku: '<strong>پینی DIR:</strong> ئاراستەی خولاندن دیاری دەکات.',
    },
    step_li_c3: {
      en: '<strong>Enable Pin:</strong> Turns the driver output on/off.',
      ar: '<strong>دبوس التمكين:</strong> يشغّل/يوقف مخرج المشغل.',
      ku: '<strong>پینی چالاکبوون:</strong> دەرچووی درایڤەر دادەخات/دەچەرخێنێت.',
    },

    /* — Switch — */
    swt_li_lever: {
      en: '<strong>Mechanical Lever Switch:</strong> Uses a metal arm or roller that is pressed when the axis reaches its end.',
      ar: '<strong>مفتاح الذراع الميكانيكي:</strong> يستخدم ذراعاً معدنية أو بكرة يتم ضغطها عندما يصل المحور إلى نهايته.',
      ku: '<strong>کلیلەی ئیستیلای میکانیکی:</strong> دەستێک یان ڕۆلەری مەتاڵی بەکاردێنێت کاتێک ئەکس گەیشتی ئەنجامەکەی فشار دەکرێتەوە.',
    },
    swt_li_micro: {
      en: '<strong>Micro Switch:</strong> Compact switch with high reliability and fast response.',
      ar: '<strong>المفتاح الدقيق:</strong> مفتاح مدمج بموثوقية عالية واستجابة سريعة.',
      ku: '<strong>مایکرۆ کلیل:</strong> کلیلی کۆمپاکت بە متمانەپێکراوی بالا و وەڵامدانەوەی خێرا.',
    },
    swt_li_optical: {
      en: '<strong>Optical Limit Switch:</strong> Uses infrared light to detect movement without physical contact.',
      ar: '<strong>مفتاح الحد الضوئي:</strong> يستخدم ضوء الأشعة تحت الحمراء للكشف عن الحركة دون تلامس.',
      ku: '<strong>کلیلەی سنووری ئۆپتیکی:</strong> ڕووناکی ماورای سووری بەکاردێنێت بۆ دۆزینەوەی جووڵە بەبێ پەیوەندی جەستایی.',
    },
    swt_li_hall: {
      en: '<strong>Hall Effect Switch:</strong> Detects magnetic fields for contactless sensing.',
      ar: '<strong>مفتاح تأثير هول:</strong> يكشف عن الحقول المغناطيسية للاستشعار دون تلامس.',
      ku: '<strong>کلیلەی ئەفتەری هۆل:</strong> مەیدانەکانی ئایرەبارییانە دۆزینەوە دەکات بەبێ پەیوەندی.',
    },
    swt_li_e1: {
      en: '<strong>Common (COM):</strong> Shared connection point.',
      ar: '<strong>المشترك (COM):</strong> نقطة اتصال مشتركة.',
      ku: '<strong>هاوبەش (COM):</strong> خاڵی پەیوەندی هاوبەش.',
    },
    swt_li_e2: {
      en: '<strong>Normally Open (NO):</strong> Circuit closes only when the switch is pressed.',
      ar: '<strong>مفتوح عادةً (NO):</strong> تُغلق الدائرة فقط عندما يُضغط على المفتاح.',
      ku: '<strong>کراوەی ئاسایی (NO):</strong> سیرکت تەنها کاتێک کلیل فشار دەکرێتەوە دادەخرێت.',
    },
    swt_li_e3: {
      en: '<strong>Normally Closed (NC):</strong> Circuit opens when the switch is pressed.',
      ar: '<strong>مغلق عادةً (NC):</strong> تفتح الدائرة عندما يُضغط على المفتاح.',
      ku: '<strong>داخراوەی ئاسایی (NC):</strong> سیرکت کاتێک کلیل فشار دەکرێتەوە کراوە دەبێت.',
    },
    swt_li_e4: {
      en: '<strong>Housing:</strong> Plastic or metal casing for protection.',
      ar: '<strong>الغلاف:</strong> غطاء بلاستيكي أو معدني للحماية.',
      ku: '<strong>خانەکە:</strong> پۆشاکی پلاستیک یان مەتاڵ بۆ پاراستن.',
    },
    swt_li_e5: {
      en: '<strong>Actuator:</strong> Lever, roller, or button that gets pressed.',
      ar: '<strong>المشغّل:</strong> ذراع أو بكرة أو زر يتم الضغط عليه.',
      ku: '<strong>ئەکتواتۆر:</strong> ئیستیلا، ڕۆلەر، یان دوگمەیەک کە فشار دەکرێتەوە.',
    },
    swt_li_c1: {
      en: 'The <strong>Signal</strong> pin detects switch activation.',
      ar: 'دبوس <strong>الإشارة</strong> يكشف تنشيط المفتاح.',
      ku: 'پینی <strong>ئیشارە</strong> چالاکبوونی کلیل دۆزینەوە دەکات.',
    },
    swt_li_c2: {
      en: 'The <strong>Ground</strong> pin completes the circuit.',
      ar: 'دبوس <strong>الأرضي</strong> يكمل الدائرة.',
      ku: 'پینی <strong>زەوی</strong> سیرکتەکە تەواو دەکات.',
    },
    swt_li_c3: {
      en: 'Most setups use <strong>Normally Closed (NC)</strong> wiring for safety.',
      ar: 'معظم الإعدادات تستخدم توصيل <strong>مغلق عادةً (NC)</strong> للسلامة.',
      ku: 'زۆرینەی دامەزراندنەکان تەلی <strong>داخراوەی ئاسایی (NC)</strong> بۆ سەلامەتی بەکاردێنن.',
    },

    /* — Control/Driver — */
    ctrl_p_intro: {
      en: 'A <strong>driver board</strong> is an electronic module that controls motors and other actuators in CNC, 3D printers, and laser machines. It serves as an interface between the controller (e.g., MKS board) and the high-current devices, allowing precise control of motion without overloading the controller.',
      ar: '<strong>لوحة المشغل</strong> وحدة إلكترونية تتحكم في المحركات والمشغّلات الأخرى في أجهزة CNC والطابعات ثلاثية الأبعاد وآلات الليزر. وهي واجهة بين المتحكم (لوحة MKS) والأجهزة عالية التيار.',
      ku: '<strong>بۆردی درایڤەر</strong> مۆدیولێکی ئەلیکترۆنیەتیەتی کە موتەرەکان و ئەکتواتۆرەکانی تر لە CNC، چاپەرەکانی سێ ئەندازەیی، و ئامێرەکانی لەیزەر کۆنترۆڵ دەکات.',
    },
    ctrl_p_work: {
      en: 'Driver boards receive low-power control signals from the MKS board and convert them into higher-current outputs suitable for motors:',
      ar: 'تستقبل لوحات المشغل إشارات تحكم منخفضة الطاقة من لوحة MKS وتحوّلها إلى مخرجات ذات تيار أعلى مناسبة للمحركات:',
      ku: 'بۆردەکانی درایڤەر ئیشارەکانی کۆنترۆڵی وزەی کەم لە تەختەی MKS وەردەگرن و دەیانگۆڕن بۆ دەرچووی جریانی بالاتر گونجاو بۆ موتەرەکان:',
    },
    ctrl_li_stepper: {
      en: '<strong>Stepper Motor Drivers:</strong> Control stepper motors using pulse signals; examples include A4988, TMC2208, TMC2130.',
      ar: '<strong>مشغلات المحرك الخطوي:</strong> تتحكم في المحركات الخطوية باستخدام إشارات النبضات؛ أمثلة: A4988, TMC2208, TMC2130.',
      ku: '<strong>درایڤەرەکانی موتەری سایتەپەر:</strong> موتەرەکانی سایتەپەر بە بەکارهێنانی ئیشارەکانی پاڵس کۆنترۆڵ دەکات؛ نموونەکان: A4988, TMC2208, TMC2130.',
    },
    ctrl_li_servo: {
      en: '<strong>Servo Drivers:</strong> Provide PWM signals to control servo motors.',
      ar: '<strong>مشغلات السيرفو:</strong> توفر إشارات PWM للتحكم في محركات السيرفو.',
      ku: '<strong>درایڤەرەکانی سێرڤۆ:</strong> ئیشارەکانی PWM دابین دەکات بۆ کۆنترۆڵکردنی موتەرەکانی سێرڤۆ.',
    },
    ctrl_li_laser: {
      en: '<strong>Laser Drivers:</strong> Regulate power to laser modules using PWM or analog signals.',
      ar: '<strong>مشغلات الليزر:</strong> تنظم الطاقة لوحدات الليزر باستخدام إشارات PWM أو تمثيلية.',
      ku: '<strong>درایڤەرەکانی لەیزەر:</strong> وزە بۆ یەکەکانی لەیزەر بە بەکارهێنانی ئیشارەکانی PWM یان ئانالۆگ ڕێک دەخات.',
    },
    ctrl_li_shield: {
      en: '<strong>Motor Shield Boards:</strong> Combine multiple drivers with logic circuits for complex systems.',
      ar: '<strong>لوحات درع المحرك:</strong> تجمع مشغلات متعددة مع دوائر منطقية للأنظمة المعقدة.',
      ku: '<strong>بۆردەکانی شیلدی موتەر:</strong> درایڤەری زۆر بە سیرکتەکانی لۆجیکی تێکدەهێنێت.',
    },
    ctrl_li_w1: {
      en: '<strong>Microstepping:</strong> Divides each full step into smaller increments for smooth motion.',
      ar: '<strong>الخطوة الدقيقة:</strong> تقسم كل خطوة كاملة إلى زيادات أصغر لحركة سلسة.',
      ku: '<strong>مایکرۆستیپینگ:</strong> هەر هەنگاوی تەواو دادەبەشێنێت بۆ زیادبوونەکانی بچووکتر بۆ جووڵەی مرۆک.',
    },
    ctrl_li_w2: {
      en: '<strong>Current Limiting:</strong> Prevents motors from overheating.',
      ar: '<strong>تحديد التيار:</strong> يمنع المحركات من الاحترار الزائد.',
      ku: '<strong>سنوردانانی جریان:</strong> ڕێگری لە گەرم زیادەکاری موتەرەکان دەکات.',
    },
    ctrl_li_w3: {
      en: '<strong>Overvoltage & Thermal Protection:</strong> Protects both the board and the motor.',
      ar: '<strong>الحماية من زيادة الجهد والحرارية:</strong> تحمي كلاً من اللوحة والمحرك.',
      ku: '<strong>پاراستنی هەڵتاوی زیادە و گەرمی:</strong> هەم بۆرد و هەم موتەر دەپارێزێت.',
    },
    ctrl_li_w4: {
      en: '<strong>PWM Control:</strong> Adjusts power to modules like lasers or fans precisely.',
      ar: '<strong>تحكم PWM:</strong> يضبط الطاقة للوحدات مثل الليزر أو المراوح بدقة.',
      ku: '<strong>کۆنترۆڵی PWM:</strong> وزە بۆ یەکەکان وەک لەیزەر یان فانەکان بە تیزی ڕێک دەخات.',
    },
    ctrl_li_c1: {
      en: '<strong>Control Input Pins:</strong> STEP, DIR, EN, PWM, etc.',
      ar: '<strong>دبابيس مدخل التحكم:</strong> STEP، DIR، EN، PWM، إلخ.',
      ku: '<strong>پینەکانی کاتەبرەشکی کۆنترۆڵ:</strong> STEP، DIR، EN، PWM، هتد.',
    },
    ctrl_li_c2: {
      en: '<strong>Power Stage:</strong> MOSFETs or transistors handle high current output.',
      ar: '<strong>مرحلة الطاقة:</strong> MOSFETs أو الترانزستورات تتعامل مع مخرجات التيار العالي.',
      ku: '<strong>قۆناغی وزە:</strong> MOSFET یان ترانزیستۆرەکان دەرچووی جریانی بالا دەگێڕنەوە.',
    },
    ctrl_li_c3: {
      en: '<strong>Logic Controller:</strong> Decodes controller signals into motor-driving sequences.',
      ar: '<strong>متحكم المنطق:</strong> يفك تشفير إشارات المتحكم إلى تسلسلات تشغيل المحرك.',
      ku: '<strong>کۆنترۆڵکەری لۆجیک:</strong> ئیشارەکانی کۆنترۆڵکەر کۆددەکاتەوە بۆ زنجیرەکانی کارکردنی موتەر.',
    },
    ctrl_li_c4: {
      en: '<strong>Microcontroller/ICs:</strong> Implement microstepping, current sensing, and protection features.',
      ar: '<strong>المتحكم الدقيق/الدوائر المتكاملة:</strong> تنفذ الخطوة الدقيقة والاستشعار الجاري وميزات الحماية.',
      ku: '<strong>مایکرۆکۆنترۆڵەر/ICs:</strong> مایکرۆستیپینگ، حەساسکردنی جریان، و تایبەتمەندییەکانی پاراستن جێبەجێ دەکات.',
    },
    ctrl_li_c5: {
      en: '<strong>Heat Sink & Cooling:</strong> Prevent overheating during prolonged operation.',
      ar: '<strong>مبدد الحرارة والتبريد:</strong> يمنع الاحترار الزائد أثناء التشغيل المطوّل.',
      ku: '<strong>هیتسینک و ساردکردنەوە:</strong> گەرم زیادەکاری لەکاتی کارکردنی درێژ ڕێگری دەکات.',
    },
    ctrl_li_c6: {
      en: '<strong>Connectors:</strong> For motors, power, and controller signals.',
      ar: '<strong>الموصلات:</strong> للمحركات والطاقة وإشارات المتحكم.',
      ku: '<strong>کۆنێکتەرەکان:</strong> بۆ موتەرەکان، وزە، و ئیشارەکانی کۆنترۆڵکەر.',
    },
    ctrl_li_c_step: {
      en: '<strong>STEP:</strong> Pulse signal for stepping the motor',
      ar: '<strong>STEP:</strong> إشارة نبض للخطو بالمحرك',
      ku: '<strong>STEP:</strong> ئیشارەی پاڵس بۆ هەنگاوکردنی موتەر',
    },
    ctrl_li_c_dir: {
      en: '<strong>DIR:</strong> Sets rotation direction',
      ar: '<strong>DIR:</strong> يحدد اتجاه الدوران',
      ku: '<strong>DIR:</strong> ئاراستەی خولاندن ڕێک دەخات',
    },
    ctrl_li_c_en: {
      en: '<strong>EN (Enable):</strong> Activates or disables the driver output',
      ar: '<strong>EN (تمكين):</strong> ينشط أو يعطل مخرج المشغل',
      ku: '<strong>EN (چالاکبوون):</strong> دەرچووی درایڤەر چالاک دەکات یان ناچالاک',
    },
    ctrl_li_c_vmot: {
      en: '<strong>Vmot & GND:</strong> Power supply inputs for motor operation',
      ar: '<strong>Vmot و GND:</strong> مدخلات إمداد الطاقة لتشغيل المحرك',
      ku: '<strong>Vmot و GND:</strong> کاتەبرەشکەکانی سەرچاوەی وزە بۆ کارکردنی موتەر',
    },
    ctrl_li_c_pwm: {
      en: '<strong>PWM/TTL:</strong> Optional for controlling lasers or fans',
      ar: '<strong>PWM/TTL:</strong> اختياري للتحكم في الليزر أو المراوح',
      ku: '<strong>PWM/TTL:</strong> ئارەزووانەیە بۆ کۆنترۆڵکردنی لەیزەر یان فانەکان',
    },

    /* — Laser — */
    las_p_intro: {
      en: '<strong>Laser = Light Amplification by Stimulated Emission of Radiation.</strong> A laser diode (semiconductor laser) converts electric current into coherent light using a semiconductor p‑n junction. Unlike LEDs, laser light is <strong>coherent</strong>: phase and waveform are aligned. This allows focusing to spot sizes of just a few micrometers.',
      ar: '<strong>الليزر = تضخيم الضوء بالانبعاث المستحث للإشعاع.</strong> يحوّل ثنائي الليزر التيار الكهربائي إلى ضوء متماسك باستخدام وصلة p-n شبه موصلة. على عكس الـLED، ضوء الليزر <strong>متماسك</strong>: الطور وشكل الموجة متوافقان.',
      ku: '<strong>لەیزەر = بەهێزکردنی ڕووناکی بە دەرچووی تایبەتی تابش.</strong> دایۆدی لەیزەر جریانی کارەبایی دەگۆڕێت بۆ ڕووناکی کۆهیرینت بە بەکارهێنانی پەیوەندیەکی p-n-ی نیمەگەیاندنەوە. بەخلاف LED، ڕووناکی لەیزەر <strong>کۆهیرینتە</strong>.',
    },
    las_li_1917: {
      en: '<strong>1917</strong> – Einstein theorizes <em>stimulated emission</em>.',
      ar: '<strong>1917</strong> – أينشتاين يضع نظرية <em>الانبعاث المستحث</em>.',
      ku: '<strong>1917</strong> – ئایسنستاین تیۆری <em>دەرچووی تایبەت</em> داناوە.',
    },
    las_li_1957: {
      en: '<strong>1957</strong> – Gordon Gould coins the acronym LASER.',
      ar: '<strong>1957</strong> – غوردون غولد يبتكر مصطلح LASER.',
      ku: '<strong>1957</strong> – گۆردۆن گولد پێناسەی LASER دروست دەکات.',
    },
    las_li_1962: {
      en: '<strong>1962</strong> – First coherent emission from GaAs homojunction; visible light achieved same year.',
      ar: '<strong>1962</strong> – أول انبعاث متماسك من وصلة GaAs المتجانسة؛ تحقق الضوء المرئي في نفس العام.',
      ku: '<strong>1962</strong> – یەکەم دەرچووی کۆهیرینت لە پەیوەندیەکی GaAs-ی یەکسان؛ ڕووناکی بەرچاو هەمان ساڵ بەدەستهات.',
    },
    las_li_1970s: {
      en: '<strong>1970s</strong> – Double heterostructure enables continuous oscillation at room temperature.',
      ar: '<strong>السبعينيات</strong> – البنية الثنائية غير المتجانسة تتيح التذبذب المستمر عند درجة حرارة الغرفة.',
      ku: '<strong>1970s</strong> – دووپاتکردنەوەی هێتەرۆستڕوکچەر لەرزینەوەی بەردەوام لە پلەی گەرمای ژووری ئەمکانپێدەدات.',
    },
    sw_li_ctrl: {
      en: '<strong>Controller Software:</strong> Sends commands to the MKS board via USB, SD card, or Wi-Fi. Examples: Pronterface, OctoPrint.',
      ar: '<strong>برنامج التحكم:</strong> يرسل أوامر للوحة MKS عبر USB أو بطاقة SD أو Wi-Fi. أمثلة: Pronterface, OctoPrint.',
      ku: '<strong>نەرمەکاڵای کۆنترۆڵ:</strong> فەرمانەکان بۆ تەختەی MKS دەنێرێت بەڕێگای USB، کارتی SD، یان Wi-Fi. نموونەکان: Pronterface, OctoPrint.',
    },
    sw_li_slicer: {
      en: '<strong>Slicer Software:</strong> Converts 2D or 3D design files into G-code. Examples: Cura, LaserGRBL.',
      ar: '<strong>برنامج التشريح:</strong> يحوّل ملفات التصميم ثنائية أو ثلاثية الأبعاد إلى G-code. أمثلة: Cura, LaserGRBL.',
      ku: '<strong>نەرمەکاڵای سلایسەر:</strong> فایلەکانی دیزاینی دوو یان سێ ئەندازەیی دەگۆڕێت بۆ G-code. نموونەکان: Cura, LaserGRBL.',
    },
    sw_li_fw: {
      en: '<strong>Firmware:</strong> Embedded software on the MKS board that interprets G-code instructions. Examples: Marlin, GRBL.',
      ar: '<strong>البرنامج الثابت:</strong> برنامج مدمج على لوحة MKS يفسر تعليمات G-code. أمثلة: Marlin, GRBL.',
      ku: '<strong>فێرمویێر:</strong> نەرمەکاڵای تێکراو لەسەر تەختەی MKS کە ڕێنماییەکانی G-code شیدەکاتەوە. نموونەکان: Marlin, GRBL.',
    },
    sw_li_mon: {
      en: '<strong>Monitoring & Visualization Tools:</strong> Provide real-time observation of machine status, temperature, position, and progress.',
      ar: '<strong>أدوات المراقبة والتصور:</strong> توفر مراقبة فورية لحالة الآلة ودرجة الحرارة والموضع والتقدم.',
      ku: '<strong>ئامرازەکانی چاودێری و دیتنەوە:</strong> چاودێریکردنی کاتی ڕاستی دابین دەکات بۆ دۆخی ئامێر، پلەی گەرما، شوێن، و پێشکەوتن.',
    },
    sw_li_w2: {
      en: 'The slicer converts the design into <strong>G-code</strong>, which is a series of movement and operation instructions.',
      ar: 'يحوّل السلايسر التصميم إلى <strong>G-code</strong>، وهو سلسلة من تعليمات الحركة والعمليات.',
      ku: 'سلایسەرەکە دیزاینەکە دەگۆڕێت بۆ <strong>G-code</strong>، کە زنجیرەیەکی ڕێنماییەکانی جووڵە و کارکردنە.',
    },
    back_to_materials: { en: '← Back to Materials', ar: '← العودة إلى المواد', ku: '← گەڕانەوە بۆ ماددەکان' },
    las_p_silicon: {
      en: '<strong>Why can\'t silicon be used for laser diodes?</strong> Silicon (Si) is an <strong>indirect transition semiconductor</strong>. The bottom of the conduction band and the top of the valence band occur at different wavenumbers (k). Electron recombination requires a change in momentum – involving phonons (lattice vibrations) – and energy is released as <strong>heat</strong>, not light. Emission probability is extremely low.',
      ar: '<strong>لماذا لا يمكن استخدام السيليكون في ثنائيات الليزر؟</strong> السيليكون (Si) <strong>شبه موصل ذو انتقال غير مباشر</strong>. يقع قاع نطاق التوصيل وقمة نطاق التكافؤ عند أعداد موجية مختلفة (k). تتطلب إعادة تركيب الإلكترون تغييراً في الزخم وتُطلق الطاقة على شكل <strong>حرارة</strong> لا ضوء.',
      ku: '<strong>بۆچی نایتوانرێت سیلیکۆن بۆ دایۆدەکانی لەیزەر بەکاربهێنرێت؟</strong> سیلیکۆن (Si) <strong>نیمەگەیاندنەوەی گواستنەوەی ناڕاستەوخۆ</strong>یەتی. دووبارەپێکهێنانی ئێلێکترۆن وزە بە شێوەی <strong>گەرما</strong> دەردەچێت نەک ڕووناکی.',
    },
    las_p_iii_v: {
      en: 'These are <strong>III‑V compound semiconductors</strong>. They have high radiative recombination efficiency and form the basis of all laser diodes and LEDs.',
      ar: 'هذه <strong>أشباه موصلات مركبة III-V</strong>. لديها كفاءة عالية في إعادة التركيب الإشعاعي وتشكل أساس جميع ثنائيات الليزر والـLED.',
      ku: 'ئەمانە <strong>نیمەگەیاندنەوەکانی تێکراوی III-V</strong>ن. کارایی بالای دووبارەپێکهێنانی تابشی هەیانە و بنچینەی هەموو دایۆدەکانی لەیزەر و LED-ەکان پێک دەهێنن.',
    },
    las_p_wavelength: {
      en: 'The emission wavelength λ is determined by the bandgap energy E<sub>g</sub> of the active layer:',
      ar: 'يتحدد طول موجة الانبعاث λ بواسطة طاقة الفجوة الطيفية E<sub>g</sub> للطبقة النشطة:',
      ku: 'پێوانەی مەوجی دەرچوون λ بە وزەی باندگاپ E<sub>g</sub>-ی چینی چالاکەوە دیاری دەکرێت:',
    },
    las_p_inverse: {
      en: '<strong>Inverse proportionality:</strong> wider bandgap → shorter wavelength. For a 445 nm blue diode: E<sub>g</sub> ≈ 1240/445 ≈ 2.79 eV.',
      ar: '<strong>التناسب العكسي:</strong> فجوة طيفية أوسع → طول موجي أقصر. لثنائي أزرق 445 نانومتر: E<sub>g</sub> ≈ 2.79 eV.',
      ku: '<strong>پێکهاتنی پێچەوانە:</strong> باندگاپی بەرفراوانتر → پێوانەی مەوجی کورتتر. بۆ دایۆدی شینی 445 nm: E<sub>g</sub> ≈ 2.79 eV.',
    },
    las_p_sec4: {
      en: 'In a laser diode, forward bias lowers the energy barrier. Electrons inject from n‑side, holes from p‑side; they recombine in the active layer. Above threshold, stimulated emission dominates. The driver must supply clean, constant current.',
      ar: 'في ثنائي الليزر، يخفض التحيز الأمامي حاجز الطاقة. تُحقن الإلكترونات من الجانب N، والثقوب من الجانب P؛ تتحد في الطبقة النشطة. فوق العتبة، يهيمن الانبعاث المستحث.',
      ku: 'لە دایۆدی لەیزەر، بایاسی پێشەکی بەرگی وزە دابەزێنێت. ئێلێکترۆنەکان لە لایەنی N، کونەکان لە لایەنی P داخڵ دەبن؛ لە چینی چالاکدا دووبارە یەکدەبنەوە.',
    },
    las_p_heat_note: {
      en: 'Waste heat (P<sub>heat</sub>) must be sinked – see Section 7.',
      ar: 'يجب تصريف الحرارة الضائعة (P<sub>heat</sub>) – انظر القسم 7.',
      ku: 'گەرمای بەتاڵ (P<sub>heat</sub>) دەبێت بەرگیری بکرێت – بروانە بەشی 7.',
    },
    las_p_heatsink: {
      en: 'P<sub>heat</sub> = P<sub>elec</sub> – P<sub>opt</sub> ≈ 4.1 W. Required R<sub>sa</sub> ≤ 10.4 °C/W for T<sub>j</sub> ≤ 80 °C.',
      ar: 'P<sub>heat</sub> = P<sub>elec</sub> – P<sub>opt</sub> ≈ 4.1 W. المطلوب R<sub>sa</sub> ≤ 10.4°C/W لـ T<sub>j</sub> ≤ 80°C.',
      ku: 'P<sub>heat</sub> = P<sub>elec</sub> – P<sub>opt</sub> ≈ 4.1 W. پێویستی بە R<sub>sa</sub> ≤ 10.4°C/W بۆ T<sub>j</sub> ≤ 80°C.',
    },
    las_li_gcode: {
      en: '<strong>G‑code:</strong> <code>M3 S&lt;value&gt;</code> defines requested power.',
      ar: '<strong>G-code:</strong> <code>M3 S&lt;value&gt;</code> يحدد الطاقة المطلوبة.',
      ku: '<strong>G-code:</strong> <code>M3 S&lt;value&gt;</code> وزەی داواکراو دیاری دەکات.',
    },
    las_li_fw: {
      en: '<strong>GRBL firmware:</strong> Maps S to PWM register (OCR1A) – linear or with $31/$32 correction.',
      ar: '<strong>برنامج GRBL الثابت:</strong> يعيّن S على سجل PWM (OCR1A) – خطياً أو مع تصحيح $31/$32.',
      ku: '<strong>فێرمویێری GRBL:</strong> S بۆ ریجیستری PWM (OCR1A) وەستاندەدات.',
    },
    las_li_pwm: {
      en: '<strong>PWM wave (5 V TTL):</strong> Enters laser driver (transconductance amp).',
      ar: '<strong>موجة PWM (5V TTL):</strong> تدخل مشغل الليزر.',
      ku: '<strong>مەوجی PWM (5V TTL):</strong> دەچێتە ناو درایڤەری لەیزەر.',
    },
    las_li_driver_out: {
      en: '<strong>Driver output:</strong> I<sub>LD</sub> = K·V<sub>PWM</sub> + I<sub>bias</sub>.',
      ar: '<strong>مخرج المشغل:</strong> I<sub>LD</sub> = K·V<sub>PWM</sub> + I<sub>bias</sub>.',
      ku: '<strong>دەرچووی درایڤەر:</strong> I<sub>LD</sub> = K·V<sub>PWM</sub> + I<sub>bias</sub>.',
    },
    las_li_diode_action: {
      en: '<strong>Laser diode:</strong> Forward bias reduces energy barrier; electrons and holes recombine in the <strong>direct‑bandgap active layer</strong> (e.g., InGaN).',
      ar: '<strong>ثنائي الليزر:</strong> التحيز الأمامي يخفض حاجز الطاقة؛ تتحد الإلكترونات والثقوب في <strong>الطبقة النشطة ذات الفجوة المباشرة</strong> (InGaN).',
      ku: '<strong>دایۆدی لەیزەر:</strong> بایاسی پێشەکی بەرگی وزە کەم دەکاتەوە؛ لە <strong>چینی چالاکی باندگاپی ڕاستەوخۆدا</strong> (InGaN) دووبارە یەکدەبنەوە.',
    },
    las_li_stim: {
      en: '<strong>Stimulated emission:</strong> Photons trigger further recombination – optical gain.',
      ar: '<strong>الانبعاث المستحث:</strong> تثير الفوتونات إعادة تركيب إضافية – كسب بصري.',
      ku: '<strong>دەرچووی تایبەت:</strong> فۆتۆنەکان دووبارەپێکهێنانی زیاتر تریفدەکەن – بەدەستهێنانی ئۆپتیکی.',
    },
    las_li_resonator: {
      en: '<strong>Resonator (cleaved facets):</strong> Mirrors reflect and amplify selected mode.',
      ar: '<strong>الرنان (وجوه مشققة):</strong> المرايا تعكس وتضخم الوضع المحدد.',
      ku: '<strong>ڕیزۆناتۆر (لاپەڕەکانی بڕاو):</strong> نەوانەکان دۆخی هەڵبژێردراو ئەکس دەکەنەوە و بەهێز دەکەن.',
    },
    las_li_beam: {
      en: '<strong>Coherent beam</strong> exits, focused onto material.',
      ar: '<strong>الشعاع المتماسك</strong> يخرج، مركزاً على المادة.',
      ku: '<strong>تیرەی کۆهیرینت</strong> دەردەچێت، فۆکەس لەسەر ماددەکە.',
    },

    /* ── HTML description cells (contain <span> color tags) ── */
    desc_b0_controller: {
      en: '<span style="color:#00ff00;">✅ DEDICATED LASER CONTROLLER!</span> 32-bit ESP32, WiFi, GRBL firmware, offline TFT touchscreen interface.',
      ar: '<span style="color:#00ff00;">✅ متحكم ليزر مخصص!</span> 32-بت ESP32، WiFi، برنامج GRBL، واجهة شاشة TFT دون اتصال.',
      ku: '<span style="color:#00ff00;">✅ کۆنترۆڵکەری لەیزەری تایبەت!</span> 32-بیتی ESP32، WiFi، فێرمویێری GRBL، ڕووکاری شاشەی TFT بێ ئینتەرنێت.',
    },
    desc_b2_buck: {
      en: '<span style="color: #ff8888;">⚠️ REQUIRED!</span> Steps down 12V to 5V for Arduino.',
      ar: '<span style="color: #ff8888;">⚠️ مطلوب!</span> يخفض 12 فولت إلى 5 فولت للأردوينو.',
      ku: '<span style="color: #ff8888;">⚠️ پێویستە!</span> 12V دابەزێنێت بۆ 5V بۆ ئاردوینۆ.',
    },
    desc_b3_arduino: {
      en: '<span style="color: #00ff00;">✅ SAFEST OPTION!</span> Dedicated 5V supply for Arduino.',
      ar: '<span style="color: #00ff00;">✅ الخيار الأكثر أماناً!</span> مصدر 5 فولت مخصص للأردوينو.',
      ku: '<span style="color: #00ff00;">✅ پارێزراوترین هەڵبژاردن!</span> سەرچاوەی 5V-ی تایبەت بۆ ئاردوینۆ.',
    },
    desc_b6_controller: {
      en: '<span style="color: #00ff00;">✅ DEDICATED LASER CONTROLLER!</span> 32-bit ESP32, WiFi, GRBL, TFT touchscreen.',
      ar: '<span style="color: #00ff00;">✅ متحكم ليزر مخصص!</span> 32-بت ESP32، WiFi، GRBL، شاشة لمس TFT.',
      ku: '<span style="color: #00ff00;">✅ کۆنترۆڵکەری لەیزەری تایبەت!</span> 32-بیتی ESP32، WiFi، GRBL، شاشەی تاچی TFT.',
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

    ng_th_feature:   { en: "Feature",    ar: "الميزة",     ku: "تایبەتمەندی" },
    ng_th_lasergrbl: { en: "LaserGRBL",  ar: "LaserGRBL",  ku: "LaserGRBL" },
    ng_th_lightburn: { en: "LightBurn",  ar: "LightBurn",  ku: "LightBurn" },

    ng_req_windows:      { en: "Windows",                              ar: "ويندوز",                          ku: "Windows" },
    ng_req_linux:        { en: "Linux",                                ar: "لينكس",                           ku: "Linux" },
    ng_req_os:           { en: "Operating System",                     ar: "نظام التشغيل",                    ku: "سیستەمی کارکردن" },
    ng_req_mem:          { en: "Memory",                               ar: "الذاكرة",                         ku: "حافیزە" },
    ng_req_storage:      { en: "Storage",                              ar: "التخزين",                         ku: "هەڵگرتن" },
    ng_req_conn:         { en: "Connectivity",                         ar: "الاتصال",                         ku: "پەیوەندی" },
    ng_req_wine:         { en: "Wine",                                 ar: "Wine",                            ku: "Wine" },
    ng_req_win_os:       { en: "Windows 10 / 11 (64-bit)",             ar: "ويندوز 10 / 11 (64 بت)",          ku: "Windows 10 / 11 (64-بیت)" },
    ng_req_mem_val:      { en: "4GB RAM minimum",                      ar: "4 جيجابايت RAM كحد أدنى",         ku: "4GB RAM کەمترین" },
    ng_req_win_storage:  { en: "500MB available space",                ar: "500 ميجابايت مساحة متاحة",        ku: "500MB بوشایی بەردەست" },
    ng_req_conn_val:     { en: "USB port for laser machine",           ar: "منفذ USB لجهاز الليزر",           ku: "پۆرتی USB بۆ ئامێری لەیزەر" },
    ng_req_linux_os:     { en: "Ubuntu 20.04 or newer",                ar: "أوبونتو 20.04 أو أحدث",           ku: "Ubuntu 20.04 یان نوێتر" },
    ng_req_linux_storage:{ en: "2GB available space",                  ar: "2 جيجابايت مساحة متاحة",          ku: "2GB بوشایی بەردەست" },
    ng_req_wine_val:     { en: "Installed automatically by installer", ar: "يُثبَّت تلقائياً بواسطة المثبِّت", ku: "بە خۆکارییەوە لەلایەن نصبکەرەوە دادەنرێت" },

    /* ── Materials page plain-text keys ── */
    mat_subtitle: {
      en: "🎯 Complete builds organized by budget — from entry-level to professional",
      ar: "🎯 بناءات كاملة منظمة حسب الميزانية — من المستوى الأساسي إلى الاحترافي",
      ku: "🎯 بینەکانی تەواو ڕێکخراون بە پێی بودجە — لە ئاستی دەستپێک بۆ پیشەیی",
    },
    mat_our_p: {
      en: "The exact components used in our CNC Laser Engraver graduation project",
      ar: "المكونات الدقيقة المستخدمة في مشروع تخرج محفر الليزر CNC الخاص بنا",
      ku: "پارچەکانی ڕاستەقینەی بەکارهاتوو لە پرۆژەی مەزوونبوونی حەکپێکەری لەیزەری CNC مان",
    },
    mat_budget_p: {
      en: "Perfect for beginners, hobbyists, and learning the basics",
      ar: "مثالي للمبتدئين والهواة وتعلم الأساسيات",
      ku: "گونجاوی دەستپێکەران، هەواشکاران، و فێربوونی بنچینەکان",
    },
    mat_mid_p: {
      en: "Better components, more features, higher quality results",
      ar: "مكونات أفضل، ميزات أكثر، نتائج بجودة أعلى",
      ku: "پارچەی باشتر، تایبەتمەندییی زیاتر، ئەنجامی کوالیتی بالاتر",
    },
    mat_high_p: {
      en: "Professional grade components, larger format, maximum power",
      ar: "مكونات بمستوى احترافي، حجم أكبر، طاقة قصوى",
      ku: "پارچەی ئاستی پیشەیی، فۆرماتی گەورەتر، هێزی زۆرترین",
    },
    mat_th_type:      { en: "Type",        ar: "النوع",    ku: "جۆر" },
    mat_th_component: { en: "Component",   ar: "المكوّن",  ku: "پارچە" },
    mat_th_price:     { en: "Price",       ar: "السعر",    ku: "نرخ" },
    mat_th_desc:      { en: "Description", ar: "الوصف",    ku: "وەسف" },
    mat_th_img:       { en: "Image",       ar: "الصورة",   ku: "وێنە" },

    /* ── Component type column labels ── */
    mat_type_controller:    { en: "🎛️ Controller",       ar: "🎛️ المتحكم",          ku: "🎛️ کۆنترۆڵکەر" },
    mat_type_drivers:       { en: "⚙️ Drivers",          ar: "⚙️ المشغلات",         ku: "⚙️ درایڤەرەکان" },
    mat_type_motors:        { en: "🔄 Motors",           ar: "🔄 المحركات",          ku: "🔄 موتەرەکان" },
    mat_type_power:         { en: "🔋 Power",            ar: "🔋 الطاقة",            ku: "🔋 وزە" },
    mat_type_motor_power:   { en: "🔋 Motor Power",      ar: "🔋 طاقة المحركات",     ku: "🔋 وزەی موتەر" },
    mat_type_arduino_power: { en: "⚡ Arduino Power",    ar: "⚡ طاقة أردوينو",      ku: "⚡ وزەی ئاردوینۆ" },
    mat_type_laser:         { en: "🔫 Laser",            ar: "🔫 الليزر",            ku: "🔫 لەیزەر" },
    mat_type_frame:         { en: "🛤️ Frame",            ar: "🛤️ الإطار",           ku: "🛤️ چارچۆ" },
    mat_type_frame_hw:      { en: "🛤️ Frame + Hardware", ar: "🛤️ الإطار + المعدات", ku: "🛤️ چارچۆ + ئامێرەکان" },
    mat_type_frame_motion:  { en: "🛤️ Frame + Motion",  ar: "🛤️ الإطار + الحركة",  ku: "🛤️ چارچۆ + جووڵە" },
    mat_type_limit:         { en: "🛑 Limit Switches",   ar: "🛑 مفاتيح الحد",       ku: "🛑 سوییچەکانی سنوور" },
    mat_type_rotary:        { en: "🔄 Rotary",           ar: "🔄 دوار",              ku: "🔄 خولاو" },
    mat_comp_rotary:        { en: "Roller Rotary Attachment", ar: "ملحق الدوران بالبكرة", ku: "پێوەستکراوی خولاندنی ڕۆلەر" },
    mat_b0_placeholder: {
      en: "CLE Laser Engraver — Our Build",
      ar: "محفر ليزر CLE — بناؤنا",
      ku: "حەکپێکەری لەیزەری CLE — بینای ئێمە",
    },
    mat_b1_placeholder: { en: "Budget Starter Kit",           ar: "طقم بداية اقتصادي",          ku: "کیتی دەستپێکردنی بودجەیی" },
    mat_b2_placeholder: { en: "DIY Desktop Laser Engraver",   ar: "محفر ليزر مكتبي DIY",        ku: "حەکپێکەری لەیزەری مێزەکتەبی DIY" },
    mat_b3_placeholder: { en: "Dual PSU Safe Setup",          ar: "إعداد آمن بمصدرين للطاقة",   ku: "دامەزراندنی دوو PSU پارێزراو" },
    mat_b4_placeholder: { en: "Compact Desktop Engraver",     ar: "محفر مكتبي مدمج",            ku: "حەکپێکەری مێزەکتەبی کۆمپاکت" },
    mat_b5_placeholder: { en: "High Speed Belt Driven Laser", ar: "ليزر عالي السرعة بالحزام",   ku: "لەیزەری تیزی بالا بە بەلت" },
    mat_b6_placeholder: { en: "Professional WiFi Laser Engraver", ar: "محفر ليزر WiFi احترافي", ku: "حەکپێکەری لەیزەری WiFi-ی پیشەیی" },
    mat_b7_placeholder: { en: "Large Format Laser System",    ar: "نظام ليزر حجم كبير",         ku: "سیستەمی لەیزەری فۆرماتی گەورە" },
    mat_b8_placeholder: { en: "Rotary Engraving System",      ar: "نظام حفر دوار",              ku: "سیستەمی حەکپێکردنی خولاندنی" },
    mat_b0_note: {
      en: "⭐ AL-MANSOUR UNIVERSITY COLLEGE — Computer Engineering Dept. | CNC Laser Engraver (CLE) Graduation Project 2026",
      ar: "⭐ كلية المنصور الجامعية — قسم هندسة الحاسوب | مشروع تخرج نظام الحفر بالليزر (CLE) 2026",
      ku: "⭐ کۆلێژی زانکۆیی المنصوور — بەشی ئەندازیاری کۆمپیوتەر | پرۆژەی مەزوونبوونی CNC حەکپێکەری لەیزەر (CLE) 2026",
    },
    mat_b1_note: {
      en: "✅ BEST FOR: Absolute beginners, learning the basics, testing if laser engraving is for you",
      ar: "✅ الأنسب لـ: المبتدئين تمامًا، تعلم الأساسيات، تجربة ما إذا كان الحفر بالليزر مناسبًا لك",
      ku: "✅ باشترین بۆ: دەستپێکەری تەواو، فێربوونی بنچینەکان، تاقیکردنەوەی ئایا حەکپێکردنی لەیزەر گونجاوتە",
    },
    mat_b2_note: {
      en: "✅ BEST FOR: Hobbyists who want a single power supply with better cutting power",
      ar: "✅ الأنسب لـ: الهواة الذين يريدون مصدر طاقة واحد مع قدرة قطع أفضل",
      ku: "✅ باشترین بۆ: هەواشکاران کە دەیانەوێت PSU-ێکی تاک بە هێزی بڕینی باشتر",
    },
    mat_b3_note: {
      en: "✅ BEST FOR: Beginners who want zero risk of frying their Arduino, and longer engraving sessions",
      ar: "✅ الأنسب لـ: المبتدئين الذين يريدون صفر مخاطر لحرق الأردوينو، وجلسات حفر أطول",
      ku: "✅ باشترین بۆ: دەستپێکەران کە دەیانەوێت هیچ مەترسیەک نەبێت بۆ شەوتانی ئاردوینۆ، و کاتی حەکپێکردنی درێژتر",
    },
    mat_b4_note: {
      en: "✅ BEST FOR: Users wanting quieter operation, smoother motion, and better cut quality with air assist",
      ar: "✅ الأنسب لـ: المستخدمين الراغبين في تشغيل أهدأ، وحركة أكثر سلاسة، وجودة قطع أفضل مع مساعدة الهواء",
      ku: "✅ باشترین بۆ: بەکارهێنەرانی کە دەیانەوێت کارکردنی بێداەنگتر، جووڵەی مرۆکتر، و کوالیتی بڕینی باشتر بە هەوای هاریکار",
    },
    mat_b5_note: {
      en: "✅ BEST FOR: Users who want faster engraving speeds and are building a lightweight gantry system",
      ar: "✅ الأنسب لـ: المستخدمين الراغبين في سرعات حفر أعلى وبناء نظام جانتري خفيف الوزن",
      ku: "✅ باشترین بۆ: بەکارهێنەرانی کە دەیانەوێت خێراییی حەکپێکردنی بالاتر و دروستکردنی سیستەمی گانتری سووکە",
    },
    mat_b6_note: {
      en: "✅ BEST FOR: Professionals, makers who want wireless control and dedicated laser firmware.",
      ar: "✅ الأنسب لـ: المحترفين والصانعين الراغبين في التحكم اللاسلكي وبرنامج ليزر مخصص.",
      ku: "✅ باشترین بۆ: پیشەکاران، دروستکەرانی کە دەیانەوێت کۆنترۆڵی بێسیم و فێرمویێری لەیزەری تایبەت.",
    },
    mat_b7_note: {
      en: "✅ BEST FOR: Professional workshops, cutting large materials, production work",
      ar: "✅ الأنسب لـ: الورش الاحترافية، قطع المواد الكبيرة، أعمال الإنتاج",
      ku: "✅ باشترین بۆ: وەرشەکانی پیشەیی، بڕینی کەرەستەی گەورە، کاری بەرهەمهێنان",
    },
    mat_b8_note: {
      en: "✅ BEST FOR: Engraving cylindrical objects, cups, bottles, glasses, and curved surfaces",
      ar: "✅ الأنسب لـ: حفر الأشياء الأسطوانية، الأكواب، الزجاجات، النظارات، والأسطح المنحنية",
      ku: "✅ باشترین بۆ: حەکپێکردنی شتەکانی سیلیندەری، کووپ، بووتڵ، چاوێلکە، و ڕووکەشە خولاوەکان",
    },

    /* ── How It Works steps ── */
    how_step1_title: { en: "1. Laser Module",   ar: "1. وحدة الليزر",       ku: "1. یەکەی لەیزەر" },
    how_step1_desc: {
      en: "The laser module emits a focused light beam that engraves or cuts the surface of your chosen material.",
      ar: "تبعث وحدة الليزر شعاع ضوء مركّزًا يحفر أو يقطع سطح المادة المختارة.",
      ku: "یەکەی لەیزەر ڕووناکێکی تیژکراو دەفرستێت کە ڕووکەشی کەرەستەی هەڵبژێردراوت دەکەنێت یان دەبڕێت.",
    },
    how_step2_title: { en: "2. Stepper Motors",  ar: "2. المحركات الخطوية",  ku: "2. موتەرەکانی ستیپەر" },
    how_step2_desc: {
      en: "Stepper motors move the laser along the X, Y, and Z axes with precision.",
      ar: "تحرك المحركات الخطوية الليزر على طول المحاور X وY وZ بدقة عالية.",
      ku: "موتەرەکانی ستیپەر لەیزەرەکە لەسەر ئەکسەکانی X، Y، و Z بە تیزی جووڵ دەدەن.",
    },
    how_step3_title: { en: "3. Control Board",   ar: "3. لوحة التحكم",       ku: "3. تەختەی کۆنترۆڵ" },
    how_step3_desc: {
      en: "The control board interprets commands from software and controls the laser and motors.",
      ar: "تفسر لوحة التحكم الأوامر القادمة من البرنامج وتتحكم في الليزر والمحركات.",
      ku: "تەختەی کۆنترۆڵ فەرمانەکانی نەرمەکالا شیدەکاتەوە و لەیزەر و موتەرەکان کۆنترۆڵ دەکات.",
    },
    how_step4_title: { en: "4. Software",        ar: "4. البرنامج",           ku: "4. نەرمەکالا" },
    how_step4_desc: {
      en: "CLE Laser Control (or LaserGRBL / LightBurn) converts images into G-code for the machine.",
      ar: "يحوّل برنامج CLE Laser Control (أو LaserGRBL / LightBurn) الصور إلى G-code للآلة.",
      ku: "CLE Laser Control (یان LaserGRBL / LightBurn) وێنەکان دەگۆڕێتە G-code بۆ ئامێرەکە.",
    },
    how_step5_title: { en: "5. Power Supply",    ar: "5. مصدر الطاقة",       ku: "5. سەرچاوەی وزە" },
    how_step5_desc: {
      en: "Provides correct voltage and current to run everything smoothly.",
      ar: "يوفر الجهد والتيار الصحيحين لتشغيل كل شيء بسلاسة.",
      ku: "هەڵتاو و جریانی دروست دامەزرێنێت بۆ کارکردنی هەموو شت بە مرۆکی.",
    },
    how_step6_title: { en: "6. Limit Switch",    ar: "6. مفتاح الحد",        ku: "6. سویچی سنور" },
    how_step6_desc: {
      en: "Defines boundaries, enables homing, and protects the machine.",
      ar: "يحدد الحدود، ويتيح العودة إلى الأصل، ويحمي الآلة.",
      ku: "سنورەکان دیاری دەکات، هۆمینگ توانادەدات، و ئامێرەکە دەپارێزێت.",
    },

    /* ── Table description cells ── */
    desc_b0_drivers: {
      en: "Basic but reliable stepper drivers integrated with the MKS DLC32 board to control the NEMA 17 motors.",
      ar: "مشغلات خطوية أساسية لكنها موثوقة، مدمجة مع لوحة MKS DLC32 للتحكم في محركات NEMA 17.",
      ku: "درایڤەرەکانی ستیپەری بنچینەیی بەلام متمانەپێکراو، تێکراون بە تەختەی MKS DLC32 بۆ کۆنترۆڵکردنی موتەرەکانی NEMA 17.",
    },
    desc_b0_motors: {
      en: "1.5A rated current, 1.8° step angle. Precise X and Y axis movement for the engraver gantry.",
      ar: "تيار مقنن 1.5 أمبير، زاوية خطوة 1.8°. حركة دقيقة على محوري X وY لذراع الحافر.",
      ku: "جریانی نرخکراوی 1.5A، گۆشەی هەنگاوی 1.8°. جووڵەی تیزی ئەکسی X و Y بۆ گانتری حەکپێکەرەکە.",
    },
    desc_b0_power: {
      en: "High-amperage 12V supply. Stable power distribution to MKS DLC32, all three motors, and laser module simultaneously.",
      ar: "مصدر طاقة 12 فولت بتيار عالٍ. توزيع طاقة مستقر لـ MKS DLC32 والمحركات الثلاثة ووحدة الليزر في آن واحد.",
      ku: "سەرچاوەی وزەی 12V بە جریانی بالا. دابەشکردنی وزەی جێگیر بۆ MKS DLC32 و هەر سێ موتەر و یەکەی لەیزەر هەمان کاتدا.",
    },
    desc_b0_laser: {
      en: "Diode laser with metal air assist kit. Engraves wood and cardboard at feed rates up to 3500 mm/min. PWM controlled via MKS.",
      ar: "ليزر ثنائي مع طقم مساعدة هوائية معدنية. يحفر الخشب والكرتون بسرعات تغذية تصل إلى 3500 مم/دقيقة. يتحكم فيه MKS عبر PWM.",
      ku: "لەیزەری دایۆد بە کیتی هاریکاری هەوای مەتاڵی. دار و کارتۆن دەکەنێت بە خێراییی تۆشانەی تا 3500 مم/خولەک. لەڕێگای MKS PWM کۆنترۆڵ دەکرێت.",
    },
    desc_b0_frame: {
      en: "20×40mm profile selected for superior rigidity and vibration resistance over standard 2020 profiles. Supports the 1800mm extended axis.",
      ar: "تم اختيار مقطع 20×40 مم لصلابته الفائقة ومقاومته للاهتزاز مقارنة بمقاطع 2020 القياسية. يدعم المحور الممتد البالغ 1800 مم.",
      ku: "پرۆفایلی 20×40mm هەڵبژێردرا بۆ سەختی و بەرگری لەهەژانەوەی سەرتر لە پرۆفایلەکانی ستانداردی 2020. ئەکسی بڕاوی 1800mm پشتگیری دەکات.",
    },
    desc_b0_switches: {
      en: 'Installed at max/min travel limits of X and Y axes. Enable precise homing ("Machine Zero") and act as hardware fail-safe to stop motors instantly.',
      ar: 'مثبتة عند حدود التنقل القصوى والدنيا للمحورين X وY. تتيح الإرجاع الدقيق ("صفر الآلة") وتعمل كضمان أمان صلب لإيقاف المحركات فوراً.',
      ku: 'لەسەر سنورەکانی گەشتی زۆرینە/کەمینەی ئەکسی X و Y دامەزراون. هۆمینگی تیز ("سفری ئامێر") توانادەدات و وەک پارێزگاری نەرمەکاڵای ئامێر کار دەکات بۆ ڕاگرتنی موتەرەکان لە کاتی دابردن.',
    },
    desc_b1_controller: {
      en: "Standard controller setup",
      ar: "إعداد متحكم قياسي",
      ku: "دامەزراندنی کۆنترۆڵکەری ستاندارد",
    },
    desc_b4_controller: {
      en: "Standard controller setup",
      ar: "إعداد متحكم قياسي",
      ku: "دامەزراندنی کۆنترۆڵکەری ستاندارد",
    },
    desc_b1_drivers: {
      en: "Basic but reliable",
      ar: "أساسي لكن موثوق",
      ku: "بنچینەیی بەلام متمانەپێکراو",
    },
    desc_b1_motors: {
      en: "1.2A, basic model",
      ar: "1.2 أمبير، موديل أساسي",
      ku: "1.2A، مۆدێلی بنچینەیی",
    },
    desc_b1_power: {
      en: "Smaller but sufficient for basic engraving",
      ar: "أصغر لكنه كافٍ للحفر الأساسي",
      ku: "بچووکتر بەلام بەسەکەی بۆ حەکپێکردنی بنچینەیی",
    },
    desc_b1_laser: {
      en: "Basic engraving on wood and acrylic",
      ar: "حفر أساسي على الخشب والأكريليك",
      ku: "حەکپێکردنی بنچینەیی لەسەر دار و ئاکریلیک",
    },
    desc_b1_frame: {
      en: "Basic frame with all hardware included",
      ar: "إطار أساسي مع جميع المعدات مشمولة",
      ku: "چارچۆیی بنچینەیی بە هەموو ئامێرەکانی تێکراو",
    },
    desc_shared_switch: {
      en: "Installed at travel limits of X and Y axes. Enables precise homing and acts as hardware fail-safe to stop motors instantly.",
      ar: "مثبت عند حدود تنقل المحورين X وY. يتيح الإرجاع الدقيق ويعمل كضمان أمان صلب لإيقاف المحركات فوراً.",
      ku: "لەسەر سنورەکانی گەشتی ئەکسی X و Y دامەزراوە. هۆمینگی تیز توانادەدات و وەک پارێزگاری ئامێر کار دەکات بۆ ڕاگرتنی موتەرەکان لە کاتی دابردن.",
    },
    desc_b2_controller: {
      en: "Industry standard. CNC Shield accepts 12-36V for motors.",
      ar: "معيار الصناعة. يقبل CNC Shield من 12 إلى 36 فولت للمحركات.",
      ku: "ستانداردی پیشەسازی. CNC Shield لە 12-36V بۆ موتەرەکان قبوڵ دەکات.",
    },
    desc_b2_drivers: {
      en: "Plug directly into CNC Shield. 12V compatible.",
      ar: "توصيل مباشر في CNC Shield. متوافق مع 12 فولت.",
      ku: "ڕاستەوخۆ ناو CNC Shield دادەخرێت. گونجاوی 12V.",
    },
    desc_b2_motors: {
      en: "1.5A, 42mm body — standard for laser engravers.",
      ar: "1.5 أمبير، جسم 42 مم — معيار لحافرات الليزر.",
      ku: "1.5A، جەستەی 42mm — ستانداردی حەکپێکەرەکانی لەیزەر.",
    },
    desc_b2_power: {
      en: "Powers CNC Shield + motors + laser.",
      ar: "يشغل CNC Shield والمحركات والليزر.",
      ku: "CNC Shield + موتەرەکان + لەیزەر وزەی پێدەدات.",
    },
    desc_b2_laser: {
      en: "Cuts 3mm wood, engraves acrylic/leather. 12V input.",
      ar: "يقطع خشباً بسماكة 3 مم، يحفر الأكريليك والجلد. مدخل 12 فولت.",
      ku: "داری 3mm دەبڕێت، ئاکریلیک/پێست دەکەنێت. کاتەبرەشکی 12V.",
    },
    desc_b2_frame: {
      en: "Complete frame kit with belts and hardware",
      ar: "طقم إطار كامل مع الأحزمة والمعدات",
      ku: "کیتی چارچۆی تەواو بە بەلت و ئامێرەکان",
    },
    desc_b3_controller: {
      en: "Arduino powered separately by 5V PSU.",
      ar: "يتم تشغيل الأردوينو بشكل منفصل بمصدر طاقة 5 فولت.",
      ku: "ئاردوینۆ جیاوازانە بە PSU-ی 5V وزەی پێدەدرێت.",
    },
    desc_b3_drivers: {
      en: "On CNC shield, powered by 12V PSU.",
      ar: "على CNC Shield، يعمل بمصدر طاقة 12 فولت.",
      ku: "لەسەر CNC shield، بە PSU-ی 12V وزەی پێدەدرێت.",
    },
    desc_b3_motors: {
      en: "Powered by 12V PSU via drivers.",
      ar: "تعمل بمصدر طاقة 12 فولت عبر المشغلات.",
      ku: "لەڕێگای درایڤەرەکانەوە بە PSU-ی 12V وزەی پێدەدرێت.",
    },
    desc_b3_power: {
      en: "For CNC Shield, motors, and laser.",
      ar: "لـ CNC Shield والمحركات والليزر.",
      ku: "بۆ CNC Shield، موتەرەکان، و لەیزەر.",
    },
    desc_b3_laser: {
      en: "Powered by 12V PSU.",
      ar: "يعمل بمصدر طاقة 12 فولت.",
      ku: "بە PSU-ی 12V وزەی پێدەدرێت.",
    },
    desc_b4_drivers: {
      en: "Silent operation, better cooling",
      ar: "تشغيل صامت، تبريد أفضل",
      ku: "کارکردنی بێداەنگ، ساردکردنەوەی باشتر",
    },
    desc_b4_motors: {
      en: "Higher torque for better precision",
      ar: "عزم أعلى لدقة أفضل",
      ku: "گەردوونی بالاتر بۆ تیزی باشتر",
    },
    desc_b4_power: {
      en: "More headroom for motors",
      ar: "هامش طاقة أكبر للمحركات",
      ku: "شوێنی زیاتر بۆ موتەرەکان",
    },
    desc_b4_laser: {
      en: "Better cut quality, includes air assist nozzle",
      ar: "جودة قطع أفضل، يتضمن فوهة مساعدة هوائية",
      ku: "کوالیتی بڕینی باشتر، نۆزڵی هاریکاری هەوا تێدایە",
    },
    desc_b4_frame: {
      en: "Frame with linear rods for smoother motion",
      ar: "إطار مع قضبان خطية لحركة أكثر سلاسة",
      ku: "چارچۆ بە میلەی خەتی بۆ جووڵەی مرۆکتر",
    },
    desc_b4_switches: {
      en: "Precise homing for consistent results",
      ar: "إرجاع دقيق لنتائج متسقة",
      ku: "هۆمینگی تیز بۆ ئەنجامی جێگیر",
    },
    desc_b5_controller: {
      en: "Industry standard. CNC Shield accepts 12-36V for motors.",
      ar: "معيار الصناعة. يقبل CNC Shield من 12 إلى 36 فولت للمحركات.",
      ku: "ستانداردی پیشەسازی. CNC Shield لە 12-36V بۆ موتەرەکان قبوڵ دەکات.",
    },
    desc_b5_drivers: {
      en: "Higher voltage drivers for faster speeds",
      ar: "مشغلات بجهد أعلى لسرعات أكبر",
      ku: "درایڤەرەکانی هەڵتاوی بالاتر بۆ خێراییی زیاتر",
    },
    desc_b5_motors: {
      en: "Low inductance motors for faster acceleration",
      ar: "محركات منخفضة الحث لتسارع أسرع",
      ku: "موتەرەکانی ئیندوکتانسی کەم بۆ خێرایی چوونی باشتر",
    },
    desc_b5_power: {
      en: "24V for speed, buck converter for Arduino",
      ar: "24 فولت للسرعة، محول باك للأردوينو",
      ku: "24V بۆ خێرایی، باک کۆنڤێرتەر بۆ ئاردوینۆ",
    },
    desc_b5_laser: {
      en: "Fast engraving with good power and air assist",
      ar: "حفر سريع بطاقة جيدة ومساعدة هوائية",
      ku: "حەکپێکردنی خێرا بە هێزی باش و هاریکاری هەوا",
    },
    desc_b5_frame: {
      en: "Lightweight CoreXY configuration for high speed",
      ar: "تكوين CoreXY خفيف الوزن للسرعة العالية",
      ku: "ڕێکخستنی CoreXY سووک بۆ خێراییی بالا",
    },
    desc_b5_cable: {
      en: "Protects wires during high speed movement",
      ar: "يحمي الأسلاك أثناء الحركة بسرعة عالية",
      ku: "تەلەکان لەکاتی جووڵەی خێرا دەپارێزێت",
    },
    desc_b6_drivers: {
      en: "24V recommended. Works perfectly with DLC32.",
      ar: "يُنصح بـ 24 فولت. يعمل بشكل مثالي مع DLC32.",
      ku: "24V پێشنیار دەکرێت. بە تەواوی گونجاو بە DLC32 کار دەکات.",
    },
    desc_b6_motors: {
      en: "High torque for heavy gantries or large format lasers.",
      ar: "عزم عالٍ للأذرع الثقيلة أو ليزرات الحجم الكبير.",
      ku: "گەردوونی بالا بۆ گانتریی گران یان لەیزەرەکانی فۆرماتی گەورە.",
    },
    desc_b6_power: {
      en: "DLC32 accepts 24V directly. Built-in 5V/3.3V regulation.",
      ar: "يقبل DLC32 الجهد 24 فولت مباشرة. تنظيم مدمج 5/3.3 فولت.",
      ku: "DLC32 ڕاستەوخۆ 24V قبوڵ دەکات. ڕێنوێنی ناوخۆیی 5V/3.3V.",
    },
    desc_b6_laser: {
      en: "Cuts 5mm wood, metal marking. 24V PWM control. PROFESSIONAL GRADE.",
      ar: "يقطع خشباً بسماكة 5 مم، ووسم المعادن. تحكم PWM بـ 24 فولت. مستوى احترافي.",
      ku: "داری 5mm دەبڕێت، نیشانەکردنی مەتاڵ. کۆنترۆڵی PWM بە 24V. ئاستی پیشەیی.",
    },
    desc_b6_frame: {
      en: "Heavy duty frame with lead screws for Z-axis",
      ar: "إطار قوي مع مسامير رصاص لمحور Z",
      ku: "چارچۆی قووی بە پێچی سووربار بۆ ئەکسی Z",
    },
    desc_b7_controller: {
      en: "Large screen, WiFi enabled",
      ar: "شاشة كبيرة، WiFi مفعّل",
      ku: "شاشەی گەورە، WiFi چالاکە",
    },
    desc_b7_drivers: {
      en: "Professional digital drivers with higher current capacity",
      ar: "مشغلات رقمية احترافية بسعة تيار أعلى",
      ku: "درایڤەرەکانی دیجیتاڵی پیشەیی بە ئەندازەی جریانی بالاتر",
    },
    desc_b7_motors: {
      en: "3A, 3Nm torque for large gantry",
      ar: "3 أمبير، 3 نيوتن متر عزم لذراع كبير",
      ku: "3A، گەردوونی 3Nm بۆ گانتریی گەورە",
    },
    desc_b7_power: {
      en: "Heavy duty power supply for large motors",
      ar: "مصدر طاقة قوي للمحركات الكبيرة",
      ku: "سەرچاوەی وزەی قووی بۆ موتەرەکانی گەورە",
    },
    desc_b7_laser: {
      en: "Cuts 8mm wood, engraves metal, professional grade",
      ar: "يقطع خشباً بسماكة 8 مم، يحفر المعادن، مستوى احترافي",
      ku: "داری 8mm دەبڕێت، مەتاڵ دەکەنێت، ئاستی پیشەیی",
    },
    desc_b7_frame: {
      en: "Professional linear rail system for large format",
      ar: "نظام ريل خطي احترافي للحجم الكبير",
      ku: "سیستەمی ریلی خەتی پیشەیی بۆ فۆرماتی گەورە",
    },
    desc_b7_cooling: {
      en: "Active cooling for drivers and laser",
      ar: "تبريد نشط للمشغلات والليزر",
      ku: "ساردکردنەوەی چالاک بۆ درایڤەرەکان و لەیزەر",
    },
    desc_b8_controller: {
      en: "Native rotary support in firmware",
      ar: "دعم دوار أصلي في البرنامج الثابت",
      ku: "پشتگیری خولاندنی ڕەسەن لە فێرمویێر",
    },
    desc_b8_drivers: {
      en: "4th driver for rotary axis, silent operation",
      ar: "مشغل رابع لمحور الدوران، تشغيل صامت",
      ku: "درایڤەری چوارەم بۆ ئەکسی خولاندن، کارکردنی بێداەنگ",
    },
    desc_b8_motors: {
      en: "4 motors for X, Y, Z, and rotary axis",
      ar: "4 محركات للمحاور X وY وZ ومحور الدوران",
      ku: "4 موتەر بۆ ئەکسەکانی X، Y، Z، و خولاندن",
    },
    desc_b8_power: {
      en: "Standard 24V supply with enough current for 4 motors",
      ar: "مصدر 24 فولت قياسي بتيار كافٍ لـ 4 محركات",
      ku: "سەرچاوەی ستانداردی 24V بە جریانی پێویست بۆ 4 موتەر",
    },
    desc_b8_laser: {
      en: "Adjustable focus for cylinders and curved objects",
      ar: "تركيز قابل للضبط للأسطوانات والأجسام المنحنية",
      ku: "فۆکەسی رێکخراو بۆ سیلیندەر و شتەکانی خولاو",
    },
    desc_b8_frame: {
      en: "Longer frame to accommodate rotary attachment",
      ar: "إطار أطول لاستيعاب ملحق الدوران",
      ku: "چارچۆی درێژتر بۆ گونجاندنی پێوەستکراوی خولاندن",
    },
    desc_b8_rotary: {
      en: "For engraving cups, bottles, glasses, cylinders",
      ar: "لحفر الأكواب والزجاجات والنظارات والأسطوانات",
      ku: "بۆ حەکپێکردنی کووپ، بووتڵ، چاوێلکە، سیلیندەر",
    },

    /* ── Detail page HTML keys ── */
    /* ═══════════════════════════════════════════
       DETAIL PAGES — plain keys (data-i18n)
    ═══════════════════════════════════════════ */


    /* — Shared section headings — */
    pow_h1:       { en: 'Power Supply',                ar: 'مصدر الطاقة',                    ku: 'سەرچاوەی وزە' },
    pow_h2_intro: { en: 'Introduction',                ar: 'مقدمة',                          ku: 'پێشەکی' },
    pow_h2_types: { en: 'Types of Power Supplies',     ar: 'أنواع مصادر الطاقة',             ku: 'جۆرەکانی سەرچاوەی وزە' },
    pow_h2_elec:  { en: 'Electrical Characteristics',  ar: 'الخصائص الكهربائية',             ku: 'تایبەتمەندییە کارەباییەکان' },
    pow_h2_work:  { en: 'Working Principle',           ar: 'مبدأ العمل',                     ku: 'پرینسیپی کارکردن' },
    pow_h2_apps:  { en: 'Applications',                ar: 'التطبيقات',                      ku: 'بەکارهێنانەکان' },
    pow_h2_adv:   { en: 'Advantages',                  ar: 'المزايا',                        ku: 'سوودەکان' },
    pow_h2_lim:   { en: 'Limitations',                 ar: 'القيود',                         ku: 'سنوورەکان' },
    pow_h2_conn:  { en: 'Connection with MKS Board',   ar: 'الربط مع لوحة MKS',              ku: 'پەیوەندی بە تەختەی MKS' },
    pow_h2_safe:  { en: 'Safety Considerations',       ar: 'اعتبارات السلامة',               ku: 'تێبینییەکانی سەلامەتی' },
    pow_h2_maint: { en: 'Maintenance Tips',            ar: 'نصائح الصيانة',                  ku: 'ئیشارەکانی چاکسازی' },

    pow_p_intro:  { en: 'The power supply is a critical component that provides stable and reliable electrical energy to all parts of the system. For a CNC machine, laser engraver, or 3D printer, it converts AC mains power into regulated DC voltages suitable for the MKS board, stepper motors, and laser module. Proper voltage and current are essential to ensure accurate operation and prevent hardware damage.', ar: 'مصدر الطاقة مكوّن حيوي يوفر طاقة كهربائية مستقرة وموثوقة لجميع أجزاء النظام. بالنسبة لآلة CNC أو حافر ليزر أو طابعة ثلاثية الأبعاد، يحوّل الجهد المتردد إلى جهد مستمر منظّم مناسب للوحة MKS ومحركات السائر ووحدة الليزر.', ku: 'سەرچاوەی وزە پێکهاتەیەکی گرنگە کە وزەی کارەبایی جێگیر و متمانەپێکراو بە هەموو بەشەکانی سیستەمەکە دەدات. بۆ ئامێری CNC، حەکپێکەری لەیزەر، یان چاپەری سێ ئەندازەیی، وزەی AC-ی شەبەکەکە بدەڵدات بە هەڵتاوی DC-ی ڕێنوێنراو.' },
    pow_p_work:   { en: 'The power supply works by converting AC or high-voltage DC into regulated DC outputs:', ar: 'يعمل مصدر الطاقة بتحويل التيار المتردد أو الجهد المستمر العالي إلى مخرجات DC منظّمة:', ku: 'سەرچاوەی وزە کار دەکات بە گۆڕینی AC یان DC-ی هەڵتاوی بالا بۆ دەرچووی DC-ی ڕێنوێنراو:' },
    pow_p_conn:   { en: 'The MKS board typically connects to the power supply via:', ar: 'تتصل لوحة MKS عادةً بمصدر الطاقة عبر:', ku: 'تەختەی MKS زۆرجار بەم شێوەیانە بە سەرچاوەی وزە دەپەیوەندێت:' },
    pow_p_conn2:  { en: 'Proper wiring and current rating selection are essential. Never exceed voltage ratings of any connected module.', ar: 'اختيار الأسلاك وتقدير التيار بشكل صحيح أمر ضروري. لا تتجاوز قيم الجهد لأي وحدة متصلة.', ku: 'هەڵبژاردنی تەلەی گونجاو و نرخکردنی جریان پێویستە. هەرگیز نرخەکانی هەڵتاوی هیچ یەکەیەکی پەیوەستکراو تێپەڕ مەکە.' },

    pow_li_w1: { en: 'AC input is rectified into DC.', ar: 'يتم تحويل مدخل AC إلى DC.', ku: 'کاتەبرەشکی AC دەگۆڕدرێت بۆ DC.' },
    pow_li_w2: { en: 'DC is filtered to remove ripple.', ar: 'يتم ترشيح DC لإزالة التموج.', ku: 'DC فلتەر دەکرێت بۆ لابردنی ڕیپڵ.' },
    pow_li_w3: { en: 'Voltage regulation circuits maintain stable output despite load variations.', ar: 'دوائر تنظيم الجهد تحافظ على مخرج مستقر رغم تغيرات الحمل.', ku: 'سیرکتەکانی ڕێنوێنی هەڵتاو دەرچووی جێگیر دەپارێزن سەرەڕای گۆڕانکاریەکانی باری کار.' },
    pow_li_w4: { en: 'Current limiting prevents excessive draw from motors and lasers.', ar: 'تحديد التيار يمنع السحب المفرط من المحركات والليزر.', ku: 'سنوردانانی جریان ڕێگری دەکات لە کێشانی زیادی موتەرەکان و لەیزەر.' },
    pow_li_w5: { en: 'Thermal protection shuts down the supply in case of overheating.', ar: 'تغلق الحماية الحرارية مصدر الطاقة عند ارتفاع درجة الحرارة.', ku: 'پاراستنی گەرمی سەرچاوەی وزە دادەخات کاتی گەرم زیادە بوو.' },
    pow_li_a1: { en: 'Powering MKS boards and microcontrollers', ar: 'إمداد لوحات MKS والمتحكمات الدقيقة بالطاقة', ku: 'وزەدانی تەختەکانی MKS و مایکرۆکۆنترۆڵەرەکان' },
    pow_li_a2: { en: 'Driving stepper motors and servos', ar: 'تشغيل محركات السائر والسيرفو', ku: 'کارکردنی موتەرەکانی سایتەپەر و سێرڤۆ' },
    pow_li_a3: { en: 'Supplying laser modules with regulated voltage/current', ar: 'إمداد وحدات الليزر بجهد/تيار منظّم', ku: 'دابینکردنی یەکەکانی لەیزەر بە هەڵتاو/جریانی ڕێنوێنراو' },
    pow_li_a4: { en: 'Providing stable DC rails for fans, sensors, and other peripherals', ar: 'توفير قضبان DC مستقرة للمراوح والمستشعرات', ku: 'دابینکردنی ریلەکانی DC-ی جێگیر بۆ فانەکان، حەساسەکان، و ئەندامەکانی تر' },
    pow_li_a5: { en: 'General-purpose CNC and automation projects', ar: 'مشاريع CNC والأتمتة متعددة الأغراض', ku: 'پرۆژەکانی CNC و ئۆتۆماسیۆنی گشتی' },
    pow_li_adv1: { en: 'Stable and regulated power for reliable machine operation', ar: 'طاقة مستقرة ومنظّمة لتشغيل موثوق للآلة', ku: 'وزەی جێگیر و ڕێنوێنراو بۆ کارکردنی متمانەپێکراوی ئامێر' },
    pow_li_adv2: { en: 'Protects electronics from voltage spikes and overcurrent', ar: 'يحمي الإلكترونيات من طفرات الجهد وزيادة التيار', ku: 'ئەلیکترۆنیاتەکان لە تیفانکردنی هەڵتاو و زیادەی جریان دەپارێزێت' },
    pow_li_adv3: { en: 'High efficiency in modern switching power supplies', ar: 'كفاءة عالية في مصادر الطاقة المتحولة الحديثة', ku: 'کارایی بالا لە سەرچاوەکانی وزەی گۆڕاوی مۆدێرن' },
    pow_li_adv4: { en: 'Compact and easy to integrate into enclosures', ar: 'مدمج وسهل التكامل في الحاويات', ku: 'کۆمپاکت و ئاسان بۆ تێکردن لە قووتیەکان' },
    pow_li_lim1: { en: 'Linear supplies are bulky and less efficient', ar: 'مصادر الطاقة الخطية ضخمة وأقل كفاءة', ku: 'سەرچاوەکانی وزەی خەتی گەورەن و کارایی کەمتریان هەیە' },
    pow_li_lim2: { en: 'Switching supplies can introduce high-frequency noise if not properly filtered', ar: 'مصادر الطاقة المتحولة قد تُدخل ضوضاء عالية التردد إذا لم يتم ترشيحها', ku: 'سەرچاوەکانی وزەی گۆڕاو دەتوانن دەنگەگێژی فریکوێنسی بالا دابخات' },
    pow_li_lim3: { en: 'Overloading can damage the supply and connected components', ar: 'الحمل الزائد قد يتلف مصدر الطاقة والمكونات المتصلة', ku: 'باری زیادەکار دەتوانێت سەرچاوەی وزە و پێکهاتەکانی پەیوەستکراو خەراب بکات' },
    pow_li_lim4: { en: 'Requires proper ventilation to avoid overheating', ar: 'يتطلب تهوية مناسبة لتجنب ارتفاع درجة الحرارة', ku: 'پێویستی بە هەوادانی گونجاو هەیە بۆ ڕێگریکردن لە گەرم زیادەکاری' },
    pow_li_s1: { en: 'Ensure correct voltage and polarity before connecting to the board.', ar: 'تأكد من صحة الجهد والقطبية قبل التوصيل باللوحة.', ku: 'دڵنیابە لە هەڵتاو و قوتوبیەتی دروست پێش پەیوەندیکردن بە تەختەکە.' },
    pow_li_s2: { en: 'Keep the supply well-ventilated to prevent overheating.', ar: 'احتفظ بمصدر الطاقة جيد التهوية لمنع ارتفاع الحرارة.', ku: 'سەرچاوەی وزە بە هەوادانی باش بپارێزە.' },
    pow_li_s3: { en: 'Do not touch live terminals during operation.', ar: 'لا تلمس الطرفيات الحاملة للتيار أثناء التشغيل.', ku: 'کاتی کارکردن تەرمینالەکانی ئەکتیڤ مەلمسە.' },
    pow_li_s4: { en: 'Fuse protection is recommended to avoid short-circuit damage.', ar: 'يُنصح بالحماية بالفيوز لتجنب أضرار الدوائر القصيرة.', ku: 'پاراستنی فیوز پێشنیار دەکرێت بۆ ڕێگریکردن لە زیانی کورت-سیرکت.' },
    pow_li_s5: { en: 'Always verify current capacity matches your motor and laser setup.', ar: 'تحقق دائماً من أن سعة التيار تتطابق مع إعداد محركك وليزرك.', ku: 'هەمیشە پشتڕاستبکەرەوە کە ئەندازەی جریان بە دامەزراندنی موتەر و لەیزەرەکەت دەگونجێت.' },
    pow_li_m1: { en: 'Regularly inspect for dust accumulation and clean vents.', ar: 'افحص بانتظام تراكم الغبار ونظّف فتحات التهوية.', ku: 'بە رێکوپێکی بۆ کۆبوونەوەی تۆز سەیربکە و ریقەکانی هەوادان پاک بکەرەوە.' },
    pow_li_m2: { en: 'Check for signs of overheating, unusual noise, or voltage fluctuations.', ar: 'تحقق من علامات ارتفاع الحرارة أو الضوضاء غير الاعتيادية.', ku: 'نیشانەکانی گەرم زیادەکاری، دەنگی نائاسایی، یان لەرزینەوەی هەڵتاو بپشکنە.' },
    pow_li_m3: { en: 'Ensure all connectors are secure and free of corrosion.', ar: 'تأكد من أن جميع الموصلات محكمة وخالية من التآكل.', ku: 'دڵنیابە کە هەموو کۆنێکتەرەکان پتەون و بێ زەنگن.' },
    pow_li_m4: { en: 'Replace old or faulty units promptly to prevent damage to other components.', ar: 'استبدل الوحدات القديمة أو المعطوبة فوراً.', ku: 'یەکەکانی کۆن یان خەراب بە خێرایی بگۆڕە.' },

    /* — Software — */
    sw_h1:       { en: 'Software',                    ar: 'البرنامج',                       ku: 'نەرمەکاڵا' },
    sw_h2_intro: { en: 'Introduction',                ar: 'مقدمة',                          ku: 'پێشەکی' },
    sw_h2_comp:  { en: 'Main Software Components',    ar: 'مكونات البرنامج الرئيسية',       ku: 'سەرەکی پێکهاتەکانی نەرمەکاڵا' },
    sw_h2_work:  { en: 'Working Principle',           ar: 'مبدأ العمل',                     ku: 'پرینسیپی کارکردن' },
    sw_h2_feat:  { en: 'Key Features of the Software', ar: 'الميزات الرئيسية للبرنامج',    ku: 'سەرەکی تایبەتمەندییەکانی نەرمەکاڵا' },
    sw_h2_apps:  { en: 'Applications',                ar: 'التطبيقات',                      ku: 'بەکارهێنانەکان' },
    sw_h2_adv:   { en: 'Advantages',                  ar: 'المزايا',                        ku: 'سوودەکان' },
    sw_h2_lim:   { en: 'Limitations',                 ar: 'القيود',                         ku: 'سنوورەکان' },
    sw_h2_best:  { en: 'Best Practices',              ar: 'أفضل الممارسات',                 ku: 'باشترین پراکتیکەکان' },
    sw_h2_safe:  { en: 'Safety Considerations',       ar: 'اعتبارات السلامة',               ku: 'تێبینییەکانی سەلامەتی' },

    sw_p_intro: { en: 'Software is the backbone of any automated machine. For a laser engraver or CNC system, software interprets designs, generates instructions, and controls the hardware precisely. Without software, even the most advanced electronics would be unable to perform meaningful operations.', ar: 'البرنامج هو العمود الفقري لأي آلة آلية. يفسر البرنامج التصاميم ويولد التعليمات ويتحكم في الأجهزة بدقة. بدون برامج، حتى أكثر الإلكترونيات تقدماً ستعجز عن أداء عمليات ذات معنى.', ku: 'نەرمەکاڵا ستوونی پشت هەر ئامێرێکی ئۆتۆماتیکیەتی. بێ نەرمەکاڵا، تەنانەت پێشکەوترین ئەلیکترۆنیاتیش ناتوانێت کارە واتادارەکان جێبەجێ بکات.' },
    sw_p_work:  { en: 'The process works in several stages:', ar: 'تعمل العملية على عدة مراحل:', ku: 'پرۆسەکە لە چەند قۆناغدا کار دەکات:' },
    sw_li_w1: { en: 'The user creates or imports a design (vector or raster image, 3D model).', ar: 'يقوم المستخدم بإنشاء أو استيراد تصميم (صورة متجهية أو نقطية، نموذج ثلاثي الأبعاد).', ku: 'بەکارهێنەر دیزاینێک دروست دەکات یان هاوردە دەکات (وێنەی ڤێکتۆر یان ڕاستەر، مۆدێلی سێ ئەندازەیی).' },
    sw_li_w3: { en: 'The controller software sends G-code line by line to the MKS board.', ar: 'يرسل برنامج التحكم G-code سطراً بسطر إلى لوحة MKS.', ku: 'نەرمەکاڵای کۆنترۆڵ G-code ساڵبەساڵ بۆ تەختەی MKS دەنێرێت.' },
    sw_li_w5: { en: 'Real-time monitoring ensures the process is correct, and adjustments can be made if necessary.', ar: 'تضمن المراقبة الفورية صحة العملية، ويمكن إجراء التعديلات إذا لزم الأمر.', ku: 'چاودێریکردنی کاتی ڕاست دڵنیا دەکاتەوە کە پرۆسەکە دروستە.' },
    sw_li_f1: { en: 'Precision motion control via G-code', ar: 'التحكم الدقيق في الحركة عبر G-code', ku: 'کۆنترۆڵی تیزی جووڵە بەڕێگای G-code' },
    sw_li_f2: { en: 'Laser intensity and PWM adjustment', ar: 'ضبط شدة الليزر وتعديل PWM', ku: 'ڕێکخستنی توانای لەیزەر و گۆڕانکاری PWM' },
    sw_li_f3: { en: 'Step resolution and microstepping configuration', ar: 'تكوين دقة الخطوة والخطوة الدقيقة', ku: 'ڕێکخستنی چۆزینەوەی هەنگاو و مایکرۆ-ستیپینگ' },
    sw_li_f4: { en: 'Temperature monitoring for heated beds (3D printing) or electronics', ar: 'مراقبة درجة الحرارة للأسرة الساخنة أو الإلكترونيات', ku: 'چاودێریکردنی پلەی گەرما بۆ ئەنجامەکانی گەرمکراو یان ئەلیکترۆنیاتەکان' },
    sw_li_f5: { en: 'Safety controls: emergency stop, limit switches', ar: 'ضوابط السلامة: إيقاف الطوارئ، مفاتيح الحد', ku: 'کۆنترۆڵی سەلامەتی: وەستانی فریاکەوتن، کلیلەکانی سنور' },
    sw_li_f6: { en: 'Customizable settings for speed, acceleration, and offsets', ar: 'إعدادات قابلة للتخصيص للسرعة والتسارع والإزاحة', ku: 'ئەستێرەکانی دەستکاریکراو بۆ خێرایی، بەرزبوونەوە، و شێواوەکان' },
    sw_li_a1: { en: 'Laser engraving and cutting', ar: 'الحفر والقطع بالليزر', ku: 'حەکپێکردن و بڕینی لەیزەر' },
    sw_li_a2: { en: '3D printing', ar: 'الطباعة ثلاثية الأبعاد', ku: 'چاپی سێ ئەندازەیی' },
    sw_li_a3: { en: 'CNC milling', ar: 'طحن CNC', ku: 'ئاسیاکردنی CNC' },
    sw_li_a4: { en: 'Automation and robotic tasks', ar: 'مهام الأتمتة والروبوتات', ku: 'ئەرکەکانی ئۆتۆماسیۆن و ڕۆبۆتیک' },
    sw_li_a5: { en: 'Scientific experimentation and prototyping', ar: 'التجريب العلمي والنماذج الأولية', ku: 'تاقیکردنەوەی زانستی و دروستکردنی نموونەی سەرەتایی' },
    sw_li_adv1: { en: 'Precise and repeatable machine operation', ar: 'تشغيل دقيق ومتكرر للآلة', ku: 'کارکردنی تیز و دووبارەکراوی ئامێر' },
    sw_li_adv2: { en: 'Ability to process complex designs', ar: 'القدرة على معالجة التصاميم المعقدة', ku: 'توانای پرۆسێسکردنی دیزاینی ئاڵۆز' },
    sw_li_adv3: { en: 'Real-time adjustments without stopping the machine', ar: 'تعديلات فورية دون إيقاف الآلة', ku: 'گۆڕانکاریەکانی کاتی ڕاست بەبێ وەستاندنی ئامێر' },
    sw_li_adv4: { en: 'Integration with multiple hardware components and sensors', ar: 'التكامل مع مكونات أجهزة وأجهزة استشعار متعددة', ku: 'یەکگرتن بە پێکهاتەکانی ئامێری زۆر و حەساسەکان' },
    sw_li_lim1: { en: 'Software misconfiguration can lead to errors, skipped steps, or machine damage', ar: 'يمكن أن يؤدي الإعداد الخاطئ للبرنامج إلى أخطاء أو خطوات مفقودة أو تلف الآلة', ku: 'ڕێکخستنی هەڵەی نەرمەکاڵا دەتوانێت بۆ هەڵەکان، هەنگاوی نەماوە، یان زیانی ئامێر بکات' },
    sw_li_lim2: { en: 'Compatibility issues between firmware and control software', ar: 'مشاكل التوافق بين البرنامج الثابت وبرنامج التحكم', ku: 'کێشەکانی گونجانی نێوان فێرمویێر و نەرمەکاڵای کۆنترۆڵ' },
    sw_li_lim3: { en: 'Learning curve for advanced settings like PID, microstepping, and acceleration', ar: 'منحنى التعلم للإعدادات المتقدمة مثل PID والخطوة الدقيقة والتسارع', ku: 'خەتی فێربوون بۆ ئەستێرەکانی پێشکەوتوو وەک PID، مایکرۆستیپینگ، و بەرزبوونەوە' },
    sw_li_lim4: { en: 'Relies on stable communication between PC/software and MKS board', ar: 'يعتمد على اتصال مستقر بين الكمبيوتر/البرنامج ولوحة MKS', ku: 'پشت بە پەیوەندییەکی جێگیر دەبەستێت نێوان PC/نەرمەکاڵا و تەختەی MKS' },
    sw_li_b1: { en: 'Always test with low-power settings before full operation', ar: 'اختبر دائماً بإعدادات منخفضة الطاقة قبل التشغيل الكامل', ku: 'هەمیشە بە ئەستێرەکانی وزەی کەم تاقی بکەرەوە پێش کارکردنی تەواو' },
    sw_li_b2: { en: 'Keep firmware updated for bug fixes and features', ar: 'حافظ على تحديث البرنامج الثابت لإصلاح الأخطاء والميزات', ku: 'فێرمویێر نوێکراوی بپارێزە بۆ ڕەتکردنەوەی باگ و تایبەتمەندییەکان' },
    sw_li_b3: { en: 'Backup configuration files to avoid losing settings', ar: 'احتفظ بنسخة احتياطية من ملفات الإعداد', ku: 'فایلەکانی ڕێکخستن باکئەپ بکە بۆ ڕێگریکردن لە لەدەستدانی ئەستێرەکان' },
    sw_li_b4: { en: 'Monitor logs for errors or skipped commands', ar: 'راقب السجلات بحثاً عن أخطاء أو أوامر مفقودة', ku: 'لۆگەکان بۆ هەڵەکان یان فەرمانەکانی نەماوە چاودێری بکە' },
    sw_li_b5: { en: 'Calibrate machine axes periodically for accuracy', ar: 'قم بمعايرة محاور الآلة بشكل دوري للدقة', ku: 'ئەکسەکانی ئامێر بە سەردەمیانەیی کالیبرە بکە بۆ تیزایی' },
    sw_li_s1: { en: 'Ensure emergency stop is accessible', ar: 'تأكد من إمكانية الوصول إلى زر الإيقاف الطارئ', ku: 'دڵنیابە کە وەستانی فریاکەوتن دەستگیرە' },
    sw_li_s2: { en: 'Verify limit switches and sensors are functional', ar: 'تحقق من أن مفاتيح الحد والمستشعرات تعمل', ku: 'پشتڕاستبکەرەوە کە کلیلەکانی سنور و حەساسەکان کار دەکەن' },
    sw_li_s3: { en: 'Do not leave the machine unattended during operation', ar: 'لا تترك الآلة دون مراقبة أثناء التشغيل', ku: 'کاتی کارکردن ئامێر بەبێ چاودێری مەهێڵێ' },
    sw_li_s4: { en: 'Follow laser and electrical safety standards', ar: 'اتبع معايير السلامة الخاصة بالليزر والكهرباء', ku: 'ستانداردەکانی سەلامەتی لەیزەر و کارەبا بەتاڵ مەکە' },

    /* — Stepper — */
    step_h1:       { en: 'Stepper Motor',              ar: 'المحرك الخطوي',                  ku: 'موتەری سایتەپەر' },
    step_h2_intro: { en: 'Introduction',               ar: 'مقدمة',                          ku: 'پێشەکی' },
    step_h2_types: { en: 'Types of Stepper Motors',    ar: 'أنواع المحركات الخطوية',         ku: 'جۆرەکانی موتەری سایتەپەر' },
    step_h2_work:  { en: 'Working Principle',          ar: 'مبدأ العمل',                     ku: 'پرینسیپی کارکردن' },
    step_h2_comp:  { en: 'Main Components',            ar: 'المكونات الرئيسية',              ku: 'سەرەکی پێکهاتەکان' },
    step_h2_elec:  { en: 'Electrical Characteristics', ar: 'الخصائص الكهربائية',             ku: 'تایبەتمەندییە کارەباییەکان' },
    step_h2_apps:  { en: 'Applications',               ar: 'التطبيقات',                      ku: 'بەکارهێنانەکان' },
    step_h2_adv:   { en: 'Advantages',                 ar: 'المزايا',                        ku: 'سوودەکان' },
    step_h2_lim:   { en: 'Limitations',                ar: 'القيود',                         ku: 'سنوورەکان' },
    step_h2_conn:  { en: 'Connection with MKS Board',  ar: 'الربط مع لوحة MKS',              ku: 'پەیوەندی بە تەختەی MKS' },
    step_h2_maint: { en: 'Maintenance Tips',           ar: 'نصائح الصيانة',                  ku: 'ئیشارەکانی چاکسازی' },

    step_p_conn2: { en: 'Proper wiring ensures smooth motion without missed steps or vibrations.', ar: 'يضمن التوصيل السليم حركة سلسة دون خطوات مفقودة أو اهتزازات.', ku: 'تەلی گونجاو جووڵەی مرۆک بەبێ هەنگاوی لەدەستچووە یان ئارتەشت دڵنیا دەکاتەوە.' },
    step_li_full: { en: 'Full-step mode: moves one complete step per pulse.', ar: 'وضع الخطوة الكاملة: يتحرك خطوة كاملة واحدة لكل نبضة.', ku: 'دۆخی هەنگاوی تەواو: بۆ هەر پاڵسێک یەک هەنگاوی تەواو دەجووڵێت.' },
    step_li_half: { en: 'Half-step mode: alternates between full and half steps for smoother motion.', ar: 'وضع نصف الخطوة: يتناوب بين الخطوات الكاملة والنصفية لحركة أكثر سلاسة.', ku: 'دۆخی نیوەی هەنگاو: نێوان هەنگاوی تەواو و نیوە بەرەوژووردانی دەکات.' },
    step_li_micro: { en: 'Microstepping: divides each step into smaller increments for higher resolution and reduced vibration.', ar: 'الخطوة الدقيقة: تقسم كل خطوة إلى زيادات أصغر لدقة أعلى وتقليل الاهتزاز.', ku: 'مایکرۆستیپینگ: هەر هەنگاوێک دادەبەشێنێت بۆ چۆزینەوەی بالاتر و کەمکردنەوەی ئارتەشت.' },
    step_li_e1: { en: 'Step Angle: 1.8° (200 steps per revolution) is common; can range 0.9°–7.5°.', ar: 'زاوية الخطوة: 1.8° (200 خطوة لكل دورة) شائعة؛ يمكن أن تتراوح بين 0.9° و7.5°.', ku: 'گۆشەی هەنگاو: 1.8° (200 هەنگاو بۆ هەر خولێک) باوە؛ دەتوانێت لە 0.9° تا 7.5° بێت.' },
    step_li_e2: { en: 'Rated Voltage: 2–12V typically, depends on the motor.', ar: 'الجهد المقنن: عادةً 2-12 فولت، يعتمد على المحرك.', ku: 'هەڵتاوی نرخکراو: زۆرجار 2-12V، پشتبستن بە موتەرەکە.' },
    step_li_e3: { en: 'Rated Current: 0.5–2A per phase.', ar: 'التيار المقنن: 0.5-2 أمبير لكل طور.', ku: 'جریانی نرخکراو: 0.5-2A بۆ هەر فازێک.' },
    step_li_e4: { en: 'Holding Torque: Torque when the motor is energized and stationary.', ar: 'عزم الإمساك: العزم عندما يكون المحرك مُزود بالطاقة وساكن.', ku: 'گەردوونی گرتن: گەردوون کاتێک موتەر وزەی پێدراوە و جێگیرە.' },
    step_li_e5: { en: 'Phase Configuration: Bipolar (2 wires per coil) or Unipolar (center tap).', ar: 'تكوين الطور: ثنائي القطب (سلكان لكل ملف) أو أحادي القطب (نقطة وسطية).', ku: 'ڕێکخستنی فاز: دوو-قوتوبی (2 تەل بۆ هەر کۆیلێک) یان تاک-قوتوبی (نوکتەی ناوەند).' },
    step_li_a1: { en: '3D printers for X, Y, Z axis movement', ar: 'طابعات ثلاثية الأبعاد لحركة المحاور X وY وZ', ku: 'چاپەرەکانی سێ ئەندازەیی بۆ جووڵەی ئەکسەکانی X، Y، Z' },
    step_li_a2: { en: 'CNC machines and laser engravers', ar: 'آلات CNC وحافرات الليزر', ku: 'ئامێرەکانی CNC و حەکپێکەرەکانی لەیزەر' },
    step_li_a3: { en: 'Camera sliders and robotic arms', ar: 'رافعات الكاميرا والأذرع الروبوتية', ku: 'سلایدەرەکانی کامێرا و دەستەکانی ڕۆبۆتیک' },
    step_li_a4: { en: 'Automated valves, textile machinery, and conveyor systems', ar: 'الصمامات الآلية ومعدات النسيج وأنظمة الناقل', ku: 'ڤالڤەکانی ئۆتۆماتیک، ئامێری دراوبافی، و سیستەمەکانی گواستنەوە' },
    step_li_adv1: { en: 'Precise positioning without feedback (open-loop)', ar: 'تحديد موضع دقيق دون تغذية راجعة (حلقة مفتوحة)', ku: 'شوێندیاریکردنی تیز بەبێ فیدباک (حەلقەی کراوە)' },
    step_li_adv2: { en: 'High torque at low speeds', ar: 'عزم عالٍ عند السرعات المنخفضة', ku: 'گەردوونی بالا لە خێراییەکانی کەم' },
    step_li_adv3: { en: 'Reliable and simple control using pulses', ar: 'تحكم موثوق وبسيط باستخدام النبضات', ku: 'کۆنترۆڵی متمانەپێکراو و سادە بە بەکارهێنانی پاڵسەکان' },
    step_li_adv4: { en: 'Durable with long service life', ar: 'متين مع عمر خدمة طويل', ku: 'بادەوام بە تەمەنی خزمەتی درێژ' },
    step_li_lim1: { en: 'Resonance at certain speeds can cause vibration and noise.', ar: 'الرنين عند سرعات معينة يمكن أن يسبب اهتزازاً وضوضاء.', ku: 'ڕیزۆنانس لە خێراییەکانی دیاریکراو دەتوانێت بۆ ئارتەشت و دەنگەگێژ بکات.' },
    step_li_lim2: { en: 'Limited high-speed torque compared to servo motors.', ar: 'عزم محدود عند السرعات العالية مقارنةً بمحركات السيرفو.', ku: 'گەردوونی خێراییی بالای سنورداری بەراورد بە موتەرەکانی سێرڤۆ.' },
    step_li_lim3: { en: 'Requires proper current setting to avoid overheating.', ar: 'يتطلب ضبطاً صحيحاً للتيار لتجنب ارتفاع الحرارة.', ku: 'پێویستی بە ڕێکخستنی گونجاوی جریان هەیە بۆ ڕێگریکردن لە گەرم زیادەکاری.' },
    step_li_lim4: { en: 'Microstepping adds smoothness but reduces torque slightly.', ar: 'الخطوة الدقيقة تضيف سلاسة لكنها تقلل العزم قليلاً.', ku: 'مایکرۆستیپینگ مرۆکی زیاد دەکات بەلام گەردوون کەمێک کەم دەکاتەوە.' },
    step_li_c4: { en: 'Current limits must be set on the driver according to motor specifications to prevent overheating.', ar: 'يجب ضبط حدود التيار على المشغل وفقاً لمواصفات المحرك لمنع ارتفاع الحرارة.', ku: 'سنورەکانی جریان دەبێت لەسەر درایڤەرەکە بەپێی تایبەتمەندییەکانی موتەر ڕێک بخرێت.' },
    step_li_m1: { en: 'Keep the motor and driver cool; check heat sinks and fans.', ar: 'حافظ على برودة المحرك والمشغل؛ تحقق من مبددات الحرارة والمراوح.', ku: 'موتەر و درایڤەر ساردبخەرەوە؛ هیتسینکەکان و فانەکان بپشکنە.' },
    step_li_m2: { en: 'Inspect wiring for loose connections or shorts.', ar: 'افحص الأسلاك بحثاً عن اتصالات رخوة أو دوائر قصيرة.', ku: 'تەلەکان بۆ پەیوەندییەکانی شل یان کورت-سیرکت بپشکنە.' },
    step_li_m3: { en: 'Clean mechanical couplings and shafts for smooth operation.', ar: 'نظّف الوصلات الميكانيكية والمحاور لتشغيل سلس.', ku: 'پەیوەندیەکانی میکانیکی و میلەکان پاک بکەرەوە بۆ کارکردنی مرۆک.' },
    step_li_m4: { en: 'Check for unusual noises or skipped steps — may indicate resonance or overcurrent.', ar: 'تحقق من الأصوات غير المعتادة أو الخطوات المفقودة — قد تشير إلى رنين أو تيار زائد.', ku: 'دەنگی نائاسایی یان هەنگاوی نەماوە بپشکنە — دەتوانێت نیشانەی ڕیزۆنانس یان جریانی زیادە بێت.' },

    /* — Limit Switch — */
    swt_h1:          { en: 'Limit Switch',              ar: 'مفتاح الحد',                    ku: 'کلیلەی سنور' },
    swt_h2_intro:    { en: 'Introduction',              ar: 'مقدمة',                          ku: 'پێشەکی' },
    swt_h2_types:    { en: 'Types of Limit Switches',   ar: 'أنواع مفاتيح الحد',             ku: 'جۆرەکانی کلیلەی سنور' },
    swt_h2_work:     { en: 'Working Principle',         ar: 'مبدأ العمل',                     ku: 'پرینسیپی کارکردن' },
    swt_h2_elec:     { en: 'Electrical Components',     ar: 'المكونات الكهربائية',            ku: 'پێکهاتە کارەباییەکان' },
    swt_h2_why:      { en: 'Why Limit Switches Are Important', ar: 'لماذا تعد مفاتيح الحد مهمة', ku: 'بۆچی کلیلەکانی سنور گرنگن' },
    swt_h2_conn:     { en: 'Connection with MKS Board', ar: 'الربط مع لوحة MKS',              ku: 'پەیوەندی بە تەختەی MKS' },
    swt_h2_apps:     { en: 'Applications',              ar: 'التطبيقات',                      ku: 'بەکارهێنانەکان' },
    swt_h2_adv:      { en: 'Advantages',                ar: 'المزايا',                        ku: 'سوودەکان' },
    swt_h2_lim:      { en: 'Limitations',               ar: 'القيود',                         ku: 'سنوورەکان' },
    swt_h2_safemaint:{ en: 'Safety & Maintenance',      ar: 'السلامة والصيانة',               ku: 'سەلامەتی و چاکسازی' },

    swt_p_intro: { en: 'A limit switch is an electromechanical device used to detect the physical position or movement limit of a machine part. In CNC and laser engraving machines, limit switches are essential for safety, accuracy, and automated homing. They allow the controller to know when an axis has reached its maximum or minimum position.', ar: 'مفتاح الحد جهاز كهروميكانيكي يُستخدم للكشف عن الموضع الجسدي أو حد حركة جزء من الآلة. في آلات CNC وحفر الليزر، تعد مفاتيح الحد ضرورية للسلامة والدقة والإعادة التلقائية إلى الموضع الأصلي.', ku: 'کلیلەی سنور ئامێرێکی کارەبامیکانیکیەتی کە بەکاردێت بۆ دۆزینەوەی شوێنی جەستایی یان سنووری جووڵەی بەشێک لە ئامێر. لە ئامێرەکانی CNC و حەکپێکردنی لەیزەر، کلیلەکانی سنور پێویستن بۆ سەلامەتی، تیزایی، و هۆمینگی ئۆتۆماتیک.' },
    swt_p_work: { en: 'Limit switches work by changing their electrical state when they are physically triggered by a moving part of the machine:', ar: 'تعمل مفاتيح الحد عن طريق تغيير حالتها الكهربائية عندما يتم تشغيلها جسدياً بواسطة جزء متحرك من الآلة:', ku: 'کلیلەکانی سنور کار دەکەن بە گۆڕینی دۆخی کارەباییانەوە کاتێک بەشێکی جووڵاوی ئامێر بەجەستایی دەیانتریفکێنێت:' },
    swt_p_conn: { en: 'Limit switches are connected to the MKS controller board using signal and ground pins:', ar: 'تتصل مفاتيح الحد بلوحة التحكم MKS باستخدام دبابيس الإشارة والأرضي:', ku: 'کلیلەکانی سنور بە بۆردی کۆنترۆڵی MKS دەپەیوەندێن بە بەکارهێنانی پینەکانی ئیشارە و زەوی:' },
    swt_li_w1: { en: 'When the axis moves, it presses the switch lever or sensor.', ar: 'عندما يتحرك المحور، يضغط على ذراع المفتاح أو المستشعر.', ku: 'کاتێک ئەکسەکە دەجووڵێت، ئیستیلای کلیل یان حەساسەکەی فشار دەکاتەوە.' },
    swt_li_w2: { en: 'The internal contacts open or close, sending a signal to the controller.', ar: 'تفتح أو تغلق الاتصالات الداخلية، مما يرسل إشارة إلى المتحكم.', ku: 'پەیوەندییەکانی ناوخۆ کراوە دەبن یان دادەخرێن، ئیشارەیەک بۆ کۆنترۆڵکەر دەنێرێت.' },
    swt_li_w3: { en: 'The controller immediately stops movement or sets the axis position.', ar: 'يوقف المتحكم الحركة فوراً أو يضبط موضع المحور.', ku: 'کۆنترۆڵکەر فوری جووڵەکە دادەخات یان شوێنی ئەکسەکە ڕێک دەخات.' },
    swt_li_why1: { en: 'Prevents motors from over-traveling and damaging the frame.', ar: 'يمنع المحركات من السفر الزائد وتلف الإطار.', ku: 'ڕێگری لەوە دەکات کە موتەرەکان گەشتی زیادە بکەن و چارچۆکە خەراب بکەن.' },
    swt_li_why2: { en: 'Allows automatic homing of X, Y, and Z axes.', ar: 'يتيح الإعادة التلقائية للمحاور X وY وZ.', ku: 'هۆمینگی ئۆتۆماتیکی ئەکسەکانی X، Y، و Z ئەمکانپێدەدات.' },
    swt_li_why3: { en: 'Improves repeatability and positioning accuracy.', ar: 'يحسن قابلية التكرار ودقة تحديد الموضع.', ku: 'دووبارەپێکرانیکردن و تیزایی شوێندیاریکردن باشتر دەکات.' },
    swt_li_why4: { en: 'Provides an emergency stop reference point.', ar: 'يوفر نقطة مرجعية لإيقاف الطوارئ.', ku: 'خاڵی ئامانجی وەستانی فریاکەوتن دابین دەکات.' },
    swt_li_c4: { en: 'Firmware detects the trigger and stops axis movement instantly.', ar: 'البرنامج الثابت يكشف المشغّل ويوقف حركة المحور فوراً.', ku: 'فێرمویێرەکە تریفکەرەکە دۆزینەوە دەکات و جووڵەی ئەکسەکە فوری دادەخات.' },
    swt_li_a1: { en: 'CNC machine homing systems.', ar: 'أنظمة الإعادة إلى الموضع الأصلي في آلات CNC.', ku: 'سیستەمەکانی هۆمینگی ئامێرەکانی CNC.' },
    swt_li_a2: { en: 'Laser engraver axis limits.', ar: 'حدود المحاور في حافرات الليزر.', ku: 'سنورەکانی ئەکسی حەکپێکەرەکانی لەیزەر.' },
    swt_li_a3: { en: '3D printers and robotic arms.', ar: 'الطابعات ثلاثية الأبعاد والأذرع الروبوتية.', ku: 'چاپەرەکانی سێ ئەندازەیی و دەستەکانی ڕۆبۆتیک.' },
    swt_li_a4: { en: 'Industrial automation and safety systems.', ar: 'أنظمة الأتمتة والسلامة الصناعية.', ku: 'سیستەمەکانی ئۆتۆماسیۆن و سەلامەتی پیشەسازی.' },
    swt_li_adv1: { en: 'Simple and reliable operation.', ar: 'تشغيل بسيط وموثوق.', ku: 'کارکردنی سادە و متمانەپێکراو.' },
    swt_li_adv2: { en: 'Low cost and easy installation.', ar: 'تكلفة منخفضة وتركيب سهل.', ku: 'تێچووی کەم و دامەزراندنی ئاسان.' },
    swt_li_adv3: { en: 'Improves machine safety.', ar: 'يحسّن سلامة الآلة.', ku: 'سەلامەتی ئامێر باشتر دەکات.' },
    swt_li_adv4: { en: 'Compatible with most CNC controllers.', ar: 'متوافق مع معظم متحكمات CNC.', ku: 'گونجاوی زۆرینەی کۆنترۆڵکەرەکانی CNC.' },
    swt_li_lim1: { en: 'Mechanical wear over time.', ar: 'التآكل الميكانيكي مع مرور الوقت.', ku: 'فڕساندنی میکانیکی بە تێپەڕینی کات.' },
    swt_li_lim2: { en: 'Requires precise mounting alignment.', ar: 'يتطلب محاذاة دقيقة للتركيب.', ku: 'پێویستی بە ئەستوونکردنی تیزی دامەزراندن هەیە.' },
    swt_li_lim3: { en: 'Physical contact types may need maintenance.', ar: 'أنواع التلامس الجسدي قد تحتاج إلى صيانة.', ku: 'جۆرەکانی پەیوەندی جەستایی لەوانەیە پێویستی بە چاکسازی هەبێت.' },
    swt_li_s1: { en: 'Secure mounting to avoid false triggers.', ar: 'تركيب محكم لتجنب التشغيل الخاطئ.', ku: 'دامەزراندنی پتەو بۆ ڕێگریکردن لە تریفکردنی هەڵە.' },
    swt_li_s2: { en: 'Check wiring connections regularly.', ar: 'افحص اتصالات الأسلاك بانتظام.', ku: 'پەیوەندییەکانی تەلەکان بە رێکوپێکی بپشکنە.' },
    swt_li_s3: { en: 'Keep switches clean from dust and debris.', ar: 'حافظ على نظافة المفاتيح من الغبار والحطام.', ku: 'کلیلەکان لە تۆز و نەخالەتی پاک بپارێزە.' },
    swt_li_s4: { en: 'Test homing function after installation.', ar: 'اختبر وظيفة الإعادة إلى الموضع الأصلي بعد التركيب.', ku: 'دوای دامەزراندن ئەرکی هۆمینگ تاقی بکەرەوە.' },

    /* — Driver Board — */
    ctrl_h1:       { en: 'Driver Board',               ar: 'لوحة المشغل',                   ku: 'بۆردی درایڤەر' },
    ctrl_h2_intro: { en: 'Introduction',               ar: 'مقدمة',                          ku: 'پێشەکی' },
    ctrl_h2_types: { en: 'Types of Driver Boards',     ar: 'أنواع لوحات المشغل',             ku: 'جۆرەکانی بۆردی درایڤەر' },
    ctrl_h2_work:  { en: 'Working Principle',          ar: 'مبدأ العمل',                     ku: 'پرینسیپی کارکردن' },
    ctrl_h2_comp:  { en: 'Main Components',            ar: 'المكونات الرئيسية',              ku: 'سەرەکی پێکهاتەکان' },
    ctrl_h2_elec:  { en: 'Electrical Characteristics', ar: 'الخصائص الكهربائية',             ku: 'تایبەتمەندییە کارەباییەکان' },
    ctrl_h2_apps:  { en: 'Applications',               ar: 'التطبيقات',                      ku: 'بەکارهێنانەکان' },
    ctrl_h2_adv:   { en: 'Advantages',                 ar: 'المزايا',                        ku: 'سوودەکان' },
    ctrl_h2_lim:   { en: 'Limitations',                ar: 'القيود',                         ku: 'سنوورەکان' },
    ctrl_h2_conn:  { en: 'Connection with MKS Board',  ar: 'الربط مع لوحة MKS',              ku: 'پەیوەندی بە تەختەی MKS' },
    ctrl_h2_maint: { en: 'Maintenance Tips',           ar: 'نصائح الصيانة',                  ku: 'ئیشارەکانی چاکسازی' },
    ctrl_h2_safe:  { en: 'Safety Precautions',         ar: 'تدابير السلامة',                 ku: 'تدابیری سەلامەتی' },

    ctrl_p_conn:  { en: 'Driver boards connect to the MKS board via control pins:', ar: 'تتصل لوحات المشغل بلوحة MKS عبر دبابيس التحكم:', ku: 'بۆردەکانی درایڤەر بەڕێگای پینەکانی کۆنترۆڵ بە تەختەی MKS دەپەیوەندێن:' },
    ctrl_p_conn2: { en: 'Correct wiring ensures smooth, precise motion. Drivers should be configured for current limits matching motor specifications.', ar: 'يضمن التوصيل الصحيح حركة سلسة ودقيقة. يجب تكوين المشغلات لحدود التيار المطابقة لمواصفات المحرك.', ku: 'تەلی دروست جووڵەی مرۆک و تیز دڵنیا دەکاتەوە. درایڤەرەکان دەبێت بۆ سنورەکانی جریان گونجاو بە تایبەتمەندییەکانی موتەر ڕێک بخرێن.' },
    ctrl_li_e1: { en: 'Input Voltage: Typically 12–24V DC, depending on driver type.', ar: 'جهد الدخل: عادةً 12-24 فولت DC، حسب نوع المشغل.', ku: 'هەڵتاوی کاتەبرەشک: زۆرجار 12-24V DC، بەپێی جۆری درایڤەر.' },
    ctrl_li_e2: { en: 'Current Output: Configurable per motor, often 0.5–2.5A per phase.', ar: 'مخرج التيار: قابل للتكوين لكل محرك، غالباً 0.5-2.5 أمبير لكل طور.', ku: 'دەرچووی جریان: دەستکاریکراو بۆ هەر موتەرێک، زۆرجار 0.5-2.5A بۆ هەر فازێک.' },
    ctrl_li_e3: { en: 'Microstepping Resolution: Full, half, 1/8, 1/16, up to 1/256 steps.', ar: 'دقة الخطوة الدقيقة: كاملة، نصفية، 1/8، 1/16، حتى 1/256 خطوة.', ku: 'چۆزینەوەی مایکرۆستیپینگ: تەواو، نیوە، 1/8، 1/16، تا 1/256 هەنگاو.' },
    ctrl_li_e4: { en: 'Protection Features: Overcurrent, thermal shutdown, undervoltage lockout.', ar: 'ميزات الحماية: زيادة التيار، الإغلاق الحراري، قفل انخفاض الجهد.', ku: 'تایبەتمەندییەکانی پاراستن: جریانی زیادە، گرتنی گەرمی، قەفڵکردنی کەمی هەڵتاو.' },
    ctrl_li_a1: { en: 'Controlling stepper motors in CNC, 3D printers, and laser engravers', ar: 'التحكم في المحركات الخطوية في CNC والطابعات ثلاثية الأبعاد وحافرات الليزر', ku: 'کۆنترۆڵکردنی موتەرەکانی سایتەپەر لە CNC، چاپەرەکانی سێ ئەندازەیی، و حەکپێکەرەکانی لەیزەر' },
    ctrl_li_a2: { en: 'Driving servo motors for robotics or precision motion', ar: 'تشغيل محركات السيرفو للروبوتات أو الحركة الدقيقة', ku: 'کارکردنی موتەرەکانی سێرڤۆ بۆ ڕۆبۆتیک یان جووڵەی تیز' },
    ctrl_li_a3: { en: 'Regulating laser modules and fans', ar: 'تنظيم وحدات الليزر والمراوح', ku: 'ڕێنوێنکردنی یەکەکانی لەیزەر و فانەکان' },
    ctrl_li_a4: { en: 'Automation systems requiring precise movement or speed control', ar: 'أنظمة الأتمتة التي تتطلب تحكماً دقيقاً في الحركة أو السرعة', ku: 'سیستەمەکانی ئۆتۆماسیۆن کە پێویستیان بە کۆنترۆڵی تیزی جووڵە یان خێرایی هەیە' },
    ctrl_li_adv1: { en: 'Precise control of motor movement', ar: 'التحكم الدقيق في حركة المحرك', ku: 'کۆنترۆڵی تیزی جووڵەی موتەر' },
    ctrl_li_adv2: { en: 'Microstepping allows smooth motion', ar: 'تتيح الخطوة الدقيقة حركة سلسة', ku: 'مایکرۆستیپینگ جووڵەی مرۆک ئەمکانپێدەدات' },
    ctrl_li_adv3: { en: 'Protects motors from overcurrent and overheating', ar: 'يحمي المحركات من زيادة التيار والاحترار الزائد', ku: 'موتەرەکان لە جریانی زیادە و گەرم زیادەکاری دەپارێزێت' },
    ctrl_li_adv4: { en: 'Compact and easy to integrate into machines', ar: 'مدمج وسهل التكامل في الآلات', ku: 'کۆمپاکت و ئاسان بۆ تێکردن لە ئامێرەکان' },
    ctrl_li_lim1: { en: 'Requires proper current and voltage configuration', ar: 'يتطلب تكوين صحيح للتيار والجهد', ku: 'پێویستی بە ڕێکخستنی گونجاوی جریان و هەڵتاو هەیە' },
    ctrl_li_lim2: { en: 'High microstepping can reduce torque slightly', ar: 'يمكن أن يقلل المايكروستيبينگ العالي العزم قليلاً', ku: 'مایکرۆستیپینگی بالا دەتوانێت گەردوون کەمێک کەم بکاتەوە' },
    ctrl_li_lim3: { en: 'Heat dissipation is crucial for prolonged operation', ar: 'تبديد الحرارة أمر بالغ الأهمية للتشغيل المطوّل', ku: 'پەراکەندەکردنی گەرما گرینگە بۆ کارکردنی درێژ' },
    ctrl_li_lim4: { en: 'Not all drivers support all motor types; check compatibility', ar: 'لا تدعم جميع المشغلات جميع أنواع المحركات؛ تحقق من التوافق', ku: 'هەموو درایڤەرەکان هەموو جۆرەکانی موتەر پشتگیری ناکەن؛ گونجانی بپشکنە' },
    ctrl_li_m1: { en: 'Ensure drivers are properly cooled; check heat sinks and airflow.', ar: 'تأكد من تبريد المشغلات بشكل صحيح؛ تحقق من مبددات الحرارة وتدفق الهواء.', ku: 'دڵنیابە کە درایڤەرەکان بە دروستی ساردکراونەوە؛ هیتسینکەکان و جەریانی هەوا بپشکنە.' },
    ctrl_li_m2: { en: 'Inspect wiring and connectors for loose connections.', ar: 'افحص الأسلاك والموصلات بحثاً عن اتصالات رخوة.', ku: 'تەلەکان و کۆنێکتەرەکان بۆ پەیوەندییەکانی شل بپشکنە.' },
    ctrl_li_m3: { en: 'Verify current settings regularly to avoid motor overheating.', ar: 'تحقق من إعدادات التيار بانتظام لتجنب الاحترار الزائد للمحرك.', ku: 'ئەستێرەکانی جریان بە رێکوپێکی پشتڕاست بکەرەوە.' },
    ctrl_li_m4: { en: 'Check for abnormal noises, skipped steps, or overheating as signs of misconfiguration.', ar: 'تحقق من الأصوات غير الطبيعية أو الخطوات المفقودة أو الاحترار الزائد.', ku: 'دەنگی نائاسایی، هەنگاوی نەماوە، یان گەرم زیادەکاری بپشکنە.' },
    ctrl_li_s1: { en: 'Always turn off power before making wiring changes.', ar: 'افصل الطاقة دائماً قبل إجراء تغييرات التوصيل.', ku: 'هەمیشە وزە بگرە پێش ئەنجامدانی گۆڕانکاریەکانی تەلە.' },
    ctrl_li_s2: { en: 'Never exceed rated voltage or current for the driver or motor.', ar: 'لا تتجاوز الجهد أو التيار المقنن للمشغل أو المحرك أبداً.', ku: 'هەرگیز هەڵتاو یان جریانی نرخکراوی درایڤەر یان موتەر تێپەڕ مەکە.' },
    ctrl_li_s3: { en: 'Keep the board away from conductive surfaces to avoid shorts.', ar: 'ابعد اللوحة عن الأسطح الموصلة لتجنب الدوائر القصيرة.', ku: 'بۆرد لە ڕووکارەکانی گەیاندنەوە دوور بپارێزە.' },
    ctrl_li_s4: { en: 'Ensure proper grounding and ventilation.', ar: 'تأكد من التأريض والتهوية الصحيحين.', ku: 'دڵنیابە لە زەویکردن و هەوادانی گونجاو.' },

    /* — Laser — */
    las_h1:   { en: 'Laser Subsystem – Semiconductor Physics & Precision Control', ar: 'نظام الليزر الفرعي – فيزياء أشباه الموصلات والتحكم الدقيق', ku: 'ژێرسیستەمی لەیزەر – فیزیای نیمەگەیاندنەوە و کۆنترۆڵی تیز' },
    las_h2_1: { en: '1. What Are Laser Diodes? – Fundamentals from ROHM Tech', ar: '1. ما هي ثنائيات الليزر؟ – الأساسيات من ROHM Tech', ku: '1. دایۆدەکانی لەیزەر چین؟ – بنچینەکان لە ROHM Tech' },
    las_h2_2: { en: '2. Light Emission Principle: Direct vs. Indirect Bandgap', ar: '2. مبدأ إصدار الضوء: الفجوة المباشرة مقابل غير المباشرة', ku: '2. پرینسیپی دەرچووی ڕووناکی: باندگاپی ڕاستەوخۆ دژ بە ناڕاستەوخۆ' },
    las_h2_3: { en: '3. Wavelength Engineering: Bandgap & Lattice Constant', ar: '3. هندسة الطول الموجي: الفجوة الطيفية وثابت الشبكة', ku: '3. ئینجینێرینگی پێوانەی مەوج: باندگاپ و ثابتی تۆری' },
    las_h2_4: { en: '4. Electrical Domain: From Current to Coherent Photons', ar: '4. المجال الكهربائي: من التيار إلى الفوتونات المتماسكة', ku: '4. دۆمەینی کارەبایی: لە جریان تا فۆتۆنی کۆهیرینت' },
    las_h2_5: { en: '5. Microcontroller PWM & GRBL Firmware', ar: '5. PWM للمتحكم الدقيق وبرنامج GRBL الثابت', ku: '5. PWM-ی مایکرۆکۆنترۆڵەر و فێرمویێری GRBL' },
    las_h2_6: { en: '6. Optical Path: Collimation & Spot Size', ar: '6. المسار الضوئي: التجميع والحجم البقعي', ku: '6. ڕێگای ئۆپتیکی: کۆلیماسیۆن و قەبارەی خاڵ' },
    las_h2_7: { en: '7. Material Interaction: Thermal Modeling', ar: '7. التفاعل مع المواد: النمذجة الحرارية', ku: '7. کارلێکی ماددە: مۆدێڵسازی گەرمایی' },
    las_h2_8: { en: '8. Thermal Management & Heat Sink Sizing', ar: '8. إدارة الحرارة وتحديد حجم مبدد الحرارة', ku: '8. بەڕێوەبردنی گەرما و ئەندازەکردنی هیتسینک' },
    las_h2_9: { en: '9. Complete Signal & Information Flow: G-code → Photon', ar: '9. تدفق الإشارة والمعلومات الكامل: G-code → فوتون', ku: '9. جەریانی ئیشارە و زانیاری تەواو: G-code → فۆتۆن' },
    las_h2_10:{ en: '10. GRBL Laser Mode & Power Correction', ar: '10. وضع ليزر GRBL وتصحيح الطاقة', ku: '10. دۆخی لەیزەری GRBL و ڕاستکردنەوەی وزە' },
    las_h2_11:{ en: '11. Summary: Laser Diode Parameters & Materials', ar: '11. ملخص: معاملات ثنائي الليزر والمواد', ku: '11. کورتەکردنەوە: پارامیتەرەکانی دایۆدی لەیزەر و ماددەکان' },
    las_h2_12:{ en: '📚 Further Learning Resources', ar: '📚 مصادر تعلم إضافية', ku: '📚 سەرچاوەکانی فێربوونی زیاتر' },
    las_back: { en: 'Back to Materials', ar: 'العودة إلى المواد', ku: 'گەڕانەوە بۆ ماددەکان' },
    las_p_today:   { en: "Today's CNC engravers use blue laser diodes (GaN, ~445 nm) – a direct descendant of this evolution.", ar: 'تستخدم حافرات CNC الحديثة ثنائيات الليزر الزرقاء (GaN، ~445 نانومتر) – وريث مباشر لهذا التطور.', ku: 'حەکپێکەرەکانی CNC-ی ئەمرۆ دایۆدەکانی لەیزەری شین (GaN، ~445 nm) بەکاردێنن.' },
    las_p_lattice: { en: 'To grow defect-free crystals, the lattice constant of the epitaxial layer must match the substrate.', ar: 'لنمو بلورات خالية من العيوب، يجب أن تتطابق ثابتة الشبكة للطبقة الفوقية مع الركيزة.', ku: 'بۆ گەڵاندنی بڵوورە بێ-خراپیەکان، ثابتی تۆری چینی ئێپیتاکسیاڵ دەبێت بە بنەماکەی بگونجێت.' },
    las_p_grbl_pwm:{ en: 'GRBL generates 1 kHz PWM (8-bit). G-code S-word maps directly to duty cycle:', ar: 'يولّد GRBL إشارة PWM بـ 1 كيلوهرتز (8 بت). تتعيّن كلمة S في G-code مباشرةً على دورة العمل:', ku: 'GRBL 1 kHz PWM (8-بیت) دروست دەکات. وشەی S لە G-code ڕاستەوخۆ بۆ دووری کار وەستاندەدرێت:' },
    las_p_grbl_mode:{ en: 'With laser mode enabled ($32=1), GRBL applies power-velocity compensation to maintain energy density.', ar: 'عند تفعيل وضع الليزر ($32=1)، يطبق GRBL تعويض الطاقة-السرعة للحفاظ على كثافة الطاقة.', ku: 'کاتێک دۆخی لەیزەر چالاک بێت ($32=1)، GRBL تازەکردنەوەی وزە-خێرایی جێبەجێ دەکات.' },
    las_p_spot:    { en: 'Diffraction-limited spot diameter: d = 2.44·λ·f / D. For λ = 445 nm, f = 4.5 mm, D = 3 mm → d ≈ 1.63 µm (ideal). Practical spot: 50–80 µm.', ar: 'قطر البقعة المحدود بالحيود: d = 2.44·λ·f / D. لـ λ = 445 نم، f = 4.5 مم، D = 3 مم → d ≈ 1.63 ميكرومتر (مثالي). البقعة العملية: 50–80 ميكرومتر.', ku: 'قەبارەی خاڵی سنووردراو بە دیفراکشن: d = 2.44·λ·f / D. بۆ λ = 445 nm → d ≈ 1.63 µm. خاڵی پراکتیکی: 50–80 µm.' },
    las_p_thermal: { en: 'Temperature rise for wood (κ≈0.15, α≈1.2e-7) with τ = 6 ms → ΔT ≈ 780 °C → ignition.', ar: 'ارتفاع الحرارة للخشب مع τ = 6 مللي ثانية → ΔT ≈ 780°C → اشتعال.', ku: 'بەرزبوونەوەی پلەی گەرما بۆ دار بە τ = 6 ms → ΔT ≈ 780°C → گڵاوبوون.' },
    las_p_path:    { en: 'The path from a digital G-code command to coherent stimulated emission:', ar: 'المسار من أمر G-code الرقمي إلى الانبعاث المستحث المتماسك:', ku: 'ڕێگا لە فەرمانی دیجیتاڵی G-code تا دەرچووی تایبەتی کۆهیرینت:' },
    las_p_sec10:   { en: 'With $32=1, GRBL maps spindle speed to laser power and applies:', ar: 'مع $32=1، يعيّن GRBL سرعة المغزل على طاقة الليزر ويطبق:', ku: 'بە $32=1، GRBL خێراییی ئەندامەکەی خولاو بۆ وزەی لەیزەر وەستاندەدات و جێبەجێ دەکات:' },
    las_p_sec10b:  { en: 'This ensures constant energy per unit length and prevents burning at corners.', ar: 'هذا يضمن ثبات الطاقة لكل وحدة طول ويمنع الاحتراق عند الزوايا.', ku: 'ئەمەش وزەی جێگیر بۆ هەر یەکەی درێژی دڵنیا دەکاتەوە و سووتانی گۆشەکان ڕێگری دەکات.' },

    /* ── new keys for 5 detail pages ── */
    step_p_wire: { en: 'Proper wiring ensures smooth motion without missed steps or vibrations.', ar: 'يضمن التوصيل الصحيح حركة سلسة دون فقدان الخطوات أو الاهتزازات.', ku: 'تەلی دروست جووڵەی مرۆک بەبێ هەنگاوی نەماوە یان لەرزش دڵنیا دەکاتەوە.' },
    sw_p_stages: { en: 'The process works in several stages:', ar: 'تعمل العملية في عدة مراحل:', ku: 'پرۆسەکە لە چەند قۆناغدا کار دەکات:' },
    pow_p_wire:  { en: 'Proper wiring and current rating selection are essential. Never exceed voltage ratings of any connected module.', ar: 'التوصيل الصحيح واختيار تقدير التيار المناسب أمران ضروريان. لا تتجاوز أبداً تقديرات الجهد لأي وحدة متصلة.', ku: 'تەلی دروست و هەڵبژاردنی نرخی جریانی گونجاو گرینگن. هەرگیز نرخەکانی هەڵتاوی هیچ مۆدیولێکی پەیوەستکراو تێپەڕ مەکە.' },

    /* ── Build detail page keys ── */
    build_watch_videos: { en: "Watch these videos to learn how to assemble this build", ar: "شاهد هذه الفيديوهات لتعلم كيفية تجميع هذا البناء", ku: "ئەم ڤیدیۆیانە ببینە بۆ فێربوونی چۆنیەتی ئامادەکردنی ئەم بینایە" },
    build_assembly:     { en: "🔧 Assembly Guide", ar: "🔧 دليل التجميع", ku: "🔧 ڕێنمایی ئامادەکردن" },
    build_config:       { en: "⚙️ Configuration & Setup", ar: "⚙️ الإعداد والتكوين", ku: "⚙️ ڕێکخستن و دامەزراندن" },
    build_back:         { en: "← Back to All Builds", ar: "← العودة إلى جميع البناءات", ku: "← گەڕانەوە بۆ هەموو بینەکان" },

    /* ── Build page title translations ── */
    build0_title: { en: "⭐ OUR BUILD: CLE Graduation Project", ar: "⭐ بناؤنا: مشروع تخرج CLE", ku: "⭐ بینامان: پرۆژەی مەزوونبوونی CLE" },
    build1_title: { en: "💰 BUILD 1: Budget Starter Kit", ar: "💰 البناء 1: طقم بداية اقتصادي", ku: "💰 بینای 1: کیتی دەستپێکردنی بودجەیی" },
    build2_title: { en: "🖥️ BUILD 2: DIY Desktop Laser Engraver", ar: "🖥️ البناء 2: محفر ليزر مكتبي DIY", ku: "🖥️ بینای 2: حەکپێکەری لەیزەری مێزەکتەبی DIY" },
    build3_title: { en: "🔋 BUILD 3: Dual PSU Safe Setup", ar: "🔋 البناء 3: إعداد آمن بمصدرين للطاقة", ku: "🔋 بینای 3: دامەزراندنی دوو PSU پارێزراو" },
    build4_title: { en: "📦 BUILD 4: Compact Desktop Engraver", ar: "📦 البناء 4: محفر مكتبي مدمج", ku: "📦 بینای 4: حەکپێکەری مێزەکتەبی کۆمپاکت" },
    build5_title: { en: "⚡ BUILD 5: High Speed Belt Driven Laser", ar: "⚡ البناء 5: ليزر عالي السرعة بالسير", ku: "⚡ بینای 5: لەیزەری بەرزخێرایی بە بێڵت" },
    build6_title: { en: "📱 BUILD 6: WiFi Laser Engraver", ar: "📱 البناء 6: محفر ليزر بالواي فاي", ku: "📱 بینای 6: حەکپێکەری لەیزەری WiFi" },
    build7_title: { en: "📐 BUILD 7: Large Format Laser", ar: "📐 البناء 7: ليزر ذو تنسيق كبير", ku: "📐 بینای 7: لەیزەری فۆرماتی گەورە" },
    build8_title: { en: "🥃 BUILD 8: Rotary Engraving System", ar: "🥃 البناء 8: نظام الحفر الدوار", ku: "🥃 بینای 8: سیستەمی حەکپێکردنی خولاندنی" },


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
