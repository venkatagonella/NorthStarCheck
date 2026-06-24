(function () {
  const params = new URLSearchParams(window.location.search);
  const jobId = params.get('jobId') ?? '';
  const userId = params.get('userId') ?? '';
  const tenantId = params.get('tenantId') ?? '';

  document.getElementById('job-id').textContent = jobId;

  const deleteBtn = document.getElementById('delete-btn');
  const closeBtn = document.getElementById('close-btn');
  const statusEl = document.getElementById('status');
  const roleEl = document.getElementById('effective-role');

  const headers = {
    'Content-Type': 'application/json',
    'x-user-id': userId,
    'x-tenant-id': tenantId,
  };

  async function loadPermissions() {
    const res = await fetch(`/api/jobs/${jobId}/permissions`, { headers });
    if (!res.ok) {
      statusEl.textContent = 'Failed to load permissions';
      return;
    }
    const perms = await res.json();
    roleEl.textContent = perms.effectiveRole?.displayName ?? 'Legacy Recruiter';

    if (!perms.canDelete) {
      deleteBtn.disabled = true;
      deleteBtn.classList.add('hidden');
    }
    if (!perms.canClose) {
      closeBtn.disabled = true;
      closeBtn.classList.add('hidden');
    }
  }

  deleteBtn.addEventListener('click', async () => {
    const res = await fetch(`/api/jobs/${jobId}`, { method: 'DELETE', headers });
    statusEl.textContent = res.ok ? 'Deleted' : `Delete failed: ${res.status}`;
  });

  closeBtn.addEventListener('click', async () => {
    const res = await fetch(`/api/jobs/${jobId}/close`, { method: 'POST', headers });
    statusEl.textContent = res.ok ? 'Closed' : `Close failed: ${res.status}`;
  });

  loadPermissions();
})();
