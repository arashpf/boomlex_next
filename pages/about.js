import React, { useState } from 'react';

const About = () => {
  const [language, setLanguage] = useState('persian');

  // Translations
  const translations = {
    persian: {
      headerAbout: 'بوملکس، بوم املاک ایران',
      ourStory: 'داستان ما',
      ourStoryText: 'بوملکس با هدف ایجاد تحولی هوشمند در بازار املاک ایران شکل گرفت. ما باور داریم که پیدا کردن خانه، دفتر کار یا هر ملکی باید ساده، شفاف و مطمئن باشد. به همین دلیل پلتفرمی هوشمند طراحی کرده‌ایم که مشاوران حرفه‌ای، ابزارهای پیشرفته و کاربران را به یکدیگر متصل می‌کند.',
      thisTime: 'این زمان، این مکان',
      thisTimeText: 'امروز بوملکس در سرتاسر ایران در دسترس است. از تهران تا شهرهای کوچک، هزاران مشاور و کاربر روزانه از امکانات ما استفاده می‌کنند. ما در حال ساختن آینده‌ای هستیم که در آن معاملات ملکی با هوشمندی، سرعت و اعتماد انجام می‌شود.',
      aboutText: 'بوملکس یک اپلیکیشن و فعال مجازی در زمینه خدمات املاک در سرتاسر ایران است. ما می‌کوشیم با فراهم کردن بستری مناسب، معاملات ملک در کشورمان را متحول کنیم و هر روز خدمات جدیدی به پلتفرم خود اضافه نماییم.',
      historyHeader: 'نحوه شکل‌گیری بوملکس',
      historyText: 'بوملکس در سال ۱۴۰۵ توسط آرش پیمانی‌فر ایده‌پردازی و اجرا شد. از همان ابتدا بوملکس رشد چشم‌گیری را تجربه کرد؛ اولین معاملات ملکی بوملکس شکل گرفت و بیش از ۵۰۰ مشاور املاک حرفه‌ای شروع به همکاری با بوملکس کردند. اپلیکیشن بوملکس در مارکت‌های رسمی منتشر شد و امکانات زیادی مثل تور مجازی، سیستم یکپارچه مشاورین، نقشه قدرتمند و تعاملی، تبلیغات اختصاصی برای مشاورین و امکانات دیگری توسعه داده شد.',
      teamNames: 'آرش پیمانی‌فر',
      footerText: 'نسخه 12.0.0 - تمام حقوق محفوظ است © 1405'
    },
    english: {
      headerAbout: 'Boomlex, the Boom of Iran\'s Real Estate',
      ourStory: 'Our Story',
      ourStoryText: 'Boomlex was formed with the goal of creating a smart transformation in Iran\'s real estate market. We believe that finding a home, office, or any property should be simple, transparent, and reliable. That\'s why we designed a smart platform that connects professional consultants, advanced tools, and users together.',
      thisTime: 'This Time, This Place',
      thisTimeText: 'Today, Boomlex is available across Iran. From Tehran to small towns, thousands of consultants and users use our features daily. We are building a future where real estate transactions are conducted with intelligence, speed, and trust.',
      aboutText: 'Boomlex is a leading virtual application in real estate services across Iran. We strive to transform property transactions in our country by providing a suitable platform and adding new services to our platform every day.',
      historyHeader: 'How Boomlex Was Formed',
      historyText: 'Boomlex was conceived and implemented by Arsh Peymani in 2026. From the very beginning, Boomlex experienced significant growth; the first real estate transactions took place on Boomlex, and over 500 professional real estate consultants began working with Boomlex. The Boomlex app was officially released in markets with many features such as virtual tours, an integrated consultant system, a powerful interactive map, exclusive advertising for consultants, and other features developed.',
      teamNames: 'Arsh Peymani',
      footerText: 'Version 12.0.0 - All rights reserved © 2026'
    },
    arabic: {
      headerAbout: 'بوملکس، بوم العقارات الإيرانية',
      ourStory: 'قصتنا',
      ourStoryText: 'تشكلت بوملکس بهدف إحداث تحول ذكي في سوق العقارات الإيراني. نحن نؤمن بأن العثور على منزل أو مكتب أو أي عقار يجب أن يكون بسيطًا وشفافًا وموثوقًا. لهذا السبب صممنا منصة ذكية تربط المستشارين المحترفين والأدوات المتقدمة والمستخدمين معًا.',
      thisTime: 'هذا الزمان، هذا المكان',
      thisTimeText: 'اليوم، بوملکس متاح في جميع أنحاء إيران. من طهران إلى المدن الصغيرة، يستخدم آلاف المستشارين والمستخدمين ميزاتنا يوميًا. نحن نبني مستقبلًا تتم فيه المعاملات العقارية بذكاء وسرعة وثقة.',
      aboutText: 'بوملکس هو تطبيق افتراضي رائد في خدمات العقارات في جميع أنحاء إيران. نحن نسعى جاهدين لتحويل المعاملات العقارية في بلدنا من خلال توفير منصة مناسبة وإضافة خدمات جديدة إلى منصتنا كل يوم.',
      historyHeader: 'كيف تم تشكيل بوملکس',
      historyText: 'تم تصور بوملکس وتنفيذه من قبل آرش بيماني في عام 2026. منذ البداية، شهد بوملکس نموًا كبيرًا؛ تمت أولى المعاملات العقارية على بوملکس، وبدأ أكثر من 500 مستشار عقاري محترف العمل مع بوملکس. تم إطلاق تطبيق بوملکس رسميًا في الأسواق مع العديد من الميزات مثل الجولات الافتراضية، ونظام استشاري متكامل، وخريطة تفاعلية قوية، وإعلانات حصرية للمستشارين، وميزات أخرى تم تطويرها.',
      teamNames: 'آرش بيماني',
      footerText: 'الإصدار 12.0.0 - جميع الحقوق محفوظة © 2026'
    },
    french: {
      headerAbout: 'Boomlex, le Boom de l\'immobilier iranien',
      ourStory: 'Notre histoire',
      ourStoryText: 'Boomlex a été créé dans le but de réaliser une transformation intelligente du marché immobilier iranien. Nous croyons que trouver une maison, un bureau ou tout autre bien immobilier doit être simple, transparent et fiable. C\'est pourquoi nous avons conçu une plateforme intelligente qui connecte les consultants professionnels, les outils avancés et les utilisateurs.',
      thisTime: 'Ce temps, ce lieu',
      thisTimeText: 'Aujourd\'hui, Boomlex est disponible partout en Iran. De Téhéran aux petites villes, des milliers de consultants et d\'utilisateurs utilisent nos fonctionnalités quotidiennement. Nous construisons un avenir où les transactions immobilières se font avec intelligence, rapidité et confiance.',
      aboutText: 'Boomlex est une application virtuelle leader dans les services immobiliers à travers l\'Iran. Nous nous efforçons de transformer les transactions immobilières dans notre pays en fournissant une plateforme adaptée et en ajoutant de nouveaux services à notre plateforme chaque jour.',
      historyHeader: 'Comment Boomlex a été créé',
      historyText: 'Boomlex a été conçu et mis en œuvre par Arsh Peymani en 2026. Dès le début, Boomlex a connu une croissance significative ; les premières transactions immobilières ont eu lieu sur Boomlex, et plus de 500 consultants immobiliers professionnels ont commencé à travailler avec Boomlex. L\'application Boomlex a été officiellement lancée sur les marchés avec de nombreuses fonctionnalités telles que des visites virtuelles, un système intégré de consultants, une carte interactive puissante, de la publicité exclusive pour les consultants et d\'autres fonctionnalités développées.',
      teamNames: 'Arsh Peymani',
      footerText: 'Version 12.0.0 - Tous droits réservés © 2026'
    },
    chinese: {
      headerAbout: 'Boomlex，伊朗房地产的繁荣',
      ourStory: '我们的故事',
      ourStoryText: 'Boomlex 的成立目标是实现伊朗房地产市场的智能转型。我们相信，找到房子、办公室或任何房产都应该简单、透明且可靠。因此，我们设计了一个智能平台，将专业顾问、先进工具和用户连接在一起。',
      thisTime: '此时此刻',
      thisTimeText: '如今，Boomlex 已在伊朗各地上线。从德黑兰到小城镇，成千上万的顾问和用户每天都在使用我们的功能。我们正在构建一个以智能、速度和信任进行房地产交易的未来。',
      aboutText: 'Boomlex 是伊朗领先的虚拟房地产服务应用程序。我们致力于通过提供合适的平台并每天向我们的平台添加新服务来改变我们国家的房地产交易。',
      historyHeader: 'Boomlex 的形成方式',
      historyText: 'Boomlex 由 Arsh Peymani 于 2026 年构思并实施。从一开始，Boomlex 就经历了显著增长；第一批房地产交易在 Boomlex 上完成，超过 500 名专业房地产顾问开始与 Boomlex 合作。Boomlex 应用程序正式发布，具有许多功能，如虚拟看房、集成顾问系统、强大的交互式地图、顾问专属广告以及其他开发的功能。',
      teamNames: 'Arsh Peymani',
      footerText: '版本 12.0.0 - 版权所有 © 2026'
    }
  };

  const t = translations[language];

  const getTextAlignment = () => {
    if (language === 'english' || language === 'french') {
      return 'left';
    }
    return 'right';
  };

  const getDirection = () => {
    if (language === 'english' || language === 'french') {
      return 'ltr';
    }
    return 'rtl';
  };

  return (
    <div style={styles.container}>
      <div style={styles.contentContainer}>
        
        {/* هدر با لوگو و انتخابگر زبان */}
        <div style={styles.headerSection}>
          <div style={styles.logoLanguageRow}>
            <div style={styles.logoContainer}>
              <img
                src="/logo/boomlex.png"
                alt="Boomlex Logo"
                style={styles.mainLogo}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjQTkyQjIxIiByeD0iOCIvPgo8dGV4dCB4PSI0MCIgeT0iNDUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxMiIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkJvb21sZXg8L3RleHQ+Cjwvc3ZnPgo=";
                }}
              />
              <div style={styles.logoText}>
                <span style={styles.logoTitle}>Boomlex</span>
                <span style={styles.logoSubtitle}>Real Estate</span>
              </div>
            </div>
            
            <div style={styles.languageContainer}>
              <div style={styles.languageContentContainer}>
                {Object.keys(translations).map((lang) => (
                  <button 
                    key={lang}
                    style={{
                      ...styles.languageButton, 
                      ...(language === lang ? styles.activeLanguage : {})
                    }}
                    onClick={() => setLanguage(lang)}
                  >
                    <span style={styles.languageText}>
                      {lang === 'persian' ? 'فارسی' : 
                       lang === 'english' ? 'English' : 
                       lang === 'arabic' ? 'العربية' : 
                       lang === 'french' ? 'Français' : '中文'}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* بخش درباره ما */}
        <div style={styles.section}>
          <h1 style={{...styles.headerAbout, direction: getDirection(), textAlign: getTextAlignment()}}>
            {t.headerAbout}
          </h1>
          <div style={styles.textContainer}>
            <p style={{...styles.aboutText, direction: getDirection(), textAlign: getTextAlignment()}}>
              {t.aboutText}
            </p>
          </div>
        </div>

        {/* بخش داستان ما */}
        <div style={styles.section}>
          <h2 style={{...styles.historyHeader, direction: getDirection(), textAlign: getTextAlignment()}}>
            {t.ourStory}
          </h2>
          <div style={styles.textContainer}>
            <p style={{...styles.historyText, direction: getDirection(), textAlign: getTextAlignment()}}>
              {t.ourStoryText}
            </p>
          </div>
        </div>

        {/* بخش این زمان، این مکان */}
        <div style={styles.section}>
          <h2 style={{...styles.historyHeader, direction: getDirection(), textAlign: getTextAlignment()}}>
            {t.thisTime}
          </h2>
          <div style={styles.textContainer}>
            <p style={{...styles.historyText, direction: getDirection(), textAlign: getTextAlignment()}}>
              {t.thisTimeText}
            </p>
          </div>
        </div>

        {/* بخش تاریخچه */}
        <div style={styles.section}>
          <h2 style={{...styles.historyHeader, direction: getDirection(), textAlign: getTextAlignment()}}>
            {t.historyHeader}
          </h2>
          <div style={styles.textContainer}>
            <p style={{...styles.historyText, direction: getDirection(), textAlign: getTextAlignment()}}>
              {t.historyText}
            </p>
          </div>
        </div>

        {/* بخش بنیان‌گذار */}
        <div style={styles.section}>
          <div style={styles.partnersContainer}>
            <p style={{...styles.teamNames, direction: getDirection(), textAlign: getTextAlignment()}}>
              {t.teamNames}
            </p>
          </div>
        </div>

        {/* فوتر */}
        <div style={styles.footer}>
          <div style={styles.footerContent}>
            <div style={styles.footerLogoContainer}>
              <img
                src="/logo/boomlex.png"
                alt="Boomlex Logo"
                style={styles.footerLogo}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBmaWxsPSIjQTkyQjIxIiByeD0iNiIvPgo8dGV4dCB4PSIzMCIgeT0iMzUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxMCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkJvb21sZXg8L3RleHQ+Cjwvc3ZnPgo=";
                }}
              />
            </div>
            <p style={{...styles.footerText, direction: getDirection(), textAlign: getTextAlignment()}}>
              {t.footerText}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#f8f9fa',
    minHeight: '100vh',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    padding: '0',
  },
  contentContainer: {
    padding: '28px 24px',
    maxWidth: '1000px',
    margin: '0 auto',
  },
  headerSection: {
    marginBottom: '36px',
  },
  logoLanguageRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: '20px',
    marginBottom: '8px',
    flexWrap: 'wrap',
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '18px',
    flexShrink: 0,
  },
  mainLogo: {
    width: '70px',
    height: '70px',
    objectFit: 'contain',
    borderRadius: '10px',
    boxShadow: '0 3px 10px rgba(0,0,0,0.12)',
  },
  logoText: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  logoTitle: {
    fontSize: '30px',
    fontWeight: 'bold',
    color: '#a92b21',
    fontFamily: "'Avenir', 'Tahoma', sans-serif",
    lineHeight: '1.2',
  },
  logoSubtitle: {
    fontSize: '17px',
    color: '#6c757d',
    fontWeight: '500',
  },
  languageContainer: {
    flex: '1',
    minWidth: '220px',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  languageContentContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    justifyContent: 'flex-end',
  },
  languageButton: {
    padding: '10px 18px',
    borderRadius: '20px',
    backgroundColor: '#e9ecef',
    border: 'none',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    fontFamily: 'inherit',
    transition: 'all 0.2s ease',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    fontSize: '16px',
  },
  activeLanguage: {
    backgroundColor: '#a92b21',
    color: 'white',
    boxShadow: '0 3px 8px rgba(169, 43, 33, 0.4)',
  },
  languageText: {
    fontSize: '16px',
    fontWeight: '500',
  },
  section: {
    marginBottom: '36px',
  },
  headerAbout: {
    fontSize: '30px',
    color: '#2c3e50',
    marginBottom: '20px',
    fontWeight: '700',
    lineHeight: '1.4',
  },
  historyHeader: {
    fontSize: '26px',
    color: '#2c3e50',
    marginBottom: '20px',
    fontWeight: '600',
  },
  textContainer: {
    backgroundColor: 'white',
    padding: '28px',
    borderRadius: '12px',
    boxShadow: '0 3px 12px rgba(0,0,0,0.08)',
    border: '1px solid #f1f3f4',
  },
  aboutText: {
    fontSize: '18px',
    color: '#555',
    lineHeight: '1.8',
    margin: 0,
    fontWeight: '400',
  },
  historyText: {
    fontSize: '18px',
    color: '#555',
    lineHeight: '1.8',
    margin: 0,
    fontWeight: '400',
  },
  partnersContainer: {
    backgroundColor: 'white',
    padding: '28px',
    borderRadius: '12px',
    boxShadow: '0 3px 12px rgba(0,0,0,0.08)',
    border: '1px solid #f1f3f4',
  },
  teamNames: {
    fontSize: '20px',
    color: '#2c3e50',
    lineHeight: '1.6',
    margin: 0,
    fontWeight: '600',
  },
  footer: {
    marginTop: '36px',
    paddingTop: '24px',
    borderTop: '1px solid #e9ecef',
  },
  footerContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '18px',
    flexWrap: 'wrap',
  },
  footerLogoContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  footerLogo: {
    width: '50px',
    height: '50px',
    objectFit: 'contain',
  },
  footerText: {
    fontSize: '16px',
    color: '#6c757d',
    margin: 0,
    fontWeight: '500',
  },
};

export default About;