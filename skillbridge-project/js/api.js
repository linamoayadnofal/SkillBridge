// ضعي مفاتيح جوجل الخاصة بكِ هنا
const GOOGLE_API_KEY = "AIzaSyDiN4bmR3ESPZCGItlHSFhzyQQhTPc2-q4";
const SEARCH_ENGINE_CX = "https://cse.google.com/cse.js?cx=e5cc88e77bd914de3";

const API = {
    async getOpportunities() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve([
                    { id: 1, company: "Microsoft", category: "Technology", title: "Frontend Development Intern", description: "Build accessible web experiences while learning modern development workflows.", duration: "10 weeks", applyBy: "Jun 02", link: "https://careers.microsoft.com" },
                    { id: 2, company: "Google", category: "Design", title: "UX Design Intern", description: "Explore real user problems and turn research insights into thoughtful digital experiences.", duration: "8 weeks", applyBy: "May 28", link: "https://careers.google.com" },
                    { id: 3, company: "Spotify", category: "Data", title: "Data Analytics Intern", description: "Transform product data into clear stories that help teams understand behavior.", duration: "12 weeks", applyBy: "Jun 10", link: "https://www.spotifyjobs.com" },
                    { id: 4, company: "HubSpot", category: "Marketing", title: "Digital Marketing Intern", description: "Support digital campaigns and discover how useful content builds meaningful customer relationships.", duration: "6 weeks", applyBy: "Jun 14", link: "https://www.hubspot.com/careers" },
                    { id: 5, company: "Canva", category: "Business", title: "Product Strategy Intern", description: "Connect user needs with business goals and learn how collaborative product teams prioritize work.", duration: "10 weeks", applyBy: "Jun 20", link: "https://www.canva.com/careers" },
                    { id: 6, company: "Khan Academy", category: "Education", title: "Learning Content Intern", description: "Create clear, engaging learning resources that help students build confidence.", duration: "12 weeks", applyBy: "Jun 25", link: "https://www.khanacademy.org/careers" }
                ]);
            }, 200);
        });
    },

    async searchGoogle(query) {
        if (!query || query.trim() === "") return [];
        
        const url = `https://www.googleapis.com/customsearch/v1?key=${GOOGLE_API_KEY}&cx=${SEARCH_ENGINE_CX}&q=${encodeURIComponent(query)}`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            
            if (data.items && data.items.length > 0) {
                return data.items.map((item, index) => ({
                    id: `google-${index}`,
                    company: "Global Tech Portal",
                    category: "Web Search",
                    title: item.title,
                    description: item.snippet,
                    link: item.link
                }));
            }
        } catch (error) {
            console.error("خطأ في الاتصال بالـ API:", error);
        }

        return [
            {
                id: 'res-1',
                company: "Google Careers",
                category: "Technology",
                title: `${query} - الفرصة التدريبية الأولى`,
                description: `فرصة متميزة للتدريب العملي في مجال ${query} ضمن بيئة عمل تقنية عالمية.`,
                link: `https://www.google.com/search?q=site:careers.google.com+${encodeURIComponent(query)}`
            },
            {
                id: 'res-2',
                company: "LinkedIn Global Jobs",
                category: "Professional Network",
                title: `${query} - برنامج التدريب المهني`,
                description: `انضم إلى برنامج التطوير المهني واكتسب خبرة عملية مباشرة في تخصص ${query}.`,
                link: `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(query)}`
            }
        ];
    }
};