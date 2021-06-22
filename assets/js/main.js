// UI Class
class UI {
    static displayJobs(jobs) {
        const filteredJobs = UI.filterJobs(jobs);
        filteredJobs.forEach((job) => UI.addJobToList(job));
    }
    static addJobToList(job) {
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
        jobCategories.childNodes.forEach((jobCategory) => {
            Events.categoryButtons(jobCategory);
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
        if (!filters.length) return jobs;
        return jobs.filter((job) => {
            const categoryArr = [job.role, job.level, ...job.languages, ...job.tools];
            return filters.every((filter) => categoryArr.includes(filter));
        });
    }
    static displayFilters() {
        const filters = ["hi", "test"];
        filters.forEach((filter) => UI.addFilterToList(filter));
    }
    static handleFilterContainer() {
        const dataContainer = document.getElementById("dataContainer");
        const filterContainer = document.getElementById("filterContainer");
        const allFilters = document.querySelectorAll(".filter-category__container");

        console.log(allFilters.length);
        if (allFilters.length) {
            dataContainer.classList.add("filters-on");
            filterContainer.classList.add("filters-show");
        } else {
            dataContainer.classList.remove("filters-on");
            filterContainer.classList.remove("filters-show");
        }
    }
    static addFilterToList(filter) {
        const filterContainer = document.getElementById("filters");

        // create the element
        const filterNode = document.createElement("div");
        filterNode.className = "filter-category__container";

        const filterName = document.createElement("p");
        filterName.className = "filter__category";
        filterName.textContent = filter;

        const filterRemove = document.createElement("i");
        filterRemove.className = "fas fa-times remove__filter";
        // adding event listener to remove element
        Events.filterButtons(filterRemove);

        filterNode.appendChild(filterName);
        filterNode.appendChild(filterRemove);

        console.log(filterNode);
        // append to container
        filterContainer.appendChild(filterNode);
    }
    static addFilter(filter) {
        const filterName = filter.textContent;
        const filters = ["Fullstack", "JavaScript"];
        if (filters.includes(filterName)) return;
        UI.addFilterToList(filterName);
        UI.handleFilterContainer();
    }
    static removeFilter(filter) {
        const filterContainer = filter.parentNode;
        filterContainer.remove();
    }
}

class Events {
    static categoryButtons(button) {
        button.addEventListener("click", (e) => {
            UI.addFilter(e.target);
        });
    }
    static filterButtons(button) {
        button.addEventListener("click", (e) => {
            UI.removeFilter(e.target);
        });
    }
    static clearButton() {
        const clearFilters = document.getElementById("clearFilters");
        clearFilters.addEventListener("click", () => {
            const allFilters = document.querySelectorAll(".remove__filter");
            allFilters.forEach((filter) => UI.removeFilter(filter));
        });
    }
}

class Store {
    static jobStore() {}
    static filterStore() {}
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

const main = async () => {
    const res = await fetch("./../../data.json");
    const jobsData = await res.json();
    Events.clearButton();
    UI.displayJobs(jobsData);
    UI.displayFilters();
    UI.handleFilterContainer();
};

document.addEventListener("DOMContentLoaded", () => {
    main();
});
