const serviceName = "BARRE";
let isSubscribed = false;
let submitCount = 0;

function makeSubscribeMessage(email, subscribed) {
    if (subscribed == true) {
        return email + "로 신청이 완료되었습니다.";
    }

    return "이메일을 입력한 뒤 신청해주세요.";
}

const subscribeForm = document.querySelector("#subscribe-form");
const emailInput = document.querySelector("#email");
const subscribeButton = document.querySelector("#subscribeButton");
const subscribeMessage = document.querySelector("#subscribeMessage");

function handleSubscribe(event) {
    event.preventDefault();

    const subscribeEmail = emailInput.value.trim();

    if (subscribeEmail === "") {
        subscribeMessage.textContent =
            "이메일을 입력한 뒤 신청해주세요."
        emailInput.focus();
        return;
    }

    isSubscribed = true;
    submitCount += 1;

    subscribeMessage.textContent =
        makeSubscribeMessage(subscribeEmail, isSubscribed);

    subscribeMessage.classList.add("is-success");

    subscribeButton.textContent = "신청 완료";
    subscribeButton.disabled = true;
}

subscribeForm.addEventListener("submit", handleSubscribe);

const themeButton = document.querySelector("#themeButton");
const nicknameInput = document.querySelector("#nickname");
const nicknameCount = document.querySelector("#nicknameCount");
const agreeCheck = document.querySelector("#agreeCheck");
const agreeMessage = document.querySelector("#agreeMessage");
const startButton = document.querySelector("#startButton");

function handleThemeClick() {
    const isDark = document.body.classList.toggle("dark");

    themeButton.textContent = isDark ? "라이트 테마로 바꾸기" : "다크 테마로 바꾸기";
}

themeButton.addEventListener("click", handleThemeClick);

function handleNicknameInput() {
    const maxLength = nicknameInput.maxLength;
    const currentLength = Math.min(nicknameInput.value.length, maxLength);

    nicknameCount.textContent = currentLength + " / " + maxLength;
}

nicknameInput.addEventListener("input", handleNicknameInput);

function handleAgreeChange() {
    const agreed = agreeCheck.checked;

    startButton.disabled = !agreed;
    agreeMessage.textContent = agreed
        ? "계획 설정을 시작할 수 있습니다."
        : "동의 후 계획 설정을 시작할 수 있습니다.";

    if (agreed) {
        agreeMessage.classList.add("is-ready");
    } else {
        agreeMessage.classList.remove("is-ready");
    }
}

agreeCheck.addEventListener("change", handleAgreeChange)

const tabs = document.querySelectorAll(".tab");
const panels = document.querySelectorAll(".panel");

function resetTabsAndPanels() {
    tabs.forEach(function (tab) {
        tab.classList.remove("is-active");
        tab.setAttribute("aria-selected", "false");
    });
    panels.forEach(function (panel) {
        panel.classList.remove("is-active");
        panel.hidden = true;
    });
}

function activateTab(clickedTab) {
    const targetSelector = clickedTab.dataset.target;
    const targetPanel = document.querySelector("#" + targetSelector);

    clickedTab.classList.add("is-active");
    clickedTab.setAttribute("aria-selected", "true");

    targetPanel.classList.add("is-active");
    targetPanel.hidden = false;
}

function handleTabClick(event) {
    resetTabsAndPanels();
    activateTab(event.currentTarget);
}

tabs.forEach(function (tab) {
    tab.addEventListener("click", handleTabClick);
});

const planFlow = document.querySelector("#plan-flow");
const flowSteps = planFlow.querySelectorAll(".step");
const progressItems = planFlow.querySelectorAll(".progress__item");
const goalInput = document.querySelector("#sport-goal");
const goalError = document.querySelector("#goal-error");
const goalNext = document.querySelector("#goal-next");
const durationRange = document.querySelector("#duration-range");
const durationValue = document.querySelector("#duration-value");
const stretchingOption = document.querySelector("#stretching-option");
const stretchingOptions = document.querySelector("#stretching-options");
const optionPrev = document.querySelector("#option-prev");
const optionNext = document.querySelector("#option-next");
const summaryPrev = document.querySelector("#summary-prev");
const finishButton = document.querySelector("#finish-button");
const restartButton = document.querySelector("#restart-button");
const summaryGoal = document.querySelector("#summary-goal");
const summaryDuration = document.querySelector("#summary-duration");
const summaryStretching = document.querySelector("#summary-stretching");

const formData = {
    goal:"", duration: "30", stretching: false, stretchingCount: "10"
};

function showStep(index) {
    flowSteps.forEach((step, i) => { step.hidden = i !== index; });
    progressItems.forEach((item, i) => {
        item.classList.toggle("is-active", i === index);
    });
}

const informationDialog = document.querySelector("#information-dialog");
const informationCancel = document.querySelector("#information-cancel");
const informationComfirm = document.querySelector("#information-comfirm");

function revokeInformationAgreement() {
    agreeCheck.checked = false;
    planFlow.hidden = true;
    handleAgreeChange();
    agreeCheck.focus();
}

startButton.addEventListener("click", () => {
    if (!agreeCheck.checked) return;
    informationDialog.showModal();
});
informationCancel.addEventListener("click", () => {
    informationDialog.close();
    revokeInformationAgreement();
});
informationDialog.addEventListener("cancel", revokeInformationAgreement);
informationComfirm.addEventListener("click", () => {
    if (!agreeCheck.checked) return;
    informationDialog.close();
    planFlow.hidden = false;
    showStep(0);
    planFlow.scrollIntoView({ behavior: "smooth" });
    goalInput.focus();
});

function validateGoal() {
    const value = goalInput.value.trim();
    if (!value) {
        goalError.textContent = "운동 목표를 입력해 주세요.";
        goalInput.classList.add("has-error");
        goalInput.focus();
        return false;
    }
    goalError.textContent = "";
    goalInput.classList.remove("has-error");
    formData.goal = value;
    return true;
}

goalNext.addEventListener("click", () => {
    if (!validateGoal()) return;
    showStep(1);
});

durationRange.addEventListener("input", () => {
    durationValue.value = durationRange.value + "분";
});
stretchingOption.addEventListener("change", () => {
    stretchingOptions.hidden = !stretchingOption.checked;
});

optionPrev.addEventListener("click", () => showStep(0));
optionNext.addEventListener("click", () => {
    formData.duration = durationRange.value;
    formData.stretching = stretchingOption.checked;

    const count = document.querySelector(
        'input[name="stretching-count"]:checked'
    );

    formData.stretchingCount = count.value;

    summaryGoal.textContent = formData.goal;
    summaryDuration.textContent = formData.duration + "분";
    summaryStretching.textContent = formData.stretching
        ? formData.stretchingCount + "분 포함"
        : "미포함";

    showStep(2);
});

summaryPrev.addEventListener("click", () => showStep(1));

finishButton.addEventListener("click", () => showStep(3));

restartButton.addEventListener("click", () => {
    console.log("다시 설정하기 버튼 클릭됨");
    
    formData.goal = "";
    formData.duration = "30";
    formData.stretching = false;
    formData.stretchingCount = "10";

    goalInput.value = "";
    goalError.textContent = "";
    goalInput.classList.remove("has-error");

    durationRange.value = "30";
    durationValue.value = "30분";

    stretchingOption.checked = false;
    stretchingOptions.hidden = true;

    document.querySelector(
        'input[name="stretching-count"][value="10"]'
    ).checked = true;

    summaryGoal.textContent = "";
    summaryDuration.textContent = "";
    summaryStretching.textContent = "";

    showStep(0);
    goalInput.focus();
});