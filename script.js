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
const planFlowTitle = document.querySelector("#plan-flow-title");
const planProgress = document.querySelector(".plan-flow .progress");
const planCompleteStatus = document.querySelector("#plan-complete-status");
const flowSteps = planFlow.querySelectorAll(".step");
const progressItems = planFlow.querySelectorAll(".progress__item");
const goalInput = document.querySelector("#sport-goal");
const goalError = document.querySelector("#goal-error");
const goalNext = document.querySelector("#goal-next");
const durationRange = document.querySelector("#duration-range");
const durationError = document.querySelector("#duration-error");
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
// 최종 운동 계획 요약 카드 요소
const finalBmi = document.querySelector("#final-bmi");
const finalTheme = document.querySelector("#final-theme");
const finalGoal = document.querySelector("#final-goal");
const finalDuration = document.querySelector("#final-duration");
const finalStretching = document.querySelector("#final-stretching");

const formData = {
    goal:"", duration: "30", stretching: false, stretchingCount: "10"
};


function showStep(index) {
    // 해당 단계만 표시
    flowSteps.forEach((step, i) => {
        step.hidden = i !== index;
    });

    // 진행 단계 강조
    progressItems.forEach((item, i) => {
        item.classList.toggle("is-active", i === index);
    });

    // 마지막 단계인지 확인
    const isComplete = index === 3;

    // 완료 시 제목 변경
    planFlowTitle.textContent = isComplete
        ? "계획 설정 완료"
        : "계획 설정";

    // 완료 시 진행 단계 숨기기
    planProgress.hidden = isComplete;

    // 완료 시 완료 상태 표시
    planCompleteStatus.hidden = !isComplete;
}

const informationDialog = document.querySelector("#information-dialog");
const informationCancel = document.querySelector("#information-cancel");
const informationConfirm = document.querySelector("#information-confirm");

function revokeInformationAgreement() {
    agreeCheck.checked = false;

    bmiSection.hidden = true;
    planFlow.hidden = true;

    // BMI 요약 모드 해제
    bmiSection.classList.remove("is-compact");

    clearBmiResult();
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


informationConfirm.addEventListener("click", () => {
    if (!agreeCheck.checked) return;

    informationDialog.close();

    // BMI 요약 모드 해제
    bmiSection.classList.remove("is-compact");

    bmiSection.hidden = false;
    planFlow.hidden = true;

    bmiSection.scrollIntoView({ behavior: "smooth" });
    bmiHeight.focus();
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
    const duration = Number(durationRange.value);
    const stretching = stretchingOption.checked;

    const selectedCount = document.querySelector(
        'input[name="stretching-count"]:checked'
    );

    const stretchingCount = Number(selectedCount.value);

    // 이전 오류 메시지 초기화
    durationError.textContent = "";

    // 스트레칭이 총 운동 시간 이상이면 오류 표시
    if (stretching && stretchingCount >= duration) {
        durationError.textContent =
            "스트레칭 시간은 총 운동 시간보다 짧아야 합니다.";
        return;
    }

    // 운동 계획 데이터 저장
    formData.duration = String(duration);
    formData.stretching = stretching;
    formData.stretchingCount = String(stretchingCount);

    // 확인 단계 내용 표시
    summaryGoal.textContent = formData.goal;
    summaryDuration.textContent = duration + "분";

    summaryStretching.textContent = stretching
        ? stretchingCount + "분 포함"
        : "미포함";

    showStep(2);
});

summaryPrev.addEventListener("click", () => showStep(1));


finishButton.addEventListener("click", () => {
    // BMI 계산 결과 가져오기
    finalBmi.textContent = bmiNumber.textContent || "-";

    // BMI로 추천받은 테마 가져오기
    finalTheme.textContent =
        bmiRecommendation.textContent || "-";

    // 기존 운동 계획 입력 내용 가져오기
    finalGoal.textContent = formData.goal;
    finalDuration.textContent = formData.duration + "분";

    finalStretching.textContent = formData.stretching
        ? formData.stretchingCount + "분 포함"
        : "미포함";

    // 최종 요약 카드 화면으로 이동
    showStep(3);
});

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

    durationError.textContent = "";

    document.querySelector(
        'input[name="stretching-count"][value="10"]'
    ).checked = true;

    summaryGoal.textContent = "";
    summaryDuration.textContent = "";
    summaryStretching.textContent = "";
    
    // 최종 요약 카드 초기화
    finalBmi.textContent = "-";
    finalTheme.textContent = "-";
    finalGoal.textContent = "-";
    finalDuration.textContent = "-";
    finalStretching.textContent = "-";

    showStep(0);
    goalInput.focus();
});


/* =========================================
   중간고사 신규 기능: BMI 및 BARRE 테마 추천
========================================= */

// BMI 화면 요소
const bmiSection = document.querySelector("#bmi-section");
const bmiHeight = document.querySelector("#bmi-height");
const bmiWeight = document.querySelector("#bmi-weight");
const bmiCalculate = document.querySelector("#bmi-calculate");
const bmiError = document.querySelector("#bmi-error");
const bmiResult = document.querySelector("#bmi-result");
const bmiNumber = document.querySelector("#bmi-number");
const bmiRecommendation = document.querySelector("#bmi-recommendation");
const bmiReason = document.querySelector("#bmi-reason");
const bmiReset = document.querySelector("#bmi-reset");
const bmiContinue = document.querySelector("#bmi-continue");

// BARRE 테마 탭 요소
const bmiThemeTabs = document.querySelectorAll(".bmi-theme-tab");
const bmiThemeName = document.querySelector("#bmi-theme-name");
const bmiThemeIntensity = document.querySelector("#bmi-theme-intensity");
const bmiThemeDescription = document.querySelector("#bmi-theme-description");

// 테마별 설명
const barreThemes = {
    MOVE: {
        title: "MOVE - 전신 바레",
        intensity: "운동 강도: 중~고강도",
        description: "바레의 기본 동작을 바탕으로 전신을 고르게 움직이는 프로그램입니다."
    },
    BALANCE: {
        title: "BALANCE - 자세와 균형",
        intensity: "운동 강도: 중~고강도",
        description: "발레 동작을 응용해 신체 정렬과 균형 감각을 연습하는 프로그램입니다."
    },
    CORE: {
        title: "CORE - 코어 강화",
        intensity: "운동 강도: 중~고강도",
        description: "필라테스 요소를 활용해 복부와 몸통의 안정성을 기르는 프로그램입니다."
    },
    CARDIO: {
        title: "CARDIO - 유산소 바레",
        intensity: "운동 강도: 중~고강도",
        description: "리듬감 있는 연속 동작을 통해 심폐 지구력과 활동량을 높이는 프로그램입니다."
    },
    BURN: {
        title: "BURN - 근력 집중",
        intensity: "운동 강도: 고강도",
        description: "집중적인 근력 운동과 마무리 회복 동작을 결합한 프로그램입니다."
    },
    SLOW: {
        title: "SLOW - 호흡과 정렬",
        intensity: "운동 강도: 저~중강도",
        description: "호흡과 신체 정렬에 집중하며 동작을 천천히 조절하는 프로그램입니다."
    }
};

// BMI에 따른 추천 기준
function recommendBarreTheme(bmi) {
    if (bmi < 18.5) {
        return {
            theme: "SLOW",
            reason: "호흡과 자세를 중심으로 천천히 움직이는 테마를 추천합니다."
        };
    }

    if (bmi < 23) {
        return {
            theme: "CORE",
            reason: "코어 안정성과 기초 근력을 강화하는 테마를 추천합니다."
        };
    }

    if (bmi < 25) {
        return {
            theme: "MOVE",
            reason: "전신을 고르게 움직이는 기본 바레 테마를 추천합니다."
        };
    }

    if (bmi < 30) {
        return {
            theme: "BALANCE",
            reason: "균형과 자세를 중심으로 움직이는 테마를 추천합니다."
        };
    }

    return {
        theme: "SLOW",
        reason: "낮은 강도의 동작부터 시작할 수 있는 테마를 추천합니다."
    };
}

// 선택한 테마의 설명 표시
function showBarreTheme(themeName) {
    const theme = barreThemes[themeName];

    if (!theme) return;

    bmiThemeName.textContent = theme.title;
    bmiThemeIntensity.textContent = theme.intensity;
    bmiThemeDescription.textContent = theme.description;

    bmiThemeTabs.forEach((tab) => {
        const isSelected = tab.dataset.theme === themeName;

        tab.classList.toggle("is-active", isSelected);
        tab.setAttribute("aria-selected", String(isSelected));
    });
}

// 오류 상태 초기화
function clearBmiErrors() {
    bmiError.textContent = "";

    bmiHeight.classList.remove("has-error");
    bmiWeight.classList.remove("has-error");

    bmiHeight.removeAttribute("aria-invalid");
    bmiWeight.removeAttribute("aria-invalid");
}

// 계산 결과 숨기기
function clearBmiResult() {
    bmiResult.hidden = true;

    bmiNumber.textContent = "";
    bmiRecommendation.textContent = "";
    bmiReason.textContent = "";

    clearBmiErrors();

    bmiThemeName.textContent = "";
    bmiThemeIntensity.textContent = "";
    bmiThemeDescription.textContent = "";

    bmiThemeTabs.forEach((tab) => {
        tab.classList.remove("is-active");
        tab.setAttribute("aria-selected", "false");
    });
}

// BMI 입력값 검사
function validateBmiInputs() {
    clearBmiErrors();

    const height = Number(bmiHeight.value);
    const weight = Number(bmiWeight.value);

    if (bmiHeight.value.trim() === "" ||
        !Number.isFinite(height) ||
        height < 100 ||
        height > 250) {

        bmiError.textContent = "키를 100~250cm 범위로 입력해 주세요.";
        bmiHeight.classList.add("has-error");
        bmiHeight.setAttribute("aria-invalid", "true");
        bmiHeight.focus();

        return null;
    }

    if (bmiWeight.value.trim() === "" ||
        !Number.isFinite(weight) ||
        weight < 20 ||
        weight > 300) {

        bmiError.textContent = "몸무게를 20~300kg 범위로 입력해 주세요.";
        bmiWeight.classList.add("has-error");
        bmiWeight.setAttribute("aria-invalid", "true");
        bmiWeight.focus();

        return null;
    }

    return { height, weight };
}

// BMI 계산 버튼 클릭
bmiCalculate.addEventListener("click", () => {
    // 이전 결과는 숨긴 후 새로 계산
    clearBmiResult();

    const values = validateBmiInputs();

    if (!values) return;

    const heightInMeters = values.height / 100;
    const bmi = values.weight / (heightInMeters * heightInMeters);

    const recommendation = recommendBarreTheme(bmi);

    bmiNumber.textContent = bmi.toFixed(1);
    bmiRecommendation.textContent = recommendation.theme;
    bmiReason.textContent = recommendation.reason;

    bmiResult.hidden = false;

    // 추천 테마 설명을 자동으로 선택
    showBarreTheme(recommendation.theme);

    bmiResult.scrollIntoView({ behavior: "smooth", block: "start" });
});

// 다른 BARRE 테마 설명 보기
bmiThemeTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
        showBarreTheme(tab.dataset.theme);
    });
});

// 입력값을 바꾸면 이전 계산 결과 숨기기
[bmiHeight, bmiWeight].forEach((input) => {
    input.addEventListener("input", () => {
        clearBmiResult();
    });
});

// 다시 계산하기
bmiReset.addEventListener("click", () => {
    bmiHeight.value = "";
    bmiWeight.value = "";

    clearBmiResult();

    bmiHeight.focus();
});

// BMI 요약을 유지하면서 운동 계획 설정으로 이동
bmiContinue.addEventListener("click", () => {
    if (bmiResult.hidden) return;

    // BMI와 추천 테마만 보이는 요약 모드
    bmiSection.classList.add("is-compact");

    // 기존 운동 계획 설정 표시
    planFlow.hidden = false;
    showStep(0);

    planFlow.scrollIntoView({ behavior: "smooth" });
    goalInput.focus();
});
