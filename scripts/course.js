const courses = [
    { code: "WDD130", name: "Web Fundamentals", credits: 3, completed: true },
    { code: "WDD131", name: "Dynamic Web Fundamentals", credits: 3, completed: true },
    { code: "WDD231", name: "Frontend Development I", credits: 3, completed: false },
    { code: "CSE121B", name: "JavaScript Language", credits: 3, completed: false }
];

const courseDiv = document.getElementById("courses");
const totalCredits = document.getElementById("totalCredits");
const allBtn = document.getElementById("allBtn");
const wddBtn = document.getElementById("wddBtn");
const cseBtn = document.getElementById("cseBtn");

function displayCourses(courseList) {
    courseDiv.innerHTML = "";

    const creditTotal = courseList.reduce((total, course) => {
        return total + course.credits;
    }, 0);

    totalCredits.textContent = creditTotal;

    courseList.forEach(course => {
        const card = document.createElement("div");
        card.classList.add("course");

        if (course.completed) {
            card.classList.add("completed");
        }

        card.textContent = `${course.code} - ${course.name} (${course.credits} credits)`;
        courseDiv.appendChild(card);
    });
}

allBtn.addEventListener("click", () => {
    displayCourses(courses);
});

wddBtn.addEventListener("click", () => {
    const wddCourses = courses.filter(course => course.code.startsWith("WDD"));
    displayCourses(wddCourses);
});

cseBtn.addEventListener("click", () => {
    const cseCourses = courses.filter(course => course.code.startsWith("CSE"));
    displayCourses(cseCourses);
});

displayCourses(courses);
