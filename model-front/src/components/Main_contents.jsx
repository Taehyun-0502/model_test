import { Link } from "react-router-dom"
import '../App.css'

function Main_contents() {

    return (
        <main className="main-page">
            {/* 히어로 섹션 */}
            <div className="main-hero">
                <div className="hero-badge">
                    🌲 자동으로 바꾸기 · 자연을 닮은 예측 서비스
                </div>
                <h1>
                    데이터가 피어나는<br />
                    <em>숲속 AI 예측</em>
                </h1>
                <p>
                    머신러닝 모델로 붓꽃 품종을 분류하고<br />
                    팁 금액을 예측해보세요.
                </p>
            </div>

            {/* 카드 그리드 */}
            <div className="card-grid">
                <Link to="/iris" className="feature-card">
                    <div className="card-icon">🌸</div>
                    <div className="card-title">Iris 품종 분류</div>
                    <div className="card-desc">
                        꽃받침과 꽃잎의 수치를 입력하여 붓꽃의 품종을 AI가 분류합니다.
                    </div>
                    <div className="card-arrow">→</div>
                </Link>

                <Link to="/tips" className="feature-card">
                    <div className="card-icon">💰</div>
                    <div className="card-title">팁 금액 예측</div>
                    <div className="card-desc">
                        식사 정보를 입력하면 AI가 적절한 팁 금액을 예측해줍니다.
                    </div>
                    <div className="card-arrow">→</div>
                </Link>
            </div>
        </main>
    )


} export default Main_contents