import React, { useState } from 'react';
import './IrisForm.css';

function IrisForm() {
    // 1. 입력받을 4가지 수치(꽃받침 길이/너비, 꽃잎 길이/너비)를 저장할 상태(State) 선언
    const [formData, setFormData] = useState({
        sepal_length: '',
        sepal_width: '',
        petal_length: '',
        petal_width: ''
    });

    // 2. 백엔드에서 받아온 예측 결과(setosa, versicolor 등)를 저장할 상태 선언
    const [predictionResult, setPredictionResult] = useState(null);

    // 3. 입력 필드의 값이 바뀔 때마다 실행되어 formData 상태를 업데이트하는 함수
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value // 해당 name(key)에 맞게 입력값을 대입
        }));
    };

    // 4. 예측하기 버튼을 눌렀을 때 실행되는 전송 처리 함수
    const handleSubmit = (e) => {
        // 기본 폼 제출 동작(페이지 새로고침)을 막음
        e.preventDefault();

        // 머신러닝 모델 전송 규격에 맞춰 문자열을 모두 실수형(Float) 숫자로 형변환
        const submitData = {
            sepal_length: parseFloat(formData.sepal_length),
            sepal_width: parseFloat(formData.sepal_width),
            petal_length: parseFloat(formData.petal_length),
            petal_width: parseFloat(formData.petal_width)
        };

        // 5. Spring Boot 백엔드 컨트롤러(/api/iris/form)로 POST 요청을 보냄
        fetch("/api/iris/form", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(submitData) // 형변환 완료된 객체를 JSON 형태로 변환
        })
            .then(r => r.json()) // 응답 결과를 JSON 형식으로 변환(파싱)
            .then(data => {
                console.log("받은 데이터:", data);
                // Python 백엔드에서 반환한 "predicted_species" 속성 값을 상태에 저장
                if (data.predicted_species) {
                    setPredictionResult(data.predicted_species);
                } else if (data.error) {
                    alert("예측 중 오류 발생: " + data.error);
                }
            })
            .catch(err => {
                console.error(err);
                alert("서버 연결 실패! API 서버가 켜져 있는지 확인하세요.");
            });
    };

    // 6. 결과 품종의 이름에 따라 한글 번역 및 꽃 이모지, 품종 설명을 반환하는 헬퍼 함수
    const getIrisDetails = (irisClass) => {
        if (!irisClass) return null;
        const name = irisClass.toLowerCase();
        
        if (name.includes('setosa')) {
            return {
                title: 'Iris Setosa (세토사)',
                desc: '꽃받침(Sepal)이 상대적으로 넓고 꽃잎(Petal)은 작고 섬세합니다. 붓꽃 품종 중 비교적 작은 크기에 속합니다.',
                emoji: '🌸',
                color: '#7c3aed',
                bg: 'rgba(139, 92, 246, 0.1)'
            };
        } else if (name.includes('versicolor')) {
            return {
                title: 'Iris Versicolor (버시컬러)',
                desc: '꽃받침과 꽃잎 크기가 균형 있게 어우러진 중간 크기 품종입니다. 청보랏빛의 은은하고 아름다운 꽃잎 색을 지녔습니다.',
                emoji: '🪻',
                color: '#2563eb',
                bg: 'rgba(59, 130, 246, 0.1)'
            };
        } else if (name.includes('virginica')) {
            return {
                title: 'Iris Virginica (버진아)',
                desc: '꽃받침과 꽃잎이 모두 가장 크고 화려합니다. 꽃받침 안쪽에 그물망 모양의 노란 가이드 무늬가 뚜렷합니다.',
                emoji: '🌺',
                color: '#059669',
                bg: 'rgba(16, 185, 129, 0.1)'
            };
        }
        
        return {
            title: irisClass,
            desc: '성공적으로 분석이 완료되었습니다.',
            emoji: '🌿',
            color: '#10b981',
            bg: 'rgba(16, 185, 129, 0.1)'
        };
    };

    const details = getIrisDetails(predictionResult);

    return (
        <div className="iris-form-container">
            <div className="iris-card">
                <h1 className="iris-title">Iris Species Predictor</h1>
                <p className="iris-subtitle">꽃받침과 꽃잎의 수치를 입력하여 붓꽃 품종을 분류하세요.</p>

                <form onSubmit={handleSubmit}>
                    <div className="form-grid">
                        {/* 꽃받침 길이 입력 그룹 */}
                        <div className="form-group">
                            <label className="form-label" htmlFor="sepal_length">
                                ↕️ 꽃받침 길이 (Sepal Length)
                            </label>
                            <div className="input-wrapper">
                                <input 
                                    type="number" 
                                    id="sepal_length"
                                    name="sepal_length" 
                                    className="form-control"
                                    placeholder="예: 5.8"
                                    step="0.1"
                                    value={formData.sepal_length} 
                                    onChange={handleChange} 
                                    required
                                />
                                <span className="unit-label">cm</span>
                            </div>
                        </div>

                        {/* 꽃받침 너비 입력 그룹 */}
                        <div className="form-group">
                            <label className="form-label" htmlFor="sepal_width">
                                ↔️ 꽃받침 너비 (Sepal Width)
                            </label>
                            <div className="input-wrapper">
                                <input 
                                    type="number" 
                                    id="sepal_width"
                                    name="sepal_width" 
                                    className="form-control"
                                    placeholder="예: 3.0"
                                    step="0.1"
                                    value={formData.sepal_width} 
                                    onChange={handleChange} 
                                    required
                                />
                                <span className="unit-label">cm</span>
                            </div>
                        </div>

                        {/* 꽃잎 길이 입력 그룹 */}
                        <div className="form-group">
                            <label className="form-label" htmlFor="petal_length">
                                ↕️ 꽃잎 길이 (Petal Length)
                            </label>
                            <div className="input-wrapper">
                                <input 
                                    type="number" 
                                    id="petal_length"
                                    name="petal_length" 
                                    className="form-control"
                                    placeholder="예: 4.3"
                                    step="0.1"
                                    value={formData.petal_length} 
                                    onChange={handleChange} 
                                    required
                                />
                                <span className="unit-label">cm</span>
                            </div>
                        </div>

                        {/* 꽃잎 너비 입력 그룹 */}
                        <div className="form-group">
                            <label className="form-label" htmlFor="petal_width">
                                ↔️ 꽃잎 너비 (Petal Width)
                            </label>
                            <div className="input-wrapper">
                                <input 
                                    type="number" 
                                    id="petal_width"
                                    name="petal_width" 
                                    className="form-control"
                                    placeholder="예: 1.3"
                                    step="0.1"
                                    value={formData.petal_width} 
                                    onChange={handleChange} 
                                    required
                                />
                                <span className="unit-label">cm</span>
                            </div>
                        </div>
                    </div>

                    <button type="submit" className="submit-btn">
                        <span>🔍</span> 붓꽃 품종 예측하기
                    </button>
                </form>

                {/* 7. 예측 결과가 존재하는 경우에만 하단에 결과 카드 동적 렌더링 */}
                {predictionResult && details && (
                    <div
                        className="iris-result-card"
                        style={{
                            backgroundColor: details.bg,
                            borderColor: `${details.color}60`,
                        }}
                    >
                        <div className="iris-result-label">🧬 AI 예측 품종 분류 결과</div>
                        <div className="iris-result-species" style={{ color: details.color }}>
                            <span>{details.emoji}</span>
                            <span>{details.title}</span>
                        </div>
                        <p className="iris-result-desc">
                            {details.desc}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default IrisForm;