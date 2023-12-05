import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { getBurstTimes, runSJF } from './script'
import './exclusive.scss'
import { useState } from 'react';

const Exclusive = () => {
    const [numProcesses, setNumProcesses] = useState(0);

    return (
        <div className="exclusive">
            <h1 className="exclusive-title">SJF Độc Quyền</h1>
            <div className="content">
                <p>Nhập số lượng tiến trình và thời gian xử lý của chúng:</p>
                <label className="label" htmlFor="numProcesses">Số lượng tiến trình:</label>
                <input
                    type="number"
                    id="numProcesses"
                    min="0"
                    max="10"
                    value={numProcesses}
                    onChange={(e) => setNumProcesses(e.target.value)}
                />
                <button className="submit-btn" onClick={() => {
                    {
                        if (numProcesses != 0) {
                            getBurstTimes();
                            toast.success("Thành công!");
                        } else {
                            toast.error("Có lỗi xảy ra!");
                        }
                    }
                }}>Thêm</button>

                <div id="burstTimeInputs"></div>

                <button className="run-btn" onClick={() => {
                    const numProcesses = parseInt(document.getElementById("numProcesses").value);
                    const arrayBurstTime = [];
                    for (let i = 1; i <= numProcesses; i++) {
                        const burstTime = parseInt(document.getElementById(`burstTime${i}`).value)
                        arrayBurstTime.push(burstTime);
                    }

                    const hasNaN = (arr) => {
                        for (let i = 0; i < arr.length; i++) {
                            if (isNaN(arr[i])) {
                                return true;
                            }
                        }
                        return false;
                    }

                    if (!hasNaN(arrayBurstTime) && numProcesses) {
                        runSJF();
                        toast.success("Thành công!");
                    } else {
                        toast.error("Có lỗi xảy ra!");
                    }
                }}>Bắt đầu</button>
                <div id="output"></div>
            </div>
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

export default Exclusive;