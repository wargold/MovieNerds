import './loader.css'


export const Loader = () => {
    const loader = <div className="background">
        <div className="icon">
            <div className="parts">
                <div className="a"></div>
                <div className="b">
                    <div className="b-inner"></div>
                </div>
                <div className="c"></div>
                <div className="d"></div>
            </div>
        </div>
    </div>
    return loader;
}
