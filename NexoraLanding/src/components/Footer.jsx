import { footer } from "../data/landingData";

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container footer__inner">
                <span>{footer.left}</span>
                <span>{footer.right}</span>
            </div>
        </footer>
    );
}