document.addEventListener('DOMContentLoaded', function() {
    const rowsPerPage = 10;
    const rows = document.querySelectorAll('tbody tr');
    const paginationLinks = document.querySelectorAll('.pagination a');

    function displayRows(page) {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        rows.forEach((row, index) => {
            row.style.display = (index >= start && index < end) ? '' : 'none';
        });
    }

    paginationLinks.forEach((link, index) => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const page = index + 1;
            displayRows(page);
        });
    });

    displayRows(1);
});
