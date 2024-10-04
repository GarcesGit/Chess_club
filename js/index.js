const memberArrowLeft = document.querySelector("#MEMBER-ARROW-LEFT");
const memberArrowRight = document.querySelector("#MEMBER-ARROW-RIGHT");
const memberCarousel = document.querySelector(".members-carousel");
const memberLine = document.querySelector(".members-line");
const memberItem = document.querySelector(".members-item");
const countSliderMembers = document.querySelector(".arrow-wrapper--member p span");

let minCountMember = Math.round(
    memberCarousel.clientWidth / (memberItem.clientWidth + 20)
);
let maxCountMember = memberLine.childElementCount;
let widthMember = memberItem.clientWidth;
let offsetMember = 0;
let countMember = 0;

memberArrowLeft.addEventListener("click", () => {
    offsetMember -= widthMember + 20;
    if (countMember == minCountMember) {
        offsetMember =
            widthMember * (maxCountMember - minCountMember) +
            (maxCountMember - minCountMember) * 20;
        countMember = maxCountMember;
    } else {
        countMember--;
    }
    countSliderMembers.innerHTML = countMember;
    memberLine.style.left = "-" + offsetMember + "px";
});

memberArrowRight.addEventListener("click", () => {
    offsetMember += widthMember + 20;
    if (countMember == maxCountMember) {
        offsetMember = 0;
        countMember = minCountMember;
    } else {
        countMember++;
    }
    countSliderMembers.innerHTML = countMember;
    memberLine.style.left = "-" + offsetMember + "px";
});

// ANCHORS
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

// STAGE SLIDER
const stageArrowLeft = document.querySelector("#STAGE-ARROW-LEFT");
const stageArrowRight = document.querySelector("#STAGE-ARROW-RIGHT");
const stageCarousel = document.querySelector(".stage-carousel");
const stageLine = document.querySelector(".stage-line");
const stageItem = document.querySelector(".stage-line .stage-item");
const dotsStage = document.querySelectorAll(".dots-wrapper span");

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

for (let dot of dotsStage) {
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
    dotsStage.forEach((element) => {
        element.classList.remove("active");
        if (element.dataset.id == countStage) {
            element.classList.add("active");
        }
    });
}
document.addEventListener("DOMContentLoaded", () => {
    countSliderMembers.innerHTML = countMember = Math.round(
        memberCarousel.clientWidth / (memberItem.clientWidth + 20)
    );
});

function updatePath() {
    const path = document.getElementById("textPath");
    if (window.innerWidth <= 576) {
        path.setAttribute("d", "M150,25 a150,150 0 1,1 0,300 a150,150 0 1,1 0,-300");
    }
}
updatePath();

window.addEventListener("resize", updatePath);

window.addEventListener("resize", () => {
    widthMember = memberItem.clientWidth;
    stageItemWidth = stageItem.clientWidth;
    countSliderMembers.innerHTML = countMember = Math.round(
        memberCarousel.clientWidth / (memberItem.clientWidth + 20)
    );
    minCount = Math.round(memberCarousel.clientWidth / (memberItem.clientWidth + 20));
});
