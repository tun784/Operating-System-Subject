export const getBurstTimes = () => {
    const numProcesses = parseInt(document.getElementById("numProcesses").value);
    let inputHtml = "";

    for (let i = 1; i <= numProcesses; i++) {
        inputHtml += `
            <div class="process-item">
                <label for="burstTime${i}">
                    + Thời gian xử lý tiến trình P${i}:
                </label>
                <input type="number" id="burstTime${i}" min="1"/>
            </div>
        `;
    }

    document.getElementById("burstTimeInputs").innerHTML = inputHtml;
}

export const runSJF = () => {
    const numProcesses = parseInt(document.getElementById("numProcesses").value);
    const arrayWaitingTime = [];
    const arrayTurnAroundTime = [];

    let outputHtml = `
        <p>Biểu đồ Gantt:</p>
        <div class="container">
            <span class="default">0</span>
    `;

    const burstTimes = [];
    let currentTime = 0;
    let waitingTime = 0;

    for (let i = 1; i <= numProcesses; i++) {
        burstTimes.push({
            name: `P${i}`,
            burstTime: parseInt(document.getElementById(`burstTime${i}`).value)
        });
    }

    burstTimes.sort((a, b) => a.burstTime - b.burstTime);

    for (let i = 0; i < burstTimes.length; i++) {
        const process = burstTimes[i];
        arrayWaitingTime.push({ name: process.name, currentTime });

        waitingTime += currentTime;
        currentTime += process.burstTime;

        arrayTurnAroundTime.push({ name: process.name, currentTime });

        outputHtml += `
            <div class="item">
                <span class="process">${process.name}</span>
                <span class="absolute">${currentTime}</span>
            </div>
        `;
    }

    outputHtml += `
        </div>
        <div class="wrapper">
    `

    arrayWaitingTime.map(item => (
        outputHtml += `
            <div class="result-process">
                + Thời gian chờ tiến trình ${item.name} = ${item.currentTime}
            </div>
        `
    ))

    outputHtml += `</div>`

    arrayTurnAroundTime.map(item => (
        outputHtml += `
            <div class="result-process">
                + Thời gian hoàn tất tiến trình ${item.name} = ${item.currentTime}
            </div>
        `
    ))

    let accTurnAroundTime = 0;
    for (let i = 0; i < arrayTurnAroundTime.length; i++) {
        accTurnAroundTime += arrayTurnAroundTime[i].currentTime;
    }

    const averageWaitingTime = waitingTime / numProcesses;
    const averageCurrentTime = accTurnAroundTime / numProcesses;

    outputHtml += `
        <div class="result">
            <span>
                <i class="fa-solid fa-arrow-right icon-arrow"></i> 
                Thời gian chờ trung bình: ${averageWaitingTime.toFixed(2)}
            </span>
            <span>
                <i class="fa-solid fa-arrow-right icon-arrow"></i> 
                Thời gian hoàn tất trung bình: ${averageCurrentTime.toFixed(2)}
            </span>
        </div>
    `;

    document.getElementById("output").innerHTML = outputHtml;
}