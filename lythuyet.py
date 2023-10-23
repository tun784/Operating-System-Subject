# Giải thuật Round Robin
# Các thời điểm của 1 tiến trình:
# thời điểm vào (thời điểm tiến trình đó vào hàng đợi của CPU) -> thời điểm thực thi lần đầu (thời điểm đầu tiên mà tiến trình đó bắt đầu được thực thi) -> thời gian xử lý của CPU -> thời điểm hoàn thành của CPU

# Tính các thời gian sau dựa theo các công thức dưới đây:
# thời gian đáp ứng = thời điểm thực thi lần đầu - thời điểm vào(đến)
# thời gian chờ = thời điểm hoàn thành tiến trình - thời gian xử lý - thời điểm vào
# thời gian hoàn thành = thời điểm hoàn thành - thời điểm vào

# Tiến trình - thời điểm vào - thời gian xử lý
# P1         - 0             - 24
# P2         - 0             - 3
# P3         - 0             - 3
# đơn vị tính: giây

class Process:
    def __init__(self, name, arrival_time, burst_time):
        self.name = name
        self.arrival_time = arrival_time
        self.burst_time = burst_time
        self.response_time = 0
        self.waiting_time = 0
        self.completion_time = 0

def round_robin(processes, quantum):
    n = len(processes)
    total_time = 0
    total_burst_time = sum(process.burst_time for process in processes)
    
    while total_burst_time > 0:
        for process in processes:
            if process.burst_time > 0:
                if process.burst_time > quantum:
                    total_time += quantum
                    process.burst_time -= quantum
                else:
                    total_time += process.burst_time
                    process.burst_time = 0
                    process.completion_time = total_time
                    process.response_time = process.completion_time - process.arrival_time

        for process in processes:
            if process.burst_time > 0:
                for p in processes:
                    if p.burst_time > 0 and p.arrival_time < total_time:
                        p.waiting_time += quantum

        total_burst_time = sum(process.burst_time for process in processes)

    print("Tiến trình - Thời điểm vào - Thời gian xử lý - Thời gian đáp ứng - Thời gian chờ - Thời gian hoàn thành")
    for process in processes:
        print(f"{process.name}\t\t{process.arrival_time}\t\t{process.burst_time}\t\t\t{process.response_time}\t\t{process.waiting_time}\t\t\t{process.completion_time}")

if __name__ == "__main__":
    processes = [
        Process("P1", 0, 24),
        Process("P2", 0, 3),
        Process("P3", 0, 3)
    ]
    
    quantum = 4
    
    round_robin(processes, quantum)
