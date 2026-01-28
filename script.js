document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.getElementById('login-btn');
    const logoutBtn = document.getElementById('logout-btn');
    const clearLogsBtn = document.getElementById('clear-logs-btn');
    const logContainer = document.getElementById('log-container');

    function logAttendance(action) {
        const logs = JSON.parse(localStorage.getItem('attendance_logs')) || [];
        const newEntry = {
            action,
            timestamp: new Date().toLocaleString()
        };
        logs.unshift(newEntry); // Add to beginning of array
        localStorage.setItem('attendance_logs', JSON.stringify(logs));
        renderLogs();
    }

    function renderLogs() {
        const logs = JSON.parse(localStorage.getItem('attendance_logs')) || [];
        logContainer.innerHTML = '';

        if (logs.length === 0) {
            logContainer.innerHTML = '<p style="color: #888; text-align: center;">No logs found.</p>';
            return;
        }

        logs.forEach(log => {
            const logEntry = document.createElement('div');
            logEntry.className = `log-entry ${log.action.toLowerCase()}`;
            logEntry.innerHTML = `
                <span class="timestamp">${log.timestamp}</span>
                <span class="action">${log.action}</span>
            `;
            logContainer.appendChild(logEntry);
        });
    }

    function clearLogs() {
        if (confirm('Are you sure you want to clear all logs?')) {
            localStorage.removeItem('attendance_logs');
            renderLogs();
        }
    }

    loginBtn.addEventListener('click', () => logAttendance('Login'));
    logoutBtn.addEventListener('click', () => logAttendance('Logout'));
    clearLogsBtn.addEventListener('click', clearLogs);

    renderLogs();
});
