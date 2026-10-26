const app = document.querySelector('#app');

const routes = {
  landing: renderLanding,
  signin: () => renderAuth('signin'),
  signup: () => renderAuth('signup'),
  empty: renderEmptyDashboard,
  providers: renderProviderSelection,
  authorize: renderAuthorize,
  dashboard: renderDashboard,
  files: renderFiles,
  folder: renderFolder,
  search: renderSearchResults,
  details: renderFileDetails,
  manage: renderProviderManagement,
  error: renderConnectionError,
  loading: renderLoading,
  noresults: renderNoResults,
};

function navigate(route) {
  window.location.hash = route;
}

function currentRoute() {
  return window.location.hash.replace('#', '') || 'landing';
}

function render() {
  const route = currentRoute();
  const renderer = routes[route] || renderLanding;
  app.innerHTML = renderer();
  bindActions();
}

function bindActions() {
  document.querySelectorAll('[data-route]').forEach((element) => {
    element.addEventListener('click', (event) => {
      event.preventDefault();
      navigate(element.dataset.route);
    });
  });

  const searchInput = document.querySelector('[data-search-input]');
  if (searchInput) {
    searchInput.addEventListener('keydown', (event) => {
      if (event.key !== 'Enter') return;
      navigate(searchInput.value.trim() ? 'search' : 'noresults');
    });
  }
}

function button(label, route, type = 'primary') {
  return `<a class="btn btn-${type}" href="#${route}" data-route="${route}">${label}</a>`;
}

function tag(label, style = '') {
  return `<span class="tag ${style}">${label}</span>`;
}

function brand() {
  return `
    <a class="brand" href="#landing" data-route="landing">
      <span class="brand-mark">C</span>
      <span>CRiB</span>
    </a>
  `;
}

function appShell(active, title, subtitle, body, actions = '', searchValue = 'Search files, folders and providers') {
  const nav = ['Dashboard', 'Files', 'Providers', 'Account'];
  const routeMap = {
    Dashboard: 'dashboard',
    Files: 'files',
    Providers: 'manage',
    Account: 'manage',
  };

  return `
    <div class="screen app-shell">
      <aside class="sidebar">
        ${brand()}
        <nav class="sidebar-nav">
          ${nav.map((item) => `
            <a class="nav-item ${item === active ? 'active' : ''}" href="#${routeMap[item]}" data-route="${routeMap[item]}">
              ${item}
            </a>
          `).join('')}
        </nav>

        <div class="profile">
          <div class="profile-avatar">U</div>
          <div class="profile-copy">
            <strong>User</strong>
            <span>user@example.com</span>
          </div>
        </div>
      </aside>

      <main class="app-main">
        <header class="topbar">
          <div class="search-box">${searchValue}</div>
          <div class="topbar-spacer"></div>
          ${tag('Prototype', 'success')}
          ${button('Account', 'manage', 'light')}
        </header>

        <section class="content">
          <div class="page-head">
            <div>
              <div class="eyebrow">${active}</div>
              <h1>${title}</h1>
              <p>${subtitle}</p>
            </div>
            <div>${actions}</div>
          </div>
          ${body}
        </section>
      </main>
    </div>
  `;
}

function renderLanding() {
  return `
    <div class="screen">
      <header class="landing-nav">
        ${brand()}
        <div class="landing-links">
          <span>How it works</span>
          <span>Providers</span>
          <span>Security</span>
        </div>
        <div class="landing-actions">
          ${button('Sign in', 'signin', 'light')}
          ${button('Create account', 'signup')}
        </div>
      </header>

      <section class="landing-main">
        <div class="hero-copy">
          ${tag('Cloud Resource Integration Bridge', 'violet')}
          <h1>Your clouds.<br><span class="accent-word">One place.</span></h1>
          <p>
            Connect supported cloud storage and browse your files from one clean dashboard without giving CRiB your provider password.
          </p>

          <div class="hero-actions">
            ${button('Start with CRiB', 'signup')}
            ${button('I already have an account', 'signin', 'light')}
          </div>

          <div class="provider-tags">
            ${tag('Google Drive')}
            ${tag('OneDrive')}
            ${tag('Dropbox')}
          </div>
        </div>

        <div class="hero-preview">
          <div class="preview-window">
            <div class="preview-top">
              <strong>Dashboard</strong>
              ${tag('Google Drive connected', 'success')}
            </div>
            <div class="preview-columns">
              <div class="preview-side">
                <div></div><div></div><div></div><div></div>
              </div>
              <div class="preview-list">
                <div class="provider-tags" style="margin:0 0 2px">
                  ${tag('Files', 'violet')}
                  ${tag('Recent')}
                </div>
                <div class="preview-row"></div>
                <div class="preview-row"></div>
                <div class="preview-row"></div>
                <div class="preview-row"></div>
                <div class="preview-row"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  `;
}

function renderAuth(mode) {
  const signup = mode === 'signup';

  return `
    <div class="screen auth-layout">
      <section class="auth-left">
        ${brand()}
        <form class="auth-form" onsubmit="return false;">
          <div class="eyebrow">${signup ? 'Create your workspace' : 'Welcome back'}</div>
          <h1>${signup ? 'Create a CRiB account' : 'Sign in to CRiB'}</h1>
          <p>${signup ? 'Keep provider connections separate and user-specific.' : 'Continue to your connected cloud workspace.'}</p>

          ${signup ? `
            <div class="field">
              <label>Name</label>
              <input type="text" value="User">
            </div>
          ` : ''}

          <div class="field">
            <label>Email</label>
            <input type="email" value="user@example.com">
          </div>

          <div class="field">
            <label>Password</label>
            <input type="password" value="prototype123">
          </div>

          ${signup ? '' : `
            <div class="form-meta">
              <span>Remember me</span>
              <span class="linkish">Forgot password?</span>
            </div>
          `}

          <a class="btn btn-primary form-submit" href="#empty" data-route="empty">
            ${signup ? 'Create account' : 'Sign in'}
          </a>

          <div class="form-footer">
            ${signup
              ? `Already registered? <a class="linkish" href="#signin" data-route="signin">Sign in</a>`
              : `New to CRiB? <a class="linkish" href="#signup" data-route="signup">Create account</a>`}
          </div>
        </form>
      </section>

      <aside class="auth-right">
        <div class="auth-orb violet"></div>
        <div class="auth-orb lime"></div>
        <div class="auth-content">
          ${tag('CRiB')}
          <h2>${signup ? 'Connect only<br>what you need.' : 'Less switching.<br>More finding.'}</h2>
          <p>${signup
            ? 'Controlled provider access first. Real cloud integration comes later.'
            : 'One place to connect, browse and understand resources stored across supported cloud providers.'}</p>

          <div class="feature-list">
            ${signup ? `
              <div class="feature-row"><span>Connect</span><strong>One provider first</strong></div>
              <div class="feature-row"><span>Browse</span><strong>Normalized view</strong></div>
              <div class="feature-row"><span>Disconnect</span><strong>Any time</strong></div>
            ` : `
              <div class="feature-row"><span>Provider passwords</span><strong>Never collected</strong></div>
              <div class="feature-row"><span>Prototype mode</span><strong>Mock data</strong></div>
              <div class="feature-row"><span>Access</span><strong>User scoped</strong></div>
            `}
          </div>
        </div>
      </aside>
    </div>
  `;
}

function renderEmptyDashboard() {
  const body = `
    <div class="card empty-state">
      <div class="empty-mark">+</div>
      <h2>No cloud storage connected yet.</h2>
      <p>Add a supported provider. This prototype uses example file data.</p>
      ${button('Connect cloud storage', 'providers')}
    </div>
  `;

  return appShell('Dashboard', 'Welcome, User.', 'Connect your first cloud provider to start browsing files.', body);
}

function renderProviderSelection() {
  const provider = (code, name, description, status, route = null) => `
    <article class="card provider-card">
      <div class="provider-card-top">
        <div class="provider-icon">${code}</div>
        ${tag(status, route ? 'violet' : '')}
      </div>
      <h3>${name}</h3>
      <p>${description}</p>
      ${route ? button('Connect', route) : button('Not connected', 'providers', 'light')}
    </article>
  `;

  const body = `
    <div class="provider-grid">
      ${provider('GD', 'Google Drive', 'Connect a Google Drive account and browse permitted files through CRiB.', 'Prototype choice', 'authorize')}
      ${provider('OD', 'OneDrive', 'Planned provider. Not required for the first prototype flow.', 'Later')}
      ${provider('DB', 'Dropbox', 'Planned provider. Add after the first provider works end-to-end.', 'Later')}
    </div>
    <div class="notice">Prototype note: provider connections are simulated for Assessment 1.</div>
  `;

  return appShell('Providers', 'Choose cloud storage', 'Start with one provider. More integrations can be added later.', body);
}

function renderAuthorize() {
  return `
    <div class="screen authz-wrap">
      <div class="card authz-card">
        <div class="authz-head">
          <div class="authz-title">
            <div class="provider-icon" style="width:58px;height:58px;border-radius:18px;">GD</div>
            <div>
              <div class="eyebrow">Simulated authorization</div>
              <h2 style="margin:0;">Connect Google Drive</h2>
            </div>
          </div>
          ${tag('Prototype', 'violet')}
        </div>

        <p style="margin-top:24px;">
          CRiB asks the provider for permission to read the files you choose to expose. CRiB does not ask for your Google password.
        </p>

        <div class="permission-list">
          <div class="card permission">
            <div class="check">✓</div>
            <div>
              <h4>See your connected account</h4>
              <p>Used to show which provider account is connected.</p>
            </div>
          </div>

          <div class="card permission">
            <div class="check">✓</div>
            <div>
              <h4>List permitted files and folders</h4>
              <p>Used by CRiB to build the file browser.</p>
            </div>
          </div>
        </div>

        <div class="notice">This screen simulates the provider authorization hand-off.</div>

        <div class="authz-actions">
          ${button('Cancel', 'providers', 'light')}
          ${button('Continue', 'dashboard')}
        </div>
      </div>
    </div>
  `;
}

function renderDashboard() {
  const body = `
    <div class="stats-grid">
      <div class="card stat-card">
        <div class="stat-label">Connected providers</div>
        <div class="stat-value">1</div>
        <div class="stat-foot">${tag('Healthy', 'success')}</div>
      </div>
      <div class="card stat-card">
        <div class="stat-label">Visible resources</div>
        <div class="stat-value">28</div>
        <div class="stat-foot">Mock prototype data</div>
      </div>
      <div class="card stat-card">
        <div class="stat-label">Last refresh</div>
        <div class="stat-value" style="font-size:22px;">Just now</div>
        <div class="stat-foot">Google Drive</div>
      </div>
    </div>

    <div class="provider-hero">
      <div class="provider-hero-content">
        <div class="eyebrow" style="color:#bfc0ff;">Connected provider</div>
        <h2>Google Drive is ready.</h2>
        <p>CRiB is showing prototype data in the same structure a real provider would later supply.</p>
      </div>
    </div>

    <div class="section-head">
      <h3>Recent files</h3>
      <a class="linkish" href="#files" data-route="files">View all</a>
    </div>

    ${fileTable([
      ['COMP-2002 Brief.pdf', 'PDF', 'Google Drive', 'Today, 14:12', 'PDF', false, 'details'],
      ['University', 'Folder', 'Google Drive', 'Yesterday', 'DIR', true, 'folder'],
      ['Project Notes.docx', 'Document', 'Google Drive', '21 Oct', 'DOC', false, 'details'],
    ])}
  `;

  return appShell('Dashboard', 'Your cloud workspace', 'Google Drive is connected. Browse recent resources or open all files.', body, button('Browse files', 'files'));
}

function fileTable(rows) {
  return `
    <div class="table">
      <div class="table-row table-head">
        <div>NAME</div><div>TYPE</div><div>PROVIDER</div><div>MODIFIED</div><div></div>
      </div>
      ${rows.map(([name, type, provider, modified, badge, folder, route]) => `
        <a class="table-row" href="#${route}" data-route="${route}">
          <div class="file-cell">
            <span class="file-badge ${folder ? 'folder' : ''}">${badge}</span>
            <span>${name}</span>
          </div>
          <div class="muted">${type}</div>
          <div class="muted">${provider}</div>
          <div class="muted">${modified}</div>
          <div class="row-action muted">•••</div>
        </a>
      `).join('')}
    </div>
  `;
}

function renderFiles() {
  const body = `
    <div class="toolbar">
      ${tag('All types')}
      ${tag('Modified date')}
      ${tag('Google Drive')}
      <div class="toolbar-spacer"></div>
      <input class="search-box" style="width:230px;" data-search-input value="assessment" aria-label="Search files">
    </div>

    ${fileTable([
      ['University', 'Folder', 'Google Drive', 'Today', 'DIR', true, 'folder'],
      ['Documents', 'Folder', 'Google Drive', '20 Oct', 'DIR', true, 'folder'],
      ['Photos', 'Folder', 'Google Drive', '19 Oct', 'DIR', true, 'folder'],
      ['COMP-2002 Brief.pdf', 'PDF', 'Google Drive', 'Today', 'PDF', false, 'details'],
      ['Project Notes.docx', 'Document', 'Google Drive', '21 Oct', 'DOC', false, 'details'],
    ])}
  `;

  return appShell('Files', 'Files', 'Google Drive · mock provider', body, button('Manage provider', 'manage', 'light'), 'Search files and folders');
}

function renderFolder() {
  const body = `
    <div class="toolbar">
      ${tag('All types')}
      ${tag('Modified date')}
      <div class="toolbar-spacer"></div>
      ${tag('Search inside folder')}
    </div>

    ${fileTable([
      ['COMP-2002', 'Folder', 'Google Drive', 'Today', 'DIR', true, 'folder'],
      ['Programming', 'Folder', 'Google Drive', '22 Oct', 'DIR', true, 'folder'],
      ['Assessment 1.pdf', 'PDF', 'Google Drive', 'Today', 'PDF', false, 'details'],
      ['Web Development Notes.docx', 'Document', 'Google Drive', '23 Oct', 'DOC', false, 'details'],
      ['CRiB Pitch.pptx', 'Presentation', 'Google Drive', '22 Oct', 'PPT', false, 'details'],
    ])}
  `;

  return appShell('Files', 'University', 'Google Drive · 5 items', body, button('Back to files', 'files', 'light'), 'Search University');
}

function renderSearchResults() {
  const body = `
    <div class="toolbar">
      ${tag('Query: assessment', 'violet')}
      ${tag('Type: All')}
      ${tag('Provider: Google Drive')}
    </div>

    ${fileTable([
      ['Assessment 1.pdf', 'PDF', 'Google Drive', 'Today', 'PDF', false, 'details'],
      ['Assessment Notes.docx', 'Document', 'Google Drive', '23 Oct', 'DOC', false, 'details'],
      ['Assessment Criteria.pdf', 'PDF', 'Google Drive', '20 Oct', 'PDF', false, 'details'],
      ['Assessment Demo.pptx', 'Presentation', 'Google Drive', '18 Oct', 'PPT', false, 'details'],
    ])}
  `;

  return appShell('Files', 'Search results', '4 results for “assessment”', body, button('Clear search', 'files', 'light'), 'assessment');
}

function renderFileDetails() {
  const detailRows = [
    ['Provider', 'Google Drive'],
    ['Type', 'PDF'],
    ['Modified', 'Today, 14:12'],
    ['Size', '2.4 MB'],
    ['Location', 'University'],
  ];

  const body = `
    <div class="detail-layout">
      <div class="card preview-card">
        <div class="preview-file-icon">PDF</div>
        <h2>Assessment 1.pdf</h2>
        <p>A preview is not required for the prototype.</p>
      </div>

      <aside class="card detail-panel">
        <div class="detail-head">
          <h3>Details</h3>
          ${tag('Available', 'success')}
        </div>

        <div class="detail-list">
          ${detailRows.map(([key, value]) => `
            <div class="detail-row"><span>${key}</span><strong>${value}</strong></div>
          `).join('')}
        </div>

        <div class="detail-actions">
          ${button('Open file', 'details')}
          ${button('Download', 'details', 'light')}
          ${button('Back to folder', 'folder', 'light')}
        </div>
      </aside>
    </div>
  `;

  return appShell('Files', 'File details', 'Review the selected resource before opening or downloading it.', body, '', 'Search files and folders');
}

function renderProviderManagement() {
  const body = `
    <div class="card provider-row">
      <div class="provider-icon">GD</div>
      <div class="provider-row-copy">
        <h3>Google Drive</h3>
        <p>user@example.com · Connected today</p>
      </div>
      ${tag('Connected', 'success')}
      ${button('Simulate error', 'error', 'light')}
    </div>

    <div class="section-head"><h3>Disconnect provider</h3></div>

    <div class="card provider-row" style="border-color:#e9d1d4;">
      <div class="provider-row-copy">
        <h3>Remove Google Drive from CRiB?</h3>
        <p>This removes CRiB's usable connection state. It does not delete files from Google Drive.</p>
      </div>
      ${button('Disconnect Google Drive', 'empty', 'danger')}
    </div>
  `;

  return appShell('Account', 'Connected providers', 'Review or disconnect cloud accounts connected to CRiB.', body, button('Add provider', 'providers', 'light'));
}

function renderConnectionError() {
  const body = `
    <div class="card error-card">
      <div class="error-mark">!</div>
      <div>
        ${tag('Connection expired', 'danger')}
        <h2 style="margin:14px 0 0;">Reconnect Google Drive</h2>
        <p class="muted" style="line-height:1.6;">CRiB can no longer read the connected resource list. Your files are not deleted. Reauthorize the provider to continue.</p>
        <div class="hero-actions" style="margin-top:20px;">
          ${button('Reconnect', 'authorize')}
          ${button('Manage provider', 'manage', 'light')}
        </div>
      </div>
    </div>
  `;

  return appShell('Providers', 'Google Drive needs attention', 'The prototype demonstrates a recoverable provider failure.', body);
}

function renderLoading() {
  const skeleton = Array.from({ length: 6 }, () => `
    <div class="loading-row">
      <div class="loading-line"></div>
      <div class="loading-line"></div>
      <div class="loading-line"></div>
      <div class="loading-line"></div>
    </div>
  `).join('');

  const body = `
    <div class="table">
      <div class="table-row table-head">
        <div>NAME</div><div>TYPE</div><div>PROVIDER</div><div>MODIFIED</div><div></div>
      </div>
      ${skeleton}
    </div>
    <p class="muted" style="font-size:12px;">Prototype state: use this screen when demonstrating loading behaviour.</p>
  `;

  return appShell('Files', 'Loading resources', 'Fetching the latest visible files from Google Drive…', body);
}

function renderNoResults() {
  const body = `
    <div class="card empty-state" style="min-height:400px;">
      <div class="empty-mark" style="background:#f1f0eb;border-color:#deddd7;color:#666;">0</div>
      <h2>No matching resources.</h2>
      <p>Try another search term or remove the active filters.</p>
      ${button('Clear search', 'files', 'light')}
    </div>
  `;

  return appShell('Files', 'No results', 'Nothing matched “network-diagram-final-final”.', body, '', 'network-diagram-final-final');
}

window.addEventListener('hashchange', render);
window.addEventListener('DOMContentLoaded', render);
