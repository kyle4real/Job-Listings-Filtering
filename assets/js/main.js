// UI Class
class UI {
    static displayJobs() {
        const jobs = [
            {
                id: 1,
                company: "Photosnap",
                logo: "./images/photosnap.svg",
                new: true,
                featured: true,
                position: "Senior Frontend Developer",
                role: "Frontend",
                level: "Senior",
                postedAt: "1d ago",
                contract: "Full Time",
                location: "USA Only",
                languages: ["HTML", "CSS", "JavaScript"],
                tools: [],
            },
            {
                id: 2,
                company: "Manage",
                logo: "./images/manage.svg",
                new: true,
                featured: true,
                position: "Fullstack Developer",
                role: "Fullstack",
                level: "Midweight",
                postedAt: "1d ago",
                contract: "Part Time",
                location: "Remote",
                languages: ["Python"],
                tools: ["React"],
            },
        ];
        const filteredJobs = UI.filterJobs(jobs);
        filteredJobs.forEach((job) => UI.addBookToList(job));
    }
    static addBookToList(job) {
        const dataContainer = document.getElementById("dataContainer");

        // the container
        const jobContainer = document.createElement("div");
        jobContainer.className = "job__container";

        // the img
        const jobImg = document.createElement("img");
        jobImg.className = "job__img";
        jobImg.setAttribute("src", Utilities.parseImgLink(job.logo));
        jobImg.setAttribute("alt", `${job.company} logo`);

        // the job data
        const jobData = document.createElement("div");
        jobData.className = "job__data";

        // top row
        const dataTopRow = document.createElement("div");
        dataTopRow.className = "data__top-row";
        // top row - position
        const company = document.createElement("h3");
        company.className = "data__company";
        company.textContent = job.company;
        dataTopRow.appendChild(company);
        // top row - banners
        if (job.new) {
            const newBanner = document.createElement("div");
            newBanner.className = "new__banner";
            newBanner.textContent = "new!";
            dataTopRow.appendChild(newBanner);
        }
        if (job.featured) {
            const featuredBanner = document.createElement("div");
            featuredBanner.className = "featured__banner";
            featuredBanner.textContent = "featured";
            dataTopRow.appendChild(featuredBanner);
        }

        jobData.appendChild(dataTopRow);

        // the position
        const jobPosition = document.createElement("h2");
        jobPosition.className = "data__position";
        jobPosition.textContent = job.position;

        jobData.appendChild(jobPosition);

        // the info
        const jobInfo = document.createElement("p");
        jobInfo.className = "data__info";
        jobInfo.textContent = `${job.postedAt} • ${job.contract} • ${job.location}`;

        jobData.appendChild(jobInfo);

        // the categories
        const jobCategories = document.createElement("div");
        jobCategories.className = "job__categories";

        const jobRole = Utilities.addCategory(job.role);
        jobCategories.appendChild(jobRole);
        const jobLevel = Utilities.addCategory(job.level);
        jobCategories.appendChild(jobLevel);
        job.languages.forEach((language) => {
            const jobLanguage = Utilities.addCategory(language);
            jobCategories.appendChild(jobLanguage);
        });
        job.tools.forEach((tool) => {
            const jobTool = Utilities.addCategory(tool);
            jobCategories.appendChild(jobTool);
        });

        // append all to job container
        jobContainer.appendChild(jobImg);
        jobContainer.appendChild(jobData);
        jobContainer.appendChild(jobCategories);

        // append to data container
        dataContainer.appendChild(jobContainer);
    }
    static filterJobs(jobs) {
        const filterNodes = document.querySelectorAll(".filter__category");
        const filters = [];
        filterNodes.forEach((filterNode) => {
            filters.push(filterNode.textContent);
        });
        return jobs.filter((job) => {
            if (filters.includes(job.role)) return job;
            if (filters.includes(job.level)) return job;
            if (job.languages.filter((language) => filters.includes(language)).length) return job;
            if (job.tools.filter((tool) => filters.includes(tool)).length) return job;
        });
    }
}

class Utilities {
    static parseImgLink(link) {
        return `assets${link.slice(1)}`;
    }
    static addCategory(data) {
        const jobCategory = document.createElement("button");
        jobCategory.className = "job__category";
        jobCategory.textContent = data;
        return jobCategory;
    }
}

const main = () => {
    UI.displayJobs();
};

document.addEventListener("DOMContentLoaded", () => {
    main();
});
