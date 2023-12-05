import { useState } from "react";
import "./noexclusive.scss";
import { calculateSJF } from "./script";
import { ToastContainer, toast } from "react-toastify";

const NoExclusive = () => {
    const [arrivalTime, setArrivalTime] = useState("");
    const [burstTime, setBurstTime] = useState("");

    return (
        <div className="no-exclusive">
            <h1>SJF Không Độc Quyền</h1>
            <p className="title">Nhập số lượng tiến trình và thời gian xử lý của chúng:</p>
            <form>
                <div className="form-control">
                    <label htmlFor="arrivalTimes">Nhập thời gian đến:</label>
                    <input
                        type="text"
                        id="arrivalTimes"
                        name="arrivalTimes"
                        value={arrivalTime}
                        onChange={(e) => setArrivalTime(e.target.value)}
                        required />
                </div>
                <div className="form-control">
                    <label htmlFor="burstTimes">Nhập thời gian xử lý:</label>
                    <input
                        type="text"
                        id="burstTimes"
                        name="burstTimes"
                        value={burstTime}
                        onChange={(e) => setBurstTime(e.target.value)}
                        required />
                </div>
                <p className="attention">
                    <span>Chú ý</span>
                    : Vui lòng nhập thời gian đến và thời gian xử lý cách nhau bằng dấu phẩy
                </p>
                <input className="btn" type="button" value="Bắt đầu" onClick={() => {
                    {
                        const arrivalTimes =
                            document.getElementById("arrivalTimes").value.split(",").map(Number);
                        const burstTimes = document.getElementById("burstTimes").value.split(",").map(Number);

                        if (arrivalTimes.length !== burstTimes.length) {
                            toast.error("Có lỗi xảy ra!");
                            return;
                        }

                        if (arrivalTime != "" && burstTime != "") {
                            calculateSJF();
                            toast.success("Thành công!");
                        } else {
                            toast.error("Có lỗi xảy ra!");
                        }
                    }
                }} />
            </form>
            <div id="ganttBars"></div>
            <div id="processDetails"></div>
            <div id="result"></div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    );
}

export default NoExclusive;