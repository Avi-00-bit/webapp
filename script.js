/* =========================================================
   STATLEARN AI
   JAVASCRIPT
========================================================= */


/* =========================================================
   APPLICATION STATE
========================================================= */

const state = {

    assessmentScore: 72,

    quizScore: 81,

    uploadedFile: null,

    generatedQuestions: [],

    assessmentSubmitted: false,

    quizSubmitted: false

};


/* =========================================================
   PAGE TITLES
========================================================= */

const pageTitles = {

    dashboard: "Dashboard",

    assessment: "Competency Assessment",

    quiz: "AI Quiz Generator",

    recommendations: "Recommendations",

    learning: "My Learning",

    analytics: "Analytics",

    igot: "iGOT Karmayogi"

};


/* =========================================================
   DEFAULT DEMO USER
========================================================= */

const demoUser = {

    name: "Alex Learner",

    email: "student@statlearn.ai",

    password: "123456"

};


/* =========================================================
   AUTH CHECK
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        renderAssessment();

        updateRecommendations(
            state.assessmentScore
        );


        const savedUser =
            localStorage.getItem(
                "statlearn_current_user"
            );


        if (savedUser) {

            try {

                const user =
                    JSON.parse(savedUser);

                showApplication(user);

            } catch {

                showLogin();

            }

        } else {

            showLogin();

        }

    }
);


/* =========================================================
   LOGIN
========================================================= */

document
    .getElementById("loginForm")
    .addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const email =
                document
                    .getElementById("loginEmail")
                    .value
                    .trim()
                    .toLowerCase();


            const password =
                document
                    .getElementById("loginPassword")
                    .value;


            const error =
                document.getElementById(
                    "loginError"
                );


            /* Demo account */

            if (
                email === demoUser.email &&
                password === demoUser.password
            ) {

                const user = {

                    name: demoUser.name,

                    email: demoUser.email

                };


                localStorage.setItem(
                    "statlearn_current_user",
                    JSON.stringify(user)
                );


                error.textContent = "";


                showApplication(user);


                showToast(
                    "Welcome back, " +
                    user.name +
                    "!"
                );


                return;

            }


            /* Registered account */

            const registeredUser =
                localStorage.getItem(
                    "statlearn_registered_user"
                );


            if (registeredUser) {

                const user =
                    JSON.parse(
                        registeredUser
                    );


                if (
                    email === user.email &&
                    password === user.password
                ) {

                    localStorage.setItem(
                        "statlearn_current_user",
                        JSON.stringify({
                            name: user.name,
                            email: user.email
                        })
                    );


                    error.textContent = "";


                    showApplication(user);


                    showToast(
                        "Welcome back, " +
                        user.name +
                        "!"
                    );


                    return;

                }

            }


            error.textContent =
                "Invalid email or password. Try the demo account.";

        }
    );


/* =========================================================
   SIGN UP
========================================================= */

document
    .getElementById("signupForm")
    .addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const name =
                document
                    .getElementById("signupName")
                    .value
                    .trim();


            const email =
                document
                    .getElementById("signupEmail")
                    .value
                    .trim()
                    .toLowerCase();


            const password =
                document
                    .getElementById("signupPassword")
                    .value;


            const error =
                document.getElementById(
                    "signupError"
                );


            if (name.length < 2) {

                error.textContent =
                    "Please enter your full name.";

                return;

            }


            if (password.length < 6) {

                error.textContent =
                    "Password must contain at least 6 characters.";

                return;

            }


            if (
                email === demoUser.email
            ) {

                error.textContent =
                    "This email is already registered.";

                return;

            }


            const user = {

                name: name,

                email: email,

                password: password

            };


            localStorage.setItem(
                "statlearn_registered_user",
                JSON.stringify(user)
            );


            localStorage.setItem(
                "statlearn_current_user",
                JSON.stringify({
                    name: name,
                    email: email
                })
            );


            error.textContent = "";


            showApplication(user);


            showToast(
                "Account created successfully ✓"
            );

        }
    );


/* =========================================================
   SHOW LOGIN
========================================================= */

function showLogin() {

    document
        .getElementById("authScreen")
        .style.display = "grid";


    document
        .getElementById("app")
        .classList.remove("logged-in");


    document
        .getElementById("loginCard")
        .style.display = "block";


    document
        .getElementById("signupCard")
        .style.display = "none";

}


/* =========================================================
   SHOW SIGNUP
========================================================= */

function showSignup() {

    document
        .getElementById("loginCard")
        .style.display = "none";


    document
        .getElementById("signupCard")
        .style.display = "block";

}


/* =========================================================
   SHOW APPLICATION
========================================================= */

function showApplication(user) {

    document
        .getElementById("authScreen")
        .style.display = "none";


    document
        .getElementById("app")
        .classList.add("logged-in");


    updateUserInterface(user);

}


/* =========================================================
   UPDATE USER INFORMATION
========================================================= */

function updateUserInterface(user) {

    const name =
        user.name || "Learner";


    const email =
        user.email || "";


    const initials =
        name
            .split(" ")
            .map(part => part[0])
            .join("")
            .substring(0, 2)
            .toUpperCase();


    document.getElementById(
        "sidebarName"
    ).textContent =
        name;


    document.getElementById(
        "sidebarEmail"
    ).textContent =
        email;


    document.getElementById(
        "sidebarAvatar"
    ).textContent =
        initials;


    document.getElementById(
        "topAvatar"
    ).textContent =
        initials;


    document.getElementById(
        "welcomeName"
    ).textContent =
        "Welcome back, " +
        name +
        " 👋";

}


/* =========================================================
   DEMO LOGIN BUTTON
========================================================= */

function fillDemoLogin() {

    document.getElementById(
        "loginEmail"
    ).value =
        demoUser.email;


    document.getElementById(
        "loginPassword"
    ).value =
        demoUser.password;


    showToast(
        "Demo credentials filled"
    );

}


/* =========================================================
   PASSWORD VISIBILITY
========================================================= */

function togglePassword(
    inputId,
    button
) {

    const input =
        document.getElementById(
            inputId
        );


    if (
        input.type === "password"
    ) {

        input.type = "text";

        button.textContent =
            "Hide";

    } else {

        input.type = "password";

        button.textContent =
            "Show";

    }

}


/* =========================================================
   FORGOT PASSWORD
========================================================= */

function forgotPassword(event) {

    event.preventDefault();


    showToast(
        "Demo mode: password recovery is not connected."
    );

}


/* =========================================================
   LOGOUT
========================================================= */

function logout() {

    localStorage.removeItem(
        "statlearn_current_user"
    );


    document
        .getElementById("app")
        .classList.remove("logged-in");


    document
        .getElementById("authScreen")
        .style.display = "grid";


    showLogin();


    showToast(
        "You have been logged out."
    );

}


/* =========================================================
   NAVIGATION
========================================================= */

function navigate(pageId) {

    const targetPage =
        document.getElementById(
            pageId
        );


    if (!targetPage) {
        return;
    }


    document
        .querySelectorAll(".page")
        .forEach(page => {

            page.classList.remove(
                "active"
            );

        });


    targetPage.classList.add(
        "active"
    );


    document
        .querySelectorAll(".nav-item")
        .forEach(item => {

            item.classList.remove(
                "active"
            );


            if (
                item.dataset.page ===
                pageId
            ) {

                item.classList.add(
                    "active"
                );

            }

        });


    document.getElementById(
        "pageTitle"
    ).textContent =
        pageTitles[pageId] ||
        "StatLearn AI";


    document
        .getElementById("sidebar")
        .classList.remove("open");


    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });


    if (
        pageId === "analytics"
    ) {

        animateCharts();

    }


    if (
        pageId === "learning"
    ) {

        animateLearningBars();

    }

}


/* =========================================================
   NAVIGATION EVENTS
========================================================= */

document
    .querySelectorAll(".nav-item")
    .forEach(item => {

        item.addEventListener(
            "click",
            () => {

                navigate(
                    item.dataset.page
                );

            }
        );

    });


/* =========================================================
   MOBILE MENU
========================================================= */

document
    .getElementById("mobileMenu")
    .addEventListener(
        "click",
        () => {

            document
                .getElementById("sidebar")
                .classList.toggle(
                    "open"
                );

        }
    );


/* =========================================================
   TOAST
========================================================= */

let toastTimer;


function showToast(message) {

    const toast =
        document.getElementById(
            "toast"
        );


    toast.textContent =
        message;


    toast.classList.add(
        "show"
    );


    clearTimeout(
        toastTimer
    );


    toastTimer =
        setTimeout(
            () => {

                toast.classList.remove(
                    "show"
                );

            },
            2500
        );

}


/* =========================================================
   ASSESSMENT QUESTION BANK
========================================================= */

const assessmentQuestions = [

    {
        topic: "Sampling",

        question:
            "Which sampling method gives every member of a population an equal chance of being selected?",

        options: [
            "Simple random sampling",
            "Convenience sampling",
            "Quota sampling",
            "Judgment sampling"
        ],

        answer: 0
    },


    {
        topic: "Statistics",

        question:
            "Which measure represents the middle value when observations are arranged in order?",

        options: [
            "Mean",
            "Median",
            "Variance",
            "Range"
        ],

        answer: 1
    },


    {
        topic: "Data Collection",

        question:
            "Which method is commonly used to collect structured responses from a large population?",

        options: [
            "Questionnaire",
            "Random guessing",
            "Data deletion",
            "Visualization"
        ],

        answer: 0
    },


    {
        topic: "Data Visualization",

        question:
            "Which chart is generally appropriate for showing trends over time?",

        options: [
            "Pie chart",
            "Line chart",
            "Histogram only",
            "Scatter-free table"
        ],

        answer: 1
    },


    {
        topic: "Data Quality",

        question:
            "Which data-quality dimension refers to whether data is correct and free from errors?",

        options: [
            "Accuracy",
            "Color",
            "Formatting",
            "Compression"
        ],

        answer: 0
    },


    {
        topic: "Sampling",

        question:
            "A sample selected by dividing a population into groups and randomly selecting from each group is called:",

        options: [
            "Stratified sampling",
            "Convenience sampling",
            "Snowball sampling",
            "Census"
        ],

        answer: 0
    },


    {
        topic: "Statistics",

        question:
            "What does standard deviation primarily describe?",

        options: [
            "Central value",
            "Spread of observations",
            "Number of variables",
            "Sample size only"
        ],

        answer: 1
    },


    {
        topic: "Data Quality",

        question:
            "Which process can help identify duplicate records in a dataset?",

        options: [
            "Data validation",
            "Randomization",
            "Chart styling",
            "Sampling"
        ],

        answer: 0
    },


    {
        topic: "Data Visualization",

        question:
            "Which chart is commonly used to show the distribution of numerical data?",

        options: [
            "Histogram",
            "Pie chart only",
            "Logo",
            "Flow button"
        ],

        answer: 0
    },


    {
        topic: "Data Interpretation",

        question:
            "If a dataset has a very large outlier, which statistic is generally more resistant to its effect?",

        options: [
            "Median",
            "Mean",
            "Sum",
            "Range"
        ],

        answer: 0
    }

];


/* =========================================================
   RENDER ASSESSMENT
========================================================= */

function renderAssessment() {

    const container =
        document.getElementById(
            "assessmentQuestions"
        );


    container.innerHTML =
        assessmentQuestions
            .map(
                (question, index) => {

                    return `

                        <div class="card question-card">

                            <div class="question-number">

                                Question ${index + 1}
                                • ${question.topic}

                            </div>


                            <div class="question-text">

                                ${question.question}

                            </div>


                            ${question.options
                                .map(
                                    (option, optionIndex) => {

                                        return `

                                            <label
                                                class="option"
                                                onclick="selectOption(this)"
                                            >

                                                <input
                                                    type="radio"
                                                    name="assessment-${index}"
                                                    value="${optionIndex}"
                                                >

                                                <span>
                                                    ${option}
                                                </span>

                                            </label>

                                        `;

                                    }
                                )
                                .join("")}

                        </div>

                    `;

                }
            )
            .join("");

}


/* =========================================================
   SELECT OPTION
========================================================= */

function selectOption(element) {

    const parent =
        element.parentElement;


    parent
        .querySelectorAll(
            ".option"
        )
        .forEach(
            option => {

                option.classList.remove(
                    "selected"
                );

            }
        );


    element.classList.add(
        "selected"
    );

}


/* =========================================================
   SUBMIT ASSESSMENT
========================================================= */

function submitAssessment() {

    let correct = 0;

    let answered = 0;

    const review = [];


    assessmentQuestions.forEach(
        (question, index) => {

            const selected =
                document.querySelector(
                    `input[name="assessment-${index}"]:checked`
                );


            if (selected) {

                answered++;


                const selectedAnswer =
                    Number(
                        selected.value
                    );


                if (
                    selectedAnswer ===
                    question.answer
                ) {

                    correct++;


                    review.push(`

                        <div
                            class="review-item review-correct"
                        >
                            ✓ Question ${index + 1}:
                            Correct —
                            ${question.options[question.answer]}
                        </div>

                    `);

                } else {

                    review.push(`

                        <div
                            class="review-item review-wrong"
                        >
                            ✗ Question ${index + 1}:
                            Incorrect —
                            Correct answer:
                            ${question.options[question.answer]}
                        </div>

                    `);

                }

            } else {

                review.push(`

                    <div
                        class="review-item review-wrong"
                    >
                        ✗ Question ${index + 1}:
                        Not answered —
                        Correct answer:
                        ${question.options[question.answer]}
                    </div>

                `);

            }

        }
    );


    const percentage =
        Math.round(
            (correct /
                assessmentQuestions.length) *
            100
        );


    state.assessmentScore =
        percentage;


    state.assessmentSubmitted =
        true;


    document.getElementById(
        "assessmentScoreCircle"
    ).textContent =
        percentage + "%";


    document.getElementById(
        "assessmentResultTitle"
    ).textContent =
        "Assessment Score: " +
        percentage +
        "%";


    document.getElementById(
        "assessmentResultText"
    ).textContent =
        `${correct} of ${assessmentQuestions.length}
         questions correct •
         ${answered} answered`;


    document.getElementById(
        "assessmentReview"
    ).innerHTML =
        review.join("");


    document
        .getElementById(
            "assessmentResult"
        )
        .classList.add("show");


    document.getElementById(
        "overallCompetency"
    ).textContent =
        percentage + "%";


    updateRecommendations(
        percentage
    );


    showToast(
        "Assessment evaluated successfully ✓"
    );


    setTimeout(
        () => {

            document
                .getElementById(
                    "assessmentResult"
                )
                .scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

        },
        150
    );

}


/* =========================================================
   RECOMMENDATIONS
========================================================= */

function updateRecommendations(
    score = state.assessmentScore
) {

    let level;

    let recommendations;


    if (score < 50) {

        level = "Beginner";


        recommendations = [

            {
                icon: "📋",

                name:
                    "Survey Methodology Fundamentals",

                difficulty:
                    "Beginner",

                duration:
                    "5 Hours",

                reason:
                    "Your assessment indicates that foundational survey methodology concepts should be strengthened."
            },


            {
                icon: "✓",

                name:
                    "Introduction to Data Quality",

                difficulty:
                    "Beginner",

                duration:
                    "3 Hours",

                reason:
                    "Build a strong foundation in data validation, accuracy and consistency."
            },


            {
                icon: "📊",

                name:
                    "Statistics Essentials",

                difficulty:
                    "Beginner",

                duration:
                    "4 Hours",

                reason:
                    "Strengthen your understanding of basic statistical concepts."
            }

        ];

    }


    else if (score <= 75) {

        level = "Intermediate";


        recommendations = [

            {
                icon: "📋",

                name:
                    "Survey Methodology Fundamentals",

                difficulty:
                    "Intermediate",

                duration:
                    "5 Hours",

                reason:
                    "Your Survey Methodology performance indicates an area for improvement."
            },


            {
                icon: "✓",

                name:
                    "Data Quality Management",

                difficulty:
                    "Intermediate",

                duration:
                    "4 Hours",

                reason:
                    "Improve your understanding of statistical data quality and validation."
            },


            {
                icon: "📊",

                name:
                    "Applied Data Visualization",

                difficulty:
                    "Intermediate",

                duration:
                    "3 Hours",

                reason:
                    "Develop stronger skills for communicating statistical insights visually."
            }

        ];

    }


    else {

        level = "Advanced";


        recommendations = [

            {
                icon: "📈",

                name:
                    "Advanced Statistical Analysis",

                difficulty:
                    "Advanced",

                duration:
                    "6 Hours",

                reason:
                    "Your assessment shows strong fundamentals. Progress toward advanced analysis."
            },


            {
                icon: "📊",

                name:
                    "Advanced Data Visualization",

                difficulty:
                    "Advanced",

                duration:
                    "5 Hours",

                reason:
                    "Move from basic charts to advanced analytical dashboards."
            },


            {
                icon: "✓",

                name:
                    "Statistical Data Quality Management",

                difficulty:
                    "Advanced",

                duration:
                    "4 Hours",

                reason:
                    "Deepen your understanding of quality frameworks for official statistics."
            }

        ];

    }


    document.getElementById(
        "recommendationSubtitle"
    ).textContent =

        `AI recommendations •
         ${level} learning pathway •
         Based on ${score}% assessment performance`;


    document.getElementById(
        "recommendationList"
    ).innerHTML =

        recommendations
            .map(
                course => {

                    return `

                        <div class="card course-card">

                            <div class="course-icon">
                                ${course.icon}
                            </div>

                            <h3>
                                ${course.name}
                            </h3>

                            <div class="course-meta">

                                <span>
                                    ${course.difficulty}
                                </span>

                                <span>
                                    ${course.duration}
                                </span>

                            </div>

                            <p>

                                <strong>
                                    Why this course?
                                </strong>

                                <br>

                                ${course.reason}

                            </p>

                            <button
                                class="btn btn-primary"
                                onclick="startCourse('${course.name}')"
                            >
                                Start Learning
                            </button>

                        </div>

                    `;

                }
            )
            .join("");

}


/* =========================================================
   START COURSE
========================================================= */

function startCourse(
    courseName
) {

    showToast(
        "Starting: " +
        courseName
    );


    setTimeout(
        () => {

            navigate(
                "learning"
            );

        },
        700
    );

}


/* =========================================================
   QUIZ BANK
========================================================= */

const quizBank = [

    {
        topic: "Statistics",

        question:
            "Which statistic is most commonly used to represent the arithmetic average?",

        options: [
            "Mean",
            "Median",
            "Mode",
            "Range"
        ],

        answer: 0
    },


    {
        topic: "Sampling",

        question:
            "What is the main purpose of sampling?",

        options: [
            "Study a representative subset of a population",
            "Remove all observations",
            "Increase errors",
            "Avoid collecting any data"
        ],

        answer: 0
    },


    {
        topic: "Data Visualization",

        question:
            "Which visualization is most suitable for comparing categories?",

        options: [
            "Bar chart",
            "Line chart only",
            "Paragraph",
            "Database table only"
        ],

        answer: 0
    },


    {
        topic: "Data Quality",

        question:
            "Which characteristic indicates that data contains few errors?",

        options: [
            "Accuracy",
            "Complexity",
            "Color",
            "Size"
        ],

        answer: 0
    },


    {
        topic: "Statistics",

        question:
            "What does variance measure?",

        options: [
            "Dispersion around the mean",
            "Number of categories",
            "Data source",
            "File format"
        ],

        answer: 0
    },


    {
        topic: "Sampling",

        question:
            "A census attempts to collect information from:",

        options: [
            "The entire population",
            "Only one respondent",
            "A random variable",
            "A chart"
        ],

        answer: 0
    },


    {
        topic: "Data Collection",

        question:
            "A questionnaire is primarily used to:",

        options: [
            "Collect structured information",
            "Delete observations",
            "Compress data",
            "Create passwords"
        ],

        answer: 0
    },


    {
        topic: "Data Interpretation",

        question:
            "What should be considered when interpreting a statistical result?",

        options: [
            "Context and underlying data",
            "Only the largest number",
            "Only the chart color",
            "The file name"
        ],

        answer: 0
    },


    {
        topic: "Data Quality",

        question:
            "Completeness of data refers to:",

        options: [
            "Required information being available",
            "Data having bright colors",
            "Data being encrypted",
            "Charts having labels"
        ],

        answer: 0
    },


    {
        topic: "Data Visualization",

        question:
            "Why are labels important in a chart?",

        options: [
            "They help users understand the displayed values",
            "They reduce data quality",
            "They remove observations",
            "They replace analysis"
        ],

        answer: 0
    },


    {
        topic: "Statistics",

        question:
            "Which measure identifies the most frequently occurring value?",

        options: [
            "Mode",
            "Mean",
            "Variance",
            "Standard deviation"
        ],

        answer: 0
    },


    {
        topic: "Sampling",

        question:
            "Stratified sampling divides a population into:",

        options: [
            "Relevant subgroups",
            "Random files",
            "Charts",
            "Errors"
        ],

        answer: 0
    },


    {
        topic: "Data Quality",

        question:
            "Consistency means that data:",

        options: [
            "Does not contain conflicting values across sources",
            "Must always be numerical",
            "Must contain images",
            "Must be deleted after analysis"
        ],

        answer: 0
    },


    {
        topic: "Data Visualization",

        question:
            "A histogram is particularly useful for displaying:",

        options: [
            "A numerical distribution",
            "A government logo",
            "A password",
            "A paragraph"
        ],

        answer: 0
    },


    {
        topic: "Statistics",

        question:
            "A correlation value close to +1 generally indicates:",

        options: [
            "Strong positive linear association",
            "No relationship",
            "Strong negative association",
            "Missing data"
        ],

        answer: 0
    }

];


/* =========================================================
   FILE UPLOAD
========================================================= */

const materialFile =
    document.getElementById(
        "materialFile"
    );


materialFile.addEventListener(
    "change",
    function() {

        const file =
            this.files[0];


        if (!file) {
            return;
        }


        state.uploadedFile =
            file;


        showUploadedFile(
            file
        );

    }
);


/* =========================================================
   SHOW FILE
========================================================= */

function showUploadedFile(
    file
) {

    const fileName =
        document.getElementById(
            "fileName"
        );


    fileName.textContent =
        "✓ File uploaded successfully: " +
        file.name;


    fileName.style.display =
        "block";


    showToast(
        "Learning material selected"
    );

}


/* =========================================================
   DRAG & DROP
========================================================= */

const uploadZone =
    document.getElementById(
        "uploadZone"
    );


uploadZone.addEventListener(
    "dragover",
    event => {

        event.preventDefault();

        uploadZone.style.borderColor =
            "#1769e0";

        uploadZone.style.background =
            "#f1f7ff";

    }
);


uploadZone.addEventListener(
    "dragleave",
    () => {

        uploadZone.style.borderColor =
            "#bdd2ee";

        uploadZone.style.background =
            "#f9fbff";

    }
);


uploadZone.addEventListener(
    "drop",
    event => {

        event.preventDefault();


        uploadZone.style.borderColor =
            "#bdd2ee";

        uploadZone.style.background =
            "#f9fbff";


        const file =
            event.dataTransfer.files[0];


        if (!file) {
            return;
        }


        const allowedExtensions = [

            ".pdf",

            ".doc",

            ".docx",

            ".txt"

        ];


        const extension =
            "." +
            file.name
                .split(".")
                .pop()
                .toLowerCase();


        if (
            !allowedExtensions.includes(
                extension
            )
        ) {

            showToast(
                "Please upload PDF, DOCX or TXT."
            );

            return;

        }


        state.uploadedFile =
            file;


        showUploadedFile(
            file
        );

    }
);


/* =========================================================
   GENERATE QUIZ
========================================================= */

function generateQuiz() {

    const count =
        Number(
            document.getElementById(
                "questionCount"
            ).value
        );


    const difficulty =
        document.getElementById(
            "difficulty"
        ).value;


    const loader =
        document.getElementById(
            "quizLoader"
        );


    const generatedArea =
        document.getElementById(
            "generatedQuiz"
        );


    if (!state.uploadedFile) {

        showToast(
            "Please select a learning material first."
        );


        uploadZone.style.borderColor =
            "#dc3545";


        setTimeout(
            () => {

                uploadZone.style.borderColor =
                    "#bdd2ee";

            },
            1200
        );


        return;

    }


    loader.classList.add(
        "show"
    );


    generatedArea.classList.remove(
        "show"
    );


    setTimeout(
        () => {

            state.generatedQuestions =
                shuffle(
                    [...quizBank]
                ).slice(
                    0,
                    Math.min(
                        count,
                        quizBank.length
                    )
                );


            document.getElementById(
                "generatedQuizInfo"
            ).textContent =

                `${state.generatedQuestions.length}
                 sample MCQs •
                 ${difficulty} •
                 Based on uploaded learning material`;


            renderGeneratedQuiz();


            loader.classList.remove(
                "show"
            );


            generatedArea.classList.add(
                "show"
            );


            showToast(
                "Quiz generated in AI Demo Mode ✓"
            );


            setTimeout(
                () => {

                    generatedArea.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                },
                100
            );

        },
        1800
    );

}


/* =========================================================
   SHUFFLE
========================================================= */

function shuffle(
    array
) {

    for (
        let i = array.length - 1;
        i > 0;
        i--
    ) {

        const j =
            Math.floor(
                Math.random() *
                (i + 1)
            );


        [
            array[i],
            array[j]
        ] =
        [
            array[j],
            array[i]
        ];

    }


    return array;

}


/* =========================================================
   RENDER QUIZ
========================================================= */

function renderGeneratedQuiz() {

    const container =
        document.getElementById(
            "quizQuestions"
        );


    container.innerHTML =

        state.generatedQuestions
            .map(
                (question, index) => {

                    return `

                        <div
                            class="card question-card"
                        >

                            <div
                                class="question-number"
                            >

                                Question ${index + 1}
                                • ${question.topic}

                            </div>


                            <div
                                class="question-text"
                            >

                                ${question.question}

                            </div>


                            ${question.options
                                .map(
                                    (option, optionIndex) => {

                                        return `

                                            <label
                                                class="option"
                                                onclick="selectOption(this)"
                                            >

                                                <input
                                                    type="radio"
                                                    name="generated-${index}"
                                                    value="${optionIndex}"
                                                >

                                                <span>
                                                    ${option}
                                                </span>

                                            </label>

                                        `;

                                    }
                                )
                                .join("")}

                        </div>

                    `;

                }
            )
            .join("");


    document
        .getElementById(
            "quizResult"
        )
        .classList.remove(
            "show"
        );

}


/* =========================================================
   SUBMIT QUIZ
========================================================= */

function submitGeneratedQuiz() {

    if (
        !state.generatedQuestions.length
    ) {

        showToast(
            "Generate a quiz first."
        );

        return;

    }


    let correct = 0;

    const review = [];


    state.generatedQuestions.forEach(
        (question, index) => {

            const selected =
                document.querySelector(
                    `input[name="generated-${index}"]:checked`
                );


            if (selected) {

                const selectedAnswer =
                    Number(
                        selected.value
                    );


                if (
                    selectedAnswer ===
                    question.answer
                ) {

                    correct++;


                    review.push(`

                        <div
                            class="review-item review-correct"
                        >
                            ✓ Question ${index + 1}:
                            Correct
                        </div>

                    `);

                } else {

                    review.push(`

                        <div
                            class="review-item review-wrong"
                        >
                            ✗ Question ${index + 1}:
                            Incorrect —
                            Correct answer:
                            ${question.options[question.answer]}
                        </div>

                    `);

                }

            } else {

                review.push(`

                    <div
                        class="review-item review-wrong"
                    >
                        ✗ Question ${index + 1}:
                        Not answered —
                        Correct answer:
                        ${question.options[question.answer]}
                    </div>

                `);

            }

        }
    );


    const total =
        state.generatedQuestions.length;


    const percentage =
        Math.round(
            (correct /
                total) *
            100
        );


    state.quizScore =
        percentage;


    state.quizSubmitted =
        true;


    document.getElementById(
        "quizScoreCircle"
    ).textContent =
        percentage + "%";


    document.getElementById(
        "quizResultText"
    ).textContent =

        `Score: ${correct}/${total}
         • Accuracy: ${percentage}%`;


    document.getElementById(
        "quizReview"
    ).innerHTML =
        review.join("");


    document
        .getElementById(
            "quizResult"
        )
        .classList.add(
            "show"
        );


    document.getElementById(
        "quizAccuracy"
    ).textContent =
        percentage + "%";


    showToast(
        "Quiz evaluated successfully ✓"
    );


    setTimeout(
        () => {

            document
                .getElementById(
                    "quizResult"
                )
                .scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

        },
        100
    );

}


/* =========================================================
   LEARNING BARS
========================================================= */

function animateLearningBars() {

    document
        .querySelectorAll(
            ".learning-bar"
        )
        .forEach(
            bar => {

                const progress =
                    bar.dataset.progress;


                setTimeout(
                    () => {

                        bar.style.width =
                            progress + "%";

                    },
                    100
                );

            }
        );

}


/* =========================================================
   ANALYTICS
========================================================= */

function animateCharts() {

    document
        .querySelectorAll(
            ".chart-bar"
        )
        .forEach(
            bar => {

                const value =
                    bar.dataset.value;


                setTimeout(
                    () => {

                        bar.style.height =
                            value + "%";

                    },
                    100
                );

            }
        );

}