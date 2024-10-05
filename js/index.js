// Настройка текста в эллипсе

function updatePath() {
    const path = document.getElementById("textPath");
    if (window.innerWidth <= 576) {
        path.setAttribute("d", "M583,153 a120,120 0 1,1 0,265 a120,120 0 1,1 0,-265");
    } else {
        path.setAttribute("d", "M330,25 a305,305 0 1,1 0,610 a305,305 0 1,1 0,-610");
    }
}
updatePath();

// Анимация самолета

function startAnimation() {
    const image = document.querySelector(".stage_image");

    const moveDistance = window.innerWidth + 1500;

    const animateImage = () => {
        image.style.transition = "transform 6s ease";
        image.style.transform = `translateY(-550px) translateX(-${moveDistance}px)`;

        setTimeout(() => {
            image.style.transition = "none";
            image.style.transform = `translateY(0) translateX(${window.innerWidth}px)`;

            setTimeout(() => {
                image.style.transition = "transform 3s";
                image.style.transform = `translateY(0) translateX(0)`;

                setTimeout(animateImage, 5000);
            }, 100);
        }, 3000);
    };

    setTimeout(animateImage, 3000);
}

startAnimation();

// Слайдер этапов

const stageArrowLeft = document.querySelector("#stage__arrow_left");
const stageArrowRight = document.querySelector("#stage__arrow_right");
const stageCarousel = document.querySelector(".stage__carousel");
const stageLine = document.querySelector(".stage__line");
const stageItem = document.querySelector(".stage__line .stage__item");
const stageDots = document.querySelectorAll(".dots-wrapper span");

let stageItemWidth = stageItem.clientWidth;
let maxCountStage = stageLine.childElementCount;
let countStage = 1;
let offsetStage = 0;

stageArrowLeft.addEventListener("click", () => {
    if (stageArrowLeft.classList.contains("disabled")) {
        return;
    }
    countStage--;
    toggleClassDots();
    checkArrowDisabled();
    offsetStage -= stageItemWidth + 20;
    stageLine.style.left = "-" + offsetStage + "px";
});

stageArrowRight.addEventListener("click", () => {
    if (stageArrowRight.classList.contains("disabled")) {
        return;
    }
    countStage++;
    toggleClassDots();
    checkArrowDisabled();
    offsetStage += stageItemWidth + 20;
    stageLine.style.left = "-" + offsetStage + "px";
});

for (let dot of stageDots) {
    dot.addEventListener("click", (e) => {
        countStage = dot.dataset.id;
        toggleClassDots();
        checkArrowDisabled();
        offsetStage = stageItemWidth * (dot.dataset.id - 1) + 20 * (dot.dataset.id - 1);
        stageLine.style.left = "-" + offsetStage + "px";
    });
}

function checkArrowDisabled() {
    if (countStage == maxCountStage) {
        stageArrowLeft.classList.remove("disabled");
        stageArrowRight.classList.add("disabled");
    } else if (countStage == 1) {
        stageArrowLeft.classList.add("disabled");
        stageArrowRight.classList.remove("disabled");
    } else {
        stageArrowLeft.classList.remove("disabled");
        stageArrowRight.classList.remove("disabled");
    }
}

function toggleClassDots() {
    stageDots.forEach((element) => {
        element.classList.remove("active");
        if (element.dataset.id == countStage) {
            element.classList.add("active");
        }
    });
}

// Слайдер участников

const memberArrowLeft = document.querySelector("#member__arrow_left");
const memberArrowRight = document.querySelector("#member__arrow_right");
const memberCarousel = document.querySelector(".members__carousel");
const memberLine = document.querySelector(".members__line");
const memberItem = document.querySelector(".members__item");
const countSliderMembers = document.querySelector(".member__arrow-wrapper p span");

let minCountMember = Math.round(
    memberCarousel.clientWidth / (memberItem.clientWidth + 20)
);
let maxCountMember = memberLine.childElementCount;
let widthMember = memberItem.clientWidth;
let offsetMember = 0;
let countMember = 0;

const updateSlider = (direction) => {
    if (direction === "right") {
        offsetMember += widthMember + 20;
        if (countMember === maxCountMember) {
            offsetMember = 0;
            countMember = minCountMember;
        } else {
            countMember++;
        }
    } else {
        offsetMember -= widthMember + 20;
        if (countMember === minCountMember) {
            offsetMember =
                widthMember * (maxCountMember - minCountMember) +
                (maxCountMember - minCountMember) * 20;
            countMember = maxCountMember;
        } else {
            countMember--;
        }
    }
    countSliderMembers.innerHTML = countMember;
    memberLine.style.left = "-" + offsetMember + "px";
};

memberArrowLeft.addEventListener("click", () => updateSlider("left"));
memberArrowRight.addEventListener("click", () => updateSlider("right"));

setInterval(() => {
    updateSlider("right");
}, 4000);

const anchors = document.querySelectorAll('a[href*="#"]');
for (let anchor of anchors) {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const blockID = anchor.getAttribute("href").substr(1);
        document.getElementById(blockID).scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    });
}

document.addEventListener("DOMContentLoaded", () => {
    countSliderMembers.innerHTML = countMember = Math.round(
        memberCarousel.clientWidth / (memberItem.clientWidth + 20)
    );
});

window.addEventListener("resize", () => {
    updatePath();

    widthMember = memberItem.clientWidth;
    minCountMember = Math.round(
        memberCarousel.clientWidth / (memberItem.clientWidth + 20)
    );
    countSliderMembers.innerHTML = countMember = Math.round(
        memberCarousel.clientWidth / (memberItem.clientWidth + 20)
    );
});
