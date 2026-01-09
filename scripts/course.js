const courses = [
    { code: "WDD130", name: "Web Fundamentals", credits: 3, completed: true },
    { code: "WDD131", name: "Dynamic Web Fundamentals", credits: 3, completed: true },
    { code: "WDD231", name: "Frontend Development I", credits: 3, completed: false },
    { code: "CSE121B", name: "JavaScript Language", credits: 3, completed: false }
];

const courseDiv = document.getElementById("courses");
const totalCredits = document.getElementById("totalCredits");

function displayCourses(list) {
    courseDiv.innerHTML = "";
    const credits = list.reduce((sum, c) => sum + c.credits, 0);
    totalCredits.textContent = credits;

    list.forEach(course => {
        const card = document.createElement("div");
        card.className = course.completed ? "course completed" : "course";
        card.textContent = `${course.code} - ${course.name} (${course.credits} credits)`;
        courseDiv.appendChild(card);
    });
}

document.getElementById("allBtn").addEventListener("click", () => displayCourses(courses));
document.getElementById("wddBtn").addEventListener("click", () => displayCourses(courses.filter(c => c.code.startsWith("WDD"))));
document.getElementById("cseBtn").addEventListener("click", () => displayCourses(courses.filter(c => c.code.startsWith("CSE"))));

displayCourses(courses);
