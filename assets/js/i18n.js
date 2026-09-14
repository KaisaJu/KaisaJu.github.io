/**
 * i18n.js —— 一键中英文切换
 * 用法：
 *   1. 在需要翻译的元素上加 data-i18n="key"
 *   2. 字典在下方 I18N_DICT 中维护
 *   3. 导航栏放一个 <div class="lang-toggle" id="lang-toggle"><span data-lang="en">EN</span><span data-lang="zh">中文</span></div>
 * 语言偏好保存在 localStorage("site-lang")。
 */
(function () {
  'use strict';

  var I18N_DICT = {
    en: {
      'nav.home': 'Home',
      'nav.publications': 'Publications',
      'nav.talks': 'Talks',
      'nav.cv': 'CV',

      'sidebar.location': 'Nanjing, China',
      'sidebar.affiliation': 'Nanjing University',
      'sidebar.email': 'Email',
      'sidebar.orcid': 'ORCID',
      'sidebar.github': 'GitHub',
      'sidebar.name': 'Kaisa Julihati',
      'sidebar.role': 'PhD Student',

      'home.title': 'Biography',
      'home.bio': 'Kaisa Julihati is currently a PhD student in <strong>Journalism and Communication</strong> at Nanjing University. His research interests focus on <strong>health communication</strong> and <strong>accessibility communication</strong>, particularly the visibility, information accessibility, and identity construction of patients and people with disabilities on digital platforms. His interdisciplinary background allows him to explore communication issues through both theoretical perspectives and empirical research methods.',
      'home.interests': 'Research Interests',
      'interest.health': 'Health Communication',
      'interest.accessibility': 'Accessibility Communication',
      'interest.info': 'Information Accessibility',
      'interest.identity': 'Identity Construction',
      'home.education': 'Education',
      'edu.phd': 'PhD Student in Journalism and Communication',
      'edu.phd.year': '2026 – Present',
      'edu.phd.school': 'Nanjing University',
      'edu.ma': 'MA in Journalism and Communication, 2026',
      'edu.ma.year': '2023 – 2026',
      'edu.ma.school': 'Central China Normal University',
      'edu.beng': 'BEng in Industrial Engineering, 2022',
      'edu.beng.year': '2018 – 2022',
      'edu.beng.school': 'Shanghai Maritime University',

      'pubs.title': 'Publications',
      'pubs.subtitle': 'Selected writings on health communication and illness narratives.',
      'pubs.journal': 'Journal Articles',
      'pubs.thesis': "Master's Thesis",
      'pubs.download': 'Download Paper',
      'pubs.metrics': 'IF 2.0 · Cited 3 times',
      'pubs.firstAuthor': 'First Author',
      'pubs.venue.journal': '<i>Frontiers in Communication</i>, 2025',
      'pubs.venue.thesis': '<i>Central China Normal University</i>, 2026',
      'pubs.thesis.title': 'Illness Narratives in the Platformized Context: Motivations, Shaping Forces, and the Ecological Landscape of Cancer Narratives on Douyin (in Chinese)',
      'pubs.excerpt.journal': "A study of communication characteristics in cancer patients' illness narratives on Chinese TikTok.",
      'pubs.excerpt.thesis': 'This thesis examines cancer illness narratives on Douyin through a quantitative content analysis of 553 videos and semi-structured interviews with 16 cancer patients and family members.',

      'talks.title': 'Talks and presentations',
      'talks.subtitle': 'Conference presentations and academic talks.',
      'talks.meta': 'Oral Presentation &middot; Yuan Lun Dao Academic Conference, Xiamen University, China',
      'talks.desc': 'Oral presentation at the Yuan Lun Dao (Meta-Discourse) Academic Conference, Xiamen University, June 2025.',
      'talks.day': '01',
      'talks.month': 'June 2025',

      'cv.title': 'CV',
      'cv.subtitle': 'Curriculum Vitae — education, research, publications and talks.',
      'cv.education': 'Education',
      'cv.interests': 'Research Interests',
      'cv.publications': 'Publications',
      'cv.book': 'Book Contribution',
      'cv.talks': 'Talks',
      'cv.edu.phd': 'Ph.D. in Journalism and Communication, Nanjing University, 2026–present',
      'cv.edu.ma': 'M.A. in Journalism and Communication, Central China Normal University, 2023–2026',
      'cv.edu.beng': 'B.Eng. in Industrial Engineering, Shanghai Maritime University, 2018–2022',
      'cv.book.text': 'Contributor to <em>Introduction to Media and Cultural Studies</em> (forthcoming), published by Central China Normal University Press. Drafted initial manuscripts for three chapters under faculty supervision.',
      'home.viewAllPubs': 'View all publications →',
      'home.viewAllTalks': 'View all talks →',
      'home.viewCv': 'View full CV →'
    },

    zh: {
      'nav.home': '首页',
      'nav.publications': '论文',
      'nav.talks': '报告',
      'nav.cv': '简历',

      'sidebar.location': '中国南京',
      'sidebar.affiliation': '南京大学',
      'sidebar.email': '邮箱',
      'sidebar.orcid': 'ORCID',
      'sidebar.github': 'GitHub',
      'sidebar.name': '凯撒·举力哈提',
      'sidebar.role': '博士研究生',

      'home.title': '个人简介',
      'home.bio': '凯撒·举力哈提现为南京大学新闻传播学博士研究生。他的研究方向聚焦于<strong>健康传播</strong>与<strong>无障碍传播</strong>，尤其关注患者与残障群体在数字平台上的可见性、信息可及性与身份建构。跨学科背景使他能够兼顾理论视角与实证研究方法，深入探讨传播议题。',
      'home.interests': '研究兴趣',
      'interest.health': '健康传播',
      'interest.accessibility': '无障碍传播',
      'interest.info': '信息可及性',
      'interest.identity': '身份建构',
      'home.education': '教育背景',
      'edu.phd': '新闻传播学博士在读',
      'edu.phd.year': '2026 – 至今',
      'edu.phd.school': '南京大学',
      'edu.ma': '新闻传播学硕士，2026',
      'edu.ma.year': '2023 – 2026',
      'edu.ma.school': '华中师范大学',
      'edu.beng': '工业工程学士，2022',
      'edu.beng.year': '2018 – 2022',
      'edu.beng.school': '上海海事大学',

      'pubs.title': '论文',
      'pubs.subtitle': '健康传播与疾病叙事方向的代表性成果。',
      'pubs.journal': '期刊论文',
      'pubs.thesis': '硕士学位论文',
      'pubs.download': '下载论文',
      'pubs.metrics': '影响因子 2.0 · 被引 3 次',
      'pubs.firstAuthor': '一作',
      'pubs.venue.journal': '《<i>Frontiers in Communication</i>》，2025',
      'pubs.venue.thesis': '华中师范大学，2026',
      'pubs.thesis.title': '平台化语境下的疾痛叙事：抖音癌症叙事的动机、形塑与生态图景',
      'pubs.excerpt.journal': '本研究考察了中国癌症患者在抖音（TikTok）上疾病叙事的传播特征。',
      'pubs.excerpt.thesis': '本文以 553 条抖音视频的量化内容分析和 16 位癌症患者及家属的半结构化访谈为基础，考察平台化语境下癌症疾病叙事的动机、形塑力量与生态图景。',

      'talks.title': '演讲与报告',
      'talks.subtitle': '学术会议报告与公开演讲。',
      'talks.meta': '口头报告 · 元论道学术会议，厦门大学',
      'talks.desc': '2025 年 6 月于厦门大学元论道学术会议作口头报告。',
      'talks.day': '01',
      'talks.month': '2025 年 6 月',

      'cv.title': '简历',
      'cv.subtitle': '教育背景、研究方向、论文发表与学术报告。',
      'cv.education': '教育背景',
      'cv.interests': '研究兴趣',
      'cv.publications': '论文发表',
      'cv.book': '著作贡献',
      'cv.talks': '学术报告',
      'cv.edu.phd': '新闻传播学博士，南京大学，2026 – 至今',
      'cv.edu.ma': '新闻传播学硕士，华中师范大学，2023 – 2026',
      'cv.edu.beng': '工业工程学士，上海海事大学，2018 – 2022',
      'cv.book.text': '参编《媒介与文化研究导论》（即出），由华中师范大学出版社出版。在导师指导下执笔三个章节的初稿。',
      'home.viewAllPubs': '查看全部论文 →',
      'home.viewAllTalks': '查看全部报告 →',
      'home.viewCv': '查看完整简历 →'
    }
  };

  var STORAGE_KEY = 'site-lang';
  var currentLang = 'en';

  function applyLang(lang) {
    currentLang = lang;
    document.documentElement.setAttribute('lang', lang === 'zh' ? 'zh-CN' : 'en');

    var nodes = document.querySelectorAll('[data-i18n]');
    for (var i = 0; i < nodes.length; i++) {
      var key = nodes[i].getAttribute('data-i18n');
      if (I18N_DICT[lang] && I18N_DICT[lang][key] !== undefined) {
        nodes[i].innerHTML = I18N_DICT[lang][key];
      }
    }

    // 语言切换按钮状态
    var toggles = document.querySelectorAll('#lang-toggle span');
    for (var j = 0; j < toggles.length; j++) {
      if (toggles[j].getAttribute('data-lang') === lang) {
        toggles[j].classList.add('active');
      } else {
        toggles[j].classList.remove('active');
      }
    }

    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* ignore */ }
  }

  document.addEventListener('DOMContentLoaded', function () {
    var saved = 'en';
    try { saved = localStorage.getItem(STORAGE_KEY) || 'en'; } catch (e) { /* ignore */ }

    // 也可跟随浏览器语言
    if (!localStorage.getItem(STORAGE_KEY)) {
      var browserLang = (navigator.language || '').toLowerCase();
      if (browserLang.indexOf('zh') === 0) saved = 'zh';
    }

    applyLang(saved);

    var toggle = document.getElementById('lang-toggle');
    if (toggle) {
      toggle.addEventListener('click', function (e) {
        var target = e.target.closest ? e.target.closest('span[data-lang]') : null;
        if (target) {
          applyLang(target.getAttribute('data-lang'));
        }
      });
    }
  });
})();
