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
      'nav.guide': 'Update Guide',

      'sidebar.location': 'Nanjing, China',
      'sidebar.affiliation': 'Nanjing University',
      'sidebar.email': 'Email',
      'sidebar.orcid': 'ORCID',
      'sidebar.github': 'GitHub',
      'sidebar.name': 'Kaisa Julihati',
      'sidebar.role': 'PhD Student',

      'home.title': 'Biography',
      'home.bio': 'Kaisa Julihati is currently a PhD student in <strong>Journalism and Communication</strong> at Nanjing University. His research interests focus on <strong>health communication</strong> and <strong>accessibility communication</strong>, particularly the visibility, information accessibility, and identity construction of patients and people with disabilities on digital platforms.',
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
      'pubs.masterBadge': "Master's Thesis",
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
      'home.viewCv': 'View full CV →',

      'guide.title': 'How to Update This Site',
      'guide.subtitle': 'A short guide for maintaining and publishing content on this website.',
      'guide.how.title': 'How This Site Works',
      'guide.how.p1': 'This website is hosted on <a href="https://pages.github.com/">GitHub Pages</a> and served from the repository <a href="https://github.com/KaisaJu/KaisaJu.github.io">KaisaJu/KaisaJu.github.io</a> (branch <code>master</code>). There is no Jekyll or other build step &mdash; a file named <code>.nojekyll</code> in the repository root turns that off &mdash; so every committed change goes live automatically in about one minute.',
      'guide.f1': '<code>index.html</code> &mdash; the home page (biography, education, research interests)',
      'guide.f2': '<code>publications/index.html</code> &mdash; the publications page',
      'guide.f3': '<code>talks/index.html</code> &mdash; the talks page',
      'guide.f4': '<code>cv/index.html</code> &mdash; the CV page',
      'guide.f5': '<code>assets/js/i18n.js</code> &mdash; all bilingual (Chinese / English) text',
      'guide.f6': '<code>images/</code> &mdash; profile photo and banner image',
      'guide.f7': '<code>assets/css/new-style.css</code> &mdash; colors, fonts and layout',
      'guide.browser.title': 'Option 1: Edit Directly in the Browser',
      'guide.browser.p1': 'Open the <a href="https://github.com/KaisaJu/KaisaJu.github.io">repository on GitHub</a>, click the file you want to change, press the pencil icon (&ldquo;Edit&rdquo;), modify the text, then click &ldquo;Commit changes&rdquo;. GitHub Pages rebuilds the site automatically &mdash; no extra software needed.',
      'guide.cli.title': 'Option 2: Edit Locally with Git',
      'guide.cli.p1': 'Clone the repository to your computer, edit the files, then push:',
      'guide.cli.comment': '## edit files here, then:',
      'guide.bilingual.title': 'Updating Bilingual Text',
      'guide.bilingual.p1': 'Most of the visible text is bilingual. On the page it appears as attributes like <code>data-i18n="home.bio"</code>; the actual Chinese and English strings live in <code>assets/js/i18n.js</code>, inside the <code>I18N_DICT</code> object (two blocks: <code>en</code> and <code>zh</code>). When changing any text, update <strong>both</strong> the <code>en</code> and <code>zh</code> entries, otherwise the language toggle on the top right will fall back to the old text.',
      'guide.addpub.title': 'Adding a Publication or a Talk',
      'guide.addpub.p1': 'Open <code>publications/index.html</code>, copy an existing <code>&lt;article class="pub-card"&gt;</code> block, paste it below, and fill in the new title, venue and badges. Adding a talk works the same way in <code>talks/index.html</code> (copy a <code>talk-card</code> block). If the new entry needs its own bilingual text, add matching keys to both the <code>en</code> and <code>zh</code> blocks of <code>assets/js/i18n.js</code>, and reference them with <code>data-i18n="..."</code>.',
      'guide.images.title': 'Replacing the Photo or the Banner',
      'guide.images.p1': 'Replace <code>images/profile.JPG</code> (portrait photo) or <code>images/banner.png</code> (decorative divider) with a new file of the same name, or upload a new file and update the corresponding <code>&lt;img src="..."&gt;</code> references.',
      'guide.undo.title': 'If Something Goes Wrong',
      'guide.undo.p1': 'Every change is stored as a commit, so nothing is ever lost. On the repository page, open &ldquo;Commits&rdquo;, find the last good version, click &ldquo;&hellip;&rdquo; and choose &ldquo;Revert&rdquo; &mdash; the website rolls back automatically after the next build.'
    },

    zh: {
      'nav.home': '首页',
      'nav.publications': '论文',
      'nav.talks': '报告',
      'nav.cv': '简历',
      'nav.guide': '更新指南',

      'sidebar.location': '中国南京',
      'sidebar.affiliation': '南京大学',
      'sidebar.email': '邮箱',
      'sidebar.orcid': 'ORCID',
      'sidebar.github': 'GitHub',
      'sidebar.name': '凯撒·举力哈提',
      'sidebar.role': '博士研究生',

      'home.title': '个人简介',
      'home.bio': '凯撒·举力哈提现为南京大学新闻传播学博士研究生。他的研究方向聚焦于<strong>健康传播</strong>与<strong>无障碍传播</strong>，尤其关注患者与残障群体在数字平台上的可见性、信息可及性与身份建构。',
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
      'pubs.masterBadge': '硕士论文',
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
      'home.viewCv': '查看完整简历 →',

      'guide.title': '如何更新本站',
      'guide.subtitle': '一份简短的网站维护与内容发布指南。',
      'guide.how.title': '网站的运行方式',
      'guide.how.p1': '本站托管在 <a href="https://pages.github.com/">GitHub Pages</a> 上，内容来自仓库 <a href="https://github.com/KaisaJu/KaisaJu.github.io">KaisaJu/KaisaJu.github.io</a>（<code>master</code> 分支）。仓库根目录下的 <code>.nojekyll</code> 文件关闭了 Jekyll 构建，因此没有额外的编译环节——每一次提交（commit）都会在约一分钟内自动上线。',
      'guide.f1': '<code>index.html</code> —— 首页（个人简介、教育背景、研究兴趣）',
      'guide.f2': '<code>publications/index.html</code> —— 论文页',
      'guide.f3': '<code>talks/index.html</code> —— 报告页',
      'guide.f4': '<code>cv/index.html</code> —— 简历页',
      'guide.f5': '<code>assets/js/i18n.js</code> —— 全部中英双语文案',
      'guide.f6': '<code>images/</code> —— 头像照片与分隔图',
      'guide.f7': '<code>assets/css/new-style.css</code> —— 配色、字体与布局',
      'guide.browser.title': '方式一：直接在浏览器里改',
      'guide.browser.p1': '打开 <a href="https://github.com/KaisaJu/KaisaJu.github.io">GitHub 上的仓库</a>，点进要修改的文件，点击铅笔图标（&ldquo;Edit&rdquo;）修改文字，然后点击 &ldquo;Commit changes&rdquo; 提交。GitHub Pages 会自动重新发布——无需安装任何软件。',
      'guide.cli.title': '方式二：在本地用 Git 修改',
      'guide.cli.p1': '把仓库克隆到本地电脑，改完文件后推送：',
      'guide.cli.comment': '## 在这里编辑文件，然后：',
      'guide.bilingual.title': '修改中英双语文案',
      'guide.bilingual.p1': '网站上大部分文字是双语的。页面里它们以 <code>data-i18n="home.bio"</code> 这样的属性出现；真正的中文和英文内容存放在 <code>assets/js/i18n.js</code> 的 <code>I18N_DICT</code> 对象中（分 <code>en</code> 和 <code>zh</code> 两套）。修改任何文案时，<strong>两套都要同步改</strong>，否则右上角的语言切换会退回旧文案。',
      'guide.addpub.title': '新增一篇论文或一个报告',
      'guide.addpub.p1': '打开 <code>publications/index.html</code>，复制一个现成的 <code>&lt;article class="pub-card"&gt;</code> 区块，粘贴到下方，填入新的标题、出处和徽章。新增报告同理，在 <code>talks/index.html</code> 里复制一个 <code>talk-card</code> 区块。如果新条目需要自己的双语文案，就在 <code>assets/js/i18n.js</code> 的 <code>en</code>、<code>zh</code> 两套里各加一个同名 key，并在页面里用 <code>data-i18n="..."</code> 引用它。',
      'guide.images.title': '更换头像或分隔图',
      'guide.images.p1': '用同名新文件替换 <code>images/profile.JPG</code>（头像照片）或 <code>images/banner.png</code>（装饰性分隔图）；也可以上传新文件后，同步修改页面里对应的 <code>&lt;img src="..."&gt;</code> 引用。',
      'guide.undo.title': '改错了怎么办',
      'guide.undo.p1': '每一次修改都是一个提交（commit），任何内容都不会丢失。在仓库页面打开 &ldquo;Commits&rdquo;，找到上一个正常版本，点 &ldquo;&hellip;&rdquo; 选择 &ldquo;Revert&rdquo;，网站会在下一次构建后自动回滚。'
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
