(function () {
  'use strict';
  var profile = null, events = [], state = 'loading';
  var status = document.getElementById('activity-status');
  var list = document.getElementById('activity-list');
  if (!status || !list) return;
  function el(tag, text) { var node = document.createElement(tag); node.textContent = text; return node; }
  function render() {
    var zh = document.documentElement.lang.indexOf('zh') === 0;
    document.getElementById('activity-title').textContent = zh ? '开源动态' : 'Open-source Activity';
    document.getElementById('activity-more').textContent = zh ? '查看 GitHub →' : 'View GitHub →';
    status.textContent = state === 'loading' ? (zh ? '正在同步…' : 'Loading…') : state === 'error' ? (zh ? '暂时无法同步，请前往 GitHub 查看' : 'Unavailable — view activity on GitHub') : events.length ? (zh ? '已同步公开动态' : 'Public activity synced') : (zh ? '暂无近期公开动态' : 'No recent public activity');
    var stats = document.getElementById('activity-stats');
    stats.replaceChildren(); list.replaceChildren();
    if (profile) {
      [[profile.public_repos, zh ? '个仓库' : 'repositories'], [profile.followers, zh ? '位关注者' : 'followers']].forEach(function (item) {
        var span = el('span', ''); span.append(el('strong', item[0]), document.createTextNode(item[1])); stats.append(span);
      });
    }
    events.forEach(function (event) {
      var p = event.payload || {}, name = event.repo.name, repo = 'https://github.com/' + name.split('/').map(encodeURIComponent).join('/');
      var title = zh ? '更新了仓库' : 'Updated repository', url = repo;
      if (event.type === 'PushEvent') { title = (zh ? '推送到 ' : 'Pushed to ') + (p.ref ? p.ref.replace('refs/heads/', '') : (zh ? '仓库' : 'repository')); url += '/commits'; }
      if (event.type === 'CreateEvent') title = (zh ? '创建了' : 'Created ') + ({repository: zh ? '仓库' : 'repository', branch: zh ? '分支' : 'branch', tag: zh ? '标签' : 'tag'}[p.ref_type] || (zh ? '项目' : 'project')) + (p.ref ? ' · ' + p.ref : '');
      if (event.type === 'PullRequestEvent') title = zh ? '更新了合并请求' : 'Updated pull request';
      if (event.type === 'IssuesEvent') title = zh ? '更新了议题' : 'Updated issue';
      if (event.type === 'ReleaseEvent') title = zh ? '发布了新版本' : 'Published a release';
      var row = el('div', ''); row.className = 'activity-row';
      var link = el('a', title); link.href = url;
      var date = new Date(event.created_at), time = el('time', date.toLocaleDateString(zh ? 'zh-CN' : 'en-GB', {month:'short', day:'numeric', year:'numeric'}));
      time.dateTime = date.toISOString(); row.append(link, el('small', name), time); list.append(row);
    });
  }
  new MutationObserver(render).observe(document.documentElement, {attributes: true, attributeFilter: ['lang']});
  render();
  var controller = new AbortController(), timeout = setTimeout(function () { controller.abort(); }, 10000);
  Promise.all(['https://api.github.com/users/KaisaJu', 'https://api.github.com/users/KaisaJu/events/public?per_page=30'].map(function (url) {
    return fetch(url, {signal: controller.signal}).then(function (response) { if (!response.ok) throw new Error('GitHub unavailable'); return response.json(); });
  })).then(function (data) {
    if (!Array.isArray(data[1])) throw new Error('Invalid events');
    profile = data[0];
    events = data[1].filter(function (e) { return ['PushEvent','CreateEvent','PullRequestEvent','IssuesEvent','ReleaseEvent'].includes(e.type) && e.repo && e.repo.name && Number.isFinite(Date.parse(e.created_at)); }).sort(function (a,b) { return Date.parse(b.created_at) - Date.parse(a.created_at); }).slice(0, 3);
    state = 'ready';
  }).catch(function () { state = 'error'; }).finally(function () { clearTimeout(timeout); render(); });
})();
