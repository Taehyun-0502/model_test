import React, { useState } from 'react';
import './TipsForm.css';

function TipsForm() {
    const [formData, setFormData] = useState({
        total_bill: '',
        sex: 'Male',
        smoker: false,
        day: 'Sat',
        time: 'Dinner',
        size: 2
    });

    const [submittedData, setSubmittedData] = useState(null);
    const [predictionResult, setPredictionResult] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSmokerChange = (e) => {
        setFormData(prev => ({
            ...prev,
            smoker: e.target.checked
        }));
    };

    const handleSizeChange = (amount) => {
        setFormData(prev => ({
            ...prev,
            size: Math.max(1, prev.size + amount)
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // 입력 검증
        if (!formData.total_bill || isNaN(formData.total_bill) || parseFloat(formData.total_bill) <= 0) {
            alert('유효한 총 결제 금액(Total Bill)을 입력해주세요.');
            return;
        }

        setSubmittedData({
            ...formData,
            total_bill: parseFloat(formData.total_bill)
        });
        setPredictionResult(null); // 이전 결과 초기화
        console.log(formData);

        fetch("/api/tips/form", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        })
            .then(r => r.json())
            .then(data => {
                console.log("받은 응답:", data);
                if (data.message === "success") {
                    setPredictionResult(data.predicted_tip);
                } else if (data.error) {
                    alert("예측 오류: " + data.error);
                }
            })
            .catch(err => {
                console.error(err);
                alert("서버 연결에 실패했습니다.");
            });
    };

    return (
        <div className="tips-form-container">
            <div className="tips-card">
                <h1 className="tips-title">Tip Predictor</h1>
                <p className="tips-subtitle">방문 정보를 입력하여 예측 데이터 폼을 완성하세요.</p>

                <form onSubmit={handleSubmit}>
                    {/* Total Bill */}
                    <div className="form-group">
                        <label className="form-label" htmlFor="total_bill">
                            <span>💰</span> 총 결제 금액 (Total Bill)
                        </label>
                        <div className="form-input-wrapper">
                            <span className="input-icon">$</span>
                            <input
                                type="number"
                                id="total_bill"
                                name="total_bill"
                                className="form-control form-control-with-icon"
                                placeholder="0.00"
                                step="0.01"
                                min="0"
                                value={formData.total_bill}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    {/* Sex / Gender */}
                    <div className="form-group">
                        <label className="form-label">
                            <span>👤</span> 성별 (Sex)
                        </label>
                        <div className="segmented-control">
                            <div className="segment-option">
                                <input
                                    type="radio"
                                    id="sex-male"
                                    name="sex"
                                    value="Male"
                                    checked={formData.sex === 'Male'}
                                    onChange={handleChange}
                                />
                                <label htmlFor="sex-male" className="segment-label">남성 (Male)</label>
                            </div>
                            <div className="segment-option">
                                <input
                                    type="radio"
                                    id="sex-female"
                                    name="sex"
                                    value="Female"
                                    checked={formData.sex === 'Female'}
                                    onChange={handleChange}
                                />
                                <label htmlFor="sex-female" className="segment-label">여성 (Female)</label>
                            </div>
                        </div>
                    </div>

                    {/* Smoker */}
                    <div className="form-group">
                        <label className="form-label">
                            <span>🚬</span> 흡연 여부 (Smoker)
                        </label>
                        <div className="switch-wrapper">
                            <span style={{ fontSize: '15px', color: 'var(--text)' }}>
                                {formData.smoker ? '흡연 구역 / 흡연자 포함' : '금연 구역 / 비흡연자'}
                            </span>
                            <label className="switch">
                                <input
                                    type="checkbox"
                                    checked={formData.smoker}
                                    onChange={handleSmokerChange}
                                />
                                <span className="slider"></span>
                            </label>
                        </div>
                    </div>

                    {/* Day */}
                    <div className="form-group">
                        <label className="form-label">
                            <span>📅</span> 방문 요일 (Day)
                        </label>
                        <div className="segmented-control">
                            <div className="segment-option">
                                <input
                                    type="radio"
                                    id="day-fri"
                                    name="day"
                                    value="Fri"
                                    checked={formData.day === 'Fri'}
                                    onChange={handleChange}
                                />
                                <label htmlFor="day-fri" className="segment-label">금 (Fri)</label>
                            </div>
                            <div className="segment-option">
                                <input
                                    type="radio"
                                    id="day-sat"
                                    name="day"
                                    value="Sat"
                                    checked={formData.day === 'Sat'}
                                    onChange={handleChange}
                                />
                                <label htmlFor="day-sat" className="segment-label">토 (Sat)</label>
                            </div>
                            <div className="segment-option">
                                <input
                                    type="radio"
                                    id="day-sun"
                                    name="day"
                                    value="Sun"
                                    checked={formData.day === 'Sun'}
                                    onChange={handleChange}
                                />
                                <label htmlFor="day-sun" className="segment-label">일 (Sun)</label>
                            </div>
                        </div>
                    </div>

                    {/* Time */}
                    <div className="form-group">
                        <label className="form-label">
                            <span>⏰</span> 방문 시간 (Time)
                        </label>
                        <div className="segmented-control">
                            <div className="segment-option">
                                <input
                                    type="radio"
                                    id="time-breakfast"
                                    name="time"
                                    value="Breakfast"
                                    checked={formData.time === 'Breakfast'}
                                    onChange={handleChange}
                                />
                                <label htmlFor="time-breakfast" className="segment-label">아침</label>
                            </div>
                            <div className="segment-option">
                                <input
                                    type="radio"
                                    id="time-lunch"
                                    name="time"
                                    value="Lunch"
                                    checked={formData.time === 'Lunch'}
                                    onChange={handleChange}
                                />
                                <label htmlFor="time-lunch" className="segment-label">점심</label>
                            </div>
                            <div className="segment-option">
                                <input
                                    type="radio"
                                    id="time-dinner"
                                    name="time"
                                    value="Dinner"
                                    checked={formData.time === 'Dinner'}
                                    onChange={handleChange}
                                />
                                <label htmlFor="time-dinner" className="segment-label">저녁</label>
                            </div>
                        </div>
                    </div>

                    {/* Size */}
                    <div className="form-group">
                        <label className="form-label">
                            <span>👥</span> 방문자 수 (Size)
                        </label>
                        <div className="counter-wrapper">
                            <span style={{ fontSize: '15px', color: 'var(--text)' }}>총 인원수</span>
                            <div className="counter-actions">
                                <button
                                    type="button"
                                    className="counter-btn"
                                    onClick={() => handleSizeChange(-1)}
                                    disabled={formData.size <= 1}
                                >
                                    -
                                </button>
                                <span className="counter-value">{formData.size}</span>
                                <button
                                    type="button"
                                    className="counter-btn"
                                    onClick={() => handleSizeChange(1)}
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    </div>

                    <button type="submit" className="submit-btn">
                        <span>🚀</span> 입력 정보 전송하기
                    </button>
                </form>

                {/* 결과 디스플레이 */}
                {submittedData && (
                    <div className="result-container">
                        {predictionResult !== null && (
                            <div className="prediction-box" style={{
                                background: 'var(--accent-bg)',
                                border: '2px dashed var(--accent-border)',
                                borderRadius: '14px',
                                padding: '18px',
                                marginBottom: '20px',
                                textAlign: 'center',
                                animation: 'fadeIn 0.5s ease-out'
                            }}>
                                <h3 style={{ margin: 0, color: 'var(--accent)', fontSize: '13px', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>💰 예측된 팁 금액</h3>
                                <div style={{ fontSize: '36px', fontWeight: '700', color: 'var(--text-h)', marginTop: '8px', fontFamily: 'var(--sans)', letterSpacing: '-0.03em' }}>
                                    ${predictionResult.toFixed(2)}
                                </div>
                            </div>
                        )}
                        <h3 className="result-title">
                            <span>✓</span> 입력된 정보 요약
                        </h3>
                        <div className="result-grid">
                            <div className="result-item">
                                <span className="result-label">총 결제 금액</span>
                                <span className="result-value">${submittedData.total_bill.toFixed(2)}</span>
                            </div>
                            <div className="result-item">
                                <span className="result-label">성별</span>
                                <span className="result-value">{submittedData.sex === 'Male' ? '남성' : '여성'}</span>
                            </div>
                            <div className="result-item">
                                <span className="result-label">흡연 여부</span>
                                <span className="result-value">{submittedData.smoker ? '흡연' : '비흡연'}</span>
                            </div>
                            <div className="result-item">
                                <span className="result-label">요일</span>
                                <span className="result-value">
                                    {submittedData.day === 'Fri' ? '금요일' : submittedData.day === 'Sat' ? '토요일' : '일요일'}
                                </span>
                            </div>
                            <div className="result-item">
                                <span className="result-label">시간대</span>
                                <span className="result-value">
                                    {submittedData.time === 'Breakfast' ? '아침 (Breakfast)' : submittedData.time === 'Lunch' ? '점심 (Lunch)' : '저녁 (Dinner)'}
                                </span>
                            </div>
                            <div className="result-item">
                                <span className="result-label">방문자 수</span>
                                <span className="result-value">{submittedData.size}명</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default TipsForm;