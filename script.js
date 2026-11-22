const serviceName = "BARRE";
let isSubscribed = false;
let submitCount = 0;

function makeSubscribeMessage(email, subscribed) {
    if (subscribed) {return email + "로 신청이 완료되었습니다.";}
    return "이메일을 입력한 뒤 신청해주세요.";
}

const menuToggle = document.querySelector("#menu-toggle");
const mainNav = document.querySelector("#main-nav");

menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.textContent =
        isOpen
            ? "✕"
            : "☰";
});

const navLinks = document.querySelectorAll(".main-nav a");
const sections = document.querySelectorAll("main section");

navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        if (window.innerWidth <= 768) {
            mainNav.classList.remove("is-open");
            menuToggle.textContent = "☰";
            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );
        }
    });
});

function updateCurrentNav() {
    let currentSection = "";
    sections.forEach((section) => {

        const top = section.offsetTop - 150;
        const bottom = top + section.offsetHeight;

        if (
            window.scrollY + 150 >= top &&
            window.scrollY + 150 < bottom
        ) {
            currentSection = section.id;
        }
    });

    navLinks.forEach((link) => {
        const target = link.getAttribute("href").replace("#", "");
        const isCurrent = target === currentSection;

        link.classList.toggle("is-current", isCurrent);

        if (isCurrent) {
            link.setAttribute(
                "aria-current",
                "page"
            );
        } else {
            link.removeAttribute(
                "aria-current"
            );
        }
    });

    navLinks.forEach((link) => {

        const target =
            link.getAttribute("href")
                .replace("#", "");
    
        const isCurrent =
            target === currentSection;
    
        link.classList.toggle(
            "is-current",
            isCurrent
        );
    
        if (isCurrent) {
    
            link.setAttribute(
                "aria-current",
                "page"
            );
    
        } else {
    
            link.removeAttribute(
                "aria-current"
            );
    
        }
    
    });
    
    /* 여기부터 추가 */
    
    const reachedBottom =
        window.innerHeight + window.scrollY
        >= document.documentElement.scrollHeight - 10;
    
    if (reachedBottom) {
    
        navLinks.forEach((link) => {
    
            link.classList.remove("is-current");
            link.removeAttribute("aria-current");
    
        });
    
        const subscribeLink =
            document.querySelector(
                '.main-nav a[href="#subscribe"]'
            );
    
        subscribeLink.classList.add("is-current");
    
        subscribeLink.setAttribute(
            "aria-current",
            "page"
        );
    
    }
}

window.addEventListener("scroll", updateCurrentNav);

updateCurrentNav();

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
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
    document.body.classList.add("dark");
    themeButton.textContent =
        "라이트 테마로 바꾸기";
}
const startButton = document.querySelector("#startButton");

function handleThemeClick() {
    const isDark = document.body.classList.toggle("dark");
    localStorage.setItem(
        "theme",
        isDark ? "dark" : "light"
    );

    themeButton.textContent = isDark
        ? "라이트 테마로 바꾸기"
        : "다크 테마로 바꾸기";
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
const goalHelp = document.querySelector("#goal-help");
const goalCount = document.querySelector("#goal-count");
const submitStatus = document.querySelector("#submit-status");
const goalNext = document.querySelector("#goal-next");
const dayPrev = document.querySelector("#day-prev");
const dayNext = document.querySelector("#day-next");
const dayError = document.querySelector("#day-error");
const conditionPrev = document.querySelector("#condition-prev");
const conditionNext = document.querySelector("#condition-next");
const conditionRange = document.querySelector("#condition-range");
const conditionValue = document.querySelector("#condition-value");
const recommendedTheme = document.querySelector("#recommended-theme");
const conditionError = document.querySelector("#condition-error");
const durationRange = document.querySelector("#duration-range");
const durationError = document.querySelector("#duration-error");
const durationValue = document.querySelector("#duration-value");
const stretchingOption = document.querySelector("#stretching-option");
const stretchingOptions = document.querySelector("#stretching-options");
const optionPrev = document.querySelector("#option-prev");
const optionNext = document.querySelector("#option-next");
const summaryPrev = document.querySelector("#summary-prev");
const finishButton = document.querySelector("#finish-button");
const planSubmitForm = document.querySelector("#plan-submit-form");
const restartButton = document.querySelector("#restart-button");
const addPlanButton = document.querySelector("#add-plan-button");
const summaryGoal = document.querySelector("#summary-goal");
const summaryDuration = document.querySelector("#summary-duration");
const summaryStretching = document.querySelector("#summary-stretching");
const summaryDay = document.querySelector("#summary-day");
const summaryCondition = document.querySelector("#summary-condition");
const summaryTheme = document.querySelector("#summary-theme");
const finalDay = document.querySelector("#final-day");
const finalCondition = document.querySelector("#final-condition");
const bmiRank1 = document.querySelector("#bmi-rank-1");
const bmiRank2 = document.querySelector("#bmi-rank-2");
const bmiRank3 = document.querySelector("#bmi-rank-3");
const filterButtons = document.querySelectorAll(".filter-button");
// 최종 운동 계획 요약 카드 요소
const finalBmi = document.querySelector("#final-bmi");
const finalTheme = document.querySelector("#final-theme");
const finalGoal = document.querySelector("#final-goal");
const finalDuration = document.querySelector("#final-duration");
const finalStretching = document.querySelector("#final-stretching");
const planList = document.querySelector("#plan-list");
const planCount = document.querySelector("#plan-count");
const planEmpty = document.querySelector("#plan-empty");
const planDetailDialog = document.querySelector("#plan-detail-dialog");
const planDetailContent = document.querySelector("#plan-detail-content");
const planDetailClose = document.querySelector("#plan-detail-close");

const savedPlans =JSON.parse(localStorage.getItem("savedPlans")) || [];

let currentFilter = "all";

const formData = {
    goal:"",
    day:"",
    condition:"",
    theme:"",
    duration:"30",
    stretching:false,
    stretchingCount:"10"
};

function renderPlans() {

    planList.innerHTML = "";

    const filteredPlans =
        savedPlans.filter((plan) => {

            if (currentFilter === "all") {
                return true;
            }

            if (currentFilter === "active") {
                return plan.status === "active";
            }

            if (currentFilter === "cancelled") {
                return plan.status === "cancelled";
            }

            return true;
        });

        filteredPlans.forEach((plan) => {
            const item = document.createElement("div");

        item.className = "final-plan-item";

            item.innerHTML = `

            <span class="
                plan-status
                ${plan.status === "cancelled"
                    ? "is-cancelled"
                    : "is-active"}
            ">
            ${plan.status === "cancelled"
                    ? "취소됨"
                    : "저장됨"
            }
            </span>
        
            <div class="plan-card-header">
                <h3>${plan.goal}</h3>
            </div>
        
            <div class="plan-card-info">
            <span>📅 ${plan.day}</span>
            <span>⏱ ${plan.duration}분</span>
            </div>
            
            <div class="plan-card-footer">
                <span class="plan-theme-badge theme-${plan.theme.toLowerCase()}">
                ${plan.theme}
                </span>
            </div>
                
            <div class="plan-actions">
                <button type="button" class="detail-button">상세보기</button>
                ${
                    plan.status === "active"
                    ?
                    `<button type="button" class="cancel-button">
                        취소
                    </button>`
                    :
                    `<button type="button" class="restore-button">
                        복구
                    </button>`
                }
            </div>

        `;

        const detailButton = item.querySelector(".detail-button");

        detailButton.addEventListener(
            "click",
            () => {

                planDetailContent.innerHTML = `

                <div class="detail-grid">
            
                    <div class="detail-item">
                        <span>BMI</span>
                        <strong>${plan.bmi}</strong>
                    </div>
            
                    <div class="detail-item">
                        <span>추천 BARRE 테마</span>
                        <strong>${plan.recommendedTheme}</strong>
                    </div>
            
                    <div class="detail-item">
                        <span>운동 목표</span>
                        <strong>${plan.goal}</strong>
                    </div>
            
                    <div class="detail-item">
                        <span>운동 요일</span>
                        <strong>${plan.day}</strong>
                    </div>
            
                    <div class="detail-item">
                        <span>컨디션 점수</span>
                        <strong>${plan.condition}점</strong>
                    </div>
            
                    <div class="detail-item">
                        <span>선택 BARRE 테마</span>
                        <strong>${plan.theme}</strong>
                    </div>
            
                    <div class="detail-item">
                        <span>운동 시간</span>
                        <strong>${plan.duration}분</strong>
                    </div>
            
                    <div class="detail-item">
                        <span>스트레칭</span>
                        <strong>
                            ${
                                plan.stretching
                                ? plan.stretchingCount + "분 포함"
                                : "미포함"
                            }
                        </strong>
                    </div>
            
                </div>
            
            `;
                planDetailDialog.showModal();
            }
        );

        const cancelButton = item.querySelector(".cancel-button");
        const restoreButton = item.querySelector(".restore-button");

        if (restoreButton) {
            restoreButton.addEventListener(
                "click",
                () => {
                    plan.status = "active";
                    localStorage.setItem("savedPlans",JSON.stringify(savedPlans));
                    
                    renderPlans();
                }
            );
        }

        if (cancelButton) {
            cancelButton.addEventListener(
                "click",
                () => {
                    plan.status = "cancelled";
                    localStorage.setItem("savedPlans", JSON.stringify(savedPlans));

                    renderPlans();
                }
            );
        }

        planList.append(item);

    });

    planCount.textContent = `표시된 계획 ${filteredPlans.length}개`;
    planEmpty.hidden = filteredPlans.length > 0;

    if (currentFilter === "active") {
        planEmpty.textContent =
            "저장된 운동 계획이 없습니다.";
    }
    else if (currentFilter === "cancelled") {
        planEmpty.textContent =
            "취소된 운동 계획이 없습니다.";
    }
    else {
        planEmpty.textContent =
            "아직 저장한 운동 계획이 없습니다.";
    }
}

filterButtons.forEach((button) => {
    button.addEventListener(
        "click",
        () => {
            currentFilter = button.dataset.filter;
            filterButtons.forEach((item) => {
                item.classList.remove("is-active");
                item.setAttribute("aria-pressed", "false");
            });
            button.classList.add("is-active");
            button.setAttribute("aria-pressed", "true");

            renderPlans();
        }
    );
});

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
    const isComplete = index === 5;

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

function updateGoalExperience() {

    const length = goalInput.value.length;

    const enough =
        goalInput.value.trim().length >= 2;

    goalCount.textContent =
        length + " / 30자";

    goalInput.classList.toggle(
        "is-valid",
        enough
    );

    goalHelp.classList.toggle(
        "is-valid",
        enough
    );

    goalHelp.textContent = enough
        ? "입력 조건을 충족했습니다."
        : "운동 목표를 2자 이상 입력해 주세요.";
}

function validateGoal() {

    const value =
        goalInput.value.trim();
        if (!value) {
            goalError.textContent =
                "운동 목표를 입력해 주세요.";
            goalInput.classList.add("has-error");
            goalInput.classList.remove("is-valid");
            goalHelp.classList.remove("is-valid");
            goalInput.focus();
            return false;
        }
        

        if (value.length < 2) {
            goalError.textContent =
                "운동 목표를 2자 이상 입력해 주세요.";
            goalInput.classList.add("has-error");
            goalInput.classList.remove("is-valid");
            goalHelp.classList.remove("is-valid");
            goalInput.focus();
            return false;
        }

    goalError.textContent = "";
    goalInput.classList.remove("has-error");
    formData.goal = value;
    updateGoalExperience();
    return true;
}

goalInput.addEventListener("input", () => {
    updateGoalExperience();
    if (goalInput.classList.contains("has-error")) {
        validateGoal();
    }
});

goalNext.addEventListener("click", () => {
    if (!validateGoal()) return;
    showStep(1);
});

dayPrev.addEventListener("click", () => {
    showStep(0);
});

dayNext.addEventListener("click", () => {
    const selectedDay = document.querySelector('input[name="exercise-day"]:checked');
    if (!selectedDay) {dayError.textContent = "운동 요일을 선택해 주세요.";
        return;
    }
    dayError.textContent = "";
    formData.day = selectedDay.value;
    showStep(2);
});

conditionRange.addEventListener("input", () => {
    const score = Number(conditionRange.value);
    conditionValue.textContent = score + "점";
    if (score <= 3) {
        recommendedTheme.textContent = "SLOW";
    }
    else if (score <= 6) {
        recommendedTheme.textContent = "MOVE";
    }
    else if (score <= 8) {
        recommendedTheme.textContent = "CORE";
    }
    else {
        recommendedTheme.textContent = "BURN";
    }
});

conditionPrev.addEventListener("click", () => {
    showStep(1);
});

conditionNext.addEventListener("click", () => {
    const selectedTheme = document.querySelector(
            'input[name="selected-theme"]:checked'
        );
    if (!selectedTheme) {
        conditionError.textContent = "운동 테마를 선택해 주세요.";
        return;
    }
    conditionError.textContent = "";
    formData.condition = conditionRange.value;
    formData.theme = selectedTheme.value;
    showStep(3);
});

durationRange.addEventListener("input", () => {
    durationValue.value = durationRange.value + "분";});
const stretchingCountInputs =
    document.querySelectorAll('input[name="stretching-count"]');

function syncStretchingOptions() {
    const open = stretchingOption.checked;
    stretchingOptions.hidden = !open;
    stretchingCountInputs.forEach((input) => {input.disabled = !open;});
}

stretchingOption.addEventListener("change",syncStretchingOptions);

syncStretchingOptions();

function setSubmitStatus(message, status) {
    submitStatus.textContent = message;
    submitStatus.classList.remove(
        "is-success",
        "is-error"
    );
    if (status) {submitStatus.classList.add(status);}
}

optionPrev.addEventListener("click", () => showStep(2));

optionNext.addEventListener("click", () => {
    const duration = Number(durationRange.value);
    const stretching = stretchingOption.checked;
    const selectedCount = document.querySelector('input[name="stretching-count"]:checked');
    const stretchingCount = selectedCount
        ? Number(selectedCount.value)
        : 10;

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
    summaryDay.textContent = formData.day;
    summaryCondition.textContent = formData.condition + "점";
    summaryTheme.textContent = formData.theme;

    showStep(4);
});

summaryPrev.addEventListener("click", () => showStep(3));


const forceSaveFailure = new URLSearchParams(location.search).has("save-error");
    planSubmitForm.addEventListener("submit", async (event) => {
            event.preventDefault();
            finishButton.disabled = true;
            setSubmitStatus("운동 계획을 저장하고 있습니다.", "");
    
            await new Promise((resolve) => setTimeout(resolve, 800));
    
            if (forceSaveFailure) {
                finishButton.disabled = false;
                setSubmitStatus(
                    "운동 계획 저장에 실패했습니다. 다시 시도해 주세요.",
                    "is-error"
                );
                return;
            }
    
            finalBmi.textContent = bmiNumber.textContent || "-";
            finalTheme.textContent = bmiRecommendation.textContent || "-";
            finalGoal.textContent = formData.goal;
            finalDuration.textContent = formData.duration + "분";
            finalStretching.textContent = formData.stretching
                ? formData.stretchingCount + "분 포함"
                : "미포함";
            finalDay.textContent = formData.day;
            finalCondition.textContent = formData.condition + "점";
    
            savedPlans.push({
                bmi: bmiNumber.textContent,
                recommendedTheme: bmiRecommendation.textContent,
                goal: formData.goal,
                day: formData.day,
                condition: formData.condition,
                theme: formData.theme,
                duration: formData.duration,
                stretching: formData.stretching,
                stretchingCount: formData.stretchingCount,
                status: "active"
            });
    
            localStorage.setItem("savedPlans", JSON.stringify(savedPlans));
    
            renderPlans();
    
            setSubmitStatus("운동 계획을 저장했습니다.", "is-success");
    
            showStep(5);
        }
    );

restartButton.addEventListener(
    "click", () => {
        console.log("방금 저장한 계획 수정");

        if (savedPlans.length > 0) {
            savedPlans.pop();
            localStorage.setItem("savedPlans", JSON.stringify(savedPlans));
        }
        renderPlans();
        finishButton.disabled = false;
        planFlow.hidden = false;
        showStep(4);
    }
);

addPlanButton.addEventListener(
    "click", () => {
        formData.goal = "";
        formData.duration = "30";
        formData.stretching = false;
        formData.stretchingCount = "10";
        formData.day = "";
        formData.condition = "";
        formData.theme = "";
    
        conditionValue.textContent = "5점";
        recommendedTheme.textContent = "-";
        conditionError.textContent = "";
        dayError.textContent = "";
    
        goalInput.value = "";
        goalError.textContent = "";
        goalInput.classList.remove("has-error");
    
        durationRange.value = "30";
        durationValue.value = "30분";
    
        stretchingOption.checked = false;
        syncStretchingOptions();    
    
        durationError.textContent = "";
    
        goalCount.textContent = "0 / 30자";
        goalHelp.textContent = "운동 목표를 2자 이상 입력해 주세요.";
        goalHelp.classList.remove("is-valid");
        goalInput.classList.remove("is-valid");
    
        setSubmitStatus("", "");
    
        finishButton.disabled = false;
    
        document.querySelector(
            'input[name="stretching-count"][value="10"]'
        ).checked = true;
    
        summaryGoal.textContent = "";
        summaryDuration.textContent = "";
        summaryStretching.textContent = "";
        summaryDay.textContent = "";
        summaryCondition.textContent = "";
        summaryTheme.textContent = "";
        
        // 최종 요약 카드 초기화
        finalBmi.textContent = "-";
        finalTheme.textContent = "-";
        finalGoal.textContent = "-";
        finalDuration.textContent = "-";
        finalStretching.textContent = "-";
        finalDay.textContent = "-";
        finalCondition.textContent = "-";
    
        showStep(0);
        console.log("현재 단계 0으로 이동");
        goalInput.focus();
    });


/* =========================================
   중간고사 신규 기능: BMI 및 BARRE 테마 추천
========================================= */

// BMI 화면 요소
const bmiForm = document.querySelector("#bmi-form");
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
bmiForm.addEventListener("submit", (event) => {
        event.preventDefault();
        clearBmiResult();

        const values = validateBmiInputs();

        if (!values) return;

        const heightInMeters = values.height / 100;
        const bmi = values.weight / (heightInMeters * heightInMeters);
        const recommendation = recommendBarreTheme(bmi);

        if (recommendation.theme === "CORE") {
            bmiRank1.textContent = "CORE";
            bmiRank2.textContent = "MOVE";
            bmiRank3.textContent = "BALANCE";
        }
        else if (recommendation.theme === "MOVE") {
            bmiRank1.textContent = "MOVE";
            bmiRank2.textContent = "CORE";
            bmiRank3.textContent = "CARDIO";
        }
        else if (recommendation.theme === "BALANCE") {
            bmiRank1.textContent = "BALANCE";
            bmiRank2.textContent = "SLOW";
            bmiRank3.textContent = "MOVE";
        }
        else {
            bmiRank1.textContent = recommendation.theme;
            bmiRank2.textContent = "-";
            bmiRank3.textContent = "-";
        }

        bmiNumber.textContent = bmi.toFixed(1);
        bmiRecommendation.textContent = recommendation.theme;
        bmiReason.textContent = recommendation.reason;
        bmiResult.hidden = false;

        showBarreTheme(recommendation.theme);

        bmiResult.scrollIntoView({behavior: "smooth", block: "start"});
    }
);

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

updateGoalExperience();

renderPlans();

planDetailClose.addEventListener(
    "click",
    () => {
        planDetailDialog.close();
    }
);