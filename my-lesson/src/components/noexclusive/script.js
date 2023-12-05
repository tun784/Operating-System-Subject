export const calculateSJF = () => {
    const arrivalTimes = document.getElementById("arrivalTimes").value.split(",").map(Number);
    const burstTimes = document.getElementById("burstTimes").value.split(",").map(Number);

    // Số lượng tiến trình, xác định bằng độ dài của mảng thời gian đến.
    const n = arrivalTimes.length;

    // Lưu trữ thời gian chờ cho từng tiến trình, khởi tạo với giá trị 0.
    let waitingTime = new Array(n).fill(0);

    // Lưu trữ thời gian hoàn thành cho từng tiến trình, khởi tạo với giá trị 0.
    let turnaroundTime = new Array(n).fill(0);

    // Thời gian xử lý còn lại của từng tiến trình.
    let remainingBurstTime = [...burstTimes];

    // Biến để theo dõi thời gian hiện tại trong quá trình thực hiện.
    let currentTime = 0;

    // Biến để đếm số lượng tiến trình đã hoàn thành.
    let completed = 0;

    const arrProccessName = ['0'];
    const firstUniqueNumbers = [arrProccessName[0]];

    // Vòng lặp này tiếp tục cho đến khi tất cả các tiến trình đều đã hoàn thành.
    while (completed < n) {
        // Lưu trữ thời gian xử lý ngắn nhất tìm thấy cho đến thời điểm hiện tại.
        let minBurstTime = Number.MAX_SAFE_INTEGER;

        // Lưu chỉ số của tiến trình có thời gian xử lý ngắn nhất tìm thấy.
        let shortestJobIndex = -1;

        for (let i = 0; i < n; i++) {
            // Điều kiện arrivalTimes[i] <= currentTime kiểm tra xem tiến trình đã đến thời gian xử lý chưa.
            // Điều kiện remainingBurstTime[i] < minBurstTime kiểm tra xem thời gian xử lý còn lại của tiến trình đó có ngắn hơn thời gian xử lý ngắn nhất hiện tại không.
            // Nếu cả hai điều kiện đều đúng và remainingBurstTime[i] > 0, thì tiến trình i được coi là có thời gian thực hiện ngắn nhất tìm thấy cho đến thời điểm hiện tại.
            if (
                arrivalTimes[i] <= currentTime && remainingBurstTime[i] < minBurstTime
                && remainingBurstTime[i] > 0
            ) {
                minBurstTime = remainingBurstTime[i];
                shortestJobIndex = i;
            }
        }

        // Kiểm tra xem shortestJobIndex có thay đổi không. Nếu nó vẫn là -1, tức là không có tiến trình nào thỏa mãn điều kiện để thực hiện ở thời điểm hiện tại, thì thời điểm hiện tại currentTime sẽ được tăng lên 1 đơn vị.
        if (shortestJobIndex === -1) {
            currentTime++;
        } else {
            // Nếu shortestJobIndex khác -1, tức là đã tìm thấy một tiến trình để thực hiện, thì remainingBurstTime[shortestJobIndex] được giảm đi 1 đơn vị, đại diện cho việc thực hiện tiến trình này trong một đơn vị thời gian.
            remainingBurstTime[shortestJobIndex]--;

            // Nếu remainingBurstTime[shortestJobIndex] trở thành 0, tiến trình này đã hoàn thành và completed được tăng lên 1 đơn vị để đếm số tiến trình đã hoàn thành.
            if (remainingBurstTime[shortestJobIndex] === 0) {
                completed++;
                const finishTime = currentTime + 1;
                turnaroundTime[shortestJobIndex] = finishTime - arrivalTimes[shortestJobIndex];
                waitingTime[shortestJobIndex] = turnaroundTime[shortestJobIndex] - burstTimes[shortestJobIndex];
            }

            const processName = `P${shortestJobIndex}`.slice(1);
            arrProccessName.push({ processName, currentTime });

            // Cuối cùng, thời điểm hiện tại currentTime được tăng lên 1 đơn vị để tiếp tục vòng lặp và xem xét tiến trình tiếp theo.
            currentTime++;
        }
    }

    for (let i = 1; i < arrProccessName.length; i++) {
        if (arrProccessName[i].processName !== arrProccessName[i - 1].processName) {
            let _arrProccessName = arrProccessName[i].processName;
            let _arrCurrentTime = arrProccessName[i].currentTime;
            firstUniqueNumbers.push(
                { _arrProccessName, _arrCurrentTime }
            );
        }
    }

    firstUniqueNumbers.push(arrProccessName[arrProccessName.length - 1]);

    const ganttBarsDiv = document.getElementById("ganttBars");
    let ganttBar = `
        <p>Biểu đồ Gantt:</p>
        <div class="container">
    `;

    let lastIndex = firstUniqueNumbers.length - 1;

    for (let i = 1; i < firstUniqueNumbers.length - 1; i++) {
        if (firstUniqueNumbers[i] == firstUniqueNumbers[lastIndex - 1]) {
            ganttBar += `
                <div class="item">
                    <span class="process">P${firstUniqueNumbers[i]._arrProccessName}</span>
                    <span class="absolute">${firstUniqueNumbers[i]._arrCurrentTime}</span>
                    <span class="absolute-special">
                        ${firstUniqueNumbers[firstUniqueNumbers.length - 1].currentTime + 1}
                    </span>
                </div>
            `;
        } else {
            ganttBar += `
                <div class="item">
                    <span class="process">P${firstUniqueNumbers[i]._arrProccessName}</span>
                    <span class="absolute">${firstUniqueNumbers[i]._arrCurrentTime}</span>
                </div>
            `;
        }
    }

    ganttBar += `</div>`;
    ganttBarsDiv.innerHTML = ganttBar;

    let avgWaitingTime = waitingTime.reduce((acc, curr) => acc + curr, 0) / n;
    let avgTurnaroundTime = turnaroundTime.reduce((acc, curr) => acc + curr, 0) / n;

    const processDetailsDiv = document.getElementById("processDetails");
    processDetailsDiv.innerHTML = `
        <h2>Thông tin từng tiến trình:</h2>
    `;

    for (let i = 0; i < n; i++) {
        processDetailsDiv.innerHTML += `
            <div class="process-item">
                P${i}: Thời gian chờ = ${waitingTime[i]}, Thời gian hoàn thành = ${turnaroundTime[i]}
            </div>
        `;
    }

    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = `
        <div class="result">
            <span class="result-item">
                <i class="fa-solid fa-arrow-right icon-arrow"></i> 
                Thời gian chờ trung bình: ${avgWaitingTime.toFixed(2)}
            </span>
            <span class="result-item">
                <i class="fa-solid fa-arrow-right icon-arrow"></i> 
                Thời gian hoàn thành trung bình: ${avgTurnaroundTime.toFixed(2)} 
            </span>
        </div>
    `;
}