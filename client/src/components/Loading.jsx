import "./loading.css";
function Loading() {
    return (
        <div className="container-loader">
            <div className="loader">
                <span className="hour"></span>
                <span className="min"></span>
                <span className="circel"></span>
            </div>
        </div>
    );
}

export default Loading;
