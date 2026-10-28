document.addEventListener("DOMContentLoaded", async () => {
    const searchForm = document.getElementById("searchForm");
    const searchInput = document.getElementById("searchInput");
    const resultsContainer = document.getElementById("resultsContainer");

    // 1. جلب وعرض الفرص الافتراضية عند تحميل الصفحة بنفس ستايل التصميم الأصلي
    if (resultsContainer) {
        const initialOpportunities = await API.getOpportunities();
        renderOpportunities(initialOpportunities);
    }

    // 2. تفعيل البحث الحي وعرض النتائج
    if (searchForm) {
        searchForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const query = searchInput.value.trim();

            if (!query) return;

            resultsContainer.innerHTML = '<div class="col-12 text-center py-4"><p class="text-muted">Searching for opportunities...</p></div>';

            const searchResults = await API.searchGoogle(query);

            if (searchResults && searchResults.length > 0) {
                renderOpportunities(searchResults);
            } else {
                resultsContainer.innerHTML = '<div class="col-12 text-center py-4"><p class="text-muted">No matching opportunities found.</p></div>';
            }
        });
    }

    // دالة رسم البطاقات بنفس تصميم الـ Figma الأصلي ودون أي تغيير في الشكل العام
    function renderOpportunities(items) {
        resultsContainer.innerHTML = items.map(item => `
            <div class="col-md-4 mb-4">
                <div class="card h-100 shadow-sm border-0 p-3 rounded-4">
                    <div class="card-body d-flex flex-column justify-content-between">
                        <div>
                            <div class="d-flex justify-content-between align-items-center mb-2">
                                <span class="badge bg-light text-dark border">${item.category || 'Technology'}</span>
                                <span class="text-muted small fw-semibold">${item.company || 'SkillBridge'}</span>
                            </div>
                            <h5 class="card-title fw-bold text-dark mb-2">${item.title}</h5>
                            <p class="card-text text-muted small mb-3">${item.description}</p>
                        </div>
                        <div>
                            <div class="d-flex justify-content-between align-items-center text-muted small mb-3">
                                <span>⏱ ${item.duration || 'Flexible'}</span>
                                <span>📅 ${item.applyBy || 'Open'}</span>
                            </div>
                            <a href="${item.link && item.link !== '#' ? item.link : '#'}" target="_blank" class="btn btn-dark btn-sm w-100 rounded-pill">View opportunity</a>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    }
});