export default function HelpBtn({opener}) {
    return (        
        <div className="help-container">
            <button className="help-btn"
            onClick={opener}>
                ?
        </button>
    </div>
    );
}